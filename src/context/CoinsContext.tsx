import React, { createContext, useContext, useState, ReactNode } from 'react';

// ✅ export CoinType
export type CoinType = 'rendaFixa' | 'acoes' | 'fiis' | 'caixa';

interface Coins {
  [key: string]: number;
}

interface CoinsContextProps {
  coins: Coins;
  addCoins: (type: CoinType, amount: number) => void;
  spendCoins: (type: CoinType, amount: number) => boolean;
}

const CoinsContext = createContext<CoinsContextProps | undefined>(undefined);

export const CoinsProvider = ({ children }: { children: ReactNode }) => {
  const [coins, setCoins] = useState<Coins>({
    rendaFixa: 0,
    acoes: 0,
    fiis: 0,
    caixa: 0,
  });

  const addCoins = (type: CoinType, amount: number) => {
    setCoins(prev => ({ ...prev, [type]: (prev[type] || 0) + amount }));
  };

  const spendCoins = (type: CoinType, amount: number) => {
    if ((coins[type] || 0) < amount) return false;
    setCoins(prev => ({ ...prev, [type]: prev[type] - amount }));
    return true;
  };

  return (
    <CoinsContext.Provider value={{ coins, addCoins, spendCoins }}>
      {children}
    </CoinsContext.Provider>
  );
};

// ✅ Exportar hook
export const useCoins = () => {
  const context = useContext(CoinsContext);
  if (!context) throw new Error('useCoins must be used within CoinsProvider');
  return context;
};
