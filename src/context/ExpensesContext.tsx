import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Expense = {
  id: string;
  description: string;
  category: string;
  date: string;
  amount: number;
};

type ExpensesContextType = {
  expenses: Expense[];
  addExpense: (data: Omit<Expense, 'id'>) => void;
  total: number;
  coins: number;
  addCoins: (amount: number) => void;
  resetCoins: () => void;
};

const ExpensesContext = createContext<ExpensesContextType | undefined>(
  undefined
);

export function ExpensesProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      description: 'Supermercado',
      category: 'Alimentação',
      date: '2025-11-20',
      amount: 320.5,
    },
    {
      id: '2',
      description: 'Conta de luz',
      category: 'Moradia',
      date: '2025-11-18',
      amount: 210.0,
    },
    {
      id: '3',
      description: 'Uber',
      category: 'Transporte',
      date: '2025-11-19',
      amount: 45.75,
    },
  ]);

  const [coins, setCoins] = useState<number>(0);

  React.useEffect(() => {
    async function loadCoins() {
      const savedCoins = await AsyncStorage.getItem('userCoins');
      if (savedCoins) {
        setCoins(parseInt(savedCoins, 10));
      }
    }

    loadCoins();
  }, []);

  const addCoins = async (amount: number) => {
    const newCoins = coins + amount;
    setCoins(newCoins);
    await AsyncStorage.setItem('userCoins', newCoins.toString());
  };

  const resetCoins = async () => {
    setCoins(0);
    await AsyncStorage.setItem('userCoins', '0');
  };

  const addExpense = (data: Omit<Expense, 'id'>) => {
    const novaDespesa: Expense = {
      id: String(Date.now()),
      ...data,
    };
    setExpenses((prev) => [novaDespesa, ...prev]);
  };

  const total = useMemo(
    () => expenses.reduce((sum, e) => sum + e.amount, 0),
    [expenses]
  );

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        addExpense,
        total,
        coins,
        addCoins,
        resetCoins,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const ctx = useContext(ExpensesContext);
  if (!ctx) {
    throw new Error('useExpenses deve ser usado dentro de ExpensesProvider');
  }
  return ctx;
}
