import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing, FontSize } from '../constants/theme';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  editable?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  error,
  icon,
  style,
  multiline = false,
  numberOfLines = 1,
  maxLength,
  editable = true,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.wrapper, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.container,
          isFocused && styles.focused,
          error ? styles.errorBorder : undefined,
          !editable && styles.disabled,
        ]}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={18}
            color={isFocused ? Colors.primary : Colors.textSecondary}
            style={styles.icon}
          />
        )}
        <TextInput
          style={[styles.input, multiline && styles.multiline]}
          placeholder={placeholder}
          placeholderTextColor={Colors.textMuted}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          editable={editable}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPassword((v) => !v)} style={styles.eyeBtn}>
            <Ionicons
              name={showPassword ? 'eye' : 'eye-off'}
              size={18}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    fontWeight: '500',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    minHeight: 50,
  },
  focused: {
    borderColor: Colors.primary,
  },
  errorBorder: {
    borderColor: Colors.error,
  },
  disabled: {
    opacity: 0.6,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    paddingVertical: Spacing.sm,
  },
  multiline: {
    textAlignVertical: 'top',
    paddingTop: Spacing.sm,
  },
  eyeBtn: {
    padding: Spacing.xs,
  },
  error: {
    fontSize: FontSize.xs,
    color: Colors.error,
    marginTop: 4,
  },
});
