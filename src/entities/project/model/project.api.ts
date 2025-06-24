import { db } from '@/shared/libs/firebase'
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
  type PartialWithFieldValue,
  QueryConstraint,
} from 'firebase/firestore'
import {
  type GetProjectsOptions,
  type NewProject,
  type Project,
  PROJECTS_COLLECTION_NAME,
  PROJECT_FIELDS,
} from '@/entities/project/model'

import { withApiErrorHandling } from '@/shared/libs/error-handling'

export const addProjectAPI = async (title: string): Promise<string> => {
  const exists = await checkProjectExists(title)

  if (exists) {
    throw new Error('Проект с таким названием уже существует')
  }

  const newProject: NewProject = {
    title,
    isArchived: false,
    isHidden: false,
    createdAt: serverTimestamp(),
  }

  const docRef = await addDoc(collection(db, PROJECTS_COLLECTION_NAME), newProject)

  return docRef.id
}

export const getProjectsAPI = async ({
  includeArchived = false,
  includeHidden = false,
}: GetProjectsOptions = {}): Promise<Project[]> => {
  const constraints: QueryConstraint[] = []

  if (!includeArchived) {
    constraints.push(where(PROJECT_FIELDS.isArchived, '==', false))
  }

  if (!includeHidden) {
    constraints.push(where(PROJECT_FIELDS.isHidden, 'in', [false, null]))
  }

  const q = query(collection(db, PROJECTS_COLLECTION_NAME), ...constraints)

  try {
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toISOString(),
    })) as Project[]
  } catch (error) {
    console.error('getProjectsAPI', error)
    throw new Error('getProjectsAPI ERROR')
  }
}

export const updateProjectAPI = async (
  id: string,
  updates: PartialWithFieldValue<Project>
): Promise<void> => {
  const ref = doc(db, PROJECTS_COLLECTION_NAME, id)
  await updateDoc(ref, updates)
}

export const deleteProjectAPI = async (id: string): Promise<void> => {
  const ref = doc(db, PROJECTS_COLLECTION_NAME, id)
  await deleteDoc(ref)
}

// ——— helpers ———
async function checkProjectExists(title: string) {
  const q = query(
    collection(db, PROJECTS_COLLECTION_NAME),
    where(PROJECT_FIELDS.title, '==', title),
    where(PROJECT_FIELDS.isArchived, '==', false)
  )

  return withApiErrorHandling(async () => {
    const snapshot = await getDocs(q)
    return !snapshot.empty
  }, 'helper checkProjectExists')
}
