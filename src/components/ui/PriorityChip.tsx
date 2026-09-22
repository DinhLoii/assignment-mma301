/**
 * PriorityChip Component
 * Displays task priority level with visual cues
 */

import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TaskPriority } from '@/models/Task';
import { getPriorityLabel, getPriorityColors, PRIORITY_MAP } from '@/utils/formatters';
import { typography } from '@/theme/typography';

interface PriorityChipProps {
  priority: TaskPriority;
}

export const PriorityChip: React.FC<PriorityChipProps> = ({ priority }) => {
  const isDark = useColorScheme() === 'dark';
  const { text, bg } = getPriorityColors(priority, isDark);
  const iconName = PRIORITY_MAP[priority]?.icon as any;

  return (
    <View style={[styles.chip, { backgroundColor: bg }]}>
      <Ionicons name={iconName} size={12} color={text} style={styles.icon} />
      <Text style={[styles.text, { color: text }]}>{getPriorityLabel(priority)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: 3,
  },
  text: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '600',
  },
});

export default PriorityChip;
