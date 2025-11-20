import React from 'react';

export const EducationalGuide: React.FC = () => {
  return (
    <div className="mt-24 max-w-4xl mx-auto space-y-12 text-slate-700 dark:text-slate-300 transition-colors">
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">Como usar a Calculadora do Primeiro Milhão 🤔</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-3 transition-colors">1. Informe o valor inicial</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
              Digite quanto você já tem investido hoje. Se está começando do zero, deixe R$ 0,00.
            </p>
          </div>
          
           <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-3 transition-colors">2. Defina os aportes</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
              Quanto você consegue investir por mês? A consistência é a chave para o sucesso.
            </p>
          </div>

           <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-3 transition-colors">3. Taxa de Juros</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
              Use 8% a 10% ao ano como referência conservadora para renda variável ou mista no Brasil.
            </p>
          </div>
          
           <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-3 transition-colors">4. O Tempo</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
              Defina por quanto tempo deseja investir e veja a mágica dos juros compostos acontecer.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-slate-100 dark:bg-slate-700 rounded-2xl p-8 transition-colors">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 transition-colors">Metodologia dos Juros Compostos 📚</h2>
        <p className="mb-4">
          Nossa calculadora utiliza a fórmula clássica dos juros compostos com aportes mensais. 
          O cálculo é feito mês a mês para garantir maior precisão, considerando o reinvestimento automático dos rendimentos.
        </p>
        
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mt-6 mb-2 transition-colors">Quando buscar orientação profissional?</h3>
        <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Para estratégias personalizadas de acumulação de patrimônio.</li>
            <li>Para escolha de produtos específicos (Ações, FIIs, Renda Fixa).</li>
            <li>Para otimização tributária e planejamento de aposentadoria.</li>
        </ul>
      </div>

    </div>
  );
};