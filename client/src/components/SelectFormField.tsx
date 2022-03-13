import { ReactElement, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface FormFieldProps {
  name: string;
  placeholder: string;
  label: string;
  action?: HTMLElement | ReactElement;
  register: any;
  error: any;
  validators?: any;
  className?: string;
  options: string[];
  setValue: any;
  getValues: any;
}

const SelectFormField = ({
  name,
  placeholder,
  label,
  action,
  register,
  error,
  validators,
  className,
  options,
  setValue,
  getValues,
}: FormFieldProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`flex flex-col relative ${className ? className : "mb-5"}`}>
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

      <div
        className="rounded-md border-[1px] border-slate-200 px-4 placeholder:text-slate-200 focus-within:border-primary-300 transition-colors flex items-center justify-between dark:border-slate-500 cursor-pointer"
        onClick={() => {
          if (!expanded) setExpanded(true);
        }}
      >
        <select
          name={name}
          id={name}
          className="w-0 h-0 opacity-0"
          {...register(name, {
            validate: validators,
          })}
        />
        <span className="text-sm w-full py-2 dark:text-white">
          {getValues(name) ? (
            getValues(name)
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </span>
        <FiChevronDown className="stroke-gray-400" />
      </div>

      <div
        className={`absolute ${
          expanded ? "flex" : "hidden"
        } flex-col w-full border-[1px] rounded-md border-slate-200 top-[55px] bg-white overflow-hidden`}
      >
        {options?.map((option: string, index: number) => (
          <div
            className="text-sm transition-colors text-gray-600 cursor-pointer hover:bg-primary-500 hover:text-white"
            onClick={() => {
              setValue(name, option.toUpperCase(), {
                shouldValidate: true,
                shouldDirty: true,
              });
              setExpanded(false);
            }}
            key={index}
          >
            <div className="px-4 py-2 text-inherit">{option.toUpperCase()}</div>
          </div>
        ))}
      </div>
      <div className="text-red-600 mt-3 text-sm">
        {error ? error.message : ""}
      </div>
    </div>
  );
};

export default SelectFormField;
