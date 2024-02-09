import Image from "next/image";
import React from "react";
import TicketIcon from "@/assets/icons/ticketIcon";
import Approval from "@/assets/icons/approval";
import Notification from "@/assets/icons/notification";
import Tasks from "@/assets/icons/tasks";
import Danger from "@/assets/icons/danger";

type NotificationCardProps = {
  label: string;
  path: string;
  color: string;
  count: number;
};

const NotificationCard: React.FC<NotificationCardProps> = ({ label = "Notification", count, path, color = "black" }: NotificationCardProps) => {
  return (
    <div className='block rounded bg-stone-100 dashboard-card-shadow w-40 '>
      <div className='flex flex-col justify-center items-center  relative'>
        <div className='flex flex-col items-center justify-center gap-2 border border-solid border-red-200 px-3  '>
          <div className={`flex items-center bg-${color} justify-center rounded w-20 h-10 absolute`}>
            {/* <Image
              src={icon}
              alt={label}
              width={20}
              height={20}
              className="object-contain "
            /> */}
            <Danger />
            {/* <IconComponent /> */}
          </div>
        </div>
        <p className='pt-8'>{label}</p>
        <div className='w-full h-0 my-2 border border-solid border-gray-50'></div>

        <div className='text-center'>
          <p className={`text-xl font-medium py-2 text-${color} font-bold`}>{count}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
