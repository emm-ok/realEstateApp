"use client"

import BecomeAgentForm from "@/components/BecomeAgentForm";

const Page = () => {
  
  return(
    <BecomeAgentForm />
  );
}

export default Page




// function useApplicationProgress(userId: string) {
//   const key = `agent_app_${userId}`;

//   const [step, setStep] = useState(() => {
//     const saved = localStorage.getItem(key);
//     return saved ? Number(saved) : 1;
//   });

//   useEffect(() => {
//     localStorage.setItem(key, String(step));
//   }, [step]);

//   return { step, setStep };
// }



// const steps = [
//   "Personal Info",
//   "Professional Info",
//   "Verification",
//   "Profile",
//   "Review",
// ];

// export default function AgentApplicationForm({ user }) {
//   const { step, setStep } = useApplicationProgress(user._id);
//   const [data, setData] = useState<AgentApplicationDraft>();

//   return (
//     <div className="max-w-3xl mx-auto">
//       <StepTracker steps={steps} current={step} />

//       {step === 1 && <PersonalStep data={data} setData={setData} />}
//       {step === 2 && <ProfessionalStep data={data} setData={setData} />}
//       {step === 3 && <VerificationStep data={data} setData={setData} />}
//       {step === 4 && <ProfileStep data={data} setData={setData} />}
//       {step === 5 && <ReviewStep data={data} />}

//       <div className="flex justify-between mt-6">
//         {step > 1 && (
//           <button onClick={() => setStep(step - 1)}>Back</button>
//         )}
//         {step < 5 && (
//           <button onClick={() => setStep(step + 1)}>Next</button>
//         )}
//       </div>
//     </div>
//   );
// }







// function StepTracker({ steps, current }) {
//   return (
//     <div className="flex justify-between mb-8">
//       {steps.map((label, i) => {
//         const index = i + 1;
//         const active = index <= current;

//         return (
//           <div key={label} className="flex items-center gap-2">
//             <div
//               className={`w-8 h-8 rounded-full flex items-center justify-center
//               ${active ? "bg-black text-white" : "bg-gray-200"}`}
//             >
//               {index}
//             </div>
//             <span className={active ? "font-medium" : "text-gray-400"}>
//               {label}
//             </span>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
