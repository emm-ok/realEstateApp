export default function SuccessAnimation() {
  return (
    <div className="flex justify-center">
      <svg
        className="w-32 h-32"
        viewBox="0 0 52 52"
        fill="none"
      >
        <circle
          cx="26"
          cy="26"
          r="25"
          stroke="#22c55e"
          strokeWidth="2"
          className="animate-circle"
        />
        <path
          fill="none"
          stroke="#22c55e"
          strokeWidth="3"
          d="M14 27l7 7 17-17"
          className="animate-check"
        />
      </svg>
    </div>
  );
}
