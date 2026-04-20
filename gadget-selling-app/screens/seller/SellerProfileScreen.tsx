import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, FontSize, FontWeight, Radius } from '../../constants/theme';
import { useAuthStore } from '../../store/useAuthStore';

// ─── Person D's screen — scaffold provided by Person E ───
export default function SellerProfileScreen({ navigation }: any) {
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigation.replace('RoleSelect');
  };

  const MenuItem = ({ emoji, label, onPress }: any) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Text style={styles.menuEmoji}>{emoji}</Text>
      <Text style={styles.menuLabel}>{label}</Text>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerCard}>
        <View style={styles.avatar}><Text style={styles.avatarText}>{user?.name?.charAt(0) ?? 'S'}</Text></View>
        <Text style={styles.businessName}>{user?.businessName ?? "My Store"}</Text>
        <Text style={styles.email}>{user?.email ?? ''}</Text>
      </View>
      <View style={styles.menu}>

        <MenuItem emoji="🚪" label="Logout" onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  headerCard: { backgroundColor: Colors.surface, padding: Spacing.xl, alignItems: 'center', marginBottom: Spacing.md },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: Colors.accent + '33', alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md },
  avatarText: { fontSize: FontSize.xxl, color: Colors.accent, fontWeight: FontWeight.bold },
  businessName: { fontSize: FontSize.xl, color: Colors.textPrimary, fontWeight: FontWeight.bold },
  email: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 4 },
  menu: { padding: Spacing.md },
  menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.sm },
  menuEmoji: { fontSize: 20, marginRight: Spacing.md },
  menuLabel: { flex: 1, fontSize: FontSize.md, color: Colors.textPrimary, fontWeight: FontWeight.medium },
  chevron: { fontSize: FontSize.xl, color: Colors.textMuted },
});



