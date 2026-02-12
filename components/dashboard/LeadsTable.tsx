export default function LeadsTable() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-md">
      <h3 className="font-semibold mb-3">New Leads</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th>Name</th>
            <th>Interest</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {["John", "Sarah", "Mike"].map((name) => (
            <tr key={name} className="border-t">
              <td>{name}</td>
              <td>Apartment</td>
              <td className="text-green-600">Hot</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
