import { useState, useEffect, useRef, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export interface DailyEntry {
  id?: string
  date: string
  headache: boolean
  headache_intensity: number
  cycle_day: number | null
  mental_stress: number
  physical_stress: number
  is_competing: boolean
  sleep_time: string
  wake_time: string
  sleep_score: number
  workout_cardio: boolean
  workout_upper: boolean
  workout_lower: boolean
  screen_time: number
  routine_read: boolean
  routine_meditate: boolean
}

const defaultEntry = (date: string): DailyEntry => ({
  date,
  headache: false,
  headache_intensity: 1,
  cycle_day: null,
  mental_stress: 1,
  physical_stress: 1,
  is_competing: false,
  sleep_time: '',
  wake_time: '',
  sleep_score: 5,
  workout_cardio: false,
  workout_upper: false,
  workout_lower: false,
  screen_time: 0,
  routine_read: false,
  routine_meditate: false,
})

export function useDailyEntry(date: string) {
  const [entry, setEntry] = useState<DailyEntry>(defaultEntry(date))
  const [loading, setLoading] = useState(true)
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setLoading(true)
    supabase
      .from('daily_entries')
      .select('*')
      .eq('date', date)
      .maybeSingle()
      .then(({ data }) => {
        setEntry(data ?? defaultEntry(date))
        setLoading(false)
      })
  }, [date])

  const saveToSupabase = useCallback(
    (updated: DailyEntry) => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current)
      saveTimeout.current = setTimeout(async () => {
        const { id, ...rest } = updated
        await supabase
          .from('daily_entries')
          .upsert({ ...rest, date }, { onConflict: 'date' })
      }, 500)
    },
    [date]
  )

  const updateField = useCallback(
    <K extends keyof DailyEntry>(field: K, value: DailyEntry[K]) => {
      setEntry((prev) => {
        const updated = { ...prev, [field]: value }
        saveToSupabase(updated)
        return updated
      })
    },
    [saveToSupabase]
  )

  return { entry, loading, updateField }
}
