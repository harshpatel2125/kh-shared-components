"use client";

interface ButtonProps {
  icon?: React.ReactNode;
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  btnVariant?: string;
  btnSize?: string;
  htmlFor?: string;
  // path: string;
}

const Buttons: React.FC<ButtonProps> = ({ htmlFor, btnSize, icon, label, onClick, btnVariant }) => {
  return (
    <>
      <button

        onClick={onClick}
        className={`btn font-medium text-xs pt-1 pb-1 min-h-5 h-5 leading-none   ${btnSize}  ${btnVariant}  rounded-sm `}
      >
        {icon}
        {label}
      </button>
    </>
  );
};


const ButtonBorder: React.FC<ButtonProps> = ({ htmlFor, btnSize, icon, label, onClick, btnVariant }) => {
  return (
    <>
      <button

        onClick={onClick}
        className={`flex justify-center align-middle ${btnSize} text-xs font-light px-2 py-0.5 border border-white  ${btnVariant}  rounded-sm `}
      >
       <span className="mt-0.5 mr-1"> {icon}</span>
        {label}
      </button>
    </>
  );
};


export {ButtonBorder}
export default Buttons;
