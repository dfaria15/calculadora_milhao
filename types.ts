export interface CalculationData {
  month: number;
  year: number;
  invested: number;
  interest: number;
  total: number;
  interestMonth: number;
}

export interface SummaryStats {
  totalInvested: number;
  totalInterest: number;
  totalAmount: number;
  monthsToMillion: number | null;
}

export enum PeriodType {
  YEARS = 'anos',
  MONTHS = 'meses'
}

export enum RateType {
  YEARLY = 'anual',
  MONTHLY = 'mensal'
}