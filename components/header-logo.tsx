import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const HeaderLogo = (props: Props) => {
  return (
    <Link href="/">
      <div className="items-center hidden lg:flex">
        <Image src="/logo-white.svg" alt="Logo" height={28} width={150} />
        {/* <p className="font-semibold text-white text-2xl ml-2.5">
          Personal Finance
        </p> */}
      </div>
    </Link>
  );
};

export default HeaderLogo;
