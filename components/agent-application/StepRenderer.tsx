export default function StepRenderer({
  step,
  ...app
}: any) {
  const StepComponent = step.component;

  return (
    <StepComponent {...app}/>
  );
}
