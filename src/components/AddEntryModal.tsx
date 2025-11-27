import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useEarnings } from '../context/EarningsContext';

type AssetType = 'rendaFixa' | 'acoes' | 'fiis' | 'caixa';

const assetTypes: { label: string; value: AssetType }[] = [
  { label: 'Renda Fixa', value: 'rendaFixa' },
  { label: 'Ações', value: 'acoes' },
  { label: 'FIIs', value: 'fiis' },
  { label: 'Caixa', value: 'caixa' },
];

interface AddEntryModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function AddEntryModal({ visible, onClose }: AddEntryModalProps) {
  const { addEarning } = useEarnings();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [assetType, setAssetType] = useState<AssetType>('caixa'); // tipo estrito

  const handleAdd = () => {
    if (!description || !amount) return;

    const valorNum = Number(amount.replace('.', '').replace(',', '.'));
    if (isNaN(valorNum)) return;

    const dataFormatada = date || new Date().toISOString().slice(0, 10);

    addEarning({
      description,
      amount: valorNum,
      date: dataFormatada,
      assetType, // agora tipado corretamente
    });

    setDescription('');
    setAmount('');
    setDate('');
    setAssetType('caixa');

    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Nova Entrada</Text>

          <TextInput
            style={styles.input}
            placeholder="Descrição"
            placeholderTextColor="#A9A3D9"
            value={description}
            onChangeText={setDescription}
          />

          <TextInput
            style={styles.input}
            placeholder="Valor (ex: 120,50)"
            placeholderTextColor="#A9A3D9"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          <TextInput
            style={styles.input}
            placeholder="Data (opcional) - ex: 2025-11-27"
            placeholderTextColor="#A9A3D9"
            value={date}
            onChangeText={setDate}
          />

          <Text style={styles.assetTitle}>Tipo de ativo</Text>
          <View style={styles.assetRow}>
            {assetTypes.map((asset) => (
              <TouchableOpacity
                key={asset.value}
                style={[
                  styles.assetButton,
                  assetType === asset.value && styles.assetButtonSelected,
                ]}
                onPress={() => setAssetType(asset.value)}
              >
                <Text style={styles.assetButtonText}>{asset.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.buttonsRow}>
            <TouchableOpacity style={styles.buttonCancel} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
              <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(27, 16, 53, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#2A1B4F',
    borderRadius: 16,
    padding: 20,
    width: '90%',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
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
  assetTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
  },
  assetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  assetButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A9A3D9',
    alignItems: 'center',
  },
  assetButtonSelected: {
    backgroundColor: '#6C5CE7',
    borderColor: '#6C5CE7',
  },
  assetButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  buttonCancel: {
    flex: 1,
    backgroundColor: '#A29BFE',
    borderRadius: 12,
    paddingVertical: 12,
    marginRight: 8,
    alignItems: 'center',
  },
  buttonAdd: {
    flex: 1,
    backgroundColor: '#6C5CE7',
    borderRadius: 12,
    paddingVertical: 12,
    marginLeft: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
