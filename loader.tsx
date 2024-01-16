import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex items-center">
      <div className="loader">
        <Image src="/Logo.png" alt="logo" width={40} height={40} />
      </div>
    </div>
  );
};

export default Loader;
