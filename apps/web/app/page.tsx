"use client";
import Loading from "@/components/loading";
import Navbar from "@/components/Navbar";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import HomeGreeting from "@/components/HomeGreeting";
import GradesGroup from "@/components/home/GradeGroup";
import ReportsGroup from "@/components/home/ReportsGroup";
export default function Home() {
  const [loading, isLoading] = useState(false)
  const { data: session, update } = useSession()
  if (!session?.user) 
    update()
  function handleLogOut() {
    isLoading(true);
    setTimeout(() => {
      isLoading(false)
      signOut()
    }, 2000)
  }

  return (
    <>
      <Navbar />
      <main className="px-4 py-2 min-h-screen">
        <HomeGreeting />
        <button onClick={handleLogOut} className="px-5 py-2 bg-oct-othagreen text-white rounded-md shadow-xl active:shadow-inner hover:bg-oct-lime transition-colors duration-200 flex items-center justify-center gap-2">
          { loading && <Loading /> }
          Log-out
        </button>
        <div className="flex flex-col gap-2 mt-4">
          <GradesGroup session={session} />
          <ReportsGroup session={session} />
        </div>
      </main>
    </>
  );
}