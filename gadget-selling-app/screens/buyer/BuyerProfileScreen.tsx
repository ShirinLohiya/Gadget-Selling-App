import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, FontSize, FontWeight, Radius } from '../../constants/theme';
import { useAuthStore } from '../../store/useAuthStore';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';

// ─── Person A's screen — scaffold provided by Person E ───
export default function BuyerProfileScreen({ navigation }: any) {
  const { user, logout } = useAuthStore();
  const clearCart = useCartStore((s) => s.clearCart);
  const clearWishlist = useWishlistStore((s) => s.clear);

  const handleLogout = async () => {
    clearCart();
    clearWishlist();
    await logout();
    navigation.replace('RoleSelect');
  };

  const MenuItem = ({ emoji, label, onPress }: { emoji: string; label: string; onPress: () => void }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Text style={styles.menuEmoji}>{emoji}</Text>
      <Text style={styles.menuLabel}>{label}</Text>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerCard}>
        <View style={styles.avatar}><Text style={styles.avatarText}>{user?.name?.charAt(0) ?? 'U'}</Text></View>
        <Text style={styles.name}>{user?.name ?? 'User'}</Text>
        <Text style={styles.email}>{user?.email ?? ''}</Text>
      </View>

      <View style={styles.menu}>
        <MenuItem emoji="📦" label="My Orders" onPress={() => {}} />
        <MenuItem emoji="📍" label="My Addresses" onPress={() => {}} />
        <MenuItem emoji="⚙️" label="Settings" onPress={() => {}} />
        <MenuItem emoji="💬" label="Help & Support" onPress={() => {}} />
        <MenuItem emoji="🚪" label="Logout" onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  headerCard: { backgroundColor: Colors.surface, padding: Spacing.xl, alignItems: 'center', marginBottom: Spacing.md },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: Colors.primary + '33', alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md },
  avatarText: { fontSize: FontSize.xxl, color: Colors.primary, fontWeight: FontWeight.bold },
  name: { fontSize: FontSize.xl, color: Colors.textPrimary, fontWeight: FontWeight.bold },
  email: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 4 },
  menu: { padding: Spacing.md },
  menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.sm },
  menuEmoji: { fontSize: 20, marginRight: Spacing.md },
  menuLabel: { flex: 1, fontSize: FontSize.md, color: Colors.textPrimary, fontWeight: FontWeight.medium },
  chevron: { fontSize: FontSize.xl, color: Colors.textMuted },
});



