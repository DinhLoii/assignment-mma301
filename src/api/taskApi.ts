/**
 * Task Data Access Layer (Cloud Firestore + Safe In-Memory Fallback)
 * Practical Exam 1 - CRUD Operations with Real-Time Listeners (onSnapshot)
 */

import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  Unsubscribe,
  Timestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { CreateTaskDTO, Task, UpdateTaskDTO } from '@/models/Task';

const TASKS_COLLECTION = 'tasks';

/**
 * Initial sample tasks conforming to Exam 1 requirements:
 * id, title, description, status, priority, dueDate, createdAt, teamId, assigneeId
 */
export const INITIAL_SAMPLE_TASKS: Omit<Task, 'id'>[] = [
  {
    title: 'Setup Expo React Native Project & Git Repository',
    description: 'Scaffold project with TypeScript, configure ESLint & Prettier, and commit to GitHub.',
    status: 'DONE',
    priority: 'HIGH',
    dueDate: '2026-09-23',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    teamId: null,
    assigneeId: null,
  },
  {
    title: 'Connect App to Firebase Cloud Firestore',
    description: 'Install Firebase SDK, configure services/firebase.ts, and set up tasks collection in Firestore.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    dueDate: '2026-09-24',
    createdAt: Date.now() - 1000 * 60 * 60 * 12,
    teamId: null,
    assigneeId: null,
  },
  {
    title: 'Implement Public Task CRUD Screen on Home',
    description: 'Build Create, Read (real-time onSnapshot), Update, and Delete features with no login required.',
    status: 'TODO',
    priority: 'MEDIUM',
    dueDate: '2026-09-25',
    createdAt: Date.now() - 1000 * 60 * 60 * 4,
    teamId: null,
    assigneeId: null,
  },
  {
    title: 'Design Responsive Bottom Tabs & Placeholders',
    description: 'Add Home, Teams (coming soon), and Profile (coming soon) navigation for phone & tablet.',
    status: 'TODO',
    priority: 'LOW',
    dueDate: '2026-09-26',
    createdAt: Date.now() - 1000 * 60 * 30,
    teamId: null,
    assigneeId: null,
  },
];

// Fallback in-memory store for demo/offline execution
let inMemoryTasks: Task[] = INITIAL_SAMPLE_TASKS.map((item, index) => ({
  ...item,
  id: `mock-task-${index + 1}`,
}));

type ListenerCallback = (tasks: Task[]) => void;
const memoryListeners: Set<ListenerCallback> = new Set();

function notifyMemoryListeners() {
  const cloned = [...inMemoryTasks].sort((a, b) => {
    const timeA = typeof a.createdAt === 'number' ? a.createdAt : new Date(a.createdAt).getTime();
    const timeB = typeof b.createdAt === 'number' ? b.createdAt : new Date(b.createdAt).getTime();
    return timeB - timeA;
  });
  memoryListeners.forEach(cb => cb(cloned));
}

/**
 * Subscribes to real-time updates from Firestore tasks collection
 * Uses onSnapshot for immediate updates when tasks are created, updated, or deleted
 */
export function subscribeTasks(
  onSuccess: (tasks: Task[]) => void,
  onError?: (error: Error) => void,
): Unsubscribe {
  if (db && isFirebaseConfigured()) {
    try {
      const tasksRef = collection(db, TASKS_COLLECTION);
      const q = query(tasksRef, orderBy('createdAt', 'desc'));

      return onSnapshot(
        q,
        snapshot => {
          const tasks: Task[] = snapshot.docs.map(docSnapshot => {
            const data = docSnapshot.data();
            
            // Format createdAt safely whether Timestamp, number, or string
            let createdAtVal: string | number = Date.now();
            if (data.createdAt instanceof Timestamp) {
              createdAtVal = data.createdAt.toMillis();
            } else if (typeof data.createdAt === 'number' || typeof data.createdAt === 'string') {
              createdAtVal = data.createdAt;
            }

            return {
              id: docSnapshot.id,
              title: data.title || 'Untitled Task',
              description: data.description || '',
              status: data.status || 'TODO',
              priority: data.priority || 'MEDIUM',
              dueDate: data.dueDate || null,
              createdAt: createdAtVal,
              teamId: data.teamId || null,
              assigneeId: data.assigneeId || null,
            };
          });
          onSuccess(tasks);
        },
        error => {
          console.error('[taskApi] Firestore subscription error:', error);
          if (onError) onError(error);
          // Fallback to memory on live network error
          onSuccess(inMemoryTasks);
        },
      );
    } catch (err) {
      console.warn('[taskApi] Query setup failed, falling back to in-memory listener:', err);
    }
  }

  // Fallback in-memory listener
  memoryListeners.add(onSuccess);
  notifyMemoryListeners();

  return () => {
    memoryListeners.delete(onSuccess);
  };
}

/**
 * Creates a new task in Firestore
 */
export async function createTask(dto: CreateTaskDTO): Promise<Task> {
  const newTaskData: Omit<Task, 'id'> = {
    title: dto.title.trim(),
    description: dto.description?.trim() || '',
    status: dto.status || 'TODO',
    priority: dto.priority || 'MEDIUM',
    dueDate: dto.dueDate || null,
    createdAt: Date.now(),
    teamId: dto.teamId || null,
    assigneeId: dto.assigneeId || null,
  };

  if (db && isFirebaseConfigured()) {
    try {
      const docRef = await addDoc(collection(db, TASKS_COLLECTION), newTaskData);
      return { id: docRef.id, ...newTaskData };
    } catch (error) {
      console.error('[taskApi] Failed to create task in Firestore:', error);
      throw error;
    }
  }

  // Fallback in-memory
  const id = `mock-task-${Date.now()}`;
  const created: Task = { id, ...newTaskData };
  inMemoryTasks.unshift(created);
  notifyMemoryListeners();
  return created;
}

/**
 * Updates an existing task by document ID
 */
export async function updateTask(id: string, dto: UpdateTaskDTO): Promise<void> {
  const sanitizedUpdate: Record<string, unknown> = {};
  if (dto.title !== undefined) sanitizedUpdate.title = dto.title.trim();
  if (dto.description !== undefined) sanitizedUpdate.description = dto.description.trim();
  if (dto.status !== undefined) sanitizedUpdate.status = dto.status;
  if (dto.priority !== undefined) sanitizedUpdate.priority = dto.priority;
  if (dto.dueDate !== undefined) sanitizedUpdate.dueDate = dto.dueDate;
  if (dto.teamId !== undefined) sanitizedUpdate.teamId = dto.teamId;
  if (dto.assigneeId !== undefined) sanitizedUpdate.assigneeId = dto.assigneeId;

  if (db && isFirebaseConfigured()) {
    try {
      const taskDocRef = doc(db, TASKS_COLLECTION, id);
      await updateDoc(taskDocRef, sanitizedUpdate);
      return;
    } catch (error) {
      console.error('[taskApi] Failed to update task in Firestore:', error);
      throw error;
    }
  }

  // Fallback in-memory
  inMemoryTasks = inMemoryTasks.map(task =>
    task.id === id ? { ...task, ...sanitizedUpdate } : task,
  );
  notifyMemoryListeners();
}

/**
 * Deletes a task by document ID
 */
export async function deleteTask(id: string): Promise<void> {
  if (db && isFirebaseConfigured()) {
    try {
      const taskDocRef = doc(db, TASKS_COLLECTION, id);
      await deleteDoc(taskDocRef);
      return;
    } catch (error) {
      console.error('[taskApi] Failed to delete task in Firestore:', error);
      throw error;
    }
  }

  // Fallback in-memory
  inMemoryTasks = inMemoryTasks.filter(task => task.id !== id);
  notifyMemoryListeners();
}

/**
 * Seeds initial sample tasks into Firestore
 * Useful for initializing the database to take required exam screenshots
 */
export async function seedSampleTasks(): Promise<number> {
  let count = 0;
  for (const sample of INITIAL_SAMPLE_TASKS) {
    await createTask(sample);
    count++;
  }
  return count;
}
