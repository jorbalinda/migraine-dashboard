import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { useDailyEntry } from './hooks/useDailyEntry'
import { useAllEntries } from './hooks/useAllEntries'
import GlassHeader from './components/GlassHeader'
import type { Page } from './components/GlassHeader'
import HeadacheCard from './components/HeadacheCard'
import CalendarCard from './components/CalendarCard'
import SleepCard from './components/SleepCard'
import StressCard from './components/StressCard'
import WorkoutCard from './components/WorkoutCard'
import ScreenTimeCard from './components/ScreenTimeCard'
import RoutineCard from './components/RoutineCard'
import TrendsPage from './components/TrendsPage'
import ReportsPage from './components/ReportsPage'

function todayString() {
  const d = new Date()
  return d.toISOString().split('T')[0]
}

function App() {
  const [selectedDate, setSelectedDate] = useState(todayString())
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')
  const { entry, loading, saved, saving, updateField, save } = useDailyEntry(selectedDate)
  const { entries: allEntries, loading: allLoading } = useAllEntries()

  if (loading || allLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #fff3ed 0%, #e2ebf0 100%)' }}
      >
        <div className="text-[#4a4a4a]/50 text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen p-6 lg:p-10 font-sans text-[#4a4a4a] flex flex-col items-center gap-8"
      style={{ background: 'linear-gradient(135deg, #fff3ed 0%, #e2ebf0 100%)' }}
    >
      {/* Glass Header */}
      <GlassHeader
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      {/* Page Content */}
      <div className="w-full max-w-6xl">
        {currentPage === 'dashboard' && (
          <div className="flex flex-col gap-6">
            <HeadacheCard
              headache={entry.headache}
              intensity={entry.headache_intensity}
              onHeadacheChange={(v) => updateField('headache', v)}
              onIntensityChange={(v) => updateField('headache_intensity', v)}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex flex-col gap-6">
                <CalendarCard
                  cycleDay={entry.cycle_day}
                  onCycleDayChange={(v) => updateField('cycle_day', v)}
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  allEntries={allEntries}
                />
                <SleepCard
                  sleepTime={entry.sleep_time}
                  wakeTime={entry.wake_time}
                  sleepScore={entry.sleep_score}
                  onSleepTimeChange={(v) => updateField('sleep_time', v)}
                  onWakeTimeChange={(v) => updateField('wake_time', v)}
                  onSleepScoreChange={(v) => updateField('sleep_score', v)}
                />
              </div>

              <div className="flex flex-col gap-6">
                <StressCard
                  mentalStress={entry.mental_stress}
                  physicalStress={entry.physical_stress}
                  onMentalChange={(v) => updateField('mental_stress', v)}
                  onPhysicalChange={(v) => updateField('physical_stress', v)}
                />
                <WorkoutCard
                  cardio={entry.workout_cardio}
                  upper={entry.workout_upper}
                  lower={entry.workout_lower}
                  onCardioChange={(v) => updateField('workout_cardio', v)}
                  onUpperChange={(v) => updateField('workout_upper', v)}
                  onLowerChange={(v) => updateField('workout_lower', v)}
                />
                <div className="grid grid-cols-2 gap-6">
                  <ScreenTimeCard
                    screenTime={entry.screen_time}
                    onScreenTimeChange={(v) => updateField('screen_time', v)}
                  />
                  <RoutineCard
                    read={entry.routine_read}
                    meditate={entry.routine_meditate}
                    bath={entry.routine_bath}
                    onReadChange={(v) => updateField('routine_read', v)}
                    onMeditateChange={(v) => updateField('routine_meditate', v)}
                    onBathChange={(v) => updateField('routine_bath', v)}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center py-6">
              {saved ? (
                <div className="flex items-center gap-2 bg-green-50/80 text-green-700 px-8 py-3 rounded-full text-sm font-semibold shadow-sm">
                  <CheckCircle2 size={18} />
                  Data saved successfully
                </div>
              ) : (
                <button
                  onClick={save}
                  disabled={saving}
                  className="px-10 py-3.5 rounded-2xl text-base font-bold text-white bg-[#a1c4fd] hover:bg-[#89b4f8] active:scale-95 shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving...' : 'Log Day'}
                </button>
              )}
            </div>
          </div>
        )}

        {currentPage === 'trends' && <TrendsPage entries={allEntries} />}
        {currentPage === 'reports' && <ReportsPage entries={allEntries} />}
      </div>
    </div>
  )
}

export default App
