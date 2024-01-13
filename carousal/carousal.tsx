"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";

const TECarousel = dynamic(() =>
  import("tw-elements-react").then((res) => res.TECarousel)
);
const TECarouselItem = dynamic(() =>
  import("tw-elements-react").then((res) => res.TECarouselItem)
);

export default function CustomCarousal(): JSX.Element {
  return (
    <>
      <div className=" dashboard-card-shadow p-3 flex flex-col bg-white rounded h-[85vh]">
        <TECarousel
          showIndicators
          ride="carousel"
          className="w-full border border-solid border-base-300 h-full"
        >
          <div className="relative w-full overflow-hidden after:clear-both after:block after:content-[''] h-full">
            <TECarouselItem
              itemID={1}
              id="item1"
              className="relative float-left -mr-[100%] hidden w-full h-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none min-h[92%] aniket"
            >
              <div className="">
                <p className="bg-primary text-white text-sm p-2 font-bold tracking-widest">
                  Notification
                </p>
              </div>
              <div className=" h-full flex items-center justify-center">
                <Image
                  src="/icons/no_notification.png"
                  alt="notification icon"
                  width={350}
                  height={350}
                  className="object-contain mb-10"
                />
              </div>
            </TECarouselItem>
            <TECarouselItem
              itemID={2}
              id="item2"
              className="relative float-left hidden -mr-[100%] w-full h-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            >
              <div>
                <p className="bg-warning text-white text-sm p-2 font-bold tracking-widest">
                  Approval
                </p>
              </div>
              <div className=" h-full flex items-center justify-center">
                <Image
                  src="/icons/no_approval.png"
                  alt="notification icon"
                  width={350}
                  height={350}
                  className="object-contain mb-10"
                />
              </div>
            </TECarouselItem>
            <TECarouselItem
              itemID={3}
              id="item3"
              className="relative float-left -mr-[100%] hidden w-full h-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            >
              <div>
                <p className="bg-success text-white text-sm p-2 font-bold tracking-widest">
                  Tasks
                </p>
              </div>
              <div className=" h-full flex items-center justify-center">
                <Image
                  src="/icons/no_approval.png"
                  alt="notification icon"
                  width={350}
                  height={350}
                  className="object-contain mb-10"
                />
              </div>
            </TECarouselItem>
            <TECarouselItem
              itemID={4}
              id="item4"
              className="relative float-left -mr-[100%] hidden w-full h-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            >
              <div>
                <p className="bg-danger text-white text-sm p-2 font-bold tracking-widest">
                  Alerts
                </p>
              </div>
              <div className=" h-full flex items-center justify-center">
                <Image
                  src="/icons/no_alerts.png"
                  alt="notification icon"
                  width={350}
                  height={350}
                  className="object-contain mb-10"
                />
              </div>
            </TECarouselItem>
          </div>
        </TECarousel>
      </div>
    </>
  );
}
