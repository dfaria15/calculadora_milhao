import React from 'react';
import { SummaryStats } from '../types';
import { formatCurrency, formatTime } from '../utils/financial';

interface ResultCardsProps {
  stats: SummaryStats;
}

export const ResultCards: React.FC<ResultCardsProps> = ({ stats }) => {
  const roi = stats.totalInvested > 0 
    ? ((stats.totalAmount - stats.totalInvested) / stats.totalInvested) * 100 
    : 0;

  return (
    <div className="space-y-6 mb-12">
      <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6 transition-colors">Resultado 🎯</h2>
      
      {/* Million Message */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-6 text-center shadow-sm transition-colors">
        {stats.monthsToMillion !== null ? (
          <>
            <p className="text-lg text-blue-800 dark:text-blue-300 font-medium mb-2 transition-colors">
              🚀 Você atingirá R$ 1 milhão em:
            </p>
            <p className="text-4xl font-bold text-blue-900 dark:text-blue-100 transition-colors">
              {formatTime(stats.monthsToMillion)}
            </p>
          </>
        ) : (
          <p className="text-xl text-blue-800 dark:text-blue-300 font-medium transition-colors">
            Continue investindo para alcançar o primeiro milhão! 💪
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Final Total */}
        <div className="bg-red-900 dark:bg-red-950 text-white rounded-xl p-8 shadow-lg transform hover:-translate-y-1 transition-all duration-300">
          <p className="text-red-200 font-medium text-lg mb-1">Valor Total Final</p>
          <p className="text-3xl font-bold tracking-tight">
            {formatCurrency(stats.totalAmount)}
          </p>
        </div>

        {/* Invested */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 shadow-sm transition-colors">
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg mb-1 transition-colors">Total Investido</p>
          <p className="text-3xl font-bold text-slate-700 dark:text-slate-200 transition-colors">
            {formatCurrency(stats.totalInvested)}
          </p>
          <div className="mt-2 text-sm text-slate-400 dark:text-slate-500 transition-colors">
            Seu esforço direto 💼
          </div>
        </div>

        {/* Interest */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 shadow-sm transition-colors">
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg mb-1 transition-colors">Total em Juros</p>
          <p className="text-3xl font-bold text-slate-700 dark:text-slate-200 transition-colors">
            {formatCurrency(stats.totalInterest)}
          </p>
          <div className="mt-2 text-sm text-green-600 dark:text-green-400 font-semibold transition-colors">
            +{roi.toFixed(0)}% de rentabilidade 📈
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 p-4 rounded-r-md text-yellow-800 dark:text-yellow-200 text-sm transition-colors">
        <strong>Considerações Importantes:</strong>
        <ul className="mt-2 list-disc list-inside space-y-1">
           <li>Este cálculo não considera Imposto de Renda sobre rendimentos.</li>
           <li>A inflação pode reduzir o poder de compra do valor final.</li>
           <li>Rentabilidades podem variar ao longo do tempo.</li>
        </ul>
      </div>
    </div>
  );
};