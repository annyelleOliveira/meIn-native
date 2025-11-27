import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [identificador, setIdentificador] = useState('');
  const [senha, setSenha] = useState('');

  async function handleLogin() {
    const respostaFake = {
      success: true,
      require2FA: true,
      temporaryToken: 'TOKEN_TEMP',
    };

    if (!respostaFake.success) {
      console.log('Login inválido');
      return;
    }

    if (respostaFake.require2FA) {
      router.push(`/twofactor?token=${respostaFake.temporaryToken}`);
      return;
    }

  }

  function goToRegister() {
    router.push('/register');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>R$</Text>
        <Text style={styles.appName}>Me Invest</Text>
        <Text style={styles.subtitle}>
          Invista seu dinheiro com segurança e simplicidade.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Acesse sua conta</Text>

        <TextInput
          style={styles.input}
          placeholder="Usuário / CPF / E-mail"
          placeholderTextColor="#A9A3D9"
          value={identificador}
          onChangeText={setIdentificador}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#A9A3D9"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
          <Text style={styles.primaryButtonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Ainda não investe com a gente?</Text>

        <TouchableOpacity onPress={goToRegister}>
          <Text style={styles.footerLink}>Criar conta agora</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    backgroundColor: '#1B1035',
  },

  header: {
    marginBottom: 32,
  },

  logo: {
    fontSize: 40,
    color: '#8E7CFF',
    fontWeight: '800',
  },

  appName: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '700',
    marginTop: 4,
  },

  subtitle: {
    fontSize: 14,
    color: '#CFCBEF',
    marginTop: 8,
    maxWidth: 260,
  },

  card: {
    backgroundColor: '#2A1B4F',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },

  cardTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },

  input: {
    backgroundColor: '#3A2768',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
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

  linkButton: {
    marginTop: 12,
    alignItems: 'center',
  },

  linkText: {
    color: '#CFCBEF',
    fontSize: 13,
  },

  footer: {
    marginTop: 24,
    alignItems: 'center',
  },

  footerText: {
    color: '#CFCBEF',
    fontSize: 13,
  },

  footerLink: {
    color: '#8E7CFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
});
