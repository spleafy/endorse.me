import { ChangeEventHandler } from "react";

interface ToggleSwitchProps {
  toggled: boolean;
  onToggle: ChangeEventHandler;
}

const ToggleSwitch = ({ toggled, onToggle }: ToggleSwitchProps) => {
  return (
    <label
      className={`${toggled ? "bg-theme-500" : "bg-gray-400"} ${
        toggled ? "hover:bg-theme-600" : "hover:bg-gray-500"
      } flex justify-center items-center transition-colors rounded-2xl h-[20px] w-[40px] cursor-pointer relative`}
    >
      <input
        type="checkbox"
        checked={toggled}
        onChange={onToggle}
        className="hidden"
      />
      <span
        className={`absolute h-[14px] aspect-square rounded-full bg-white transition-all left-[3px] ${
          toggled ? "!left-[23px]" : ""
        }`}
      ></span>
    </label>
  );
};

export default ToggleSwitch;
