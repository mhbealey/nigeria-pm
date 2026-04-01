import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  Play,
  Pause,
  RotateCcw,
  X,
  ChevronDown,
} from 'lucide-react';

interface DemoControlsProps {
  scenarios: Array<{ id: string; label: string }>;
  activeScenario: string;
  isPlaying: boolean;
  speed: number;
  darkMode: boolean;
  soundEnabled: boolean;
  phoneFrame: boolean;
  onSelectScenario: (id: string) => void;
  onTogglePlay: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  onToggleDarkMode: () => void;
  onToggleSound: () => void;
  onTogglePhoneFrame: () => void;
  onResetAll: () => void;
}

export function DemoControls({
  scenarios,
  activeScenario,
  isPlaying,
  speed,
  darkMode,
  soundEnabled,
  phoneFrame,
  onSelectScenario,
  onTogglePlay,
  onReset,
  onSpeedChange,
  onToggleDarkMode,
  onToggleSound,
  onTogglePhoneFrame,
  onResetAll,
}: DemoControlsProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating gear button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 400, damping: 25 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-[#00a884] text-white shadow-lg shadow-black/20 hover:bg-[#00c49a] active:scale-95 transition-all"
        aria-label="Open demo controls"
      >
        <Settings className="w-5 h-5" />
      </motion.button>

      {/* Backdrop + Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop (mobile tap-to-close) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/30 md:bg-transparent md:pointer-events-none"
            />

            {/* Panel */}
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-50 md:bottom-20 md:right-5 md:left-auto md:w-80"
            >
              <div
                className="rounded-t-2xl md:rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(0, 0, 0, 0.85)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                {/* Close button */}
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-3 right-3 z-10 flex items-center justify-center w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
                  aria-label="Close demo controls"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="px-5 pt-5 pb-6 space-y-4">
                  {/* Scenario selector */}
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      Scenario
                    </label>
                    <div className="relative">
                      <select
                        value={activeScenario}
                        onChange={(e) => onSelectScenario(e.target.value)}
                        className="w-full appearance-none rounded-lg px-3 py-2.5 text-sm text-white pr-9 focus:outline-none focus:ring-2 focus:ring-[#00a884] border border-white/10 bg-white/10"
                      >
                        <option value="" className="bg-gray-900">Freeform</option>
                        {scenarios.map((s) => (
                          <option key={s.id} value={s.id} className="bg-gray-900">
                            {s.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                    </div>
                  </div>

                  {/* Playback row */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={onTogglePlay}
                      disabled={!activeScenario}
                      className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#00a884] text-white hover:bg-[#00c49a] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>
                    <button
                      onClick={onReset}
                      className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/15 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                      aria-label="Reset scenario"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    <div className="flex-1" />

                    {/* Speed selector */}
                    <div className="flex items-center gap-0.5 rounded-lg bg-white/10 p-0.5">
                      <span className="text-[10px] font-medium text-white/40 px-1.5">Speed</span>
                      {[0.5, 1, 2].map((s) => (
                        <button
                          key={s}
                          onClick={() => onSpeedChange(s)}
                          className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
                            speed === s
                              ? 'bg-[#00a884] text-white shadow-sm'
                              : 'text-white/50 hover:text-white'
                          }`}
                        >
                          {s}x
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/10" />

                  {/* Toggles */}
                  <div className="space-y-3">
                    <ToggleRow
                      emoji="🌙"
                      label="Dark mode"
                      checked={darkMode}
                      onChange={onToggleDarkMode}
                    />
                    <ToggleRow
                      emoji="🔊"
                      label="Sounds"
                      checked={soundEnabled}
                      onChange={onToggleSound}
                    />
                    <ToggleRow
                      emoji="📱"
                      label="Phone frame"
                      checked={phoneFrame}
                      onChange={onTogglePhoneFrame}
                      desktopOnly
                    />
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/10" />

                  {/* Reset all */}
                  <button
                    onClick={onResetAll}
                    className="w-full py-2 text-sm font-medium rounded-lg border border-white/10 text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors"
                  >
                    Reset all data
                  </button>

                  {/* Footer */}
                  <p className="text-center text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.25)' }}>
                    Built with WAPA
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- Toggle row ---------- */

function ToggleRow({
  emoji,
  label,
  checked,
  onChange,
  desktopOnly,
}: {
  emoji: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  desktopOnly?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between ${desktopOnly ? 'hidden md:flex' : ''}`}
    >
      <div className="flex items-center gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
        <span className="text-base leading-none">{emoji}</span>
        {label}
      </div>
      <button
        onClick={onChange}
        className="relative w-11 h-6 rounded-full transition-colors"
        style={{ backgroundColor: checked ? '#00a884' : 'rgba(255,255,255,0.15)' }}
        role="switch"
        aria-checked={checked}
        aria-label={label}
      >
        <motion.div
          animate={{ x: checked ? 20 : 3 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm"
        />
      </button>
    </div>
  );
}
