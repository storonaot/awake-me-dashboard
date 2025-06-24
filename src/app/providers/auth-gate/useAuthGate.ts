import { useEffect, useState } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '@/shared/libs/firebase'
import type { Nullable } from '@/shared/utils/utility-types'

export const useAuthGate = () => {
  const [user, setUser] = useState<Nullable<User>>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, firebaseUser => {
      setUser(firebaseUser)
      setIsLoading(false)
    })

    return () => unsub()
  }, [])

  return { user, isLoading }
}
