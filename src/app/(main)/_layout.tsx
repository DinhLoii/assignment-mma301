/**
 * Main Tab Navigation Layout
 * Practical Exam 1 Navigation: Home, Teams (coming soon), Profile (coming soon), Demo
 */

import React from 'react';
import { Tabs } from 'expo-router';
import { useColorScheme, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/colors';

export default function MainLayout() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const theme = isDark ? colors.dark : colors.light;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textMuted,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.cardBorder,
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'checkbox' : 'checkbox-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="teams"
        options={{
          title: 'Teams',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'people' : 'people-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="demo"
        options={{
          title: 'Diagnostics',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'flask' : 'flask-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
