import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  function handleContinue() {
    router.replace('/home');
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>✨</Text>
      </View>

      <Text style={styles.title}>Bem-vinda à Me Investor 💜</Text>
      <Text style={styles.subtitle}>
        Seu cadastro foi concluído com sucesso.
        Agora você pode começar a investir e brincar com segurança.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B1035',
  },
  iconCircle: {
    width: 90,
    height: 90,
    backgroundColor: '#2A1B4F',
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
  },
  icon: {
    fontSize: 44,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    color: '#CFCBEF',
    fontSize: 15,
    textAlign: 'center',
    maxWidth: 260,
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#6C5CE7',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 14,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
