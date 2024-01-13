import Image from "next/image";
import React from "react";

type userCardProps = {
  userImage: any;
  userName: any;
  userDept: any;
};

const UserCard: React.FC<userCardProps> = ({
  userImage,
  userName,
  userDept,
}: userCardProps) => {
  return (
    <div className="block rounded-lg  bg-white p-6 dashboard-card-shadow  ">
      <div className="flex flex-col justify-center items-center">
        <div className="rounded-full w-24 h-24 shadow-lg p-3">
          <Image
            src={userImage || "/user1.png"}
            alt={userName}
            width={80}
            height={80}
            className="object-contain"
          />
        </div>
        <div className="text-center mt-2">
          <p className="text-xl font-medium">{userName}</p>
          <p className="text-md">[ {userDept} ]</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
