import React, { ReactNode } from "react";

interface FieldProps {
    label: string,
    icon: ReactNode,
    props?: unknown
}

export default function TextField({ label, icon, ...props }: FieldProps) {
    return (
        <div className="group">
            <label htmlFor="field" className="font-sans text-lg">{label}</label>
            <div className="mt-2 relative w-full">
                <div className="absolute flex items-center justify-center top-0 bottom-0 left-2 group-focus-within:text-oct-lime">
                    { icon }
                </div>
                <input {...props} type="text" className="w-full rounded-md pl-9 focus:ring-lime-600 focus:border-lime-600" />
            </div>
        </div>
    )
}