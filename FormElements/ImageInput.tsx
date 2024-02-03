import React, { FC, useState } from "react";
import CloudUploadIcon from "@/assets/icons/CloudUploadIcon";
import { COLORS } from "@/constants/colors";

interface IImageInput {
  selectedImageUri?: string | null;
  onChange: (e: any) => void;
  label?: string;
  required?: boolean;
}

const ImageInput: FC<IImageInput> = ({ required, label, selectedImageUri, onChange }) => {
  const [previewImage, setPreviewImage] = useState<string | undefined | null>(selectedImageUri);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    onChange(event);
  };

  return (
    <div className={`relative h-full w-full flex flex-col items-center justify-center border-2 border-[#D4D4D4] border-dashed ${required ? COLORS.REQUIRED : ""} rounded-lg cursor-pointer hover:bg-bray-800   dark:border-gray-600 hover:border-gray-500`}>
      {previewImage ? (
        <div
          id='imagePreview'
          className='w-[100%] h-[100%] rounded-lg bg-contain bg-center bg-no-repeat'
          style={{ backgroundImage: `url(${previewImage})` }}
        />
      ) : (
        <>
          <CloudUploadIcon />
          <span className='mt-1 mb-0.5 text-xs text-gray-500 dark:text-gray-400'>
            <span className='font-semibold'>
              Click to upload <span>{label}</span>
            </span>
          </span>
          <span className='text-xs text-gray-500 dark:text-gray-400'>JPG or PNG File.</span>
        </>
      )}
      <input
        type='file'
        id='imageInput'
        accept='image/*'
        className='absolute inset-0 w-[100%] h-[100%] opacity-0 cursor-pointer'
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageInput;
