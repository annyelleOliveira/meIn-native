import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EarningsScreen() {
  const [coins, setCoins] = useState<number>(0);

  useEffect(() => {
    async function loadCoins() {
      const savedCoins = await AsyncStorage.getItem('userCoins');
      if (savedCoins) {
        setCoins(parseInt(savedCoins, 10));
      }
    }

    loadCoins();
  }, []);

  const handleDailyLogin = async () => {
    const lastLogin = await AsyncStorage.getItem('lastLoginDate');
    const today = new Date().toISOString().slice(0, 10); // "2025-11-26"

    if (lastLogin !== today) {
      await AsyncStorage.setItem('lastLoginDate', today);
      const newCoins = coins + 5; // Ganho diário de 5 moedas
      setCoins(newCoins);
      await AsyncStorage.setItem('userCoins', newCoins.toString());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ganhos de Moedas</Text>

      <Text style={styles.coins}>Total de Moedas: {coins}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleDailyLogin}
      >
        <Text style={styles.buttonText}>Ganhar 5 Moedas (Acesso Diário)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B1035',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  coins: {
    color: '#FFFFFF',
    fontSize: 20,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#6C5CE7',
    padding: 10,
    borderRadius: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
