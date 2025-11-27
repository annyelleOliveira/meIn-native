import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type Genero = 'f' | 'm' | 'o';

export default function HomeScreen() {
  const router = useRouter();

  const [genero, setGenero] = useState<Genero | null>(null);
  const [nome, setNome] = useState<string | null>(null);

  useEffect(() => {
    async function carregarDadosUsuario() {
      try {
        const generoSalvo = await AsyncStorage.getItem('userGenero');
        const nomeSalvo = await AsyncStorage.getItem('userNome');

        if (generoSalvo === 'f' || generoSalvo === 'm' || generoSalvo === 'o') {
          setGenero(generoSalvo);
        }

        if (nomeSalvo) {
          setNome(nomeSalvo);
        }
      } catch (error) {
        console.log('Erro ao carregar dados do usuário:', error);
      }
    }

    carregarDadosUsuario();
  }, []);

  function montarSaudacao() {
    const baseNome = nome ? `, ${nome}` : '';

    if (genero === 'f') return `Olá, investidora${baseNome} 💜`;
    if (genero === 'm') return `Olá, investidor${baseNome} 💜`;
    return `Olá${baseNome} 💜`;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Saudações */}
      <Text style={styles.greeting}>{montarSaudacao()}</Text>
      <Text style={styles.subtitle}>Aqui está um resumo da sua carteira:</Text>

      {/* Card de Patrimônio */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Patrimônio total</Text>
        <Text style={styles.balanceValue}>R$ 42.750,32</Text>
        <Text style={styles.balanceChange}>+ R$ 1.253,18 ( +3,02% ) hoje</Text>
      </View>

      {/* Distribuição de ativos */}
      <Text style={styles.sectionTitle}>Distribuição</Text>
      <View style={styles.row}>
        <View style={styles.assetPill}>
          <Text style={styles.assetLabel}>Renda fixa</Text>
          <Text style={styles.assetValue}>R$ 18.000,00</Text>
        </View>
        <View style={styles.assetPill}>
          <Text style={styles.assetLabel}>Ações</Text>
          <Text style={styles.assetValue}>R$ 15.500,00</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.assetPill}>
          <Text style={styles.assetLabel}>FIIs</Text>
          <Text style={styles.assetValue}>R$ 6.200,00</Text>
        </View>
        <View style={styles.assetPill}>
          <Text style={styles.assetLabel}>Caixa</Text>
          <Text style={styles.assetValue}>R$ 3.050,32</Text>
        </View>
      </View>

      {/* Movimentações recentes */}
      <Text style={styles.sectionTitle}>Movimentações recentes</Text>
      <View style={styles.movementRow}>
        <View>
          <Text style={styles.movementTitle}>Compra PETR4</Text>
          <Text style={styles.movementSubtitle}>10 cotas · R$ 37,20</Text>
        </View>
        <Text style={styles.movementValue}>- R$ 372,00</Text>
      </View>
      <View style={styles.movementRow}>
        <View>
          <Text style={styles.movementTitle}>Resgate CDB</Text>
          <Text style={styles.movementSubtitle}>CDB 120% CDI</Text>
        </View>
        <Text style={styles.movementValuePositive}>+ R$ 1.200,00</Text>
      </View>

      {/* Menu inferior para navegar entre Wallet e Quiz */}
      <View style={styles.menuContainer}>
        <Text style={styles.menuTitle}>Navegação rápida</Text>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => router.replace('/wallet')}
        >
          <Text style={styles.menuButtonText}>Ir para Carteira</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => router.replace('/quiz')}
        >
          <Text style={styles.menuButtonText}>Ir para Quiz de Finanças</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
    backgroundColor: '#1B1035',
  },
  greeting: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    color: '#CFCBEF',
    fontSize: 14,
    marginBottom: 20,
  },
  balanceCard: {
    backgroundColor: '#6C5CE7',
    borderRadius: 18,
    padding: 20,
    marginBottom: 24,
  },
  balanceLabel: {
    color: '#E5E5F0',
    fontSize: 14,
  },
  balanceValue: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
    marginTop: 8,
  },
  balanceChange: {
    color: '#C2FFD8',
    fontSize: 13,
    marginTop: 6,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  assetPill: {
    flex: 1,
    backgroundColor: '#2A1B4F',
    borderRadius: 14,
    padding: 12,
  },
  assetLabel: {
    color: '#CFCBEF',
    fontSize: 13,
  },
  assetValue: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 4,
  },
  movementRow: {
    backgroundColor: '#2A1B4F',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  movementTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  movementSubtitle: {
    color: '#A9A3D9',
    fontSize: 12,
  },
  movementValue: {
    color: '#FF9E9E',
    fontSize: 14,
    fontWeight: '600',
  },
  movementValuePositive: {
    color: '#9EFFC3',
    fontSize: 14,
    fontWeight: '600',
  },
  menuContainer: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#4D3588',
    paddingTop: 16,
  },
  menuTitle: {
    color: '#CFCBEF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  menuButton: {
    backgroundColor: '#6C5CE7',
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  menuButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
