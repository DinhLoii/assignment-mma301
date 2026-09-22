/**
 * StatusBadge Component
 * Displays task status with color code and icon
 */

import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TaskStatus } from '@/models/Task';
import { getStatusLabel, getStatusColors, STATUS_MAP } from '@/utils/formatters';
import { typography } from '@/theme/typography';

interface StatusBadgeProps {
  status: TaskStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm' }) => {
  const isDark = useColorScheme() === 'dark';
  const { text, bg } = getStatusColors(status, isDark);
  const iconName = STATUS_MAP[status]?.icon as any;

  const isSmall = size === 'sm';

  return (
    <View style={[styles.badge, { backgroundColor: bg, paddingVertical: isSmall ? 3 : 5, paddingHorizontal: isSmall ? 8 : 12 }]}>
      <Ionicons name={iconName} size={isSmall ? 12 : 14} color={text} style={styles.icon} />
      <Text style={[styles.text, { color: text, fontSize: isSmall ? 11 : 12 }]}>
        {getStatusLabel(status)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: 4,
  },
  text: {
    ...typography.badge,
    fontWeight: '700',
  },
});

export default StatusBadge;
