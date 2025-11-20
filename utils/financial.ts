import { CalculationData, SummaryStats, PeriodType, RateType } from '../types';

export const calculateCompoundInterest = (
  initial: number,
  monthly: number,
  rate: number,
  rateType: RateType,
  period: number,
  periodType: PeriodType
): { data: CalculationData[]; stats: SummaryStats } => {
  
  // Normalize time to months
  const totalMonths = periodType === PeriodType.YEARS ? period * 12 : period;

  // Normalize rate to monthly decimal
  let monthlyRate = 0;
  if (rateType === RateType.YEARLY) {
    // (1 + r_annual) = (1 + r_monthly)^12  => r_monthly = (1 + r_annual)^(1/12) - 1
    monthlyRate = Math.pow(1 + rate / 100, 1 / 12) - 1;
  } else {
    monthlyRate = rate / 100;
  }

  let currentTotal = initial;
  let totalInvested = initial;
  const data: CalculationData[] = [];
  let monthsToMillion: number | null = null;

  // Initial point (Month 0)
  if (totalMonths >= 0) {
      data.push({
          month: 0,
          year: 0,
          invested: initial,
          interest: 0,
          total: initial,
          interestMonth: 0
      });
  }

  if (initial >= 1000000) {
    monthsToMillion = 0;
  }

  for (let i = 1; i <= totalMonths; i++) {
    const interestAmount = currentTotal * monthlyRate;
    currentTotal += interestAmount + monthly;
    totalInvested += monthly;

    if (monthsToMillion === null && currentTotal >= 1000000) {
      monthsToMillion = i;
    }

    // We only push data points for charts/tables annually if period is long, 
    // or monthly if period is short to avoid massive arrays.
    // For the table, we usually want annual summary, but charts might want granularity.
    // Let's store all months but maybe filter later for display.
    
    data.push({
      month: i,
      year: Math.floor(i / 12),
      invested: totalInvested,
      interest: currentTotal - totalInvested,
      total: currentTotal,
      interestMonth: interestAmount
    });
  }

  return {
    data,
    stats: {
      totalInvested,
      totalInterest: currentTotal - totalInvested,
      totalAmount: currentTotal,
      monthsToMillion
    }
  };
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatTime = (totalMonths: number) => {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  
  let result = "";
  if (years > 0) result += `${years} anos`;
  if (years > 0 && months > 0) result += " e ";
  if (months > 0) result += `${months} meses`;
  if (result === "") result = "menos de 1 mês";
  
  return result;
};