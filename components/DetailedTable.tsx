import React, { useState } from 'react';
import { CalculationData } from '../types';
import { formatCurrency } from '../utils/financial';

interface DetailedTableProps {
  data: CalculationData[];
}

export const DetailedTable: React.FC<DetailedTableProps> = ({ data }) => {
  const [showAll, setShowAll] = useState(false);

  // Group by year (taking the last month of each year)
  const yearlyData = data.filter(d => d.month > 0 && d.month % 12 === 0);
  
  // If calculation ends mid-year, include the last month too
  const lastPoint = data[data.length - 1];
  if (lastPoint.month % 12 !== 0 && lastPoint.month !== 0) {
      yearlyData.push(lastPoint);
  }

  // Basic pagination or limit
  const displayData = showAll ? yearlyData : yearlyData.slice(0, 10);

  return (
    <div className="mt-16 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors">
      <div className="p-6 border-b border-slate-100 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 text-center transition-colors">Detalhamento Anual 📋</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-600 dark:text-slate-400">
            <thead className="text-xs text-slate-700 dark:text-slate-300 uppercase bg-slate-50 dark:bg-slate-700 transition-colors">
                <tr>
                    <th className="px-6 py-4 text-center">Tempo</th>
                    <th className="px-6 py-4 text-right">Investido Total</th>
                    <th className="px-6 py-4 text-right">Juros Acumulados</th>
                    <th className="px-6 py-4 text-right font-bold text-slate-900 dark:text-white">Total Acumulado</th>
                </tr>
            </thead>
            <tbody>
                {displayData.map((row) => (
                    <tr key={row.month} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        <td className="px-6 py-4 text-center font-medium text-slate-900 dark:text-slate-200 transition-colors">
                            {Math.floor(row.month / 12) > 0 ? `${Math.floor(row.month / 12)} anos` : ''} 
                            {row.month % 12 > 0 ? ` ${row.month % 12}m` : ''}
                        </td>
                        <td className="px-6 py-4 text-right">
                            {formatCurrency(row.invested)}
                        </td>
                        <td className="px-6 py-4 text-right text-green-600 dark:text-green-400 font-medium transition-colors">
                            +{formatCurrency(row.interest)}
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-slate-900 dark:text-white transition-colors">
                            {formatCurrency(row.total)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
      
      {!showAll && yearlyData.length > 10 && (
          <div className="p-4 bg-slate-50 dark:bg-slate-900 text-center transition-colors">
              <button 
                onClick={() => setShowAll(true)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold text-sm transition-colors"
              >
                  Ver todo o período ({yearlyData.length} anos) 👇
              </button>
          </div>
      )}
    </div>
  );
};