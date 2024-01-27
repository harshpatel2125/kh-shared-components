"use client";

import CustomPopup from ".";
import DataGrid from "../DataGrid";
import TableWrapper from "@/containers/tables/TableWrapper";
import { getObjKeyFromUrl, getPageTableDataByKey } from "@/utils/objectUtils";
import { PagePopupTableData, PageTableData } from "@/constants/tableCols";
import { PopupType } from "@/constants/tableCols/enums";
import { useParams } from "next/navigation";

interface ITaxPatternTypes {
  taxPattern: string;
  taxPercentage: string;
  amount: string;
  showPopup: boolean;
  setShowPopup: any;
}

const TaxPatternPopup = ({
  taxPattern,
  taxPercentage,
  amount,
  showPopup,
  setShowPopup,
}: ITaxPatternTypes) => {
  const params = useParams();

  const functionType = getObjKeyFromUrl(params?.function);
  const pageType = getObjKeyFromUrl(params?.page);
  const popupType = PopupType.PO_TaxPattern;

  //   let result =
  //     functionType &&
  //     pageType &&
  //     getPageTableDataByKey(
  //       PagePopupTableData,
  //       functionType,
  //       pageType,
  //       popupType
  //     );

  // const data =
  //   functionType &&
  //   pageType &&
  //   popupType &&
  //   PagePopupTableData[functionType][pageType][popupType];

  return (
    <CustomPopup
      title="Tax Pattern"
      showModal={showPopup}
      setShowModal={setShowPopup}
    >
      <p>hello</p>
      {/* <TableWrapper data={data} /> */}
    </CustomPopup>
  );
};

export default TaxPatternPopup;
