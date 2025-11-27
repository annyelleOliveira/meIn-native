import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EarningsScreen() {
  const [coins, setCoins] = useState<number>(0);
  const [dailyCollected, setDailyCollected] = useState<boolean>(false);

  useEffect(() => {
    async function loadCoinsAndStatus() {
      const savedCoins = await AsyncStorage.getItem('userCoins');
      if (savedCoins) setCoins(parseInt(savedCoins, 10));

      const lastLogin = await AsyncStorage.getItem('lastLoginDate');
      const today = new Date().toISOString().slice(0, 10);
      setDailyCollected(lastLogin === today);
    }

    loadCoinsAndStatus();
  }, []);

  const handleDailyLogin = async () => {
    if (dailyCollected) return; // Já coletou hoje

    const today = new Date().toISOString().slice(0, 10);

    const newCoins = coins + 5; // Ganho diário de 5 moedas
    setCoins(newCoins);
    setDailyCollected(true);

    await AsyncStorage.setItem('userCoins', newCoins.toString());
    await AsyncStorage.setItem('lastLoginDate', today);
  };

  const handleBuyCoins = async (amount: number) => {
    const newCoins = coins + amount;
    setCoins(newCoins);
    await AsyncStorage.setItem('userCoins', newCoins.toString());
    Alert.alert('Compra realizada', `Você comprou ${amount} moedas!`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ganhos de Moedas</Text>

      <Text style={styles.coins}>Total de Moedas: {coins}</Text>

      {/* Botão de ganho diário */}
      <TouchableOpacity
        style={[styles.button, dailyCollected && styles.buttonDisabled]}
        onPress={handleDailyLogin}
        disabled={dailyCollected}
      >
        <Text style={styles.buttonText}>
          {dailyCollected ? 'Moedas do dia já coletadas' : 'Ganhar 5 Moedas (Acesso Diário)'}
        </Text>
      </TouchableOpacity>

      {/* Botões para comprar moedas */}
      <Text style={styles.subtitle}>Comprar Moedas</Text>
      <View style={styles.buyContainer}>
        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => handleBuyCoins(10)}
        >
          <Text style={styles.buttonText}>Comprar 10 moedas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => handleBuyCoins(50)}
        >
          <Text style={styles.buttonText}>Comprar 50 moedas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => handleBuyCoins(100)}
        >
          <Text style={styles.buttonText}>Comprar 100 moedas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B1035',
    padding: 20,
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
  subtitle: {
    color: '#CFCBEF',
    fontSize: 16,
    marginTop: 30,
    marginBottom: 10,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#6C5CE7',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    width: 250,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#AAA4D6',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buyContainer: {
    flexDirection: 'column',
    gap: 12,
    alignItems: 'center',
  },
  buyButton: {
    backgroundColor: '#00A86B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 10,
  },
});
