import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useListingsStore } from '../../store/useListingsStore';

const Colors = {
  primary: '#6C5CE7',
  accent: '#00CEC9',
  background: '#0F0F13',
  surface: '#1A1A24',
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0B0',
  success: '#00B894',
  warning: '#FDCB6E',
  error: '#D63031',
};

export default function Listings() {
  const navigation = useNavigation<any>();

  const listings = useListingsStore((s) => s.listings);
  const removeListing = useListingsStore((s) => s.removeListing);


  const renderItem = ({ item }: { item: any }) => {
    const image = item.images?.[0];

    return (
      <View style={styles.card}>
        {image ? (
          <Image source={{ uri: image }} style={styles.cardImage} />
        ) : (
          <View style={[styles.cardImage, styles.imagePlaceholder]}>
            <Ionicons name="image-outline" size={28} color={Colors.textSecondary} />
          </View>
        )}

        <View style={styles.cardInfo}>
          <Text style={styles.cardName} numberOfLines={1}>
            {item.name}
          </Text>

          <Text style={styles.cardCategory}>
            {item.category}
          </Text>

          <View style={styles.priceRow}>
            <Text style={styles.cardPrice}>
              ₹{item.price.toLocaleString()}
            </Text>

            {item.discount > 0 && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>
                  {item.discount}% off
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionIcon}
            onPress={() =>
              navigation.navigate('EditProduct', { id: item.id })
            }
          >
            <Ionicons name="pencil-outline" size={18} color={Colors.accent} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionIcon}
            onPress={() =>{
              console.log("DELETE CLICKED:", item.id);
              removeListing(item.id);
            }}
          >
          <Ionicons name="trash-outline" size={18} color={Colors.error} />
        </TouchableOpacity>
      </View>
      </View >
    );
};

return (
  <View style={styles.container}>
    {/* Header */}
    <View style={styles.header}>
      {/*<TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>*/}

      <Text style={styles.title}>My Listings</Text>

      <Text style={styles.count}>
        {listings.length} items
      </Text>
    </View>

    {/* Empty State */}
    {listings.length === 0 ? (
      <View style={styles.empty}>
        <Ionicons name="cube-outline" size={52} color={Colors.textSecondary} />
        <Text style={styles.emptyTitle}>No listings yet</Text>
        <Text style={styles.emptySubtitle}>
          Add your first product to get started
        </Text>
      </View>
    ) : (
      <FlatList
        data={listings}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    )}

    {/* Floating Add Button */}
    <TouchableOpacity
      style={styles.fab}
      onPress={() => navigation.navigate('AddProduct')}
    >
      <Ionicons name="add" size={26} color="#fff" />
    </TouchableOpacity>
  </View>
);
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 56,
  },
  

  title: { color: Colors.textPrimary, fontSize: 18, fontWeight: '700' },
  count: { color: Colors.textSecondary, fontSize: 13 },

  list: { padding: 16, gap: 12, paddingBottom: 100 },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },

  cardImage: { width: 80, height: 80 },

  imagePlaceholder: {
    backgroundColor: '#252533',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardInfo: { flex: 1, padding: 12 },

  cardName: {
    color: Colors.textPrimary,
    fontWeight: '600',
    fontSize: 14,
  },

  cardCategory: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },

  cardPrice: {
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 15,
  },

  discountBadge: {
    backgroundColor: Colors.success + '22',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },

  discountText: {
    color: Colors.success,
    fontSize: 11,
    fontWeight: '600',
  },

  actions: {
    flexDirection: 'column',
    gap: 8,
    padding: 12,
  },

  actionIcon: { padding: 6 },

  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  emptyTitle: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },

  emptySubtitle: {
    color: Colors.textSecondary,
    fontSize: 14,
  },

  fab: {
    position: 'absolute',
    bottom: 28,
    right: 24,
    backgroundColor: Colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
});