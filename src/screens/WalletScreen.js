import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useExpenses } from '../context/ExpensesContext'; // Importando o contexto

export default function WalletScreen() {
  const { coins, addCoins } = useExpenses(); // Usando coins e addCoins do contexto

  useEffect(() => {
    // Você pode adicionar mais lógicas aqui, como verificar acesso diário ou outras ações
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sua Carteira de Moedas</Text>
      <Text style={styles.coins}>Total de Moedas: {coins}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => addCoins(10)} // Adiciona 10 moedas ao saldo
      >
        <Text style={styles.buttonText}>Ganhar 10 Moedas!</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonDaily}
        onPress={() => addCoins(5)} // Adiciona 5 moedas como bônus diário
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
    marginBottom: 10,
  },
  buttonDaily: {
    backgroundColor: '#FF9E9E',
    padding: 10,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
