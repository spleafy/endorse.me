import { MouseEventHandler } from "react";
import { useSelector } from "react-redux";
// Components
import Loading from "./Loading";

interface PrimaryButtonProps {
  children: any;
  submit?: boolean;
  click?: MouseEventHandler | any;
  loading?: boolean;
}

const PrimaryButton = ({
  children,
  submit,
  click,
  loading,
}: PrimaryButtonProps) => {
  const loggedUser = useSelector((state: any) => state.user.user);

  return (
    <button
      className={`${
        loggedUser.settings
          ? "bg-theme-500 dark:bg-theme-600"
          : "bg-primary-500"
      } ${
        loggedUser.settings
          ? "hover:bg-theme-600 dark:hover:bg-theme-700"
          : "hover:bg-primary-600"
      } transition-colors px-4 py-[10px] text-sm text-white rounded-md w-full`}
      type={submit ? "submit" : "button"}
      onClick={click}
    >
      {loading ? (
        <div className="flex justify-center h-5">
          <Loading color="#a9c3fc" />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default PrimaryButton;
