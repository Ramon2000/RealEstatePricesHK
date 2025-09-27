'use client';

import { useState } from 'react';
import { PropertyFormData, FormErrors } from '@/types/property';

interface PropertyFormProps {
  onSubmit: (data: PropertyFormData) => void;
  isLoading?: boolean;
}

export default function PropertyForm({ onSubmit, isLoading = false }: PropertyFormProps) {
  const [formData, setFormData] = useState<PropertyFormData>({
    propertyName: '',
    bedrooms: 0,
    size: 0,
    price: 0,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.propertyName.trim()) {
      newErrors.propertyName = 'Property name is required';
    }

    if (formData.bedrooms <= 0) {
      newErrors.bedrooms = 'Number of bedrooms must be greater than 0';
    }

    if (formData.size <= 0) {
      newErrors.size = 'Size must be greater than 0';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof PropertyFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Add Property Listing</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="propertyName" className="block text-sm font-medium text-gray-700 mb-1">
            Property Name
          </label>
          <input
            type="text"
            id="propertyName"
            value={formData.propertyName}
            onChange={(e) => handleInputChange('propertyName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.propertyName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., The Peak Residences"
            disabled={isLoading}
          />
          {errors.propertyName && (
            <p className="mt-1 text-sm text-red-600">{errors.propertyName}</p>
          )}
        </div>

        <div>
          <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
            Bedrooms
          </label>
          <input
            type="number"
            id="bedrooms"
            min="1"
            value={formData.bedrooms || ''}
            onChange={(e) => handleInputChange('bedrooms', parseInt(e.target.value) || 0)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.bedrooms ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="2"
            disabled={isLoading}
          />
          {errors.bedrooms && (
            <p className="mt-1 text-sm text-red-600">{errors.bedrooms}</p>
          )}
        </div>

        <div>
          <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
            Size (sq.ft.)
          </label>
          <input
            type="number"
            id="size"
            min="1"
            value={formData.size || ''}
            onChange={(e) => handleInputChange('size', parseInt(e.target.value) || 0)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.size ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="800"
            disabled={isLoading}
          />
          {errors.size && (
            <p className="mt-1 text-sm text-red-600">{errors.size}</p>
          )}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price (HKD)
          </label>
          <input
            type="number"
            id="price"
            min="1"
            value={formData.price || ''}
            onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.price ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="8000000"
            disabled={isLoading}
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Analyzing...' : 'Compare Prices'}
        </button>
      </form>
    </div>
  );
}