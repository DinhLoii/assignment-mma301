/**
 * Formatting and Helper Utilities
 */

import { colors } from '@/theme/colors';

export type TaskStatusKey = 'TODO' | 'IN_PROGRESS' | 'DONE';
export type TaskPriorityKey = 'LOW' | 'MEDIUM' | 'HIGH';

export const STATUS_MAP: Record<TaskStatusKey, { label: string; icon: string }> = {
  TODO: { label: 'To Do', icon: 'time-outline' },
  IN_PROGRESS: { label: 'In Progress', icon: 'sync-outline' },
  DONE: { label: 'Done', icon: 'checkmark-circle-outline' },
};

export const PRIORITY_MAP: Record<TaskPriorityKey, { label: string; icon: string }> = {
  LOW: { label: 'Low', icon: 'arrow-down-outline' },
  MEDIUM: { label: 'Medium', icon: 'remove-outline' },
  HIGH: { label: 'High', icon: 'arrow-up-outline' },
};

export function getStatusLabel(status: TaskStatusKey): string {
  return STATUS_MAP[status]?.label ?? status;
}

export function getPriorityLabel(priority: TaskPriorityKey): string {
  return PRIORITY_MAP[priority]?.label ?? priority;
}

export function getStatusColors(status: TaskStatusKey, isDark: boolean = false) {
  const theme = isDark ? colors.dark : colors.light;
  switch (status) {
    case 'DONE':
      return { text: theme.statusDone, bg: theme.statusDoneBg };
    case 'IN_PROGRESS':
      return { text: theme.statusInProgress, bg: theme.statusInProgressBg };
    case 'TODO':
    default:
      return { text: theme.statusTodo, bg: theme.statusTodoBg };
  }
}

export function getPriorityColors(priority: TaskPriorityKey, isDark: boolean = false) {
  const theme = isDark ? colors.dark : colors.light;
  switch (priority) {
    case 'HIGH':
      return { text: theme.priorityHigh, bg: theme.priorityHighBg };
    case 'MEDIUM':
      return { text: theme.priorityMedium, bg: theme.priorityMediumBg };
    case 'LOW':
    default:
      return { text: theme.priorityLow, bg: theme.priorityLowBg };
  }
}

export function formatDate(dateString?: string | number | null): string {
  if (!dateString) return 'No due date';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return String(dateString);
    
    // Format YYYY-MM-DD to readable date
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return String(dateString);
  }
}

export function getRelativeDueLabel(dueDate?: string | null): { label: string; isOverdue: boolean } {
  if (!dueDate) return { label: 'No due date', isOverdue: false };
  try {
    const due = new Date(dueDate);
    if (isNaN(due.getTime())) return { label: dueDate, isOverdue: false };
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    
    const diffDays = Math.round((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { label: `${Math.abs(diffDays)}d overdue`, isOverdue: true };
    }
    if (diffDays === 0) {
      return { label: 'Due today', isOverdue: false };
    }
    if (diffDays === 1) {
      return { label: 'Due tomorrow', isOverdue: false };
    }
    return { label: formatDate(dueDate), isOverdue: false };
  } catch {
    return { label: formatDate(dueDate), isOverdue: false };
  }
}

export function validateTaskInput(title: string): { isValid: boolean; error?: string } {
  const trimmed = title.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Task title is required' };
  }
  if (trimmed.length < 3) {
    return { isValid: false, error: 'Title must be at least 3 characters' };
  }
  if (trimmed.length > 100) {
    return { isValid: false, error: 'Title cannot exceed 100 characters' };
  }
  return { isValid: true };
}
