import {api} from "@/lib/api";

export default function Step3() {
  const submit = async () => {
    await api.post("/api/agent-applications/me/submit");
    // window.location.href = "/agent-application/submitted";
  };

  return (
    <div>
      <h2>Review & Submit</h2>
      <button onClick={submit}>Submit Application</button>
    </div>
  );
}
