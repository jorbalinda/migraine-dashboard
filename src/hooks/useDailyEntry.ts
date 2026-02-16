import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export interface DailyEntry {
  id?: string
  date: string
  headache: boolean
  headache_intensity: number
  cycle_day: number | null
  mental_stress: number
  physical_stress: number
  sleep_time: string
  wake_time: string
  sleep_score: number
  workout_cardio: boolean
  workout_upper: boolean
  workout_lower: boolean
  screen_time: number
  routine_read: boolean
  routine_meditate: boolean
  routine_bath: boolean
}

const defaultEntry = (date: string): DailyEntry => ({
  date,
  headache: false,
  headache_intensity: 1,
  cycle_day: null,
  mental_stress: 1,
  physical_stress: 1,
  sleep_time: '',
  wake_time: '',
  sleep_score: 5,
  workout_cardio: false,
  workout_upper: false,
  workout_lower: false,
  screen_time: 0,
  routine_read: false,
  routine_meditate: false,
  routine_bath: false,
})

export function useDailyEntry(date: string) {
  const [entry, setEntry] = useState<DailyEntry>(defaultEntry(date))
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setLoading(true)
    setSaved(false)
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

  const updateField = useCallback(
    <K extends keyof DailyEntry>(field: K, value: DailyEntry[K]) => {
      setSaved(false)
      setEntry((prev) => ({ ...prev, [field]: value }))
    },
    []
  )

  const save = useCallback(async () => {
    setSaving(true)
    const { id, ...rest } = entry
    await supabase
      .from('daily_entries')
      .upsert({ ...rest, date }, { onConflict: 'date' })
    setSaved(true)
    setSaving(false)
  }, [entry, date])

  return { entry, loading, saved, saving, updateField, save }
}
