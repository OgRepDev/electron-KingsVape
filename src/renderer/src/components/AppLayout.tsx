import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { BarChart2Icon, NotebookIcon, ShoppingBag, WarehouseIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import KingsVapeLogo from '../../../../resources/icon.png'

export const RootLayout = ({ className, children, ...props }: ComponentProps<'main'>) => {
  return (
    <main className={twMerge('flex flex-col h-screen', className)} {...props}>
      {children}
    </main>
  )
}

export const Navbar = ({ className, ...props }: ComponentProps<'nav'>) => {
  return (
    <nav
      className={twMerge(
        'w-full p-[0.5rem] flex justify-between items-center bg-[#1b1b1b]',
        className
      )}
      {...props}
    >
      <img
        src={KingsVapeLogo}
        width={50}
        height={50}
        className="w-[5vw] max-h-[75px] max-w-[75px]"
      />
      <ul className="flex flex-1 h-full justify-center items-center w-[80vw] gap-[5rem]">
        <li className="flex gap-2 cursor-pointer h-full">
          <Link to="/" className="relative group h-full items-center flex">
            <span className="flex gap-2">
              <WarehouseIcon />
              <p>Magazyn</p>
            </span>
            <span className="absolute -bottom-0 left-1/2 w-0 transition-all h-0.5 bg-red-700 group-hover:w-3/6"></span>
            <span className="absolute -bottom-0 right-1/2 w-0 transition-all h-0.5 bg-red-700 group-hover:w-3/6"></span>
          </Link>
        </li>
        <li className="flex gap-2 cursor-pointer h-full">
          <Link to="/dashboards" className="relative group h-full items-center flex">
            <span className="flex gap-2">
              <BarChart2Icon />
              <p>Wykresy</p>
            </span>
            <span className="absolute -bottom-0 left-1/2 w-0 transition-all h-0.5 bg-red-700 group-hover:w-3/6"></span>
            <span className="absolute -bottom-0 right-1/2 w-0 transition-all h-0.5 bg-red-700 group-hover:w-3/6"></span>
          </Link>
        </li>
        <li className="flex gap-2 cursor-pointer h-full">
          <Link to="/raports" className="relative group h-full items-center flex">
            <span className="flex gap-2">
              <NotebookIcon />
              <p>Raporty</p>
            </span>
            <span className="absolute -bottom-0 left-1/2 w-0 transition-all h-0.5 bg-red-700 group-hover:w-3/6"></span>
            <span className="absolute -bottom-0 right-1/2 w-0 transition-all h-0.5 bg-red-700 group-hover:w-3/6"></span>
          </Link>
        </li>
        <li className="flex gap-2 cursor-pointer h-full">
          <Link to="/sells" className="relative group h-full items-center flex">
            <span className="flex gap-2">
              <ShoppingBag />
              <p>Sprzedaż</p>
            </span>
            <span className="absolute -bottom-0 left-1/2 w-0 transition-all h-0.5 bg-red-700 group-hover:w-3/6"></span>
            <span className="absolute -bottom-0 right-1/2 w-0 transition-all h-0.5 bg-red-700 group-hover:w-3/6"></span>
          </Link>
        </li>
      </ul>
      <div className="w-[5vw]"></div>
    </nav>
  )
}

export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={twMerge('w-full h-full', className)} {...props}>
      {children}
    </div>
  )
)

Content.displayName = 'Content'
