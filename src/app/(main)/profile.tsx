/**
 * Profile Placeholder Screen
 * Functional Requirement 4: Profile placeholder screen for Practical Exam 2
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  useColorScheme,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { Button } from '@/components/common/Button';
import { useTasks } from '@/hooks/useTasks';
import { isFirebaseConfigured, firebaseConfig } from '@/config/env';

export default function ProfileScreen() {
  const isDark = useColorScheme() === 'dark';
  const theme = isDark ? colors.dark : colors.light;

  const { allTasks, seedSampleTasks } = useTasks();
  const [isSeeding, setIsSeeding] = useState(false);
  const isConnected = isFirebaseConfigured();

  const handleSeed = async () => {
    try {
      setIsSeeding(true);
      const count = await seedSampleTasks();
      Alert.alert('Success', `Seeded ${count} sample tasks into Cloud Firestore!`);
    } catch (err: any) {
      Alert.alert('Seed Error', err.message || 'Failed to seed sample data');
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          {/* Avatar */}
          <View style={[styles.avatarCircle, { backgroundColor: theme.primaryLight }]}>
            <Ionicons name="person" size={50} color={theme.primary} />
          </View>

          <Text style={[styles.name, { color: theme.text }]}>Student Evaluator</Text>
          <Text style={[styles.email, { color: theme.textSecondary }]}>student@fpt.edu.vn</Text>

          <View style={[styles.badge, { backgroundColor: isDark ? '#1E293B' : '#EEF2FF' }]}>
            <Text style={[styles.badgeText, { color: theme.primary }]}>
              PRACTICAL EXAM 1 – PUBLIC ACCESS MODE
            </Text>
          </View>

          {/* Profile & Database Status Card */}
          <View
            style={[
              styles.infoCard,
              { backgroundColor: theme.card, borderColor: theme.cardBorder },
            ]}
          >
            <View style={styles.infoRow}>
              <View style={styles.infoIconCol}>
                <Ionicons name="shield-checkmark-outline" size={20} color={theme.success} />
              </View>
              <View style={styles.infoTextCol}>
                <Text style={[styles.infoTitle, { color: theme.textSecondary }]}>Access Mode</Text>
                <Text style={[styles.infoValue, { color: theme.text }]}>
                  Public / No Login Required
                </Text>
              </View>
            </View>

            <View style={[styles.divider, { backgroundColor: theme.border }]} />

            <View style={styles.infoRow}>
              <View style={styles.infoIconCol}>
                <Ionicons
                  name={isConnected ? 'cloud-done-outline' : 'cloud-offline-outline'}
                  size={20}
                  color={isConnected ? theme.success : theme.warning}
                />
              </View>
              <View style={styles.infoTextCol}>
                <Text style={[styles.infoTitle, { color: theme.textSecondary }]}>
                  Cloud Firestore Status
                </Text>
                <Text style={[styles.infoValue, { color: theme.text }]}>
                  {isConnected
                    ? `Connected (${firebaseConfig.projectId})`
                    : 'Running in Demo Fallback Mode'}
                </Text>
              </View>
            </View>

            <View style={[styles.divider, { backgroundColor: theme.border }]} />

            <View style={styles.infoRow}>
              <View style={styles.infoIconCol}>
                <Ionicons name="list-outline" size={20} color={theme.primary} />
              </View>
              <View style={styles.infoTextCol}>
                <Text style={[styles.infoTitle, { color: theme.textSecondary }]}>
                  Tasks in Collection
                </Text>
                <Text style={[styles.infoValue, { color: theme.primary }]}>
                  {allTasks.length} tasks
                </Text>
              </View>
            </View>

            <View style={[styles.divider, { backgroundColor: theme.border }]} />

            <View style={styles.infoRow}>
              <View style={styles.infoIconCol}>
                <Ionicons name="sparkles-outline" size={20} color={theme.textMuted} />
              </View>
              <View style={styles.infoTextCol}>
                <Text style={[styles.infoTitle, { color: theme.textSecondary }]}>
                  Next Milestone
                </Text>
                <Text style={[styles.infoValue, { color: theme.text }]}>
                  Firebase Auth & Team Assignment (Exam 2)
                </Text>
              </View>
            </View>
          </View>

          {/* Seed Sample Tasks Action */}
          <View
            style={[
              styles.actionCard,
              { backgroundColor: theme.card, borderColor: theme.cardBorder },
            ]}
          >
            <Text style={[styles.actionTitle, { color: theme.text }]}>Sample Data Seeder</Text>
            <Text style={[styles.actionDesc, { color: theme.textSecondary }]}>
              Seed initial sample tasks into Cloud Firestore with all required fields to take screenshots for the exam report.
            </Text>
            <Button
              title="Seed Sample Tasks"
              variant="outline"
              loading={isSeeding}
              onPress={handleSeed}
              icon={<Ionicons name="cloud-upload-outline" size={18} color={theme.text} />}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 24,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  name: {
    ...typography.h2,
    fontSize: 22,
    marginBottom: 4,
  },
  email: {
    ...typography.caption,
    fontSize: 14,
    marginBottom: 10,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 14,
    marginBottom: 20,
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
    padding: 16,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  infoIconCol: {
    width: 34,
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
    fontSize: 13,
  },
  divider: {
    height: 1,
    marginVertical: 4,
  },
  actionCard: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 10,
  },
  actionTitle: {
    ...typography.h3,
    fontSize: 15,
  },
  actionDesc: {
    ...typography.body,
    fontSize: 13,
    lineHeight: 18,
  },
});
