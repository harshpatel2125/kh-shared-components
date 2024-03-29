"use client";

import React from "react";
import NotificationIcon from "@/assets/icons/NotificationIcon";

interface NotificationBadgeProps {
  notificationCount?: number;
  icon?: React.ReactNode;
  badgeComponent?: React.ReactNode;
  tooltip?: string;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({ tooltip, notificationCount, icon, badgeComponent }) => {
  return (
    <>
      <div
        className='tooltip tooltip-bottom '
        data-tip={tooltip}
      >
        <div
          className='relative inline-flex w-fit'
          id='notification-icon'
        >
          {icon && <div className='flex items-center justify-center rounded  mt-2.5   hover:bg-[#fff] p-1 text-center text-white dark:text-gray-200'>{icon}</div>}
          {badgeComponent && badgeComponent}
        </div>
      </div>
    </>
  );
};

export const BadgeUI: React.FC<{ notificationCount?: number }> = ({ notificationCount }) => {
  return (
    <>
      {notificationCount && (
        <div
          style={{ fontSize: "9px" }}
          className='absolute bottom-auto left-auto  right-1.5 top-3 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-[#4b5563] px-1 py-0.5 text-center align-baseline  font-normal leading-none text-white'
        >
          {notificationCount}
        </div>
      )}
    </>
  );
};

export default NotificationBadge;
