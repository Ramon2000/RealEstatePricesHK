export default function Home() {
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
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Add Property Listing</h3>
        <p className="text-gray-500">Property input form will be added here</p>
      </div>
    </div>
  )
}