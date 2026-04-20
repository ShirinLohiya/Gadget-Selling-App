import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useListingsStore } from '../../store/useListingsStore';

const Colors = {
  primary: '#6C5CE7',
  background: '#0F0F13',
  surface: '#1A1A24',
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0B0',
};

export default function EditProductScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { id } = route.params;

  const listing = useListingsStore((s) =>
    s.listings.find((l) => l.id === id)
  );

  const updateListing = useListingsStore((s) => s.updateListing);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');

  // Load existing data
  useEffect(() => {
    if (listing) {
      setName(listing.name);
      setCategory(listing.category);
      setPrice(String(listing.price));
      setStock(String(listing.stock));
      setDescription(listing.description);
    }
  }, [listing]);

  const handleUpdate = () => {
    if (!name || !category || !price || !stock) {
      Alert.alert('Error', 'Fill all required fields');
      return;
    }

    updateListing(id, {
      name,
      category,
      price: Number(price),
      stock: Number(stock),
      description,
    });

    Alert.alert('Success', 'Product updated');

    navigation.goBack();
  };

  if (!listing) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#fff' }}>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Product</Text>

      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#888"
      />

      <TextInput
        value={category}
        onChangeText={setCategory}
        style={styles.input}
        placeholder="Category"
        placeholderTextColor="#888"
      />

      <TextInput
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        placeholderTextColor="#888"
      />

      <TextInput
        value={stock}
        onChangeText={setStock}
        style={styles.input}
        placeholder="Stock"
        keyboardType="numeric"
        placeholderTextColor="#888"
      />

      <TextInput
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { height: 100 }]}
        placeholder="Description"
        multiline
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={{ color: '#fff', fontWeight: '600' }}>
          Save Changes
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 22,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: 10,
  },
  input: {
    backgroundColor: Colors.surface,
    padding: 12,
    borderRadius: 10,
    color: '#fff',
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
});