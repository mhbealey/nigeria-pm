import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Sun,
  Moon,
  Columns2,
  MessageCircle,
  Gauge,
} from 'lucide-react';

interface DemoControlsProps {
  scenarios: Array<{ id: string; label: string }>;
  activeScenario: string;
  isPlaying: boolean;
  speed: number;
  freeformMode: boolean;
  splitView: boolean;
  darkMode: boolean;
  onSelectScenario: (id: string) => void;
  onTogglePlay: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  onToggleFreeform: () => void;
  onToggleSplitView: () => void;
  onToggleDarkMode: () => void;
}

export function DemoControls({
  scenarios,
  activeScenario,
  isPlaying,
  speed,
  freeformMode,
  splitView,
  darkMode,
  onSelectScenario,
  onTogglePlay,
  onReset,
  onSpeedChange,
  onToggleFreeform,
  onToggleSplitView,
  onToggleDarkMode,
}: DemoControlsProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-4 right-4 z-50 w-72"
    >
      <div className="rounded-2xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-2xl overflow-hidden dark:bg-gray-900/80 dark:border-gray-700/40">
        {/* Header toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-100/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-[var(--wapa-green-500)]" />
            Demo Controls
          </div>
          {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 space-y-4">
                {/* Scenario selector */}
                <div>
                  <label className="block text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-1.5">
                    Scenario
                  </label>
                  <div className="relative">
                    <select
                      value={activeScenario}
                      onChange={(e) => onSelectScenario(e.target.value)}
                      className="w-full appearance-none bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 pr-8 focus:outline-none focus:ring-2 focus:ring-[var(--wapa-green-500)] focus:border-transparent"
                    >
                      <option value="">Freeform</option>
                      {scenarios.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Playback controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={onTogglePlay}
                    disabled={!activeScenario}
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--wapa-green-500)] text-white hover:bg-[var(--wapa-green-400)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <button
                    onClick={onReset}
                    className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <div className="flex-1" />
                  {/* Speed */}
                  <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
                    {[0.5, 1, 2].map((s) => (
                      <button
                        key={s}
                        onClick={() => onSpeedChange(s)}
                        className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                          speed === s
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-2.5">
                  <ToggleRow
                    icon={<MessageCircle className="w-3.5 h-3.5" />}
                    label="Try it yourself"
                    checked={freeformMode}
                    onChange={onToggleFreeform}
                  />
                  <ToggleRow
                    icon={<Columns2 className="w-3.5 h-3.5" />}
                    label="Split view"
                    checked={splitView}
                    onChange={onToggleSplitView}
                  />
                  <ToggleRow
                    icon={darkMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
                    label="Dark mode"
                    checked={darkMode}
                    onChange={onToggleDarkMode}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ---------- toggle row ---------- */

function ToggleRow({
  icon,
  label,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        {icon}
        {label}
      </div>
      <button
        onClick={onChange}
        className={`relative w-9 h-5 rounded-full transition-colors ${
          checked ? 'bg-[var(--wapa-green-500)]' : 'bg-gray-300'
        }`}
      >
        <motion.div
          animate={{ x: checked ? 16 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm"
        />
      </button>
    </div>
  );
}
