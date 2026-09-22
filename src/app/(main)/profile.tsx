/**
 * Profile Placeholder Screen
 * Functional Requirement: Profile placeholder screen for Practical Exam 2
 */

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

export default function ProfileScreen() {
  const isDark = useColorScheme() === 'dark';
  const theme = isDark ? colors.dark : colors.light;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={styles.container}>
        {/* Avatar */}
        <View style={[styles.avatarCircle, { backgroundColor: theme.primaryLight }]}>
          <Ionicons name="person" size={54} color={theme.primary} />
        </View>

        <Text style={[styles.name, { color: theme.text }]}>Student Evaluator</Text>
        <Text style={[styles.email, { color: theme.textSecondary }]}>student@fpt.edu.vn</Text>

        <View style={[styles.badge, { backgroundColor: isDark ? '#1E293B' : '#EEF2FF' }]}>
          <Text style={[styles.badgeText, { color: theme.primary }]}>
            EXAM 1 – GUEST / PUBLIC MODE
          </Text>
        </View>

        {/* Profile Info Card */}
        <View style={[styles.infoCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <View style={styles.infoRow}>
            <View style={styles.infoIconCol}>
              <Ionicons name="shield-outline" size={20} color={theme.textMuted} />
            </View>
            <View style={styles.infoTextCol}>
              <Text style={[styles.infoTitle, { color: theme.textSecondary }]}>Access Mode</Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>Public / Open Access</Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.infoRow}>
            <View style={styles.infoIconCol}>
              <Ionicons name="cloud-outline" size={20} color={theme.textMuted} />
            </View>
            <View style={styles.infoTextCol}>
              <Text style={[styles.infoTitle, { color: theme.textSecondary }]}>Database</Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>Firebase Cloud Firestore</Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.infoRow}>
            <View style={styles.infoIconCol}>
              <Ionicons name="sparkles-outline" size={20} color={theme.textMuted} />
            </View>
            <View style={styles.infoTextCol}>
              <Text style={[styles.infoTitle, { color: theme.textSecondary }]}>Next Milestone</Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>
                Firebase Auth & Team Workspaces (Exam 2)
              </Text>
            </View>
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
  avatarCircle: {
    width: 104,
    height: 104,
    borderRadius: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  name: {
    ...typography.h2,
    fontSize: 22,
    marginBottom: 4,
  },
  email: {
    ...typography.caption,
    fontSize: 14,
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    marginBottom: 28,
  },
  badgeText: {
    ...typography.badge,
    fontSize: 10,
    letterSpacing: 0.6,
  },
  infoCard: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoIconCol: {
    width: 36,
    alignItems: 'flex-start',
  },
  infoTextCol: {
    flex: 1,
  },
  infoTitle: {
    ...typography.caption,
    fontSize: 11,
    marginBottom: 2,
  },
  infoValue: {
    ...typography.body,
    fontWeight: '600',
    fontSize: 14,
  },
  divider: {
    height: 1,
    marginVertical: 6,
  },
});
