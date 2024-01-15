import React from "react";
import Subtitle from "./Subtitle";
import { usePathname, useRouter } from "next/navigation";

interface BreadcrumbsProps {
  children: any;
  hideDivider?: boolean;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ children, hideDivider }) => {
  const pathname = usePathname();
  const router = useRouter();
  const breads = pathname && pathname?.split("/");
  return (
    <div className={"card w-full mt-1"}>
      <Subtitle styleClass={"text-[#48a4f9] pl-3"}>
        <div className="text-sm breadcrumbs">
          <ul>
            {breads &&
              breads?.length > 0 &&
              breads?.map((ele: any, index: number) => {
                if (ele && ele !== "") {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        if (index === 1 && breads?.length > 2) {
                          router.push(`/${ele}`);
                        } else if (index === 2 && breads?.length > 3) {
                          router.back();
                        }
                      }}
                      className="capitalize text-[#000] text-[18px]"
                    >
                      {index === breads?.length - 1 ? (
                        ele?.split("-")?.join(" ")
                      ) : (
                        <a>{ele?.split("-")?.join(" ")}</a>
                      )}
                    </li>
                  );
                } else return null;
              })}
          </ul>
        </div>
      </Subtitle>
      {!hideDivider ? (
        <div className="divider my-0"></div>
      ) : (
        <div className="mt-5"></div>
      )}
      <div className="h-full w-full pb-6 ">{children}</div>
    </div>
  );
};

export default Breadcrumbs;
