import { EarningsProvider } from '../src/context/EarningsContext';
import { CoinsProvider } from '../src/context/CoinsContext';
import { InvestmentsProvider } from '../src/context/InvestmentsContext';
import { Stack } from 'expo-router';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <EarningsProvider>
        <CoinsProvider>
          <InvestmentsProvider>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="register" options={{ title: 'Criar Conta' }} />
              <Stack.Screen name="twofactor" options={{ title: 'Verificação' }} />
              <Stack.Screen name="forgot-password" options={{ title: 'Recuperar Senha' }} />
              <Stack.Screen name="welcome" options={{ title: 'Bem-vinda' }} />
            </Stack>
          </InvestmentsProvider>
        </CoinsProvider>
      </EarningsProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
