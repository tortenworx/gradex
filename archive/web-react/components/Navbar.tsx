import Image from "next/image";
import navbarLogo from '@/assets/images/logo/gradex-default.svg'

export default function Navbar() {
    return (
      <nav className="bg-gradient-to-r from-oct-darkgreen to-oct-othagreen px-4 py-2 flex items-center justify-between">
        <Image src={navbarLogo} alt="GradeX" width={214} />
      </nav>
    )   
}