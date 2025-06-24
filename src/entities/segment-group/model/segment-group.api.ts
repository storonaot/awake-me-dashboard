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
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore'
import { db } from '@/shared/libs/firebase'
import { SEGMENT_GROUPS_COLLECTION_NAME, SEGMENT_GROUP_FIELDS } from './constants'
import type { SegmentGroup, NewSegmentGroup } from './types'
import type { Nullable } from '@/shared/utils/utility-types'
import { FieldValue } from 'firebase/firestore'
import { withApiErrorHandling } from '@/shared/libs/error-handling'

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
    date: Timestamp.fromDate(new Date(date)),
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
  const tsDate = Timestamp.fromDate(new Date(date))

  const q = query(
    collection(db, SEGMENT_GROUPS_COLLECTION_NAME),
    where(SEGMENT_GROUP_FIELDS.projectId, '==', projectId),
    where(SEGMENT_GROUP_FIELDS.date, '==', tsDate)
  )

  return withApiErrorHandling(async () => {
    const snapshot = await getDocs(q)

    if (snapshot.empty) return null
    if (snapshot.size > 1) throw new Error('Найдено несколько групп на одну дату и проект')

    const docData = snapshot.docs[0].data()
    return {
      id: snapshot.docs[0].id,
      ...docData,
      createdAt: docData.createdAt?.toDate(),
    } as SegmentGroup
  }, 'getSegmentGroupByProjectAndDateAPI')
}

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

export const getLastSegmentGroupForProjectAPI = async (
  projectId: string,
  beforeDate: string // например: "2025-06-23"
): Promise<SegmentGroup | null> => {
  const ref = collection(db, SEGMENT_GROUPS_COLLECTION_NAME)

  // Переводим строку в Timestamp
  const tsBeforeDate = Timestamp.fromDate(new Date(beforeDate))

  const q = query(
    ref,
    where(SEGMENT_GROUP_FIELDS.projectId, '==', projectId),
    orderBy(SEGMENT_GROUP_FIELDS.date, 'desc'),
    where(SEGMENT_GROUP_FIELDS.date, '<', tsBeforeDate),
    limit(1)
  )

  return withApiErrorHandling(async () => {
    const snapshot = await getDocs(q)

    if (snapshot.empty) return null

    const doc = snapshot.docs[0]
    const data = doc.data()

    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate(),
      date: data.date?.toDate(), // если ты хочешь использовать JS Date на клиенте
    } as SegmentGroup
  }, 'getLastSegmentGroupForProjectAPI')
}

export const getSegmentGroupsInRangeAPI = async (
  projectIds: string[],
  start: string, // формат yyyy-MM-dd
  end: string
): Promise<SegmentGroup[]> => {
  const ref = collection(db, SEGMENT_GROUPS_COLLECTION_NAME)

  const startTimestamp = Timestamp.fromDate(new Date(start))
  const endTimestamp = Timestamp.fromDate(new Date(end))

  const q = query(
    ref,
    where('projectId', 'in', projectIds),
    where('date', '>=', startTimestamp),
    where('date', '<=', endTimestamp)
  )

  return withApiErrorHandling(async () => {
    const snapshot = await getDocs(q)

    return snapshot.docs.map(
      doc =>
        ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
          date: doc.data().date?.toDate(),
        }) as SegmentGroup
    )
  }, 'getSegmentGroupsInRangeAPI')
}
