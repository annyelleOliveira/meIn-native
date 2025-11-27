import React, { createContext, useContext, useState, ReactNode } from 'react';
import { nanoid } from 'nanoid/non-secure';

export interface Investment {
  id: string;
  description: string;
  invested: number;
  assetType: 'rendaFixa' | 'acoes' | 'fiis' | 'caixa';
  date: string;
}

interface InvestmentsContextProps {
  investments: Investment[];
  addInvestment: (inv: Omit<Investment, 'id'>) => void;
}

const InvestmentsContext = createContext<InvestmentsContextProps | undefined>(undefined);

export const InvestmentsProvider = ({ children }: { children: ReactNode }) => {
  const [investments, setInvestments] = useState<Investment[]>([]);

  const addInvestment = (inv: Omit<Investment, 'id'>) => {
    setInvestments(prev => [...prev, { ...inv, id: nanoid() }]);
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
