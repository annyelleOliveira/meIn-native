import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useCoins } from '../../src/context/CoinsContext';
import { useInvestments } from '../../src/context/InvestmentsContext';
import { useEarnings } from '../../src/context/EarningsContext';
import { useExpenses } from '../../src/context/ExpensesContext';

export default function WalletScreen() {
  const { coins } = useCoins();
  const { investments } = useInvestments();
  const { earnings } = useEarnings();
  const { expenses } = useExpenses();

  // Saldo em reais
  const totalInvestments = investments.reduce((sum, inv) => sum + 0, 0); // não afeta saldo real
  const totalEarnings = earnings.reduce((sum, e) => sum + e.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const saldoAtual = totalEarnings - totalExpenses; // saldo real

  // Mapeamento das moedas
  const coinTypes = ['rendaFixa', 'acoes', 'fiis', 'caixa'] as const;

  const assetColors: Record<typeof coinTypes[number], string> = {
    rendaFixa: '#FFD700',
    acoes: '#00B894',
    fiis: '#6C5CE7',
    caixa: '#FF7675',
  };

  const assetLabels: Record<typeof coinTypes[number], string> = {
    rendaFixa: 'Renda Fixa',
    acoes: 'Ações',
    fiis: 'FIIs',
    caixa: 'Caixa',
  };

  // Transações recentes
  const transacoes = [
    ...earnings.map(e => ({ ...e, type: 'entrada' })),
    ...expenses.map(e => ({ ...e, type: 'saida' })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Saldo total em reais */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Saldo Atual</Text>
        <Text style={styles.balanceValue}>
          {saldoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </Text>
      </View>

      {/* Cards de moedas */}
      <Text style={styles.sectionTitle}>Minhas Moedas</Text>
      <View style={styles.row}>
        {coinTypes.map(type => {
          const saldo = coins[type] || 0;
          const invested = investments
            .filter(i => i.asset === type)
            .reduce((sum, i) => sum + i.invested, 0);
          return (
            <View key={type} style={[styles.assetPill, { backgroundColor: assetColors[type] }]}>
              <Text style={styles.assetLabel}>{assetLabels[type]}</Text>
              <Text style={styles.assetValue}>Disponível: {saldo}</Text>
              <Text style={styles.assetValue}>Investido: {invested}</Text>
            </View>
          );
        })}
      </View>

      {/* Transações recentes */}
      <Text style={styles.sectionTitle}>Transações Recentes</Text>
      {transacoes.length === 0 && (
        <Text style={styles.emptyText}>Nenhuma transação recente</Text>
      )}

      {transacoes.map((t, index) => (
        <View key={index} style={styles.transactionRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.transactionDesc}>{t.description}</Text>
            <Text style={styles.transactionDate}>{t.date}</Text>
          </View>
          <Text style={t.type === 'entrada' ? styles.transactionValuePositive : styles.transactionValue}>
            {t.type === 'entrada' ? '+' : '-'}{' '}
            {t.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#1B1035',
  },
  balanceCard: {
    backgroundColor: '#FFC107',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  balanceLabel: {
    color: '#1B1035',
    fontSize: 16,
    fontWeight: '600',
  },
  balanceValue: {
    color: '#1B1035',
    fontSize: 28,
    fontWeight: '700',
    marginTop: 8,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  assetPill: {
    flex: 1,
    minWidth: 140,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  assetLabel: {
    color: '#1B1035',
    fontSize: 14,
    fontWeight: '700',
  },
  assetValue: {
    color: '#1B1035',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2A1B4F',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    alignItems: 'center',
  },
  transactionDesc: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    flexShrink: 1,
  },
  transactionDate: {
    color: '#CFCBEF',
    fontSize: 12,
    marginTop: 2,
  },
  transactionValue: {
    color: '#FF9E9E',
    fontSize: 14,
    fontWeight: '600',
  },
  transactionValuePositive: {
    color: '#9EFFC3',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyText: {
    color: '#CFCBEF',
    fontSize: 14,
    marginTop: 4,
  },
});
