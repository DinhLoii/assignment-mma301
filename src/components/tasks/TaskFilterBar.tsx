/**
 * TaskFilterBar Component
 * Search input and status filter segment tabs
 */

import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TaskFilterType } from '@/models/Task';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

interface TaskFilterBarProps {
  selectedFilter: TaskFilterType;
  onSelectFilter: (filter: TaskFilterType) => void;
  searchQuery: string;
  onSearchChange: (text: string) => void;
  counts: {
    total: number;
    todo: number;
    inProgress: number;
    done: number;
  };
}

export const TaskFilterBar: React.FC<TaskFilterBarProps> = ({
  selectedFilter,
  onSelectFilter,
  searchQuery,
  onSearchChange,
  counts,
}) => {
  const isDark = useColorScheme() === 'dark';
  const theme = isDark ? colors.dark : colors.light;

  const filters: { key: TaskFilterType; label: string; count: number }[] = [
    { key: 'ALL', label: 'All', count: counts.total },
    { key: 'TODO', label: 'To Do', count: counts.todo },
    { key: 'IN_PROGRESS', label: 'In Progress', count: counts.inProgress },
    { key: 'DONE', label: 'Done', count: counts.done },
  ];

  return (
    <View style={styles.container}>
      {/* Search Input Bar */}
      <View
        style={[
          styles.searchBox,
          {
            backgroundColor: theme.inputBackground,
            borderColor: theme.border,
          },
        ]}
      >
        <Ionicons name="search-outline" size={18} color={theme.textMuted} style={styles.searchIcon} />
        <TextInput
          placeholder="Search tasks by title or keyword..."
          placeholderTextColor={theme.textMuted}
          value={searchQuery}
          onChangeText={onSearchChange}
          style={[styles.searchInput, { color: theme.text }]}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        {searchQuery.length > 0 ? (
          <TouchableOpacity onPress={() => onSearchChange('')} style={styles.clearBtn}>
            <Ionicons name="close-circle" size={16} color={theme.textMuted} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScroll}
      >
        {filters.map(item => {
          const active = selectedFilter === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              activeOpacity={0.7}
              style={[
                styles.filterTab,
                {
                  backgroundColor: active
                    ? theme.primary
                    : isDark
                    ? '#161E2E'
                    : '#FFFFFF',
                  borderColor: active ? theme.primary : theme.border,
                },
              ]}
              onPress={() => onSelectFilter(item.key)}
            >
              <Text
                style={[
                  styles.filterLabel,
                  { color: active ? '#FFFFFF' : theme.textSecondary },
                ]}
              >
                {item.label}
              </Text>
              <View
                style={[
                  styles.countBadge,
                  {
                    backgroundColor: active
                      ? 'rgba(255, 255, 255, 0.25)'
                      : isDark
                      ? '#1E293B'
                      : '#F1F5F9',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.countText,
                    { color: active ? '#FFFFFF' : theme.textMuted },
                  ]}
                >
                  {item.count}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    height: '100%',
  },
  clearBtn: {
    padding: 4,
  },
  filterScroll: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 2,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  filterLabel: {
    ...typography.caption,
    fontSize: 13,
    fontWeight: '600',
  },
  countBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  countText: {
    fontSize: 11,
    fontWeight: '700',
  },
});

export default TaskFilterBar;
