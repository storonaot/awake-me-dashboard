import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  deleteDoc,
  where,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '@/shared/libs/firebase'
import { SEGMENT_GROUPS_COLLECTION_NAME, SEGMENT_GROUP_FIELDS } from './constants'
import type { SegmentGroup, NewSegmentGroup } from './types'
import type { Nullable } from '@/shared/utils/utility-types'

type AddSegmentGroupParams = {
  projectId: SegmentGroup['projectId']
  date: SegmentGroup['date']
  label?: SegmentGroup['label']
  total?: SegmentGroup['total']
}

export const addSegmentGroupAPI = async ({
  projectId,
  date,
  label,
  total,
}: AddSegmentGroupParams): Promise<string> => {
  const ref = collection(db, SEGMENT_GROUPS_COLLECTION_NAME)

  const newGroup = {
    projectId,
    date,
    label: label ?? null, // если label не передан, сохраняем null
    total: total || 0,
    completed: 0,
    createdAt: serverTimestamp(),
  }

  const docRef = await addDoc(ref, newGroup)

  return docRef.id
}

export const getSegmentGroupByProjectAndDateAPI = async (
  projectId: string,
  date: string
): Promise<Nullable<SegmentGroup>> => {
  const q = query(
    collection(db, SEGMENT_GROUPS_COLLECTION_NAME),
    where(SEGMENT_GROUP_FIELDS.projectId, '==', projectId),
    where(SEGMENT_GROUP_FIELDS.date, '==', date)
  )
  const snapshot = await getDocs(q)

  if (snapshot.empty) return null
  if (snapshot.size > 1) throw new Error('Найдено несколько групп на одну дату и проект')

  const docData = snapshot.docs[0].data()
  return {
    id: snapshot.docs[0].id,
    ...docData,
    createdAt: docData.createdAt?.toDate(),
  } as SegmentGroup
}

import { FieldValue } from 'firebase/firestore'

type CleanedUpdates = {
  [key: string]: FieldValue | string | number | boolean | null
}

export const updateSegmentGroupAPI = async (
  id: string,
  updates: Partial<NewSegmentGroup>
): Promise<void> => {
  const ref = doc(db, SEGMENT_GROUPS_COLLECTION_NAME, id)

  // Подчищаем обновления:
  const cleanedUpdates: CleanedUpdates = {}

  for (const [key, value] of Object.entries(updates)) {
    if (value === undefined) continue
    if (key === 'label' && value === '') {
      cleanedUpdates[key] = null
    } else {
      cleanedUpdates[key] = value as string | number | boolean | FieldValue | null
    }
  }

  await updateDoc(ref, cleanedUpdates)
}

export const deleteSegmentGroupAPI = async (id: string): Promise<void> => {
  const ref = doc(db, SEGMENT_GROUPS_COLLECTION_NAME, id)
  await deleteDoc(ref)
}
