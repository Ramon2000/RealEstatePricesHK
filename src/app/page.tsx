'use client';

import { useState } from 'react';
import PropertyForm from '@/components/PropertyForm';
import ResultsTable from '@/components/ResultsTable';
import { PropertyFormData, PropertyComparison } from '@/types/property';
import { createPropertyComparison } from '@/utils/calculations';
import { getRecentTransactions } from '@/data/stubbedData';

export default function Home() {
  const [comparison, setComparison] = useState<PropertyComparison | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (formData: PropertyFormData) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get stubbed transaction data
    const transactions = getRecentTransactions(formData.propertyName);
    
    // Create comparison data
    const comparisonData = createPropertyComparison(formData, transactions);
    
    setComparison(comparisonData);
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Property Price Comparison Tool
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Compare property flyer prices with actual transaction data to see if brochure pricing is inflated
        </p>
      </div>
      
      <PropertyForm onSubmit={handleFormSubmit} isLoading={isLoading} />
      
      {comparison && <ResultsTable comparison={comparison} />}
    </div>
  );
}