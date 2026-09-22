/* eslint-disable react-hooks/set-state-in-effect */
/**
 * TaskFormModal Component
 * Modal dialog for creating and editing tasks with client-side validation
 */

import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task, TaskPriority, TaskStatus } from '@/models/Task';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { validateTaskInput } from '@/utils/formatters';

interface TaskFormModalProps {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    dueDate?: string | null;
  }) => Promise<void>;
}

const STATUS_OPTIONS: { key: TaskStatus; label: string }[] = [
  { key: 'TODO', label: 'To Do' },
  { key: 'IN_PROGRESS', label: 'In Progress' },
  { key: 'DONE', label: 'Done' },
];

const PRIORITY_OPTIONS: { key: TaskPriority; label: string }[] = [
  { key: 'LOW', label: 'Low' },
  { key: 'MEDIUM', label: 'Medium' },
  { key: 'HIGH', label: 'High' },
];

export const TaskFormModal: React.FC<TaskFormModalProps> = ({
  visible,
  task,
  onClose,
  onSubmit,
}) => {
  const isDark = useColorScheme() === 'dark';
  const theme = isDark ? colors.dark : colors.light;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('TODO');
  const [priority, setPriority] = useState<TaskPriority>('MEDIUM');
  const [dueDate, setDueDate] = useState('');
  const [titleError, setTitleError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync state when task prop changes (Edit mode vs Create mode)
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setStatus(task.status);
      setPriority(task.priority);
      setDueDate(task.dueDate || '');
    } else {
      setTitle('');
      setDescription('');
      setStatus('TODO');
      setPriority('MEDIUM');
      // Default due date: tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDueDate(tomorrow.toISOString().split('T')[0]);
    }
    setTitleError(undefined);
  }, [task, visible]);

  const handleTitleChange = (text: string) => {
    setTitle(text);
    if (titleError) {
      const validation = validateTaskInput(text);
      if (validation.isValid) {
        setTitleError(undefined);
      }
    }
  };

  const handleSetQuickDate = (daysAhead: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    setDueDate(d.toISOString().split('T')[0]);
  };

  const handleSubmit = async () => {
    const validation = validateTaskInput(title);
    if (!validation.isValid) {
      setTitleError(validation.error);
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit({
        title: title.trim(),
        description: description.trim() || undefined,
        status,
        priority,
        dueDate: dueDate.trim() || null,
      });
      onClose();
    } catch (err) {
      console.error('[TaskFormModal] Submit error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEditMode = Boolean(task);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.backdrop}
      >
        <TouchableOpacity
          style={styles.dismissOverlay}
          activeOpacity={1}
          onPress={onClose}
        />

        <View style={[styles.modalCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: theme.border }]}>
            <View>
              <Text style={[styles.modalTitle, { color: theme.text }]}>
                {isEditMode ? 'Edit Task' : 'Create New Task'}
              </Text>
              <Text style={[styles.modalSubtitle, { color: theme.textSecondary }]}>
                {isEditMode ? 'Update task details and status' : 'Add a new task to Cloud Firestore'}
              </Text>
            </View>

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close-circle-outline" size={26} color={theme.textMuted} />
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <ScrollView
            style={styles.formBody}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {/* Title Input with Validation */}
            <Input
              label="Title *"
              placeholder="e.g. Implement user profile screen"
              value={title}
              onChangeText={handleTitleChange}
              error={titleError}
              autoFocus={!isEditMode}
            />

            {/* Description Input */}
            <Input
              label="Description (Optional)"
              placeholder="Provide context, acceptance criteria, or notes..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
              style={{ height: 80, textAlignVertical: 'top' }}
            />

            {/* Status Selector */}
            <View style={styles.fieldSection}>
              <Text style={[styles.fieldLabel, { color: theme.textSecondary }]}>Status</Text>
              <View style={styles.segmentGroup}>
                {STATUS_OPTIONS.map(opt => {
                  const selected = status === opt.key;
                  return (
                    <TouchableOpacity
                      key={opt.key}
                      style={[
                        styles.segmentButton,
                        {
                          backgroundColor: selected
                            ? theme.primary
                            : isDark
                            ? '#1E293B'
                            : '#F1F5F9',
                        },
                      ]}
                      onPress={() => setStatus(opt.key)}
                    >
                      <Text
                        style={[
                          styles.segmentText,
                          { color: selected ? '#FFFFFF' : theme.text },
                        ]}
                      >
                        {opt.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Priority Selector */}
            <View style={styles.fieldSection}>
              <Text style={[styles.fieldLabel, { color: theme.textSecondary }]}>Priority</Text>
              <View style={styles.segmentGroup}>
                {PRIORITY_OPTIONS.map(opt => {
                  const selected = priority === opt.key;
                  return (
                    <TouchableOpacity
                      key={opt.key}
                      style={[
                        styles.segmentButton,
                        {
                          backgroundColor: selected
                            ? opt.key === 'HIGH'
                              ? theme.danger
                              : opt.key === 'MEDIUM'
                              ? theme.warning
                              : theme.primary
                            : isDark
                            ? '#1E293B'
                            : '#F1F5F9',
                        },
                      ]}
                      onPress={() => setPriority(opt.key)}
                    >
                      <Text
                        style={[
                          styles.segmentText,
                          { color: selected ? '#FFFFFF' : theme.text },
                        ]}
                      >
                        {opt.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Due Date with Quick Selectors */}
            <View style={styles.fieldSection}>
              <Text style={[styles.fieldLabel, { color: theme.textSecondary }]}>Due Date (YYYY-MM-DD)</Text>
              <Input
                placeholder="YYYY-MM-DD (e.g. 2026-09-25)"
                value={dueDate}
                onChangeText={setDueDate}
                containerStyle={{ marginBottom: 8 }}
              />
              <View style={styles.quickDateRow}>
                <TouchableOpacity
                  style={[styles.quickDatePill, { backgroundColor: isDark ? '#1E293B' : '#F1F5F9' }]}
                  onPress={() => handleSetQuickDate(0)}
                >
                  <Text style={[styles.quickDateText, { color: theme.textSecondary }]}>Today</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.quickDatePill, { backgroundColor: isDark ? '#1E293B' : '#F1F5F9' }]}
                  onPress={() => handleSetQuickDate(1)}
                >
                  <Text style={[styles.quickDateText, { color: theme.textSecondary }]}>Tomorrow</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.quickDatePill, { backgroundColor: isDark ? '#1E293B' : '#F1F5F9' }]}
                  onPress={() => handleSetQuickDate(7)}
                >
                  <Text style={[styles.quickDateText, { color: theme.textSecondary }]}>Next Week</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          {/* Action Footer */}
          <View style={[styles.modalFooter, { borderTopColor: theme.border }]}>
            <Button
              title="Cancel"
              variant="outline"
              onPress={onClose}
              style={{ flex: 1 }}
              disabled={isSubmitting}
            />
            <Button
              title={isEditMode ? 'Save Changes' : 'Create Task'}
              variant="primary"
              onPress={handleSubmit}
              loading={isSubmitting}
              style={{ flex: 1 }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  dismissOverlay: {
    flex: 1,
  },
  modalCard: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderBottomWidth: 0,
    maxHeight: '90%',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  modalTitle: {
    ...typography.h2,
    fontSize: 20,
  },
  modalSubtitle: {
    ...typography.caption,
    marginTop: 2,
  },
  closeButton: {
    padding: 4,
  },
  formBody: {
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingVertical: 16,
  },
  fieldSection: {
    marginBottom: 16,
  },
  fieldLabel: {
    ...typography.caption,
    fontWeight: '600',
    marginBottom: 8,
  },
  segmentGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentText: {
    ...typography.caption,
    fontWeight: '600',
  },
  quickDateRow: {
    flexDirection: 'row',
    gap: 8,
  },
  quickDatePill: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  quickDateText: {
    ...typography.caption,
    fontSize: 12,
    fontWeight: '500',
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
  },
});

export default TaskFormModal;
