/**
 * TaskCard Component
 * Interactive task item card displaying task metadata, status, and action buttons (Edit, Delete, Toggle)
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '@/models/Task';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { StatusBadge } from './StatusBadge';
import { PriorityChip } from './PriorityChip';
import { getRelativeDueLabel } from '@/utils/formatters';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const theme = isDark ? colors.dark : colors.light;

  const dueInfo = getRelativeDueLabel(task.dueDate);

  const handleDeletePress = () => {
    Alert.alert(
      'Delete Task',
      `Are you sure you want to delete "${task.title}"? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(task.id),
        },
      ],
      { cancelable: true },
    );
  };

  const isDone = task.status === 'DONE';

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.cardBorder,
        },
      ]}
    >
      {/* Header Row: Status Badge & Priority Chip & Fast Toggle */}
      <View style={styles.headerRow}>
        <View style={styles.badgesGroup}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => onToggleStatus(task)}>
            <StatusBadge status={task.status} />
          </TouchableOpacity>
          <PriorityChip priority={task.priority} />
        </View>

        {/* Action Buttons: Edit and Delete */}
        <View style={styles.actionsGroup}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.iconButton, { backgroundColor: isDark ? '#1E293B' : '#F1F5F9' }]}
            onPress={() => onEdit(task)}
            accessibilityLabel="Edit task"
          >
            <Ionicons name="pencil-outline" size={16} color={theme.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.iconButton, { backgroundColor: isDark ? '#2D1515' : '#FFF1F2' }]}
            onPress={handleDeletePress}
            accessibilityLabel="Delete task"
          >
            <Ionicons name="trash-outline" size={16} color={theme.danger} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Title */}
      <TouchableOpacity activeOpacity={0.8} onPress={() => onToggleStatus(task)}>
        <Text
          style={[
            styles.title,
            {
              color: isDone ? theme.textMuted : theme.text,
              textDecorationLine: isDone ? 'line-through' : 'none',
            },
          ]}
          numberOfLines={2}
        >
          {task.title}
        </Text>
      </TouchableOpacity>

      {/* Description */}
      {task.description ? (
        <Text
          style={[styles.description, { color: theme.textSecondary }]}
          numberOfLines={3}
        >
          {task.description}
        </Text>
      ) : null}

      {/* Footer: Due Date & Fast Status Button */}
      <View style={[styles.footer, { borderTopColor: isDark ? '#1E293B' : '#F1F5F9' }]}>
        <View style={styles.dueDateContainer}>
          <Ionicons
            name="calendar-outline"
            size={14}
            color={dueInfo.isOverdue ? theme.danger : theme.textMuted}
          />
          <Text
            style={[
              styles.dueDateText,
              { color: dueInfo.isOverdue ? theme.danger : theme.textMuted },
            ]}
          >
            {dueInfo.label}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.toggleButton,
            {
              backgroundColor: isDone ? theme.statusDoneBg : theme.primaryLight,
            },
          ]}
          onPress={() => onToggleStatus(task)}
        >
          <Ionicons
            name={isDone ? 'checkmark-done-outline' : 'arrow-forward-outline'}
            size={13}
            color={isDone ? theme.statusDone : theme.primary}
          />
          <Text
            style={[
              styles.toggleText,
              { color: isDone ? theme.statusDone : theme.primary },
            ]}
          >
            {isDone ? 'Completed' : task.status === 'IN_PROGRESS' ? 'Mark Done' : 'Start Task'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  badgesGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...typography.h3,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    marginBottom: 6,
  },
  description: {
    ...typography.body,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: 10,
    marginTop: 4,
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dueDateText: {
    ...typography.caption,
    fontSize: 12,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 14,
    gap: 4,
  },
  toggleText: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '600',
  },
});

export default TaskCard;
