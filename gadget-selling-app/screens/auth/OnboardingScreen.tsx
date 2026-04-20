import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ListRenderItemInfo,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Spacing, FontSize, FontWeight } from '../../constants/theme';
import type { RootStackParamList } from '../../navigation/types';

// ─── Types ────────────────────────────────────────────────────────────────────
type OnboardingNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

interface Props {
  navigation: OnboardingNavigationProp;
}

interface Slide {
  id: string;
  emoji: string;
  title: string;
  sub: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SLIDES: Slide[] = [
  {
    id: '1',
    emoji: '🛒',
    title: 'Buy Gadgets',
    sub: 'Browse thousands of phones, laptops, earbuds and more.',
  },
  {
    id: '2',
    emoji: '🏪',
    title: 'Sell Easily',
    sub: 'List your gadgets in minutes and reach thousands of buyers.',
  },
  {
    id: '3',
    emoji: '⚡',
    title: 'Fast & Secure',
    sub: 'Safe payments, real-time tracking, and 24/7 support.',
  },
];

// ─── Dot Indicator ────────────────────────────────────────────────────────────
interface DotIndicatorProps {
  total: number;
  current: number;
}

function DotIndicator({ total, current }: DotIndicatorProps) {
  return (
    <View style={styles.dots}>
      {Array.from({ length: total }).map((_, i) => (
        <View key={i} style={[styles.dot, i === current && styles.dotActive]} />
      ))}
    </View>
  );
}

// ─── Slide Item ───────────────────────────────────────────────────────────────
function SlideItem({ item }: { item: Slide }) {
  return (
    <View style={styles.slide}>
      <Text style={styles.emoji}>{item.emoji}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.sub}>{item.sub}</Text>
    </View>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function OnboardingScreen({ navigation }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<Slide>>(null);

  // Bug fix #1 — removed unused Animated + scrollX (were imported and declared
  // but never read — no interpolation, no animated dots, pure dead code)

  const isLastSlide = currentIndex === SLIDES.length - 1;

  const onScrollEnd = useCallback((e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setCurrentIndex(index);
  }, []);

  const goToLogin = useCallback(() => {
    navigation.replace('Login');
  }, [navigation]);

  const handleNext = useCallback(() => {
    if (isLastSlide) {
      goToLogin();
      return;
    }
    const nextIndex = currentIndex + 1;
    flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    setCurrentIndex(nextIndex);
  }, [currentIndex, isLastSlide, goToLogin]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Slide>) => <SlideItem item={item} />,
    []
  );

  const keyExtractor = useCallback((item: Slide) => item.id, []);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Bug fix #2 — removed unused Radius import from theme */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onMomentumScrollEnd={onScrollEnd}
        scrollEventThrottle={16}
        style={styles.flatList}
      />

      <View style={styles.controls}>
        <DotIndicator total={SLIDES.length} current={currentIndex} />

        <TouchableOpacity
          style={styles.btn}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={styles.btnText}>
            {isLastSlide ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>

        {!isLastSlide && (
          <TouchableOpacity
            onPress={goToLogin}
            style={styles.skip}
            activeOpacity={0.7}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}

        {isLastSlide && <View style={styles.skipPlaceholder} />}
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  flatList: { flex: 1 },
  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  emoji: { fontSize: 80, marginBottom: Spacing.xl },
  title: { fontSize: FontSize.xxxl, color: Colors.textPrimary, fontWeight: FontWeight.bold, textAlign: 'center' },
  sub: { fontSize: FontSize.md, color: Colors.textSecondary, textAlign: 'center', marginTop: Spacing.md, lineHeight: 24 },
  controls: { alignItems: 'center', paddingBottom: Spacing.xl, paddingHorizontal: Spacing.xl },
  dots: { flexDirection: 'row', gap: 8, marginBottom: Spacing.xl },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.border },
  dotActive: { width: 24, backgroundColor: Colors.primary },
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xxl,
    width: '100%',
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontSize: FontSize.lg, fontWeight: FontWeight.bold },
  skip: { marginTop: Spacing.md, paddingVertical: Spacing.xs, paddingHorizontal: Spacing.md },
  skipText: { color: Colors.textSecondary, fontSize: FontSize.md },
  skipPlaceholder: { marginTop: Spacing.md, height: FontSize.md + Spacing.xs * 2 },
});
