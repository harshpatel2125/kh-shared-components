import dynamic from "next/dynamic";

const DynamicCustomCarousal = dynamic(() => import("./carousal"), {
  ssr: false,
});

const CarousalWrapper = () => {
  return <DynamicCustomCarousal />;
};

export default CarousalWrapper;
