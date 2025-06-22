// entities/segment/segment.api.ts
import { db } from '@/shared/libs/firebase'
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
  type PartialWithFieldValue,
  doc,
  updateDoc,
} from 'firebase/firestore'
import type { NewSegment, Segment } from './types'
import { SEGMENT_FIELDS, SEGMENTS_COLLECTION_NAME } from './constants'

const DEFAULT_SEGMENT_DURATION = 30

interface AddSegmentsParams {
  projectId: string
  date: string
  label?: string
  duration?: number
}

export const addSegmentAPI = async ({
  projectId,
  date,
  label,
  duration,
}: AddSegmentsParams): Promise<string> => {
  const newSegment: NewSegment = {
    projectId,
    date,
    label: label || null,
    isCompleted: false,
    createdAt: serverTimestamp(),
    duration: duration || DEFAULT_SEGMENT_DURATION,
  }

  const docRef = await addDoc(collection(db, SEGMENTS_COLLECTION_NAME), newSegment)

  return docRef.id
}

interface GetSegmentsParams {
  projectId: string
  date: string // формат ISO: '2025-06-20', например
}

export const getSegmentsAPI = async ({
  projectId,
  date,
}: GetSegmentsParams): Promise<Segment[]> => {
  const q = query(
    collection(db, SEGMENTS_COLLECTION_NAME),
    where(SEGMENT_FIELDS.projectId, '==', projectId),
    where(SEGMENT_FIELDS.date, '==', date)
  )

  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Segment, 'id'>),
  }))
}

export const updateSegmentAPI = async (
  id: string,
  updates: PartialWithFieldValue<Segment>
): Promise<void> => {
  const ref = doc(db, 'segments', id)
  await updateDoc(ref, updates)
}
