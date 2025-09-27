import { PropertyComparison } from '@/types/property';
import { formatPrice, formatPricePerSqFt, formatPercentageDifference } from '@/utils/calculations';

interface ResultsTableProps {
  comparison: PropertyComparison;
}

export default function ResultsTable({ comparison }: ResultsTableProps) {
  const { flyerListing, recentTransactions, comparisonData } = comparison;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Price Comparison Results</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Bedrooms</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Size (sq.ft.)</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Price/sq.ft.</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Date/Difference</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Source</th>
            </tr>
          </thead>
          <tbody>
            {/* Flyer Listing Row */}
            <tr className="border-b border-gray-200 bg-blue-50">
              <td className="py-3 px-4 font-medium text-blue-900">
                Flyer Listing
                <div className="text-sm text-blue-700">{flyerListing.propertyName}</div>
              </td>
              <td className="py-3 px-4">{flyerListing.bedrooms}</td>
              <td className="py-3 px-4">{flyerListing.size.toLocaleString()}</td>
              <td className="py-3 px-4 font-medium">{formatPrice(flyerListing.price)}</td>
              <td className="py-3 px-4 font-medium">{formatPricePerSqFt(flyerListing.pricePerSqFt)}</td>
              <td className="py-3 px-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    comparisonData.isOvervalued
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {formatPercentageDifference(comparisonData.percentageDifference)}
                  {comparisonData.isOvervalued ? ' above' : ' below'} recent
                </span>
              </td>
              <td className="py-3 px-4 text-gray-500">Brochure</td>
            </tr>

            {/* Recent Transactions */}
            {recentTransactions.map((transaction, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <span className="text-gray-600">Recent Transaction #{index + 1}</span>
                </td>
                <td className="py-3 px-4">{transaction.bedrooms}</td>
                <td className="py-3 px-4">{transaction.size.toLocaleString()}</td>
                <td className="py-3 px-4">{formatPrice(transaction.price)}</td>
                <td className="py-3 px-4">{formatPricePerSqFt(transaction.pricePerSqFt)}</td>
                <td className="py-3 px-4 text-gray-600">
                  {new Date(transaction.saleDate).toLocaleDateString('en-HK', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td className="py-3 px-4">
                  <a
                    href={transaction.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {transaction.source}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-2">Analysis Summary</h4>
        <p className="text-gray-700">
          The flyer listing at {formatPricePerSqFt(flyerListing.pricePerSqFt)} is{' '}
          <span
            className={`font-semibold ${
              comparisonData.isOvervalued ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {formatPercentageDifference(Math.abs(comparisonData.percentageDifference))}
            {comparisonData.isOvervalued ? ' higher' : ' lower'}
          </span>{' '}
          than the most recent comparable transaction at{' '}
          {formatPricePerSqFt(recentTransactions[0]?.pricePerSqFt || 0)}.
        </p>
        {comparisonData.isOvervalued && (
          <p className="text-red-600 text-sm mt-1">
            ⚠️ This suggests the brochure pricing may be inflated compared to recent market sales.
          </p>
        )}
      </div>
    </div>
  );
}