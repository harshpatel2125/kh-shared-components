"use client";

import dynamic from "next/dynamic";

const TETextarea = dynamic(() => import("tw-elements-react").then((res) => res.TETextarea));

interface TextAreaProps {
  label: string;
  rows: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ label, rows, onChange }) => {
  return (
    <>
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-6'>
          <div className='relative mb-3 '>
            <TETextarea
              id='textareaExample'
              label={label}
              rows={rows}
              onChange={onChange}
            ></TETextarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default TextArea;
