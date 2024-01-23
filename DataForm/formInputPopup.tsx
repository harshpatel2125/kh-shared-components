import React from "react";
import CustomPopup from "../popup";
import Button from "../button";

interface ConfirmationPopupProps {
  title?: string | undefined;
  showModal?: boolean;
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm?: () => void;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  title,
  showModal = false,
  setShowModal,
  onConfirm,
}) => {

  const handleCancel = () => {
    if (setShowModal) {
      setShowModal(false);
    }
  };
  return (
    <CustomPopup title={title} showModal={showModal} setShowModal={setShowModal}>
      <div className="flex flex-col gap-5">
        <div className="flex justify-end">
          <Button onClick={handleCancel} className="mr-2">
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
