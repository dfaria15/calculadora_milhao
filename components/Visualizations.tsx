import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts';
import { CalculationData, SummaryStats } from '../types';
import { formatCurrency } from '../utils/financial';

interface VisualizationsProps {
  data: CalculationData[];
  stats: SummaryStats;
  isDarkMode: boolean;
}

export const Visualizations: React.FC<VisualizationsProps> = ({ data, stats, isDarkMode }) => {
  
  // Filter data for Line Chart to avoid overcrowding (e.g., only show every 12th month if periods > 5 years)
  const isLongTerm = data.length > 60;
  const chartData = data.filter((d, i) => {
      if (i === 0 || i === data.length - 1) return true; // Always show first and last
      if (isLongTerm) return d.month % 12 === 0; // Show yearly points for long term
      return true;
  });
  
  // Colors based on dark mode
  // Light mode: Slate-600 (#52525b), Red-800 (#991b1b)
  // Dark mode: Slate-400 (#94a3b8), Red-400 (#f87171)
  const COLORS = isDarkMode ? ['#94a3b8', '#f87171'] : ['#52525b', '#991b1b'];
  const areaColors = isDarkMode ? { total: '#f87171', invested: '#94a3b8' } : { total: '#991b1b', invested: '#52525b' };

  const pieData = [
    { name: 'Valor Investido', value: stats.totalInvested },
    { name: 'Total em Juros', value: stats.totalInterest },
  ];

  return (
    <div className="space-y-12">
      
      {/* Section Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 transition-colors">Composição do Patrimônio 🍰</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Pie Chart Card */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center min-h-[400px] transition-colors">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                    formatter={(value: number) => formatCurrency(value)} 
                    contentStyle={{ 
                        backgroundColor: isDarkMode ? '#1e293b' : '#fff',
                        borderColor: isDarkMode ? '#334155' : '#e2e8f0',
                        color: isDarkMode ? '#fff' : '#000',
                        borderRadius: '8px'
                    }}
                />
                <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconType="circle" 
                    formatter={(value) => <span style={{ color: isDarkMode ? '#cbd5e1' : '#475569' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="w-full mt-6 space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg transition-colors">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[0] }}></div>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors">Investido</span>
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-200 transition-colors">{formatCurrency(stats.totalInvested)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg transition-colors">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[1] }}></div>
                        <span className="text-sm font-medium text-red-800 dark:text-red-300 transition-colors">Juros</span>
                    </div>
                    <span className="font-bold text-red-800 dark:text-red-300 transition-colors">{formatCurrency(stats.totalInterest)}</span>
                </div>
            </div>
        </div>

        {/* Stats/Power of Compound Interest */}
        <div className="space-y-6">
             <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 p-8 rounded-2xl text-center transition-colors">
                 <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2 transition-colors">Poder dos Juros Compostos 🌱</h3>
                 <p className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2 transition-colors">
                     {stats.totalInvested > 0 ? ((stats.totalInterest / stats.totalInvested) * 100).toFixed(0) : 0}%
                 </p>
                 <p className="text-green-700 dark:text-green-300 text-sm transition-colors">mais em rendimentos do que investido</p>
             </div>
             
             <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-8 rounded-2xl text-center transition-colors">
                 <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2 transition-colors">Tempo para a Meta ⏳</h3>
                 <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 transition-colors">
                     {stats.monthsToMillion ? formatCurrency(1000000) : 'Continue...'}
                 </p>
                 {stats.monthsToMillion && (
                    <p className="text-blue-700 dark:text-blue-300 mt-2 text-lg transition-colors">
                        Atingido em <strong>{Math.floor(stats.monthsToMillion / 12)} anos e {stats.monthsToMillion % 12} meses</strong>
                    </p>
                 )}
             </div>
        </div>
      </div>

      <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 transition-colors">Evolução no Tempo 📈</h2>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 h-[400px] transition-colors">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                data={chartData}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
                >
                <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={areaColors.total} stopOpacity={0.1}/>
                        <stop offset="95%" stopColor={areaColors.total} stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#334155" : "#f1f5f9"} />
                <XAxis 
                    dataKey="month" 
                    tickFormatter={(month) => {
                        const year = Math.floor(month / 12);
                        return year > 0 ? `${year} ano${year > 1 ? 's' : ''}` : `${month}m`;
                    }}
                    stroke="#94a3b8"
                    fontSize={12}
                    minTickGap={30}
                />
                <YAxis 
                    tickFormatter={(value) => {
                        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                        if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
                        return value;
                    }}
                    stroke="#94a3b8"
                    fontSize={12}
                />
                <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), '']}
                    labelFormatter={(label) => {
                        const year = Math.floor(Number(label) / 12);
                        const month = Number(label) % 12;
                        return `${year} anos e ${month} meses`;
                    }}
                    contentStyle={{ 
                        borderRadius: '8px', 
                        border: isDarkMode ? '1px solid #334155' : 'none',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        backgroundColor: isDarkMode ? '#1e293b' : '#fff',
                        color: isDarkMode ? '#fff' : '#000'
                    }}
                />
                <Area 
                    type="monotone" 
                    dataKey="total" 
                    name="Total Acumulado"
                    stroke={areaColors.total} 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorTotal)" 
                />
                <Area 
                    type="monotone" 
                    dataKey="invested" 
                    name="Valor Investido"
                    stroke={areaColors.invested} 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    fill="none" 
                />
                </AreaChart>
            </ResponsiveContainer>
          </div>
      </div>

    </div>
  );
};