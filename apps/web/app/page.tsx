"use client";
import Loading from "@/components/loading";
import { signOut } from "next-auth/react";
import { ReactNode, useState } from "react";
import Image from "next/image";
import navbarLogo from '@/assets/images/logo/gradex-default.svg'

export default function Home() {
  const [loading, isLoading] = useState(false)
  function handleLogOut() {
    isLoading(true);
    setTimeout(() => {
      isLoading(false)
      signOut()
    }, 2000)
  }
  return (
    <>
      <nav className="bg-gradient-to-r from-oct-darkgreen to-oct-othagreen px-4 py-2 flex items-center justify-between">
        <Image src={navbarLogo} alt="GradeX" width={214} />
      </nav>
      <main className="px-4 py-2 min-h-screen">
        <p>peanit</p>
        <button onClick={handleLogOut} className="px-5 py-2 bg-oct-othagreen text-white rounded-md shadow-xl active:shadow-inner hover:bg-oct-lime transition-colors duration-200 flex items-center justify-center gap-2">
          { loading && <Loading /> }
          Log-out
        </button>
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactNode) {
  return (
    <>
      <nav className="bg-gradient-to-r from-oct-darkgreen to-oct-othagreen px-4 py-2 flex items-center justify-between">
        <Image src={navbarLogo} alt="GradeX" width={214} />
      </nav>
      <main className="px-4 py-2 min-h-screen">
        {page}
      </main>
    </>
  )
}
