import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function TwoFactorScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [codigo, setCodigo] = useState('');

  const temporaryToken = params.temporaryToken as string | undefined;

  async function handleConfirm() {
    // Aqui você validaria o código no backend usando temporaryToken
    if (codigo.length === 6) {
      // Sucesso → vai pra Home
      router.replace('/home');
    } else {
      console.log('Código inválido');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerIcon}>
        <Text style={styles.iconText}>🔐</Text>
      </View>

      <Text style={styles.title}>Verificação em duas etapas</Text>
      <Text style={styles.subtitle}>
        Digite o código de 6 dígitos enviado para seu e-mail ou celular
        cadastrado.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="000000"
        placeholderTextColor="#A9A3D9"
        value={codigo}
        onChangeText={setCodigo}
        keyboardType="numeric"
        maxLength={6}
      />

      <TouchableOpacity style={styles.primaryButton} onPress={handleConfirm}>
        <Text style={styles.primaryButtonText}>Confirmar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton}>
        <Text style={styles.linkText}>Reenviar código</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    backgroundColor: '#1B1035',
  },
  headerIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#2A1B4F',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  iconText: {
    fontSize: 32,
  },
  title: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#CFCBEF',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#3A2768',
    borderRadius: 12,
    paddingVertical: 12,
    textAlign: 'center',
    fontSize: 22,
    letterSpacing: 8,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#4D3588',
  },
  primaryButton: {
    backgroundColor: '#6C5CE7',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  linkButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    color: '#CFCBEF',
    fontSize: 13,
  },
});
