import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useListingsStore } from '../../store/useListingsStore';

const Colors = {
  primary: '#6C5CE7',
  background: '#0F0F13',
  surface: '#1A1A24',
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0B0',
};

export default function AddProductScreen() {
  const navigation = useNavigation<any>();
  const addListing = useListingsStore((s) => s.addListing);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!name || !category || !price || !stock) {
      Alert.alert('Error', 'Fill all required fields');
      return;
    }

    addListing({
      name,
      category,
      price: Number(price),
      stock: Number(stock),
      description,
      images: [
        'https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=400&q=80',
      ],
      variants: {},
      isActive: true,
    });

    Alert.alert('Success', 'Product added');

    navigation.goBack(); // returns to Listings
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Product</Text>

      <TextInput placeholder="Name" placeholderTextColor="#999"
        value={name} onChangeText={setName} style={styles.input} />

      <TextInput placeholder="Category" placeholderTextColor="#999"
        value={category} onChangeText={setCategory} style={styles.input} />

      <TextInput placeholder="Price" keyboardType="numeric"
        value={price} onChangeText={setPrice} style={styles.input} />

      <TextInput placeholder="Stock" keyboardType="numeric"
        value={stock} onChangeText={setStock} style={styles.input} />

      <TextInput placeholder="Description"
        value={description} onChangeText={setDescription}
        style={[styles.input, { height: 100 }]} multiline />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={{ color: '#fff', fontWeight: '600' }}>Add Product</Text>
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