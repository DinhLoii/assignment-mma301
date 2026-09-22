/**
 * Zustand Task State Store
 * Manages reactive tasks, filtering, search, and CRUD actions
 */

import { create } from 'zustand';
import { Task, CreateTaskDTO, UpdateTaskDTO, TaskFilterType } from '@/models/Task';
import * as taskApi from '@/api/taskApi';

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  statusFilter: TaskFilterType;
  searchQuery: string;
  selectedTask: Task | null;
  isModalOpen: boolean;

  // Actions
  subscribe: () => () => void;
  setStatusFilter: (filter: TaskFilterType) => void;
  setSearchQuery: (query: string) => void;
  openCreateModal: () => void;
  openEditModal: (task: Task) => void;
  closeModal: () => void;
  createTask: (dto: CreateTaskDTO) => Promise<void>;
  updateTask: (id: string, dto: UpdateTaskDTO) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskStatus: (task: Task) => Promise<void>;
  refresh: () => Promise<void>;
  seedSampleTasks: () => Promise<number>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  isLoading: true,
  isRefreshing: false,
  error: null,
  statusFilter: 'ALL',
  searchQuery: '',
  selectedTask: null,
  isModalOpen: false,

  subscribe: () => {
    set({ isLoading: true, error: null });
    const unsubscribe = taskApi.subscribeTasks(
      tasks => {
        set({ tasks, isLoading: false, isRefreshing: false });
      },
      error => {
        console.error('[useTaskStore] Subscription error:', error);
        set({ error: error.message || 'Failed to sync tasks', isLoading: false, isRefreshing: false });
      },
    );
    return unsubscribe;
  },

  setStatusFilter: filter => set({ statusFilter: filter }),
  setSearchQuery: query => set({ searchQuery: query }),

  openCreateModal: () => set({ selectedTask: null, isModalOpen: true }),
  openEditModal: task => set({ selectedTask: task, isModalOpen: true }),
  closeModal: () => set({ selectedTask: null, isModalOpen: false }),

  createTask: async dto => {
    try {
      set({ error: null });
      await taskApi.createTask(dto);
      get().closeModal();
    } catch (error: any) {
      set({ error: error.message || 'Failed to create task' });
      throw error;
    }
  },

  updateTask: async (id, dto) => {
    try {
      set({ error: null });
      await taskApi.updateTask(id, dto);
      get().closeModal();
    } catch (error: any) {
      set({ error: error.message || 'Failed to update task' });
      throw error;
    }
  },

  deleteTask: async id => {
    try {
      set({ error: null });
      await taskApi.deleteTask(id);
    } catch (error: any) {
      set({ error: error.message || 'Failed to delete task' });
      throw error;
    }
  },

  toggleTaskStatus: async task => {
    const nextStatus = task.status === 'TODO' ? 'IN_PROGRESS' : task.status === 'IN_PROGRESS' ? 'DONE' : 'TODO';
    try {
      await taskApi.updateTask(task.id, { status: nextStatus });
    } catch (error: any) {
      console.error('[useTaskStore] Failed to toggle status:', error);
    }
  },

  refresh: async () => {
    set({ isRefreshing: true });
    // In Firestore, onSnapshot is always fresh, but pulling triggers refresh visual
    setTimeout(() => {
      set({ isRefreshing: false });
    }, 600);
  },

  seedSampleTasks: async () => {
    try {
      set({ isLoading: true });
      const count = await taskApi.seedSampleTasks();
      set({ isLoading: false });
      return count;
    } catch (error: any) {
      set({ error: error.message || 'Failed to seed sample tasks', isLoading: false });
      throw error;
    }
  },
}));
