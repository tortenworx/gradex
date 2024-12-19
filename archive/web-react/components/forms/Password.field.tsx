import React, { ReactNode, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface FieldProps {
    label: string,
    icon: ReactNode,
    props?: any
}

export default function PasswordField({ label, icon, ...props }: FieldProps) {
    const [type, setType] = useState("password")
    return (
        <div className="group">
            <label htmlFor="item">{label}</label>
            <div className="mt-2 relative w-full">
                <div className="absolute flex items-center justify-center top-0 bottom-0 left-2 group-focus-within:text-oct-lime">
                    { icon }
                </div>
                <input {...props} type={type} className="w-full rounded-md px-10 pr-10 focus:ring-lime-600 focus:border-lime-600" />
                <button type="button" className="absolute top-0 bottom-0 right-2" onClick={() => setType(type == "text" ? "password" : "text")}>
                    { type == "password" && <Eye /> }
                    { type == "text" && <EyeOff /> }
                </button>
            </div>
        </div>
    )
}