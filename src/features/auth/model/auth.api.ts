import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '@/shared/libs/firebase'

export const login = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password)

export const logout = () => signOut(auth)
