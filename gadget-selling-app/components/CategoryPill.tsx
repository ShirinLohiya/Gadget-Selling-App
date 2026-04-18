import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors, Radius, Spacing, FontSize, FontWeight } from '../constants/theme';

interface CategoryPillProps {
  label: string;
  color?: string;
  isActive?: boolean;
  onPress: () => void;
}

export const CategoryPill: React.FC<CategoryPillProps> = ({
  label,
  color = Colors.primary,
  isActive = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.pill,
        isActive
          ? { backgroundColor: color, borderColor: color }
          : { backgroundColor: Colors.surface, borderColor: Colors.border },
      ]}
    >
      <Text
        style={[
          styles.label,
          { color: isActive ? '#fff' : Colors.textSecondary },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.full,
    marginRight: Spacing.xs,
    borderWidth: 1.5,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    letterSpacing: 0.2,
  },
});
