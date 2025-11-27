import React, { createContext, useContext, useState, ReactNode } from 'react';

export type CoinType = 'rendaFixa' | 'acoes' | 'fiis' | 'caixa';

interface CoinsContextProps {
  coins: Record<CoinType, number>;
  addCoins: (type: CoinType, amount: number) => void;
  spendCoins: (type: CoinType, amount: number) => void; // função para gastar moedas
}

const CoinsContext = createContext<CoinsContextProps | undefined>(undefined);

export const CoinsProvider = ({ children }: { children: ReactNode }) => {
  const [coins, setCoins] = useState<Record<CoinType, number>>({
    rendaFixa: 0,
    acoes: 0,
    fiis: 0,
    caixa: 0,
  });

  const addCoins = (type: CoinType, amount: number) => {
    setCoins(prev => ({ ...prev, [type]: prev[type] + amount }));
  };

  const spendCoins = (type: CoinType, amount: number) => {
    setCoins(prev => ({ ...prev, [type]: Math.max(prev[type] - amount, 0) }));
  };

  return (
    <CoinsContext.Provider value={{ coins, addCoins, spendCoins }}>
      {children}
    </CoinsContext.Provider>
  );
};

export const useCoins = () => {
  const context = useContext(CoinsContext);
  if (!context) throw new Error('useCoins must be used within CoinsProvider');
  return context;
};
