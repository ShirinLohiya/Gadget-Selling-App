import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/theme';
import { useListingsStore } from '../store/useListingsStore';

// Seller Screens
import SellerDashboardScreen from '../screens/seller/SellerDashboardScreen';
import ListingsStack from '../navigation/ListingsStack';
import InquiriesScreen from '../screens/seller/Inquiries';
import SellerProfileScreen from '../screens/seller/SellerProfileScreen';
//hhhhhhhhh
export type SellerTabParamList = {
  Dashboard: undefined;
  Listings: undefined;
  Inquiries: undefined;
  SellerProfile: undefined;
};

const Tab = createBottomTabNavigator<SellerTabParamList>();

export default function SellerTabs() {
  const getUnreadCount = useListingsStore((s) => s.getUnreadCount);
  const unread = getUnreadCount();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.tabInactive,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ color, focused }) => {
          const icons: Record<string, { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }> = {
            Dashboard: { active: 'bar-chart', inactive: 'bar-chart-outline' },
            Listings: { active: 'list', inactive: 'list-outline' },
            Inquiries: { active: 'chatbubbles', inactive: 'chatbubbles-outline' },
            SellerProfile: { active: 'person', inactive: 'person-outline' },
          };
          const icon = icons[route.name];
          return (
            <View style={focused ? styles.activeIconBg : undefined}>
              <Ionicons name={focused ? icon.active : icon.inactive} size={22} color={color} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={SellerDashboardScreen} />
      <Tab.Screen name="Listings" component={ListingsStack} />
      <Tab.Screen
        name="Inquiries"
        component={InquiriesScreen}
        options={{
          tabBarBadge: unread > 0 ? unread : undefined,
          tabBarBadgeStyle: styles.badge,
        }}
      />

      <Tab.Screen
        name="SellerProfile"
        component={SellerProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />

    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.tabBar,
    borderTopWidth: 0,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    height: 64,
    paddingBottom: 8,
    paddingTop: 6,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  activeIconBg: {
    backgroundColor: Colors.accent + '22',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  badge: {
    backgroundColor: Colors.error,
    fontSize: 10,
  },
});
