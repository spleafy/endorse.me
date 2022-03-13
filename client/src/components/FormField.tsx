import { ReactElement, useState } from "react";
// Components

interface FormFieldProps {
  name: string;
  placeholder: string;
  type?: string;
  label: string;
  action?: HTMLElement | ReactElement;
  register: any;
  error: any;
  validators?: any;
  className?: string;
}

const FormField = ({
  name,
  placeholder,
  type,
  label,
  action,
  register,
  error,
  validators,
  className,
}: FormFieldProps) => {
  const [mutableType, setMutableType] = useState(type);

  return (
    <div className={`flex flex-col mb-5 ${className ? className : "mb-5"}`}>
      {label ? (
        <label
          htmlFor={name}
          className="mb-2 text-slate-700 text-sm flex items-center justify-between dark:text-slate-100"
        >
          {label}
          {action}
        </label>
      ) : (
        <></>
      )}

      <div className="rounded-md border-[1px] border-slate-200 px-4 placeholder:text-slate-200 focus-within:border-primary-300 transition-colors flex items-center dark:border-slate-500">
        <input
          name={name}
          id={name}
          placeholder={placeholder}
          type={mutableType}
          className="text-sm w-full py-2 dark:text-white"
          {...register(name, {
            validate: validators,
          })}
        />
        {type === "password" ? (
          <span
            className="text-sm text-primary-500 hover:underline cursor-pointer"
            onClick={() => {
              mutableType === "password"
                ? setMutableType("text")
                : setMutableType("password");
            }}
          >
            {mutableType === "password" ? "Show" : "Hide"}
          </span>
        ) : (
          <></>
        )}
      </div>
      <div className="text-red-600 mt-3 text-sm">
        {error ? error.message : ""}
      </div>
    </div>
  );
};

export default FormField;
