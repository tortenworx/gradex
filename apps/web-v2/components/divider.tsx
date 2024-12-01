export default function TextDivider({ children }: { children: React.ReactNode }) {
    return (
    <div className="relative flex items-center py-5">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="mx-4 flex-shrink text-gray-400">{children}</span>
        <div className="flex-grow border-t border-gray-400"></div>
    </div>
    )
}