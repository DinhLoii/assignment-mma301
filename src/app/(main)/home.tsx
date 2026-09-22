/**
 * Home Screen - Task Management CRUD (No Authentication)
 * Practical Exam 1 Core Feature
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
  Alert,
  useColorScheme,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { useTasks } from '@/hooks/useTasks';
import { TaskCard } from '@/components/ui/TaskCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { TaskFormModal } from '@/components/tasks/TaskFormModal';
import { TaskFilterBar } from '@/components/tasks/TaskFilterBar';
import { TaskStats } from '@/components/tasks/TaskStats';
import { isFirebaseConfigured } from '@/config/env';

export default function HomeScreen() {
  const isDark = useColorScheme() === 'dark';
  const theme = isDark ? colors.dark : colors.light;

  const {
    tasks,
    allTasks,
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
  } = useTasks();

  const [isSeeding, setIsSeeding] = useState(false);
  const isConnectedToFirebase = isFirebaseConfigured();

  const handleSeedTasks = async () => {
    try {
      setIsSeeding(true);
      const count = await seedSampleTasks();
      Alert.alert(
        'Success',
        `Successfully seeded ${count} sample tasks into Firestore!`,
      );
    } catch (err: any) {
      Alert.alert('Seed Error', err.message || 'Failed to seed sample data');
    } finally {
      setIsSeeding(false);
    }
  };

  const handleFormSubmit = async (data: {
    title: string;
    description?: string;
    status?: any;
    priority?: any;
    dueDate?: string | null;
  }) => {
    if (selectedTask) {
      await updateTask(selectedTask.id, data);
    } else {
      await createTask(data);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={styles.responsiveContainer}>
        {/* FlatList with Task items & Pull-to-refresh */}
        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={refresh}
              tintColor={theme.primary}
              colors={[theme.primary]}
            />
          }
          ListHeaderComponent={
            <View>
              {/* App Header Section */}
              <View style={styles.header}>
                <View style={styles.headerTitleRow}>
                  <View>
                    <Text style={[styles.appName, { color: theme.text }]}>TaskFlow</Text>
                    <Text style={[styles.appSubtitle, { color: theme.textSecondary }]}>
                      Cloud Firestore Task Management
                    </Text>
                  </View>

                  {/* Top Action: New Task Button */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.createTopButton, { backgroundColor: theme.primary }]}
                    onPress={openCreateModal}
                  >
                    <Ionicons name="add" size={20} color="#FFFFFF" />
                    <Text style={styles.createTopButtonText}>Create Task</Text>
                  </TouchableOpacity>
                </View>

                {/* Connection Status Badge */}
                <View style={styles.statusBannerRow}>
                  <View
                    style={[
                      styles.connectionBadge,
                      {
                        backgroundColor: isConnectedToFirebase
                          ? theme.statusDoneBg
                          : theme.statusInProgressBg,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.statusDot,
                        {
                          backgroundColor: isConnectedToFirebase
                            ? theme.statusDone
                            : theme.statusInProgress,
                        },
                      ]}
                    />
                    <Text
                      style={[
                        styles.connectionText,
                        {
                          color: isConnectedToFirebase
                            ? theme.statusDone
                            : theme.statusInProgress,
                        },
                      ]}
                    >
                      {isConnectedToFirebase
                        ? 'Connected to Cloud Firestore (Real-time)'
                        : 'Running in Fallback Demo Mode'}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Error Banner if any */}
              {error ? (
                <View style={[styles.errorBanner, { backgroundColor: theme.dangerBg }]}>
                  <Ionicons name="alert-circle" size={18} color={theme.danger} />
                  <Text style={[styles.errorText, { color: theme.danger }]}>{error}</Text>
                </View>
              ) : null}

              {/* Task Metrics & Progress Summary */}
              <TaskStats
                total={stats.total}
                todo={stats.todo}
                inProgress={stats.inProgress}
                done={stats.done}
              />

              {/* Search and Status Filters */}
              <TaskFilterBar
                selectedFilter={statusFilter}
                onSelectFilter={setStatusFilter}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                counts={{
                  total: allTasks.length,
                  todo: stats.todo,
                  inProgress: stats.inProgress,
                  done: stats.done,
                }}
              />
            </View>
          }
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              onEdit={openEditModal}
              onDelete={deleteTask}
              onToggleStatus={toggleTaskStatus}
            />
          )}
          ListEmptyComponent={
            !isLoading ? (
              <EmptyState
                title={searchQuery || statusFilter !== 'ALL' ? 'No matching tasks' : 'No tasks created yet'}
                description={
                  searchQuery || statusFilter !== 'ALL'
                    ? 'Try adjusting your search query or switching status filters.'
                    : 'Your Firestore tasks collection is currently empty. Create your first task or seed sample data.'
                }
                onCreatePress={openCreateModal}
                onSeedPress={handleSeedTasks}
                isSeeding={isSeeding}
              />
            ) : null
          }
        />

        {/* Floating Action Button (FAB) */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.fab, { backgroundColor: theme.primary }]}
          onPress={openCreateModal}
          accessibilityLabel="Create task"
        >
          <Ionicons name="add" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Create & Edit Modal */}
      <TaskFormModal
        visible={isModalOpen}
        task={selectedTask}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  responsiveContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 800,
    alignSelf: 'center',
    position: 'relative',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 16 : 8,
    paddingBottom: 90,
  },
  header: {
    marginBottom: 16,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  appName: {
    ...typography.h1,
    fontSize: 26,
  },
  appSubtitle: {
    ...typography.caption,
    fontSize: 13,
    marginTop: 2,
  },
  createTopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  createTopButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  statusBannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  connectionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    gap: 6,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  connectionText: {
    fontSize: 11,
    fontWeight: '600',
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  errorText: {
    ...typography.caption,
    fontWeight: '600',
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});
