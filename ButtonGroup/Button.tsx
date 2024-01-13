"use client";

interface ButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  btnVariant?: string;
  btnSize?: string;
  // path: string;
}

const Buttons: React.FC<ButtonProps> = ({ btnSize, icon, label, onClick, btnVariant }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`btn   ${btnSize}  ${btnVariant} btn-primary rounded `}
      >
        {icon}
        {label}
      </button>
    </>
  );
};

export default Buttons;
