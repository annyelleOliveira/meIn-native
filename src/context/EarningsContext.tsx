import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Earning {
  id: string;
  description: string;
  amount: number;
  date: string;
}

interface EarningsContextProps {
  earnings: Earning[];
  addEarning: (entry: Omit<Earning, 'id'>) => void;
  totalBalance: number;
}

const EarningsContext = createContext<EarningsContextProps | undefined>(undefined);

export const EarningsProvider = ({ children }: { children: ReactNode }) => {
  const [earnings, setEarnings] = useState<Earning[]>([]);

  const addEarning = (entry: Omit<Earning, 'id'>) => {
    setEarnings(prev => [...prev, { ...entry, id: Date.now().toString() }]);
  };

  const totalBalance = earnings.reduce((sum, e) => sum + e.amount, 0);

  return (
    <EarningsContext.Provider value={{ earnings, addEarning, totalBalance }}>
      {children}
    </EarningsContext.Provider>
  );
};

// ✅ Exportar o hook corretamente
export const useEarnings = () => {
  const context = useContext(EarningsContext);
  if (!context) throw new Error('useEarnings must be used within EarningsProvider');
  return context;
};
