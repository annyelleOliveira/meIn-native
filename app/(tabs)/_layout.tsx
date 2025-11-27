import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ExpensesProvider } from '../../src/context/ExpensesContext';
import { EarningsProvider } from '../../src/context/EarningsContext';
import { Colors } from '@/constants/theme';
import AddEntryModal from '../../src/components/AddEntryModal';

export default function TabLayout() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ExpensesProvider>
      <EarningsProvider>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors.primary,
          }}
        >
          <Tabs.Screen
            name="wallet"
            options={{
              title: 'Carteira',
              tabBarIcon: ({ color }) => <Ionicons name="wallet-outline" size={28} color={color} />,
            }}
          />
          <Tabs.Screen
            name="quiz"
            options={{
              title: 'Quiz',
              tabBarIcon: ({ color }) => <Ionicons name="help-circle-outline" size={28} color={color} />,
            }}
          />
          <Tabs.Screen
            name="expenses"
            options={{
              title: 'Despesas',
              tabBarIcon: ({ color }) => <Ionicons name="list-outline" size={28} color={color} />,
            }}
          />
          <Tabs.Screen
            name="earning"
            options={{
              title: 'Ganhos',
              tabBarIcon: ({ color }) => <Ionicons name="trending-up-outline" size={28} color={color} />,
            }}
          />
          <Tabs.Screen
            name="investments"
            options={{
              title: 'Investimentos',
              tabBarIcon: ({ color }) => (
                <Ionicons name="trending-up-outline" size={28} color={color} />
              ),
            }}
          />

        </Tabs>

        {/* Botão flutuante global */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={36} color="#fff" />
        </TouchableOpacity>

        {/* Modal global */}
        <AddEntryModal visible={modalVisible} onClose={() => setModalVisible(false)} />
      </EarningsProvider>
    </ExpensesProvider>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: 60, // ajusta para ficar acima da TabBar
    right: 20,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
