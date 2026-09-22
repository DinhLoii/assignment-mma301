/**
 * EmptyState UI Component
 * Illustrated empty state with action to seed sample tasks or create a new task
 */

import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { Button } from '@/components/common/Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onCreatePress?: () => void;
  onSeedPress?: () => void;
  isSeeding?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No tasks found',
  description = 'Get started by creating a new task or seed sample data for testing.',
  onCreatePress,
  onSeedPress,
  isSeeding = false,
}) => {
  const isDark = useColorScheme() === 'dark';
  const theme = isDark ? colors.dark : colors.light;

  return (
    <View style={styles.container}>
      <View style={[styles.iconCircle, { backgroundColor: isDark ? '#1E293B' : '#EEF2FF' }]}>
        <Ionicons name="checkbox-outline" size={44} color={theme.primary} />
      </View>

      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      <Text style={[styles.description, { color: theme.textSecondary }]}>{description}</Text>

      <View style={styles.actions}>
        {onCreatePress ? (
          <Button
            title="Create First Task"
            onPress={onCreatePress}
            icon={<Ionicons name="add-circle-outline" size={18} color="#FFFFFF" />}
            size="md"
          />
        ) : null}

        {onSeedPress ? (
          <Button
            title="Seed Sample Tasks"
            variant="outline"
            onPress={onSeedPress}
            loading={isSeeding}
            icon={<Ionicons name="cloud-download-outline" size={18} color={theme.text} />}
            size="md"
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    ...typography.h3,
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    ...typography.body,
    textAlign: 'center',
    maxWidth: 320,
    marginBottom: 24,
  },
  actions: {
    flexDirection: 'column',
    gap: 12,
    width: '100%',
    maxWidth: 240,
  },
});

export default EmptyState;
