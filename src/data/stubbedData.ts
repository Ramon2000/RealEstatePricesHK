import { PropertyTransaction } from '@/types/property';
import { calculatePricePerSqFt } from '@/utils/calculations';

// Stubbed transaction data for Hong Kong properties
export const stubbedTransactions: PropertyTransaction[] = [
  {
    bedrooms: 2,
    size: 850,
    price: 9200000,
    pricePerSqFt: calculatePricePerSqFt(9200000, 850),
    saleDate: '2024-08-15',
    source: 'Spacious.hk',
    sourceUrl: 'https://www.spacious.hk/en/hong-kong',
  },
  {
    bedrooms: 2,
    size: 820,
    price: 8800000,
    pricePerSqFt: calculatePricePerSqFt(8800000, 820),
    saleDate: '2024-07-22',
    source: 'CentaNet',
    sourceUrl: 'https://hk.centanet.com/findproperty/',
  },
  {
    bedrooms: 2,
    size: 880,
    price: 9500000,
    pricePerSqFt: calculatePricePerSqFt(9500000, 880),
    saleDate: '2024-06-10',
    source: 'Midland Realty',
    sourceUrl: 'https://www.midland.com.hk/en',
  },
];

export const getRecentTransactions = (propertyName: string): PropertyTransaction[] => {
  // In a real implementation, this would filter based on property name
  // For now, return the same stubbed data for all properties
  return stubbedTransactions;
};