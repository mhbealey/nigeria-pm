import type { ChatMessage } from '../types/message';
import type { Task, TaskNote } from '../types/task';
import type { SideEffect } from './responses';
import { generateResponse, createActivityFromEffect } from './responses';
import { calculateResponseDelay } from './delay';
import { getScenario, type ScenarioStep } from './scenarios';
import { useChatStore } from '../stores/chat-store';
import { useProjectStore } from '../stores/project-store';
import { useDemoStore } from '../stores/demo-store';
import { getUserByName } from '../data/mock-users';

let abortController: AbortController | null = null;

function createOutMessage(content: string): ChatMessage {
  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    content,
    direction: 'out',
    timestamp: new Date().toISOString(),
    readStatus: 'sent',
    senderName: 'You',
  };
}

function createInMessage(
  content: string,
  quickReplies?: string[]
): ChatMessage {
  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    content,
    direction: 'in',
    timestamp: new Date().toISOString(),
    readStatus: 'delivered',
    senderName: 'WAPA',
    quickReplies,
  };
}

/**
 * Wait for a given number of milliseconds, respecting abort signals.
 * DECISION: Typing delays exist to simulate human reading/thinking time — without
 * them, instant responses feel robotic and break the WhatsApp illusion.
 */
function wait(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });
}

/**
 * Apply side effects to the project store and other stores.
 * DECISION: Side effects mutate Zustand stores directly rather than dispatching events,
 * because Zustand's getState() is synchronous and always current — no stale closure issues.
 * This keeps the simulation engine as the single orchestrator of state changes.
 */
function applySideEffects(effects: SideEffect[]): void {
  const projectStore = useProjectStore.getState();

  for (const effect of effects) {
    switch (effect.type) {
      case 'create_task': {
        const newTask: Task = {
          id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
          title: effect.title,
          status: 'todo',
          priority: 'medium',
          creatorId: 'u-alex',
          projectId: 'proj-1',
          sprintId: 'spr-1',
          createdAt: new Date().toISOString(),
          notes: [],
        };
        projectStore.addTask(newTask);
        break;
      }

      case 'complete_task': {
        const task = projectStore.findTaskByTitle(effect.title);
        if (task) {
          projectStore.updateTaskStatus(task.id, 'done');
        }
        break;
      }

      case 'assign_task': {
        const assignTask = projectStore.findTaskByTitle(effect.taskTitle);
        const user = getUserByName(effect.assigneeName);
        if (assignTask && user) {
          projectStore.assignTask(assignTask.id, user.id);
        }
        break;
      }

      case 'set_priority': {
        const prioTask = projectStore.findTaskByTitle(effect.taskTitle);
        if (prioTask) {
          projectStore.updateTaskPriority(prioTask.id, effect.priority);
        }
        break;
      }

      case 'block_task': {
        const blockTask = projectStore.findTaskByTitle(effect.taskTitle);
        if (blockTask) {
          projectStore.blockTask(blockTask.id, effect.reason);
        }
        break;
      }

      case 'add_note': {
        // Find a relevant task or use the most recently referenced one
        const noteTask = effect.taskTitle
          ? projectStore.findTaskByTitle(effect.taskTitle)
          : projectStore.tasks[projectStore.tasks.length - 1];
        if (noteTask) {
          const note: TaskNote = {
            id: `note-${Date.now()}`,
            content: effect.note,
            authorId: 'u-alex',
            createdAt: new Date().toISOString(),
          };
          projectStore.addNote(noteTask.id, note);
        }
        break;
      }

      case 'add_activity': {
        const activity = createActivityFromEffect(effect.text, 'u-alex');
        projectStore.addActivity(activity);
        break;
      }

      case 'update_progress':
        // Progress is computed dynamically from task statuses, no explicit action needed
        break;

      case 'confetti':
        // UI components can subscribe to activities with confetti keyword
        // or watch for this in the demo store
        break;
    }
  }
}

/**
 * Process a user message in freeform (non-scenario) mode.
 * Generates a response via pattern matching, simulates a realistic
 * typing delay scaled by the demo speed setting, then applies any
 * side effects (task creation, status changes, etc.) to the project store.
 * Aborts gracefully if a new message arrives before the response is sent.
 */
export async function processUserMessage(userInput: string): Promise<void> {
  const chatStore = useChatStore.getState();
  const demoStore = useDemoStore.getState();

  // Cancel any pending response
  abortController?.abort();
  abortController = new AbortController();
  const signal = abortController.signal;

  // 1. Add user message
  const userMsg = createOutMessage(userInput);
  chatStore.addMessage(userMsg);

  // 2. Generate response
  const { text, quickReplies, sideEffects } = generateResponse(userInput);

  // 3. Show typing & wait
  chatStore.setTyping(true);
  try {
    const delay = calculateResponseDelay(text, demoStore.speed);
    await wait(delay, signal);
  } catch {
    chatStore.setTyping(false);
    return; // Aborted
  }
  chatStore.setTyping(false);

  // 4. Send response
  const wapaMsg = createInMessage(text, quickReplies);
  chatStore.addMessage(wapaMsg);

  // 5. Apply side effects
  if (sideEffects) {
    applySideEffects(sideEffects);
  }
}

/**
 * Run a guided scenario step by step.
 * Scenarios are predefined sequences of user messages and WAPA responses
 * that showcase specific workflows (e.g., sprint planning, task triage).
 * Each step triggers side effects that update the dashboard in real time.
 * Respects pause/reset signals from the demo store and the current speed setting.
 */
export async function runScenario(scenarioId: string): Promise<void> {
  const scenario = getScenario(scenarioId);
  if (!scenario) return;

  const demoStore = useDemoStore.getState();
  const chatStore = useChatStore.getState();

  abortController?.abort();
  abortController = new AbortController();
  const signal = abortController.signal;

  for (let i = 0; i < scenario.steps.length; i++) {
    // Check if paused or reset
    const currentState = useDemoStore.getState();
    if (!currentState.isPlaying || currentState.activeScenario !== scenarioId) {
      return;
    }

    const step = scenario.steps[i];
    useDemoStore.getState().nextStep();

    try {
      await executeScenarioStep(step, signal, demoStore.speed);
    } catch {
      return; // Aborted
    }
  }

  // Scenario complete
  useDemoStore.getState().resetScenario();
}

async function executeScenarioStep(
  step: ScenarioStep,
  signal: AbortSignal,
  speed: number
): Promise<void> {
  const chatStore = useChatStore.getState();

  // If trigger is not 'auto', simulate user sending a message
  if (step.trigger !== 'auto') {
    const userMsg = createOutMessage(step.trigger);
    chatStore.addMessage(userMsg);
    await wait(300 / speed, signal);
  }

  // Show typing
  chatStore.setTyping(true);
  const delay = step.delay
    ? step.delay / speed
    : calculateResponseDelay(step.response, speed);
  await wait(delay, signal);
  chatStore.setTyping(false);

  // Send WAPA response
  const wapaMsg = createInMessage(step.response, step.quickReplies);
  chatStore.addMessage(wapaMsg);

  // Apply side effects
  if (step.sideEffects) {
    applySideEffects(step.sideEffects);
  }

  // Brief pause between steps
  await wait(500 / speed, signal);
}

/**
 * Stop any running scenario or pending response.
 */
export function stopSimulation(): void {
  abortController?.abort();
  abortController = null;
  useChatStore.getState().setTyping(false);
}
