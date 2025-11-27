import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
      router.push({
        pathname: '/twofactor',
        params: { temporaryToken: respostaFake.temporaryToken },
      });
    } else {
      router.replace('/home'); // Navega para a tela de Home após login
    }
  }

  function goToRegister() {
    router.push('/register'); // Navega para a tela de Registro
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário / CPF / E-mail"
        value={identificador}
        onChangeText={setIdentificador}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/forgot-password')}>
        <Text>Esqueci minha senha</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={goToRegister}>
        <Text>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // Seu estilo aqui
});
