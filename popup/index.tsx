"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { PopupProps } from "@/constants/types";
import CloseIcon from "@/assets/icons/CloseIcon";

const TEModal = dynamic(() => import("tw-elements-react").then((res) => res.TEModal));
const TEModalDialog = dynamic(() => import("tw-elements-react").then((res) => res.TEModalDialog));

const TEModalContent = dynamic(() => import("tw-elements-react").then((res) => res.TEModalContent));

const TEModalHeader = dynamic(() => import("tw-elements-react").then((res) => res.TEModalHeader));

const TEModalBody = dynamic(() => import("tw-elements-react").then((res) => res.TEModalBody));

// ... (imports)

export default function CustomPopup({ title, showModal, setShowModal, children }: PopupProps): JSX.Element {
  return (
    <TEModal
      show={showModal}
      setShow={setShowModal}
    >
      <TEModalDialog centered>
        <TEModalContent>
          <TEModalHeader>
            {/* Modal title */}
            <h5 className='text-xs font-medium leading-normal text-neutral-800 dark:text-neutral-200'>{title}</h5>
            {/* Close button */}
            <button
              type='button'
              className='box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none'
              onClick={() => setShowModal(false)}
              aria-label='Close'
            >
              <CloseIcon
                width='12'
                height='12'
                color='#000'
              />
            </button>
          </TEModalHeader>
          {/* Modal body */}
          <TEModalBody>{children}</TEModalBody>
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  );
}
