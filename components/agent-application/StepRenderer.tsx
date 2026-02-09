export default function StepRenderer({
  step,
  formData,
  updateForm,
  localDocs,
  setLocalDocs,
  loading,
}: any) {
  const StepComponent = step.component;

  return (
    <StepComponent
      formData={formData}
      updateForm={updateForm}
      localDocs={localDocs}
      setLocalDocs={setLocalDocs}
      loading={loading}
    />
  );
}
