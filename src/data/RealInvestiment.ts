// src/data/investmentsData.ts
export type RealInvestment = {
  id: string;
  name: string;
  type: 'CDB' | 'FII' | 'Ação' | 'Tesouro';
  minAmount: number;       // mínimo para investir
  expectedReturn: number;  // percentual anual aproximado
};

export const realInvestments: RealInvestment[] = [
  { id: 'cdb1', name: 'CDB 120% CDI', type: 'CDB', minAmount: 100, expectedReturn: 12 },
  { id: 'fii1', name: 'FII HGLG11', type: 'FII', minAmount: 50, expectedReturn: 7 },
  { id: 'acao1', name: 'Ação PETR4', type: 'Ação', minAmount: 10, expectedReturn: 15 },
  { id: 'tesouro1', name: 'Tesouro Selic 2027', type: 'Tesouro', minAmount: 30, expectedReturn: 6 },
];
