export function ReauthModal({ open, onConfirm }) {
  if (!open) return null;

  return (
    <div role="dialog" className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96">
        <h3 className="font-semibold mb-2">Re-authenticate</h3>
        <input type="password" placeholder="Password" className="input" />
        <button onClick={onConfirm} className="btn-primary mt-4">
          Confirm
        </button>
      </div>
    </div>
  );
}
