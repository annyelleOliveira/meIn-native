import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useCoins, CoinType } from './CoinsContext';

export interface Investment {
  id: string;
  asset: CoinType;      // tipo da moeda: 'rendaFixa' | 'acoes' | 'fiis' | 'caixa'
  invested: number;     // quantidade investida em moedas
  description?: string;
  date: string;
}

interface InvestmentsContextProps {
  investments: Investment[];
  addInvestment: (inv: Omit<Investment, 'id'>) => void;
}

const InvestmentsContext = createContext<InvestmentsContextProps | undefined>(undefined);

export const InvestmentsProvider = ({ children }: { children: ReactNode }) => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const { spendCoins, coins } = useCoins(); // pegamos a função de gastar moedas

  const addInvestment = (inv: Omit<Investment, 'id'>) => {
    // Verifica se há saldo suficiente na moeda escolhida
    if (coins[inv.asset] < inv.invested) {
      console.warn(`Saldo insuficiente em ${inv.asset}`);
      return;
    }

    // Gasta as moedas correspondentes
    spendCoins(inv.asset, inv.invested);

    // Adiciona o investimento
    const newInvestment: Investment = {
      ...inv,
      id: Math.random().toString(36).substring(2, 9), // id simples
    };
    setInvestments(prev => [...prev, newInvestment]);
  };

  return (
    <InvestmentsContext.Provider value={{ investments, addInvestment }}>
      {children}
    </InvestmentsContext.Provider>
  );
};

export const useInvestments = () => {
  const context = useContext(InvestmentsContext);
  if (!context) throw new Error('useInvestments must be used within InvestmentsProvider');
  return context;
};
