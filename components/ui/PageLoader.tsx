import Loader from "./Loader";

export default function PageLoader({ text }: {text: string}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader size={32} text={text} />
    </div>
  );
}
