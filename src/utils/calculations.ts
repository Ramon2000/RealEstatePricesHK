import { PropertyFormData, PropertyTransaction, PropertyComparison } from '@/types/property';

export function calculatePricePerSqFt(price: number, size: number): number {
  if (size <= 0) return 0;
  return Math.round(price / size);
}

export function calculatePercentageDifference(
  flyerPricePerSqFt: number,
  recentPricePerSqFt: number
): number {
  if (recentPricePerSqFt <= 0) return 0;
  return Math.round(((flyerPricePerSqFt - recentPricePerSqFt) / recentPricePerSqFt) * 100);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-HK', {
    style: 'currency',
    currency: 'HKD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatPricePerSqFt(pricePerSqFt: number): string {
  return `${new Intl.NumberFormat('en-HK').format(pricePerSqFt)}/sq.ft.`;
}

export function formatPercentageDifference(percentage: number): string {
  const sign = percentage > 0 ? '+' : '';
  return `${sign}${percentage}%`;
}

export function createPropertyComparison(
  formData: PropertyFormData,
  transactions: PropertyTransaction[]
): PropertyComparison {
  const flyerPricePerSqFt = calculatePricePerSqFt(formData.price, formData.size);
  const mostRecentTransaction = transactions[0];
  const percentageDifference = mostRecentTransaction
    ? calculatePercentageDifference(flyerPricePerSqFt, mostRecentTransaction.pricePerSqFt)
    : 0;

  return {
    flyerListing: {
      ...formData,
      pricePerSqFt: flyerPricePerSqFt,
    },
    recentTransactions: transactions,
    comparisonData: {
      percentageDifference,
      isOvervalued: percentageDifference > 0,
    },
  };
}