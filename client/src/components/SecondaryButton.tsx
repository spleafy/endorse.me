import { MouseEventHandler } from "react";
// Components
import Loading from "./Loading";

interface SecondaryButtonProps {
  children: any;
  submit?: boolean;
  click?: MouseEventHandler | any;
  loading?: boolean;
}

const SecondaryButton = ({
  children,
  submit,
  click,
  loading,
}: SecondaryButtonProps) => {
  return (
    <button
      className="border-2 border-theme-400 text-theme-500 hover:border-theme-500 hover:text-theme-600  transition-colors px-4 py-[10px] text-sm rounded-md w-full"
      type={submit ? "submit" : "button"}
      onClick={click}
    >
      {loading ? (
        <div className="flex justify-center h-5">
          <Loading color="rgb(51 65 85)" />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default SecondaryButton;
