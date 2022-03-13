import { ReactElement } from "react";

interface CardProps {
  heading?: string;
  alignHeading?: string;
  children: ReactElement | HTMLElement | ReactElement[] | HTMLElement[];
  width?: string;
  height?: string;
}

const Card = ({
  heading,
  alignHeading,
  children,
  width,
  height,
}: CardProps) => {
  return (
    <div
      className={`shadow-[0_0_20px_10px_rgba(0,0,0,0.1)] px-16 py-8 animate-scale bg-white flex flex-col rounded-md ${
        width ? `w-[${width}]` : "w-full"
      } ${height ? `h-[${height}]` : "h-fit"}`}
    >
      {heading ? (
        <div
          className={`mb-8 mt-3 ${
            alignHeading === "left" ? "text-left" : "text-center"
          }`}
        >
          <h1>{heading}</h1>
        </div>
      ) : (
        ""
      )}
      {children}
    </div>
  );
};

export default Card;
