import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [genero, setGenero] = useState<'f' | 'm' | 'o' | ''>(''); // f = feminino, m = masculino, o = outro

  async function handleRegister() {
    if (senha !== confirmarSenha) {
      console.log('Senhas não conferem');
      return;
    }

    if (!genero) {
      console.log('Selecione um gênero');
      return;
    }

    // Objeto pronto para envio ao backend em Kotlin
    const novoUsuario = {
      nome,
      cpf,
      email,
      username,
      senha,
      genero,
    };

    try {
      // 📨 Exemplo: aqui você chamaria seu backend
      // const response = await fetch('https://sua-api.com/usuarios', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(novoUsuario),
      // });
      // const data = await response.json();

      console.log('Usuário cadastrado (fake):', novoUsuario);

      // 💾 Salvando dados importantes no aparelho
      await AsyncStorage.setItem('userGenero', genero);
      await AsyncStorage.setItem('userNome', nome);

      // 👉 Vai para a tela de boas-vindas
      router.replace('/welcome');
    } catch (error) {
      console.log('Erro ao cadastrar usuário:', error);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crie sua conta</Text>
      <Text style={styles.subtitle}>
        Comece a investir com uma conta segura e personalizada.
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Dados pessoais</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          placeholderTextColor="#A9A3D9"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="CPF"
          placeholderTextColor="#A9A3D9"
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#A9A3D9"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.sectionTitle}>Acesso</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome de usuário"
          placeholderTextColor="#A9A3D9"
          value={username}
          onChangeText={setUsername}
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

        <TextInput
          style={styles.input}
          placeholder="Confirmar senha"
          placeholderTextColor="#A9A3D9"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
        />

        <Text style={styles.sectionTitle}>Gênero</Text>

        <View style={styles.genderRow}>
          <TouchableOpacity
            style={[
              styles.genderButton,
              genero === 'f' && styles.genderButtonSelected,
            ]}
            onPress={() => setGenero('f')}
          >
            <Text style={styles.genderText}>Feminino</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.genderButton,
              genero === 'm' && styles.genderButtonSelected,
            ]}
            onPress={() => setGenero('m')}
          >
            <Text style={styles.genderText}>Masculino</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.genderButton,
              genero === 'o' && styles.genderButtonSelected,
            ]}
            onPress={() => setGenero('o')}
          >
            <Text style={styles.genderText}>Outro</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
          <Text style={styles.primaryButtonText}>Criar conta</Text>
        </TouchableOpacity>

        <Text style={styles.infoText}>
          Ao continuar, você concorda com os Termos de Uso e Política de
          Privacidade.
        </Text>
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
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    color: '#CFCBEF',
    marginTop: 6,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#2A1B4F',
    borderRadius: 16,
    padding: 20,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 8,
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
  genderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 12,
  },
  genderButton: {
    flex: 1,
    backgroundColor: '#3A2768',
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4D3588',
    alignItems: 'center',
  },
  genderButtonSelected: {
    backgroundColor: '#6C5CE7',
    borderColor: '#8E7CFF',
  },
  genderText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },
  primaryButton: {
    backgroundColor: '#6C5CE7',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  infoText: {
    color: '#A9A3D9',
    fontSize: 11,
    marginTop: 10,
    textAlign: 'center',
  },
});
