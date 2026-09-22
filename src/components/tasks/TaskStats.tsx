/**
 * TaskStats Component
 * Visual dashboard overview showing task metrics and completion progress
 */

import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

interface TaskStatsProps {
  total: number;
  todo: number;
  inProgress: number;
  done: number;
}

export const TaskStats: React.FC<TaskStatsProps> = ({ total, todo, inProgress, done }) => {
  const isDark = useColorScheme() === 'dark';
  const theme = isDark ? colors.dark : colors.light;

  const percentComplete = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <View style={[styles.container, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
      {/* Top row: Progress indicator */}
      <View style={styles.topRow}>
        <View style={styles.progressInfo}>
          <Text style={[styles.progressTitle, { color: theme.text }]}>Task Progress</Text>
          <Text style={[styles.progressSubtitle, { color: theme.textSecondary }]}>
            {done} of {total} completed
          </Text>
        </View>
        <View style={[styles.percentBadge, { backgroundColor: theme.primaryLight }]}>
          <Text style={[styles.percentText, { color: theme.primary }]}>{percentComplete}%</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={[styles.progressBarTrack, { backgroundColor: isDark ? '#1E293B' : '#F1F5F9' }]}>
        <View
          style={[
            styles.progressBarFill,
            {
              backgroundColor: theme.primary,
              width: `${percentComplete}%`,
            },
          ]}
        />
      </View>

      {/* Metric Counters Grid */}
      <View style={styles.metricsGrid}>
        <View style={styles.metricItem}>
          <View style={styles.metricLabelRow}>
            <View style={[styles.dot, { backgroundColor: theme.statusTodo }]} />
            <Text style={[styles.metricLabel, { color: theme.textSecondary }]}>To Do</Text>
          </View>
          <Text style={[styles.metricValue, { color: theme.text }]}>{todo}</Text>
        </View>

        <View style={styles.metricItem}>
          <View style={styles.metricLabelRow}>
            <View style={[styles.dot, { backgroundColor: theme.statusInProgress }]} />
            <Text style={[styles.metricLabel, { color: theme.textSecondary }]}>In Progress</Text>
          </View>
          <Text style={[styles.metricValue, { color: theme.text }]}>{inProgress}</Text>
        </View>

        <View style={styles.metricItem}>
          <View style={styles.metricLabelRow}>
            <View style={[styles.dot, { backgroundColor: theme.statusDone }]} />
            <Text style={[styles.metricLabel, { color: theme.textSecondary }]}>Done</Text>
          </View>
          <Text style={[styles.metricValue, { color: theme.text }]}>{done}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressInfo: {
    flex: 1,
  },
  progressTitle: {
    ...typography.h3,
    fontSize: 16,
  },
  progressSubtitle: {
    ...typography.caption,
    marginTop: 2,
  },
  percentBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  percentText: {
    fontSize: 13,
    fontWeight: '700',
  },
  progressBarTrack: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 14,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(150, 150, 150, 0.1)',
    paddingTop: 10,
  },
  metricItem: {
    alignItems: 'flex-start',
  },
  metricLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 2,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  metricLabel: {
    ...typography.caption,
    fontSize: 11,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
  },
});

export default TaskStats;
