export interface PropertyFormData {
  propertyName: string;
  bedrooms: number;
  size: number; // in sq.ft.
  price: number; // in HKD
}

export interface PropertyTransaction {
  bedrooms: number;
  size: number; // in sq.ft.
  price: number; // in HKD
  pricePerSqFt: number; // calculated
  saleDate: string;
  source: string;
  sourceUrl: string;
}

export interface PropertyComparison {
  flyerListing: PropertyFormData & {
    pricePerSqFt: number;
  };
  recentTransactions: PropertyTransaction[];
  comparisonData: {
    percentageDifference: number; // vs most recent transaction
    isOvervalued: boolean;
  };
}

export interface FormErrors {
  propertyName?: string;
  bedrooms?: string;
  size?: string;
  price?: string;
}