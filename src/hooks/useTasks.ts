/**
 * Custom hook for Task Management
 * Encapsulates real-time subscription, computed filters, search, and statistics
 */

import { useEffect, useMemo } from 'react';
import { useTaskStore } from '@/store/useTaskStore';

export function useTasks() {
  const {
    tasks,
    isLoading,
    isRefreshing,
    error,
    statusFilter,
    searchQuery,
    selectedTask,
    isModalOpen,
    subscribe,
    setStatusFilter,
    setSearchQuery,
    openCreateModal,
    openEditModal,
    closeModal,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    refresh,
    seedSampleTasks,
  } = useTaskStore();

  // Setup real-time listener on mount
  useEffect(() => {
    const unsubscribe = subscribe();
    return () => unsubscribe();
  }, [subscribe]);

  // Filter tasks based on status and search query
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // Status filter
      if (statusFilter !== 'ALL' && task.status !== statusFilter) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = task.title.toLowerCase().includes(q);
        const matchDesc = (task.description || '').toLowerCase().includes(q);
        if (!matchTitle && !matchDesc) return false;
      }
      return true;
    });
  }, [tasks, statusFilter, searchQuery]);

  // Statistics counters
  const stats = useMemo(() => {
    const total = tasks.length;
    const todo = tasks.filter(t => t.status === 'TODO').length;
    const inProgress = tasks.filter(t => t.status === 'IN_PROGRESS').length;
    const done = tasks.filter(t => t.status === 'DONE').length;
    return { total, todo, inProgress, done };
  }, [tasks]);

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    stats,
    isLoading,
    isRefreshing,
    error,
    statusFilter,
    searchQuery,
    selectedTask,
    isModalOpen,
    setStatusFilter,
    setSearchQuery,
    openCreateModal,
    openEditModal,
    closeModal,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    refresh,
    seedSampleTasks,
  };
}

export default useTasks;
