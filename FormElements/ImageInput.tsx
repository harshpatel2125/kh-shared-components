import React, { FC } from "react";
import CloudUploadIcon from "@/assets/icons/CloudUploadIcon";

interface IImageInput {
  selectedImageUri?: string | undefined | null;
  onChange: (e: any) => void;
}

const ImageInput: FC<IImageInput> = ({ selectedImageUri, onChange }) => {
  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center border-2 border-[#D4D4D4] border-dashed rounded-lg cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
      {selectedImageUri ? (
        <div
          id="imagePreview"
          className="w-[100%] h-[100%] rounded-lg bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: "url(" + selectedImageUri + ")" }}
        />
      ) : (
        <>
          <CloudUploadIcon />
          <span className="mt-1 mb-0.5 text-xs text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span>
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            JPG or PNG File.
          </span>
        </>
      )}
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        className="absolute inset-0 w-[100%] h-[100%] opacity-0 cursor-pointer"
        onChange={onChange}
      />
    </div>
  );
};

export default ImageInput;
