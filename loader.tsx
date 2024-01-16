import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex justify-center">
      <div className="loader">
        <Image src="/Logo.png" alt="logo" width={80} height={80} />
      </div>
    </div>
  );
};

export default Loader;
