/**
 * Teams Placeholder Screen
 * Functional Requirement: Coming soon placeholder for Practical Exam 2
 */

import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

export default function TeamsScreen() {
  const isDark = useColorScheme() === 'dark';
  const theme = isDark ? colors.dark : colors.light;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={styles.container}>
        <View style={[styles.iconCircle, { backgroundColor: theme.primaryLight }]}>
          <Ionicons name="people" size={48} color={theme.primary} />
        </View>

        <View style={[styles.badge, { backgroundColor: isDark ? '#1E293B' : '#EEF2FF' }]}>
          <Text style={[styles.badgeText, { color: theme.primary }]}>PRACTICAL EXAM 2</Text>
        </View>

        <Text style={[styles.title, { color: theme.text }]}>Teams & Collaboration</Text>
        <Text style={[styles.description, { color: theme.textSecondary }]}>
          Team workspaces, member assignment, and role permissions will be activated in Practical Exam 2.
        </Text>

        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <Text style={[styles.cardHeader, { color: theme.text }]}>Planned Features for Exam 2:</Text>
          <View style={styles.featureRow}>
            <Ionicons name="checkmark-circle" size={18} color={theme.success} />
            <Text style={[styles.featureText, { color: theme.textSecondary }]}>
              Team creation and member management
            </Text>
          </View>
          <View style={styles.featureRow}>
            <Ionicons name="checkmark-circle" size={18} color={theme.success} />
            <Text style={[styles.featureText, { color: theme.textSecondary }]}>
              Assign tasks to team members (assigneeId & teamId)
            </Text>
          </View>
          <View style={styles.featureRow}>
            <Ionicons name="checkmark-circle" size={18} color={theme.success} />
            <Text style={[styles.featureText, { color: theme.textSecondary }]}>
              Role-based access control (Admin vs Member)
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    marginBottom: 12,
  },
  badgeText: {
    ...typography.badge,
    fontSize: 11,
    letterSpacing: 0.8,
  },
  title: {
    ...typography.h1,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    ...typography.body,
    textAlign: 'center',
    marginBottom: 28,
  },
  card: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    gap: 12,
  },
  cardHeader: {
    ...typography.h3,
    fontSize: 15,
    marginBottom: 4,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureText: {
    ...typography.body,
    fontSize: 13,
    flex: 1,
  },
});
