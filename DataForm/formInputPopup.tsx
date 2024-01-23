import React from "react";
import CustomPopup from "../popup";
import Button from "../button";

interface ConfirmationPopupProps {
  title?: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  title,
  showModal,
  setShowModal,
  onConfirm,
}) => {
  return (
    <CustomPopup title={title} showModal={showModal} setShowModal={setShowModal}>
      <div className="flex flex-col gap-5">
        <div className="flex justify-end">
          <Button onClick={() => setShowModal(false)} className="mr-2">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="bg-tertiary hover:bg-tertiary px-5 text-white">
            Submit
          </Button>
        </div>
      </div>
    </CustomPopup>
  );
};

export default ConfirmationPopup;
