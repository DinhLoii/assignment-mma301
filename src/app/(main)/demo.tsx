/**
 * Diagnostics and Testing Screen
 * Provides Firebase connection verification, Sample Task Seeder, and Exam Screenshot Helpers
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { Button } from '@/components/common/Button';
import { isFirebaseConfigured, firebaseConfig } from '@/config/env';
import { useTasks } from '@/hooks/useTasks';

export default function DemoScreen() {
  const isDark = useColorScheme() === 'dark';
  const theme = isDark ? colors.dark : colors.light;

  const { allTasks, seedSampleTasks } = useTasks();
  const [isSeeding, setIsSeeding] = useState(false);
  const isConnected = isFirebaseConfigured();

  const handleSeed = async () => {
    try {
      setIsSeeding(true);
      const count = await seedSampleTasks();
      Alert.alert('Seeder Complete', `Successfully added ${count} sample tasks to Firestore!`);
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
          {/* Title */}
          <Text style={[styles.title, { color: theme.text }]}>Exam Diagnostics</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Verify Firebase Cloud Firestore connection and seed sample data
          </Text>

          {/* Connection Status Card */}
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <View style={styles.cardHeader}>
              <Ionicons
                name={isConnected ? 'cloud-done' : 'cloud-offline'}
                size={24}
                color={isConnected ? theme.statusDone : theme.statusInProgress}
              />
              <Text style={[styles.cardTitle, { color: theme.text }]}>
                {isConnected ? 'Firebase Cloud Firestore: Online' : 'Firebase: Offline Demo Mode'}
              </Text>
            </View>

            <View style={styles.detailsList}>
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Project ID:</Text>
                <Text style={[styles.detailValue, { color: theme.text }]}>
                  {firebaseConfig.projectId || '(Not configured)'}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Tasks Loaded:</Text>
                <Text style={[styles.detailValue, { color: theme.primary }]}>
                  {allTasks.length} documents
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Auth State:</Text>
                <Text style={[styles.detailValue, { color: theme.text }]}>
                  Public / No Login (Exam 1 Specification)
                </Text>
              </View>
            </View>
          </View>

          {/* Sample Data Seeder Card */}
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Text style={[styles.cardTitle, { color: theme.text, marginBottom: 6 }]}>
              Firestore Sample Data Seeder
            </Text>
            <Text style={[styles.cardDesc, { color: theme.textSecondary, marginBottom: 16 }]}>
              Click the button below to insert 4 standard sample tasks with all required fields (title, description, status, priority, dueDate, createdAt, teamId, assigneeId) into your Firestore collection.
            </Text>

            <Button
              title="Seed 4 Sample Tasks Now"
              variant="primary"
              loading={isSeeding}
              onPress={handleSeed}
              icon={<Ionicons name="cloud-upload-outline" size={18} color="#FFFFFF" />}
            />
          </View>

          {/* Exam Screenshot Checklist */}
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Text style={[styles.cardTitle, { color: theme.text, marginBottom: 10 }]}>
              Exam 1 Required Screenshots Checklist:
            </Text>

            <View style={styles.checkItem}>
              <Ionicons name="checkmark-circle-outline" size={18} color={theme.primary} />
              <Text style={[styles.checkText, { color: theme.textSecondary }]}>
                1. Firebase Console showing Firestore tasks collection
              </Text>
            </View>
            <View style={styles.checkItem}>
              <Ionicons name="checkmark-circle-outline" size={18} color={theme.primary} />
              <Text style={[styles.checkText, { color: theme.textSecondary }]}>
                2. Home screen with task list & Create Task button
              </Text>
            </View>
            <View style={styles.checkItem}>
              <Ionicons name="checkmark-circle-outline" size={18} color={theme.primary} />
              <Text style={[styles.checkText, { color: theme.textSecondary }]}>
                3. Create Task form filled in before submitting
              </Text>
            </View>
            <View style={styles.checkItem}>
              <Ionicons name="checkmark-circle-outline" size={18} color={theme.primary} />
              <Text style={[styles.checkText, { color: theme.textSecondary }]}>
                4. Task list after new task has been created
              </Text>
            </View>
            <View style={styles.checkItem}>
              <Ionicons name="checkmark-circle-outline" size={18} color={theme.primary} />
              <Text style={[styles.checkText, { color: theme.textSecondary }]}>
                5. Edit Task modal with updated values
              </Text>
            </View>
            <View style={styles.checkItem}>
              <Ionicons name="checkmark-circle-outline" size={18} color={theme.primary} />
              <Text style={[styles.checkText, { color: theme.textSecondary }]}>
                6. Task list after task has been edited
              </Text>
            </View>
            <View style={styles.checkItem}>
              <Ionicons name="checkmark-circle-outline" size={18} color={theme.primary} />
              <Text style={[styles.checkText, { color: theme.textSecondary }]}>
                7. Task list after task has been deleted
              </Text>
            </View>
            <View style={styles.checkItem}>
              <Ionicons name="checkmark-circle-outline" size={18} color={theme.primary} />
              <Text style={[styles.checkText, { color: theme.textSecondary }]}>
                8. Navigation tabs &amp; &quot;Coming soon&quot; Teams screen
              </Text>
            </View>
            <View style={styles.checkItem}>
              <Ionicons name="checkmark-circle-outline" size={18} color={theme.primary} />
              <Text style={[styles.checkText, { color: theme.textSecondary }]}>
                9. Profile placeholder screen
              </Text>
            </View>
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
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  container: {
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
    gap: 16,
  },
  title: {
    ...typography.h1,
    fontSize: 24,
  },
  subtitle: {
    ...typography.body,
    fontSize: 14,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 18,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  cardTitle: {
    ...typography.h3,
    fontSize: 16,
  },
  cardDesc: {
    ...typography.body,
    fontSize: 13,
    lineHeight: 18,
  },
  detailsList: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  detailLabel: {
    ...typography.caption,
    fontSize: 13,
  },
  detailValue: {
    ...typography.body,
    fontSize: 13,
    fontWeight: '600',
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
  },
  checkText: {
    ...typography.body,
    fontSize: 13,
    flex: 1,
  },
});
