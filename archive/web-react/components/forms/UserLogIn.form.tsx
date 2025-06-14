"use client";
import { useForm, Controller } from "react-hook-form"
import UsernameField from "./Username.field"
import PasswordField from "./Password.field"
import { User, Lock } from 'lucide-react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from "next/link"
import Loading from "../loading";
import toast from "react-hot-toast";

const schema = yup.object({
    username: yup.string().required('This field is required'),
    password: yup.string().min(4).max(24).required('This field is required'),
    redirectTo: yup.string()
}).required();
type FormData = yup.InferType<typeof schema>

interface LogInProps {
    submit: (data: FormData) => Promise<void>,
}

export default function LoginForm({ submit }: LogInProps) {
    const { register, control, handleSubmit, formState: { isValid, isSubmitting } } = useForm({
        defaultValues: {
            username: "",
            password: "",
            redirectTo: '/'
        },
        resolver: yupResolver(schema)
    })
    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(async (data) => {
            toast.promise(
                submit(data),
                {
                    loading: 'Logging',
                    error: (error) => `${error}`,
                    success: 'Logged in!'
                }
            )
        })}>
            <input type="hidden" {...register('redirectTo')} />
            <Controller 
                name="username"
                control={control}
                render={({ field }) => <UsernameField { ...field } icon={<User />} label="Username or ID number" />}
            />
            <Controller
                name="password"
                control={control}
                render={({ field }) => <PasswordField {...field} icon={<Lock />} label="Password" />}
            />
            <div className="flex items-center justify-between">
                <Link href="/accounts/resend-invitation">Resend Invitation</Link>
                <Link href="/accounts/password-reset">Forgot Password?</Link>
            </div>
            
            <button disabled={!isValid} className="flex gap-2 items-center justify-center disabled:bg-slate-500 disabled:active:ring-0 disabled:active:text-white bg-oct-lime active:bg-transparent active:ring-2  active:ring-oct-green active:text-oct-green hover:shadow-xl transition-all px-8 p-3 w-full text-white rounded-md">
                { isSubmitting && <Loading /> }
                { isSubmitting ? "Logging In" : "Log-in" }
            </button>
        </form>
    )
}