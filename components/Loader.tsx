import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="h-full w-full flex justify-center items-center bg-transparent">
      <Image src={`/spinner.svg`} height={100} width={100} alt="Loading..." />
    </div>
  );
};

export default Loader;
