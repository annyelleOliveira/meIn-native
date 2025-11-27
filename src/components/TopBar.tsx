import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function TopBar() {
  const router = useRouter();

  return (
    <View style={styles.topBar}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.topBarButton}>← Voltar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/wallet')}>
        <Text style={styles.topBarButton}>Carteira</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/quiz')}>
        <Text style={styles.topBarButton}>Quiz</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/expenses')}>
        <Text style={styles.topBarButton}>Despesas</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/earning')}>
        <Text style={styles.topBarButton}>Ganhos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#2A1B4F',
    flexWrap: 'wrap',
  },
  topBarButton: {
    color: '#FFF',
    fontWeight: '700',
    marginHorizontal: 4,
    marginVertical: 2,
  },
});
