"use client";
import Image from "next/image"
import logo from '@/assets/images/logo/gradex-default-inverted.svg'
import TextField from "@/components/forms/text.field"
import { useForm, Controller } from "react-hook-form"
import { IdCard } from "lucide-react"
import Loading from "@/components/loading";
import axios from "axios";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";

const schema = yup.object({
    id_number: yup.string().matches(/^(\d{3}[S|C]|OCT)-\d{4,}\w?$/g, 'Invalid ID Number, check the number, then try again.').required('This field is required.'),
}).required();
type FormData = yup.InferType<typeof schema>

export default function ResendInvitation() {
    const { control, handleSubmit, formState: { isValid, isSubmitting, errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    })
    async function submitData(content: FormData) {
        const { data } = await axios.post('http://localhost:8080/invitation/resend/', content)
        console.log(data)
    }
    console.log(errors)
    return (
        <main className="min-h-screen px-12 bg-oct-darkgreen flex items-center justify-center">
            <div className="bg-white px-8 py-6 rounded-lg md:min-w-96 md:max-w-md">
                <Link href="/accounts/login" className="text-lime-600">&larr; Back to Log-in</Link>
                <div className="my-2">
                    <Image src={logo} alt="Logo of the system. Grade with a styled X" width={240} priority />
                    <h1 className="text-3xl font-serif text-oct-othagreen font-medium">Send another invtiation</h1>
                    <p className="mt-2 text-gray-600 text-sm">In order to resend another invitation link, please enter your details below. If we found a record that matches the information that you have provided, we will send the new invitation in your school email address.</p>
                </div>
                <form onSubmit={handleSubmit(submitData)} className="flex flex-col gap-2">
                    <Controller
                        name="id_number"
                        control={control}
                        render={({ field }) => (
                            <>
                                <TextField {...field} icon={<IdCard />} label="ID Number" />
                                { errors.id_number && <p className="text-red-600 text-sm">{errors.id_number?.message}</p> }
                            </>
                        )}
                    />
                    <button disabled={!isValid} className="flex gap-2 items-center justify-center disabled:bg-slate-500 disabled:active:ring-0 disabled:active:text-white bg-oct-othagreen active:bg-transparent active:ring-2  active:ring-oct-green active:text-oct-green hover:shadow-xl transition-all px-8 p-3 w-full text-white rounded-md">
                        { isSubmitting && <Loading /> }
                        { isSubmitting ? "Submitting" : "Resend Invitation" }
                    </button>
                </form>
            </div>
        </main>
    )
}