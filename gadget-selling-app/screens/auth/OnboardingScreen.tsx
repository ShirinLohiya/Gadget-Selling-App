import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, FontSize, FontWeight, Radius } from '../../constants/theme';

// ─── Person A's screen — placeholder provided by Person E ───
export default function OnboardingScreen({ navigation }: any) {
  const slides = [
    { emoji: '🛒', title: 'Buy Gadgets', sub: 'Browse thousands of phones, laptops, earbuds and more.' },
    { emoji: '🏪', title: 'Sell Easily', sub: 'List your gadgets in minutes and reach thousands of buyers.' },
    { emoji: '⚡', title: 'Fast & Secure', sub: 'Safe payments, real-time tracking, and 24/7 support.' },
  ];
  const [current, setCurrent] = React.useState(0);

  const next = () => {
    if (current < slides.length - 1) setCurrent(current + 1);
    else navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.slide}>
        <Text style={styles.emoji}>{slides[current].emoji}</Text>
        <Text style={styles.title}>{slides[current].title}</Text>
        <Text style={styles.sub}>{slides[current].sub}</Text>

        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View key={i} style={[styles.dot, i === current && styles.dotActive]} />
          ))}
        </View>

        <TouchableOpacity style={styles.btn} onPress={next}>
          <Text style={styles.btnText}>{current === slides.length - 1 ? 'Get Started' : 'Next'}</Text>
        </TouchableOpacity>

        {current < slides.length - 1 && (
          <TouchableOpacity onPress={() => navigation.replace('Login')} style={styles.skip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  slide: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  emoji: { fontSize: 80, marginBottom: Spacing.xl },
  title: { fontSize: FontSize.xxxl, color: Colors.textPrimary, fontWeight: FontWeight.bold, textAlign: 'center' },
  sub: { fontSize: FontSize.md, color: Colors.textSecondary, textAlign: 'center', marginTop: Spacing.md, lineHeight: 24 },
  dots: { flexDirection: 'row', gap: 8, marginTop: Spacing.xl },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.border },
  dotActive: { width: 24, backgroundColor: Colors.primary },
  btn: { backgroundColor: Colors.primary, borderRadius: Radius.md, paddingVertical: Spacing.md, paddingHorizontal: Spacing.xxl, marginTop: Spacing.xl, width: '100%', alignItems: 'center' },
  btnText: { color: '#fff', fontSize: FontSize.lg, fontWeight: FontWeight.bold },
  skip: { marginTop: Spacing.md },
  skipText: { color: Colors.textSecondary, fontSize: FontSize.md },
});



