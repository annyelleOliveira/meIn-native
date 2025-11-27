import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useExpenses } from '../../src/context/ExpensesContext';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export default function ExpensesScreen() {
  const { expenses, addExpense, total } = useExpenses();

  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');

  function handleAdd() {
    if (!description || !category || !amount) {
      console.log('Preencha descrição, categoria e valor');
      return;
    }

    const valorNum = Number(
      amount.replace('.', '').replace(',', '.').trim(),
    );
    if (isNaN(valorNum)) {
      console.log('Valor inválido');
      return;
    }

    const dataFormatada = date || new Date().toISOString().slice(0, 10);

    addExpense({
      description,
      category,
      date: dataFormatada,
      amount: valorNum,
    });

    setDescription('');
    setCategory('');
    setDate('');
    setAmount('');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Controle de despesas</Text>
      <Text style={styles.subtitle}>
        Cadastre seus gastos do dia a dia para enxergar melhor o seu fluxo.
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Nova despesa</Text>

        <TextInput
          style={styles.input}
          placeholder="Descrição (ex: Supermercado)"
          placeholderTextColor="#A9A3D9"
          value={description}
          onChangeText={setDescription}
        />

        <TextInput
          style={styles.input}
          placeholder="Categoria (ex: Alimentação)"
          placeholderTextColor="#A9A3D9"
          value={category}
          onChangeText={setCategory}
        />

        <TextInput
          style={styles.input}
          placeholder="Data (opcional) - ex: 2025-11-24"
          placeholderTextColor="#A9A3D9"
          value={date}
          onChangeText={setDate}
        />

        <TextInput
          style={styles.input}
          placeholder="Valor (ex: 120,50)"
          placeholderTextColor="#A9A3D9"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.primaryButton} onPress={handleAdd}>
          <Text style={styles.primaryButtonText}>Adicionar despesa</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total de despesas</Text>
        <Text style={styles.summaryValue}>{formatCurrency(total)}</Text>
      </View>

      <Text style={styles.sectionTitle}>Lista de despesas</Text>

      {expenses.length === 0 && (
        <Text style={styles.emptyText}>
          Você ainda não cadastrou nenhuma despesa.
        </Text>
      )}

      {expenses.map((e) => (
        <View key={e.id} style={styles.expenseRow}>
          <View>
            <Text style={styles.expenseDescription}>{e.description}</Text>
            <Text style={styles.expenseCategory}>{e.category}</Text>
            <Text style={styles.expenseDate}>{e.date}</Text>
          </View>
          <Text style={styles.expenseAmount}>{formatCurrency(e.amount)}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    backgroundColor: '#1B1035',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    color: '#CFCBEF',
    fontSize: 14,
    marginBottom: 20,
    marginTop: 4,
  },
  card: {
    backgroundColor: '#2A1B4F',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 4,
  },
  input: {
    backgroundColor: '#3A2768',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#4D3588',
    color: '#FFFFFF',
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: '#6C5CE7',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  summaryCard: {
    backgroundColor: '#6C5CE7',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  summaryLabel: {
    color: '#E5E5F0',
    fontSize: 14,
  },
  summaryValue: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 6,
  },
  emptyText: {
    color: '#CFCBEF',
    fontSize: 14,
    marginTop: 4,
  },
  expenseRow: {
    backgroundColor: '#2A1B4F',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  expenseDescription: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  expenseCategory: {
    color: '#CFCBEF',
    fontSize: 12,
  },
  expenseDate: {
    color: '#A9A3D9',
    fontSize: 11,
  },
  expenseAmount: {
    color: '#FF9E9E',
    fontSize: 14,
    fontWeight: '600',
  },
});
