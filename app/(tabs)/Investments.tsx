import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, Button, TextInput } from 'react-native';
import { useEarnings } from '../../src/context/EarningsContext';
import { realInvestments, RealInvestment } from '../../src/data/RealInvestiment';

type Investment = {
  id: string;
  asset: string;
  invested: number;
  expectedReturn: number;
};

export default function InvestmentsScreen() {
  const { addEarning } = useEarnings();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState<RealInvestment | null>(null);
  const [amount, setAmount] = useState('');
  const [investments, setInvestments] = useState<Investment[]>([]);

  const handleInvest = () => {
    if (!selectedInvestment) return;

    const valor = parseFloat(amount);
    if (isNaN(valor) || valor < selectedInvestment.minAmount) {
      alert(`O valor mínimo para investir em ${selectedInvestment.name} é R$ ${selectedInvestment.minAmount}`);
      return;
    }

    const newInvestment: Investment = {
      id: String(Date.now()),
      asset: selectedInvestment.name,
      invested: valor,
      expectedReturn: selectedInvestment.expectedReturn,
    };
    setInvestments([newInvestment, ...investments]);

    // Adiciona registro na carteira
    addEarning({
      description: `Investimento em ${selectedInvestment.name}`,
      category: 'Investimento',
      date: new Date().toISOString().slice(0, 10),
      amount: valor,
      coins: 0,
      type: 'investimento',
    });

    setModalVisible(false);
    setSelectedInvestment(null);
    setAmount('');
  };

  const calculateEarnings = (invested: number, rate: number) => invested * (rate / 100);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Investimentos</Text>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Novo Investimento</Text>
      </TouchableOpacity>

      <FlatList
        data={investments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.investmentRow}>
            <Text style={styles.asset}>{item.asset}</Text>
            <Text>Investido: R$ {item.invested.toFixed(2)}</Text>
            <Text>Rentabilidade: {item.expectedReturn}% a.a.</Text>
            <Text>Retorno estimado: R$ {calculateEarnings(item.invested, item.expectedReturn).toFixed(2)}</Text>
          </View>
        )}
      />

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione o investimento</Text>
            <FlatList
              data={realInvestments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.investmentOption,
                    selectedInvestment?.id === item.id && { backgroundColor: '#6C5CE7' },
                  ]}
                  onPress={() => setSelectedInvestment(item)}
                >
                  <Text style={styles.investmentName}>{item.name}</Text>
                  <Text style={styles.investmentDetails}>
                    Min: R$ {item.minAmount} | Rent: {item.expectedReturn}% a.a.
                  </Text>
                </TouchableOpacity>
              )}
            />

            {selectedInvestment && (
              <>
                <TextInput
                  placeholder="Valor para investir (R$)"
                  style={styles.input}
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                />
                <Button title="Investir" onPress={handleInvest} />
              </>
            )}

            <Button title="Cancelar" color="red" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#1B1035' },
  title: { fontSize: 24, color: '#FFF', fontWeight: '700', marginBottom: 16 },
  addButton: { backgroundColor: '#00B894', padding: 12, borderRadius: 12, marginBottom: 16 },
  addButtonText: { color: '#FFF', fontWeight: '600', fontSize: 16, textAlign: 'center' },
  investmentRow: { backgroundColor: '#2A1B4F', padding: 12, borderRadius: 12, marginBottom: 10 },
  asset: { color: '#FFF', fontSize: 16, fontWeight: '700', marginBottom: 4 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: '90%', backgroundColor: '#FFF', padding: 20, borderRadius: 12 },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  investmentOption: { padding: 12, borderRadius: 10, marginBottom: 8, backgroundColor: '#DDD' },
  investmentName: { fontWeight: '700', fontSize: 14 },
  investmentDetails: { fontSize: 12, color: '#555' },
  input: { borderWidth: 1, borderColor: '#CCC', borderRadius: 8, padding: 10, marginVertical: 10 },
});
