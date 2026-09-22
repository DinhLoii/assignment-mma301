/**
 * Reusable Production Form Input Component
 */

import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  containerStyle,
  style,
  ...textInputProps
}) => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const theme = isDark ? colors.dark : colors.light;

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? (
        <Text style={[styles.label, { color: theme.textSecondary }]}>{label}</Text>
      ) : null}

      <TextInput
        placeholderTextColor={theme.textMuted}
        style={[
          styles.input,
          {
            backgroundColor: theme.inputBackground,
            borderColor: error ? theme.danger : theme.border,
            color: theme.text,
          },
          style,
        ]}
        {...textInputProps}
      />

      {error ? (
        <Text style={[styles.error, { color: theme.danger }]}>{error}</Text>
      ) : helperText ? (
        <Text style={[styles.helper, { color: theme.textMuted }]}>{helperText}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    ...typography.caption,
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  error: {
    ...typography.caption,
    marginTop: 4,
    fontWeight: '500',
  },
  helper: {
    ...typography.caption,
    marginTop: 4,
  },
});

export default Input;
