import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/theme';
import { useCartStore } from '../store/useCartStore';

// Buyer Screens
import HomeScreen from '../screens/buyer/HomeScreen';
import ExploreScreen from '../screens/buyer/ExploreScreen';
import CartScreen from '../screens/buyer/CartScreen';
import WishlistScreen from '../screens/buyer/WishlistScreen';
import BuyerProfileScreen from '../screens/buyer/BuyerProfileScreen';

export type BuyerTabParamList = {
  Home: undefined;
  Explore: undefined;
  Cart: undefined;
  Wishlist: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BuyerTabParamList>();

export default function BuyerTabs() {
  const getItemCount = useCartStore((s) => s.getItemCount);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.tabActive,
        tabBarInactiveTintColor: Colors.tabInactive,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ color, focused }) => {
          const icons: Record<string, { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }> = {
            Home:     { active: 'home', inactive: 'home-outline' },
            Explore:  { active: 'search', inactive: 'search-outline' },
            Cart:     { active: 'cart', inactive: 'cart-outline' },
            Wishlist: { active: 'heart', inactive: 'heart-outline' },
            Profile:  { active: 'person', inactive: 'person-outline' },
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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarBadge: getItemCount() > 0 ? getItemCount() : undefined,
          tabBarBadgeStyle: styles.badge,
        }}
      />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      <Tab.Screen name="Profile" component={BuyerProfileScreen} />
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
    backgroundColor: Colors.primary + '22',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  badge: {
    backgroundColor: Colors.error,
    fontSize: 10,
  },
});
