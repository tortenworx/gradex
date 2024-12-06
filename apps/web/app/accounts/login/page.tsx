import Image from 'next/image'
import gradexLogo from '@/assets/images/logo/gradex-default-inverted.svg'
import AuthGoogleButton from '@/components/AuthenticateWithGoogle'
import { EmblaCarousel } from '@/components/LoginEmblaCarousel'
import { signIn } from '@/auth'
import TextDivider from '@/components/divider'
import LoginForm from '@/components/forms/UserLogIn.form';
import { EmblaCarouselMini } from '@/components/LoginEmblaCarouselMini'
import AuthPasskeyButton from '@/components/AuthenticateWithPasskey'
import toast from 'react-hot-toast'

export default function LogIn() {
    return (
        <main>
            <div className="md:grid md:grid-cols-3 grid-flow-col min-h-screen">
                <div className="md:invisible md:hidden h-[50dvw] text-white">
                    <EmblaCarouselMini></EmblaCarouselMini>
                </div>
                <div className="px-6 py-4 md:px-8 md:py-4 bg-white">
                    <div>
                        <Image
                            src={gradexLogo}
                            alt="Image of the Olivarez College Tagaytay logo next to the words GradeX."
                            width={8*48}
                            priority={true}
                        />
                        <h1 className="font-serif text-oct-green text-3xl">
                            Log-in to your account
                        </h1>
                    </div>
                    <div className="mt-4">
                        <div className="flex flex-col gap-2">
                            <AuthGoogleButton></AuthGoogleButton>
                            <AuthPasskeyButton></AuthPasskeyButton>
                        </div>
                        <TextDivider>or log-in with user credentials</TextDivider>
                        <LoginForm submit={async (data) => {
                            "use server"
                            await signIn('credentials', { ...data, redirectTo: '/' })
                        }}/>
                    </div>
                </div>
                <div className="invisible hidden md:visible md:block relative col-span-2 min-h-full from-oct-yellow to-oct-othagreen text-white">
                    <EmblaCarousel />
                </div>
            </div>
        </main>
    )
}