import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

function FormInput({ label, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-0.5">
      {label && (
        <label className="text-xs md:text-sm font-medium text-foreground">
          {label}
        </label>
      )}

      <input
        {...props}
        className={` w-full rounded-full bg-background text-foreground border border-gray-300 px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-sm 
        outline-none focus:outline-none focus:ring-1 focus:ring-black ${props.className ?? ""}
        `}
      />
    </div>
  );
};

export default FormInput;
