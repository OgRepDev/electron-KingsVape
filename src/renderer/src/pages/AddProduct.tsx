import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { useState } from 'react'
import { db } from '../../firebase/firebase.config'

interface Product {
  barcode: string
  _id: Object
  brand: string
  name: string
  price: number
  quantity: number
}

const AddProduct = () => {
  const navigate = useNavigate()

  const [barcode, setBarcode] = useState('')
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [price, setPrice] = useState(0)

  //ERRORS Messages
  const [barcodeError, setBarcodeError] = useState(true)
  const [nameError, setNameError] = useState(true)
  const [brandError, setBrandError] = useState(true)
  const [categoryError, setCategoryError] = useState(true)
  const [quantityError, setQuantityError] = useState(true)
  const [priceError, setPriceError] = useState(true)

  const [data, setData] = useState<Product[]>([])

  const onCancelAddProductData = () => {
    navigate('/')
  }

  const addProductData = async () => {
    try {
      // Sprawdzanie, czy wszystkie wymagane dane są ustawione
      if (barcode && name && brand && category && price) {
        const timestamp = Timestamp.now()

        // Dodawanie dokumentu do kolekcji "warehouse" w Firestore
        await addDoc(collection(db, 'warehouse'), {
          barcode,
          name,
          brand,
          category,
          quantity,
          price,
          addedAt: timestamp
        })
        // Wyczyszczenie pól po dodaniu produktu
        setBarcode('')
        setName('')
        setBrand('')
        setQuantity(0)
        setPrice(0)
        // Przekierowanie po dodaniu produktu
        navigate('/')
      } else {
        // Obsługa błędów, gdy nie wszystkie dane są ustawione
        console.error('Niektóre dane produktu są niekompletne.')
      }
    } catch (error) {
      console.error('Błąd podczas dodawania produktu:', error)
    }
  }

  return (
    <div className="p-[2rem]">
      <div className="flex h-full gap-4 w-full text-[#fff]">
        <div className="flex flex-col gap-4 w-2/3 ">
          <div className="my-4">
            <p className="text-lg font-semibold">+ Dodaj produkt do magazynu</p>
          </div>

          <div className="relative rounded-lg w-full">
            <input
              type="text"
              id="name"
              className=" px-2.5 pb-2.5 pt-4 w-full text-sm text-[#000] bg-[#1f1f1f] border-2 rounded-lg border-1 border-[#5f5f5f] dark:text-[#fff] dark:border-buttonGray dark:focus:border-buttonRed focus:outline-buttonRed focus:ring-0 focus:border-buttonRed peer"
              placeholder=" "
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setNameError(false) // Resetowanie flagi błędu przy wprowadzaniu nowych danych
              }}
              required
            />
            <label
              htmlFor="name"
              className="absolute text-sm text-[#a2a2a2] dark:text-[#a2a2a2] duration-300 transform -translate-y-2 scale-75 top-2 z-10 origin-[0] bg-[#1f1f1f] rounded-lg dark:bg-[#1f1f1f] px-2 peer-focus:px-2 peer-focus:text-[#a2a2a2] peer-focus:dark:text-[#a2a2a2] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Nazwa
            </label>
          </div>

          <div className="relative rounded-lg w-full">
            <input
              type="text"
              id="barcode"
              className=" px-2.5 pb-2.5 pt-4 w-full text-sm text-[#000] bg-[#1f1f1f] border-2 rounded-lg border-1 border-[#5f5f5f] dark:text-[#fff] dark:border-buttonGray dark:focus:border-buttonRed focus:outline-buttonRed focus:ring-0 focus:border-buttonRed peer"
              placeholder=" "
              value={barcode}
              onChange={(e) => {
                setBarcode(e.target.value)
                setBarcodeError(false) // Resetowanie flagi błędu przy wprowadzaniu nowych danych
              }}
              required
            />
            <label
              htmlFor="barcode"
              className="absolute text-sm text-[#a2a2a2] dark:text-[#a2a2a2] duration-300 transform -translate-y-2 scale-75 top-2 z-10 origin-[0] bg-[#1f1f1f] rounded-lg dark:bg-[#1f1f1f] px-2 peer-focus:px-2 peer-focus:text-[#a2a2a2] peer-focus:dark:text-[#a2a2a2] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Kod kreskowy
            </label>
          </div>

          <div className="relative rounded-lg w-full">
            <input
              type="text"
              id="brand"
              className=" px-2.5 pb-2.5 pt-4 w-full text-sm text-[#000] bg-[#1f1f1f] border-2 rounded-lg border-1 border-[#5f5f5f] dark:text-[#fff] dark:border-buttonGray dark:focus:border-buttonRed focus:outline-buttonRed focus:ring-0 focus:border-buttonRed peer"
              placeholder=" "
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value)
                setBrandError(false) // Resetowanie flagi błędu przy wprowadzaniu nowych danych
              }}
              required
            />
            <label
              htmlFor="brand"
              className="absolute text-sm text-[#a2a2a2] dark:text-[#a2a2a2] duration-300 transform -translate-y-2 scale-75 top-2 z-10 origin-[0] bg-[#1f1f1f] rounded-lg dark:bg-[#1f1f1f] px-2 peer-focus:px-2 peer-focus:text-[#a2a2a2] peer-focus:dark:text-[#a2a2a2] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Marka
            </label>
          </div>

          <div className="relative rounded-lg w-full">
            <select
              id="category"
              className="px-2.5 pb-2.5 pt-4 w-full text-sm text-[#000] bg-[#1f1f1f] border-2 rounded-lg border-1 border-[#fff] dark:text-[#fff] dark:border-buttonGray dark:focus:border-buttonRed focus:outline-buttonRed focus:ring-0 focus:border-buttonRed peer"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value)
                setCategoryError(false)
              }}
              required
            >
              <option value="">Kategoria</option>
              <option value="Liquid">Liquid</option>
              <option value="Akcesoria">Akcesoria</option>
              <option value="Sprzęt">Sprzęt</option>
              <option value="Grzałki">Grzałki</option>
              <option value="onetake">Onetake</option>
            </select>
            <label
              htmlFor="category"
              className="absolute text-sm text-[#a2a2a2] dark:text-[#a2a2a2] duration-300 transform -translate-y-2 scale-75 top-2 z-10 origin-[0] bg-[#1f1f1f] rounded-lg dark:bg-[#1f1f1f] px-2 peer-focus:px-2 peer-focus:text-[#a2a2a2] peer-focus:dark:text-[#a2a2a2] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Kategoria
            </label>
          </div>

          <div className="relative rounded-lg w-full">
            <input
              type="number"
              id="quantity"
              className=" px-2.5 pb-2.5 pt-4 w-full text-sm text-[#000] bg-[#1f1f1f] border-2 rounded-lg border-1 border-[#5f5f5f] dark:text-[#fff] dark:border-buttonGray dark:focus:border-buttonRed focus:outline-buttonRed focus:ring-0 focus:border-buttonRed peer"
              placeholder=" "
              value={quantity}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10)
                setQuantity(value)
                setQuantityError(false) // Resetowanie flagi błędu przy wprowadzaniu nowych danych
              }}
              required
            />
            <label
              htmlFor="quantity"
              className="absolute text-sm text-[#a2a2a2] dark:text-[#a2a2a2] duration-300 transform -translate-y-2 scale-75 top-2 z-10 origin-[0] bg-[#1f1f1f] rounded-lg dark:bg-[#1f1f1f] px-2 peer-focus:px-2 peer-focus:text-[#a2a2a2] peer-focus:dark:text-[#a2a2a2] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Ilość
            </label>
          </div>

          <div className="relative rounded-lg w-full">
            <input
              type="number"
              id="price"
              className=" px-2.5 pb-2.5 pt-4 w-full text-sm text-[#000] bg-[#1f1f1f] border-2 rounded-lg border-1 border-[#5f5f5f] dark:text-[#fff] dark:border-buttonGray dark:focus:border-buttonRed focus:outline-buttonRed focus:ring-0 focus:border-buttonRed peer"
              placeholder=" "
              value={price}
              onChange={(e) => {
                const value = parseFloat(e.target.value)
                setPrice(value)
                setPriceError(false) // Resetowanie flagi błędu przy wprowadzaniu nowych danych
              }}
              required
            />
            <label
              htmlFor="price"
              className="absolute text-sm text-[#a2a2a2] dark:text-[#a2a2a2] duration-300 transform -translate-y-2 scale-75 top-2 z-10 origin-[0] bg-[#1f1f1f] rounded-lg dark:bg-[#1f1f1f] px-2 peer-focus:px-2 peer-focus:text-[#a2a2a2] peer-focus:dark:text-[#a2a2a2] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Cena
            </label>
          </div>
        </div>
        <div className="w-1/3 flex flex-col">
          <div>
            <p className="text-lg my-4 font-thin">Opcje dodatkowe</p>
          </div>
          <div className="h-full w-full rounded-lg flex justify-center items-center border-[#5f5f5f] border-2 bg-[#1f1f1f]">
            <button className="bg-[#1f1f1f] hover:bg-buttonGray border-[#5f5f5f] border-2 text-sm px-4 py-2 rounded-lg flex items-center gap-2">
              <Lock />
              Dodaj zdjęcie
            </button>
          </div>
        </div>
      </div>
      <div className="w-full mt-4 flex justify-end items-center gap-2 text-[#fff] text-sm">
        <button
          className="border-[#5f5f5f] hover:bg-[#2a2a2a] border-2 rounded-lg bg-[#1f1f1f] px-4 py-2 hover:text-[#fff] text-buttonRed"
          onClick={addProductData}
        >
          Dodaj
        </button>
        <button
          className="border-[#5f5f5f] hover:bg-[#2a2a2a] border-2 rounded-lg bg-[#1f1f1f] px-4 py-2"
          onClick={onCancelAddProductData}
        >
          Anuluj
        </button>
      </div>
    </div>
  )
}

export default AddProduct
