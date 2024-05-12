import { PackageIcon, SettingsIcon, TrashIcon } from 'lucide-react'

interface ProductsDataType {
  id: string
  barcode: string
  name: string
  brand: string
  price: number
  quantity: number
  onDelete: () => void
}

export const ProductCardList = ({
  name,
  barcode,
  brand,
  price,
  quantity,
  onDelete
}: ProductsDataType) => {
  return (
    <div className="flex w-full justify-between items-center bg-[#242424] rounded-lg p-2 px-[1rem] my-2">
      <div className="flex flex-col text-[#fff]">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <p className="text-wrap">{name}</p>
            <div className="text-[0.6rem] h-full opacity-40 rounded-lg p-1 border-[#383838] border-[0.1rem] select-text bg-transparent">
              {barcode}
            </div>
          </div>
        </div>
        <div className="flex gap-6 mt-2 items-center">
          <div className="rounded-full px-[0.5rem] py-[0.2rem] text-white bg-red-700 text-sm flex justify-center items-center">
            {brand}
          </div>
          <p className="text-sm">
            <span className="font-semibold">{price}</span> <span className="opacity-40">PLN</span>
          </p>
        </div>
        <div className="flex mt-2">
          <p className="text-sm">
            <span className="font-semibold">{quantity}</span>{' '}
            <span className="opacity-30">w magazynie</span>
          </p>
        </div>
      </div>
      <div className="flex justify-end items-center gap-4">
        <button className="cursor-pointer text-red-700" onClick={onDelete}>
          <TrashIcon />
        </button>
        <button className="cursor-pointer">
          <SettingsIcon />
        </button>
        <button className="cursor-pointer">
          <PackageIcon />
        </button>
      </div>
    </div>
  )
}
