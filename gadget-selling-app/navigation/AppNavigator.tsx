import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { Colors } from '../constants/theme';

// Auth Screens
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import RoleSelectScreen from '../screens/auth/RoleSelectScreen';

// Tab Navigators
import BuyerTabs from './BuyerTabs';
import SellerTabs from './SellerTabs';

// Shared Screens
import ProductDetailScreen from '../screens/shared/ProductDetailScreen';
import CheckoutAddressScreen from '../screens/shared/CheckoutAddressScreen';
import CheckoutSummaryScreen from '../screens/shared/CheckoutSummaryScreen';
import CheckoutPaymentScreen from '../screens/shared/CheckoutPaymentScreen';
import OrderConfirmationScreen from '../screens/shared/OrderConfirmationScreen';
import OrderDetailScreen from '../screens/shared/OrderDetailScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  RoleSelect: undefined;
  BuyerTabs: undefined;
  SellerTabs: undefined;
  ProductDetail: { productId: string };
  CheckoutAddress: undefined;
  CheckoutSummary: undefined;
  CheckoutPayment: undefined;
  OrderConfirmation: { orderId: string };
  OrderDetail: { orderId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { isLoggedIn, role, isLoading, loadSession } = useAuthStore();

  useEffect(() => {
    loadSession();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }

  // Determine initial route
  const getInitialRoute = (): keyof RootStackParamList => {
    if (!isLoggedIn) return 'Onboarding';
    if (!role) return 'RoleSelect';
    return role === 'buyer' ? 'BuyerTabs' : 'SellerTabs';
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={getInitialRoute()}
        screenOptions={{ headerShown: false, gestureEnabled: true }}
      >
        {/* Auth Flow */}
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />

        {/* Dashboard Tabs */}
        <Stack.Screen name="BuyerTabs" component={BuyerTabs} />
        <Stack.Screen name="SellerTabs" component={SellerTabs} />

        {/* Shared / Modal Screens */}
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{ gestureEnabled: true }}
        />
        <Stack.Screen name="CheckoutAddress" component={CheckoutAddressScreen} />
        <Stack.Screen name="CheckoutSummary" component={CheckoutSummaryScreen} />
        <Stack.Screen name="CheckoutPayment" component={CheckoutPaymentScreen} />
        <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
        <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
