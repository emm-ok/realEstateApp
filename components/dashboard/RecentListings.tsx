export default function RecentListings() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-md">
      <h3 className="font-semibold mb-3">Recent Listings</h3>
      <ul className="space-y-3">
        {["3 Bedroom Duplex", "Luxury Apartment", "Office Space"].map(
          (item, i) => (
            <li key={i} className="flex justify-between text-sm">
              <span>{item}</span>
              <span className="text-gray-500">$250,000</span>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
