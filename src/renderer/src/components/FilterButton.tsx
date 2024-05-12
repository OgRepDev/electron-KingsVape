import { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface FilterButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  number: number
  isSelected?: boolean
}

export const FilterButton = ({
  title,
  number,
  className,
  isSelected,
  ...props
}: FilterButtonProps) => {
  return (
    <button
      className={twMerge(
        `rounded-lg flex justify-between items-center px-[1vmax] py-[0.2vmax] cursor-pointer hover:bg-red-700 transition-colors ${isSelected ? 'bg-red-700' : 'bg-[#242424]'}`,
        className
      )}
      {...props}
    >
      <div className="bg-[#1b1b1b] rounded-full h-[30px] w-[30px] flex justify-center items-center">
        {number}
      </div>
      <div>{title}</div>
      <div className="h-[30px] w-[30px]"></div>
    </button>
  )
}
