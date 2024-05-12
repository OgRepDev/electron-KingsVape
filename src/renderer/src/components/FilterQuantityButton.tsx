import { ButtonHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface FilterQuantityButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  icon: ReactNode
  onFilter: () => void
}

export const FilterQuantityButton = ({
  title,
  icon,
  className,
  onFilter,
  ...props
}: FilterQuantityButtonProps) => {
  return (
    <button
      className={twMerge('relative flex items-center cursor-pointer group', className)}
      {...props}
      onClick={onFilter}
    >
      <span className="flex items-center text-sm py-[0.5vmax] gap-[0.05vmax] opacity-80">
        {icon}
        <p>{title}</p>
      </span>
      <span className="absolute -bottom-0 left-1/2 w-0 transition-all h-0.5 bg-red-700 group-hover:w-3/6"></span>
      <span className="absolute -bottom-0 right-1/2 w-0 transition-all h-0.5 bg-red-700 group-hover:w-3/6"></span>
    </button>
  )
}
