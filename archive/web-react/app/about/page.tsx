import Image from "next/image"
import navbarLogo from '@/assets/images/logo/gradex-default.svg'
export default function About() {
    return (
        <>
            <nav className="bg-gradient-to-r from-oct-darkgreen to-oct-othagreen px-4 py-2 flex items-center justify-between">
                <div className="flex items-center text-white">
                    <Image src={navbarLogo} alt="GradeX" width={214} />
                    <p className="text-2xl font-serif">| Information</p>
                </div>
            </nav>
            <main className="px-4 py-2 min-h-screen flex flex-col gap-4">
                <section>
                    <h1 className="text-3xl font-serif text-oct-darkgreen font-medium">
                        About this system
                    </h1>
                    <p className="mt-1">
                        GradeX is an online report card system designed to streamline the grading process by reducing mistakes, enhancing precision, and speeding up grade distribution.
                        This automated platform eliminates student frustrations by providing easy access to grades and allows for organized requests of grade copies for official purposes.
                        By digitizing and automating grading practices, it ensures consistency, transparency, and efficiency, allowing faculty and administrative personnel to focus on more 
                        important educational activities. GradeX was developed as a capstone project to meet the requirements of Practical Research 2 (SH004) and Inquiries, Investigations, and Immersions (SH007).
                    </p>
                </section>
                <section>
                    <h1 className="text-3xl font-serif text-oct-darkgreen font-medium">
                        The GradeX Team
                    </h1>
                    <p className="mt-1">
                        The GradeX team, responsible for creating the research paper and the development of our product, consists of 13 dedicated members.
                        Each bringing their own skills and expertise, contributing to this project&#39;s success.
                    </p>
                    <div className="mt-2 grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="text-center">
                            <h3 className="text-lg text-oct-othagreen font-serif font-medium">Jarelle Emmanuel Andulan</h3>
                            <p>Team Leader &bull; System Design & Development Head</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg text-oct-othagreen font-serif font-medium">Mackenzie Elaine Tito</h3>
                            <p>Team Co-leader &bull; Research Paper Head</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg text-oct-othagreen font-serif font-medium">Hernan Glenn Amon</h3>
                            <p>Research Member</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg text-oct-othagreen font-serif font-medium">Eddieboy Baquion</h3>
                            <p>Research Member</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg text-oct-othagreen font-serif font-medium">Daniela Claire Cortez</h3>
                            <p>Research Member</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg text-oct-othagreen font-serif font-medium">Princess Gutierrez</h3>
                            <p>Research Member</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg text-oct-othagreen font-serif font-medium">Carl Robert Martin</h3>
                            <p>Research Member</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg text-oct-othagreen font-serif font-medium">Jovielyn Mae Pabalan</h3>
                            <p>Research Member</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg text-oct-othagreen font-serif font-medium">Mike Pernito</h3>
                            <p>Research Member</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg text-oct-othagreen font-serif font-medium">Braian Santillan</h3>
                            <p>Research Member</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg text-oct-othagreen font-serif font-medium">Mark Jayson Tabuan</h3>
                            <p>Research Member</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg text-oct-othagreen font-serif font-medium">Bam Ulrich Tejada</h3>
                            <p>Research Member</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg text-oct-othagreen font-serif font-medium">Jaryl Dane Vidallon</h3>
                            <p>Research Member</p>
                        </div>
                    </div>
                </section>
                <section>
                    <h1 className="text-3xl font-serif text-oct-darkgreen font-medium">
                        Acknowledgements
                    </h1>
                    <p className="mt-1">
                        Coming soon 
                    </p>
                </section>
            </main>
        </>
    )
}

