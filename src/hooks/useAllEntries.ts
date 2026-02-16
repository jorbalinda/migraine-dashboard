import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { DailyEntry } from './useDailyEntry'

export function useAllEntries() {
  const [entries, setEntries] = useState<DailyEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('daily_entries')
      .select('*')
      .order('date', { ascending: true })
      .then(({ data }) => {
        setEntries(data ?? [])
        setLoading(false)
      })
  }, [])

  return { entries, loading }
}
