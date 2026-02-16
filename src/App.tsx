import { useState } from 'react'
import { useDailyEntry } from './hooks/useDailyEntry'
import Sidebar from './components/Sidebar'
import HeadacheCard from './components/HeadacheCard'
import CalendarCard from './components/CalendarCard'
import SleepCard from './components/SleepCard'
import StressCard from './components/StressCard'
import WorkoutCard from './components/WorkoutCard'
import ScreenTimeCard from './components/ScreenTimeCard'
import RoutineCard from './components/RoutineCard'
import CompetingCard from './components/CompetingCard'

function todayString() {
  const d = new Date()
  return d.toISOString().split('T')[0]
}

function App() {
  const [selectedDate, setSelectedDate] = useState(todayString())
  const { entry, loading, updateField } = useDailyEntry(selectedDate)

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFDFB] flex items-center justify-center">
        <div className="text-slate-400 text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFFDFB] p-6 lg:p-8 font-sans text-slate-700">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <Sidebar selectedDate={selectedDate} onDateChange={setSelectedDate} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Headache - full width */}
          <HeadacheCard
            headache={entry.headache}
            intensity={entry.headache_intensity}
            onHeadacheChange={(v) => updateField('headache', v)}
            onIntensityChange={(v) => updateField('headache_intensity', v)}
          />

          {/* Two-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="flex flex-col gap-6">
              <CalendarCard
                cycleDay={entry.cycle_day}
                onCycleDayChange={(v) => updateField('cycle_day', v)}
                selectedDate={selectedDate}
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

            {/* Right column */}
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
                <div className="flex flex-col gap-6">
                  <CompetingCard
                    isCompeting={entry.is_competing}
                    onCompetingChange={(v) => updateField('is_competing', v)}
                  />
                  <RoutineCard
                    read={entry.routine_read}
                    meditate={entry.routine_meditate}
                    onReadChange={(v) => updateField('routine_read', v)}
                    onMeditateChange={(v) => updateField('routine_meditate', v)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
