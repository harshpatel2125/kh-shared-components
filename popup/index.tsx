import React, { useState } from "react";
import dynamic from "next/dynamic";
import { PopupProps } from "@/constants/types";

const TEModal = dynamic(() =>
  import("tw-elements-react").then((res) => res.TEModal)
);
const TEModalDialog = dynamic(() =>
  import("tw-elements-react").then((res) => res.TEModalDialog)
);

const TEModalContent = dynamic(() =>
  import("tw-elements-react").then((res) => res.TEModalContent)
);

const TEModalHeader = dynamic(() =>
  import("tw-elements-react").then((res) => res.TEModalHeader)
);

const TEModalBody = dynamic(() =>
  import("tw-elements-react").then((res) => res.TEModalBody)
);

export default function CustomPopup({
  title,
  showModal,
  setShowModal,
  children,
}: PopupProps): JSX.Element {
  return (
    <TEModal show={showModal} setShow={setShowModal}>
      <TEModalDialog>
        <TEModalContent>
          <TEModalHeader>
            {/* <!--Modal title--> */}
            <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
              {title}
            </h5>
            {/* <!--Close button--> */}
            <button
              type="button"
              className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </TEModalHeader>
          {/* <!--Modal body--> */}
          <TEModalBody>{children}</TEModalBody>
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  );
}
