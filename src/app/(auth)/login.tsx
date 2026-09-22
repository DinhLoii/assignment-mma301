/**
 * Authentication Screen (Public / Guest Mode for Exam 1)
 * Prepares foundation for Exam 2 Firebase Authentication
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { Button } from '@/components/common/Button';

export default function LoginScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === 'dark';
  const theme = isDark ? colors.dark : colors.light;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={styles.container}>
        {/* App Logo and Branding */}
        <View style={styles.hero}>
          <View style={[styles.logoCircle, { backgroundColor: theme.primaryLight }]}>
            <Ionicons name="checkbox" size={48} color={theme.primary} />
          </View>
          <Text style={[styles.title, { color: theme.text }]}>TaskFlow</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Practical Exam 1 – Task Management System
          </Text>
          <View style={[styles.examBadge, { backgroundColor: isDark ? '#1E293B' : '#EEF2FF' }]}>
            <Text style={[styles.examBadgeText, { color: theme.primary }]}>
              Public CRUD Mode (No Authentication Required)
            </Text>
          </View>
        </View>

        {/* Info Box */}
        <View
          style={[
            styles.infoCard,
            { backgroundColor: theme.card, borderColor: theme.cardBorder },
          ]}
        >
          <View style={styles.infoRow}>
            <Ionicons name="shield-checkmark-outline" size={20} color={theme.success} />
            <Text style={[styles.infoText, { color: theme.text }]}>
              Connected to Firebase Cloud Firestore
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="sync-outline" size={20} color={theme.primary} />
            <Text style={[styles.infoText, { color: theme.text }]}>
              Real-time synchronization enabled (onSnapshot)
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="layers-outline" size={20} color={theme.warning} />
            <Text style={[styles.infoText, { color: theme.text }]}>
              Full Task CRUD: Create, View, Update & Delete
            </Text>
          </View>
        </View>

        {/* Action Button */}
        <View style={styles.footer}>
          <Button
            title="Enter Task Management App"
            size="lg"
            onPress={() => router.replace('/(main)/home')}
            icon={<Ionicons name="arrow-forward-outline" size={20} color="#FFFFFF" />}
          />
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
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingVertical: 32,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  hero: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    ...typography.h1,
    fontSize: 32,
    marginBottom: 8,
  },
  subtitle: {
    ...typography.subtitle,
    textAlign: 'center',
    marginBottom: 16,
  },
  examBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  examBadgeText: {
    ...typography.caption,
    fontWeight: '700',
  },
  infoCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    gap: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoText: {
    ...typography.body,
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  footer: {
    marginBottom: 16,
  },
});
