import React, { useState, useMemo, useEffect } from 'react';
import { PeriodType, RateType } from './types';
import { calculateCompoundInterest } from './utils/financial';
import { ResultCards } from './components/ResultCards';
import { Visualizations } from './components/Visualizations';
import { DetailedTable } from './components/DetailedTable';
import { EducationalGuide } from './components/EducationalGuide';

// Helper to format currency input (ATM style: 1234 -> 12,34)
const formatCurrencyInput = (value: string) => {
  // Remove non-digits
  const numericValue = value.replace(/\D/g, '');
  
  // Handle empty or zero cases
  if (!numericValue) return '0,00';

  // Convert to float (cents)
  const floatValue = parseFloat(numericValue) / 100;
  
  // Format to pt-BR
  return floatValue.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

// Helper to parse formatted currency string back to number for calculation
const parseCurrencyToNumber = (value: string) => {
  if (!value) return 0;
  const cleanValue = value.replace(/\./g, '').replace(',', '.');
  return parseFloat(cleanValue) || 0;
};

function App() {
  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Form State initialized with formatted values
  const [initialValue, setInitialValue] = useState<string>('0,00');
  const [monthlyValue, setMonthlyValue] = useState<string>('500,00');
  
  const [rate, setRate] = useState<string>('10');
  const [rateType, setRateType] = useState<RateType>(RateType.YEARLY);
  const [period, setPeriod] = useState<string>('30');
  const [periodType, setPeriodType] = useState<PeriodType>(PeriodType.YEARS);

  // Calculation Result State
  const calculationResult = useMemo(() => {
    const initial = parseCurrencyToNumber(initialValue);
    const monthly = parseCurrencyToNumber(monthlyValue);
    const r = parseFloat(rate) || 0;
    const p = parseFloat(period) || 0;

    return calculateCompoundInterest(initial, monthly, r, rateType, p, periodType);
  }, [initialValue, monthlyValue, rate, rateType, period, periodType]);

  // Handler for currency inputs
  const handleCurrencyChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      // If user deletes everything, visually reset to 0,00 or handle in formatter
      if (val === '') {
         setter('0,00');
         return;
      }
      setter(formatCurrencyInput(val));
  };

  // Handler for regular number inputs (Rate, Period)
  const handleNumberInput = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === '') {
          setter('');
          return;
      }
      // Allow decimals for rate/period if needed, though usually ints for years
      if (/^\d*\.?\d*$/.test(e.target.value)) {
          setter(e.target.value);
      }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="mb-12 text-center relative">
            {/* Dark Mode Toggle */}
            <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="absolute right-0 top-0 p-3 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-yellow-400 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors shadow-sm"
                aria-label="Alternar modo escuro"
            >
                {isDarkMode ? '☀️' : '🌙'}
            </button>

          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-blue-400 mb-4 tracking-tight transition-colors">
            Calculadora do Primeiro Milhão 💰
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto transition-colors">
            Planeje sua liberdade financeira. Simule o poder dos juros compostos e descubra quanto tempo falta para atingir seus objetivos.
          </p>
        </header>

        {/* Main Input Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 md:p-10 mb-12 relative overflow-hidden transition-colors duration-300">
            <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-400 mb-8 relative z-10 transition-colors">Parâmetros do Investimento</h2>
            
            {/* Currency Inputs Group */}
            <div className="border-2 border-blue-300 dark:border-blue-700 rounded-xl p-6 mb-8 bg-blue-50/30 dark:bg-blue-900/20 relative transition-colors duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Initial Value */}
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider transition-colors">
                            Valor Inicial (R$)
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">R$</span>
                            <input 
                                type="text"
                                value={initialValue}
                                onChange={handleCurrencyChange(setInitialValue)}
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-xl text-xl font-bold text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all focus:scale-[1.015] focus:shadow-lg origin-center"
                                placeholder="0,00"
                            />
                        </div>
                    </div>

                    {/* Monthly Value */}
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider transition-colors">
                            Valor Mensal (R$)
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">R$</span>
                            <input 
                                type="text"
                                value={monthlyValue}
                                onChange={handleCurrencyChange(setMonthlyValue)}
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-xl text-xl font-bold text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all focus:scale-[1.015] focus:shadow-lg origin-center"
                                placeholder="0,00"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Other Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Interest Rate */}
                <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider transition-colors">
                        Taxa de Juros (%)
                    </label>
                    <div className="flex gap-0">
                        <input 
                            type="text"
                            value={rate}
                            onChange={handleNumberInput(setRate)}
                            className="w-full pl-4 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-l-xl text-xl font-bold text-slate-800 dark:text-white focus:ring-2 focus:ring-slate-400 focus:border-slate-400 outline-none z-10 transition-all focus:scale-[1.015] focus:shadow-lg focus:z-20"
                            placeholder="10"
                        />
                        <select 
                            value={rateType}
                            onChange={(e) => setRateType(e.target.value as RateType)}
                            className="bg-slate-100 dark:bg-slate-700 border-y border-r border-slate-200 dark:border-slate-600 rounded-r-xl px-4 py-4 text-slate-600 dark:text-slate-200 font-bold hover:bg-slate-200 dark:hover:bg-slate-600 cursor-pointer outline-none focus:ring-2 focus:ring-slate-400 transition-all focus:scale-[1.015] focus:shadow-lg focus:z-20"
                        >
                            <option value={RateType.YEARLY}>Anual</option>
                            <option value={RateType.MONTHLY}>Mensal</option>
                        </select>
                    </div>
                </div>

                {/* Period */}
                <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider transition-colors">
                        Período
                    </label>
                    <div className="flex gap-0">
                        <input 
                            type="text"
                            value={period}
                            onChange={handleNumberInput(setPeriod)}
                            className="w-full pl-4 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-l-xl text-xl font-bold text-slate-800 dark:text-white focus:ring-2 focus:ring-slate-400 focus:border-slate-400 outline-none z-10 transition-all focus:scale-[1.015] focus:shadow-lg focus:z-20"
                            placeholder="30"
                        />
                         <select 
                            value={periodType}
                            onChange={(e) => setPeriodType(e.target.value as PeriodType)}
                            className="bg-slate-100 dark:bg-slate-700 border-y border-r border-slate-200 dark:border-slate-600 rounded-r-xl px-4 py-4 text-slate-600 dark:text-slate-200 font-bold hover:bg-slate-200 dark:hover:bg-slate-600 cursor-pointer outline-none focus:ring-2 focus:ring-slate-400 transition-all focus:scale-[1.015] focus:shadow-lg focus:z-20"
                        >
                            <option value={PeriodType.YEARS}>Anos</option>
                            <option value={PeriodType.MONTHS}>Meses</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        {/* Results Section */}
        <div className="animate-fade-in">
             <ResultCards stats={calculationResult.stats} />
             <Visualizations data={calculationResult.data} stats={calculationResult.stats} isDarkMode={isDarkMode} />
             <DetailedTable data={calculationResult.data} />
        </div>

        {/* Guide */}
        <EducationalGuide />

        {/* Footer */}
        <footer className="mt-24 text-center text-slate-400 dark:text-slate-500 pb-8">
            <p>Feito com ❤️ para seu futuro financeiro.</p>
        </footer>

      </div>
    </div>
  );
}

export default App;