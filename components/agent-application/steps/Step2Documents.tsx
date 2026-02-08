import { api } from "@/lib/api";

export default function Step2({ data }) {
  const upload = async (type, file) => {
    const form = new FormData();
    form.append("file", file);
    await api.post(`/api/agent-applications/me/documents/${type}`, form);
  };

  return (
    <div>
      <h2>Documents</h2>

      <input type="file" onChange={(e) => upload("idCard", e.target.files[0])} />
      <input type="file" onChange={(e) => upload("selfie", e.target.files[0])} />
    </div>
  );
}
