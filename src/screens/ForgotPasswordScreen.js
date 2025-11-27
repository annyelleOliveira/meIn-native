import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [identificador, setIdentificador] = useState('');
  const [enviado, setEnviado] = useState(false);

  async function handleSend() {
    if (!identificador) {
      console.log('Preencha usuário / CPF / e-mail');
      return;
    }

    // Aqui, no futuro, você chama seu backend:
    // await fetch('https://sua-api.com/esqueci-senha', { ... });

    console.log('Pedido de recuperação enviado para:', identificador);
    setEnviado(true);
  }

  function voltarLogin() {
    router.replace('/');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Esqueci minha senha</Text>
      <Text style={styles.subtitle}>
        Informe seu usuário, CPF ou e-mail cadastrado. Vamos te enviar as instruções
        para redefinir sua senha com segurança.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Usuário / CPF / E-mail"
        placeholderTextColor="#A9A3D9"
        value={identificador}
        onChangeText={setIdentificador}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.primaryButton} onPress={handleSend}>
        <Text style={styles.primaryButtonText}>Enviar instruções</Text>
      </TouchableOpacity>

      {enviado && (
        <Text style={styles.infoText}>
          Se os dados estiverem corretos, você receberá um e-mail ou SMS com o próximo
          passo para redefinir sua senha.
        </Text>
      )}

      <TouchableOpacity style={styles.backButton} onPress={voltarLogin}>
        <Text style={styles.backButtonText}>Voltar ao login</Text>
      </TouchableOpacity>
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
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#CFCBEF',
    fontSize: 14,
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#3A2768',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
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
  infoText: {
    color: '#CFCBEF',
    fontSize: 13,
    marginTop: 16,
  },
  backButton: {
    marginTop: 24,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#8E7CFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
