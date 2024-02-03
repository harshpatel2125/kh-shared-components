interface ButtonBorderProps {
  icon?: React.ReactNode;
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  btnVariant?: string;
  btnSize?: string;
  htmlFor?: string;
  borderColor?: string;
  textColor?: string;
  // path: string;
}

const ButtonBorder: React.FC<ButtonBorderProps> = ({ textColor, borderColor, htmlFor, btnSize, icon, label, onClick, btnVariant }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`flex justify-center align-middle ${btnSize} ${textColor ? textColor : "text-slate-700"} h-fit  text-xs   font-medium px-2 py-1 border ${borderColor ? borderColor : "border-black"}  ${btnVariant}  rounded shadow  `}
      >
        <span className='mt-0.5 mr-1'> {icon}</span>
        {label}
      </button>
    </>
  );
};

export default ButtonBorder;
