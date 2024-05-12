import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where
} from 'firebase/firestore'
import { Barcode, Minus, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { db } from '../../firebase/firebase.config' // Zaimportuj swój obiekt Firebase Firestore

interface Product {
  _id: string
  name: string
  barcode: string
  quantity: number
  price: number
  brand: string
}

const Sells = () => {
  const [barcode, setBarcode] = useState<string>('')
  const [data, setData] = useState<Product[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)

  const handleBarcodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBarcode(event.target.value)
  }

  const handleEnterPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()

      try {
        const q = query(collection(db, 'warehouse'), where('barcode', '==', barcode))
        const querySnapshot = await getDocs(q)
        const scannedProduct = querySnapshot.docs.map(
          (doc) => ({ ...doc.data(), _id: doc.id }) as Product
        )[0]

        if (scannedProduct) {
          const existingProductIndex = data.findIndex((p) => p.barcode === scannedProduct.barcode)

          if (existingProductIndex !== -1) {
            const updatedData = [...data]
            updatedData[existingProductIndex].quantity += 1
            setData(updatedData)
          } else {
            const newProduct = { ...scannedProduct, quantity: 1 }
            setData((prevData) => [...prevData, newProduct])
          }

          // Oblicz nową wartość totalnej ceny na podstawie zaktualizowanych danych
          setTotalPrice((prevTotal) => {
            const totalPriceOfScannedProduct = scannedProduct.price
            const newTotal = prevTotal + totalPriceOfScannedProduct
            return newTotal
          })

          // Debugowanie stanu danych po aktualizacji
          console.log('Updated data:', data)
        } else {
          console.log('Product not found.')
        }

        setBarcode('')

        // Debugowanie liczby produktów po filtracji
        console.log(
          'Filtered product count:',
          data.filter((p) => p.barcode === scannedProduct.barcode).length
        )
      } catch (error: any) {
        console.error('Error:', error)
      }
    }
  }

  const handleRemoveProduct = (productId: string, price: number) => {
    // Znajdź indeks produktu do usunięcia
    const existingProductIndex = data.findIndex((p) => p._id === productId)

    // Sprawdź, czy produkt został znaleziony
    if (existingProductIndex !== -1) {
      // Sprawdź, czy ilość produktu jest większa niż 1
      if (data[existingProductIndex].quantity > 1) {
        // Jeśli tak, zmniejsz ilość produktu o 1
        const updatedData = [...data]
        updatedData[existingProductIndex].quantity -= 1
        setData(updatedData)

        // Odejmij cenę jednostkową produktu od całkowitej ceny
        setTotalPrice((prevTotal) => prevTotal - price)
      } else {
        // Jeśli ilość produktu wynosi 1, usuń go z listy
        const updatedData = data.filter((p) => p._id !== productId)
        setData(updatedData)

        // Odejmij cenę jednostkową produktu od całkowitej ceny
        setTotalPrice((prevTotal) => prevTotal - price)
      }
    }
  }

  const handleConfirmSale = async () => {
    try {
      // Utwórz obiekt reprezentujący sprzedaż
      const saleData = {
        date: serverTimestamp(), // Ustaw datę na obecną
        products: data.map((product) => ({
          name: product.name,
          quantity: product.quantity,
          price: product.price,
          brand: product.brand
        })),
        total: totalPrice
      }

      // Dodaj sprzedaż do kolekcji "sells" w bazie danych Firestore
      await addDoc(collection(db, 'sells'), saleData)

      // Aktualizuj ilość produktów w magazynie
      await Promise.all(
        data.map(async (product) => {
          // Pobierz referencję do dokumentu produktu w magazynie
          const productRef = doc(db, 'warehouse', product._id)

          // Pobierz aktualną ilość produktu z magazynu
          const productSnapshot = await getDoc(productRef)
          const currentQuantity = productSnapshot.data()?.quantity || 0

          // Odjęć sprzedaną ilość od aktualnej ilości w magazynie
          const updatedQuantity = currentQuantity - product.quantity

          // Zaktualizuj ilość produktu w magazynie
          await updateDoc(productRef, { quantity: updatedQuantity })
        })
      )

      // Zresetuj stan danych (wyczyść listę produktów i cenę całkowitą)
      setData([])
      setTotalPrice(0)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="p-5 text-[#fff] flex flex-col">
      <div className="mb-5">
        <p className="text-xl flex">
          <ShoppingCart className="mr-2" />
          SPRZEDAŻ
        </p>
      </div>
      <div className="flex items-center">
        <p>
          <Barcode className="mr-3" />
        </p>
        <input
          type="text"
          placeholder="Kod kreskowy"
          value={barcode}
          onChange={handleBarcodeChange}
          onKeyPress={handleEnterPress}
          className="bg-[#343434] px-2 py-1 focus:outline-none rounded-full text-sm"
        />
      </div>
      <div className="w-full h-full max-h-[27rem] bg-[#1f1f1f] rounded-md mt-5 overflow-y-auto">
        {data.length > 0 &&
          data.map((product) => (
            <div key={product._id} className="flex flex-col p-2 border-b border-gray-500">
              <div className="flex justify-between items-center">
                <span className="flex-1">{product.barcode}</span>
                <span className="flex-1">{product.name}</span>
                <span className="flex-1">{product.price} PLN</span>
                <span className="flex-1">{product.brand}</span>
                <span className="flex-1 flex justify-end w-full" style={{ color: 'red' }}>
                  {product.quantity}
                </span>
                <button
                  className="p-[0.5] bg-red-700 text-white flex justify-center items-center ml-[0.5rem]"
                  onClick={() => handleRemoveProduct(product._id, product.price)}
                >
                  <Minus />
                </button>
              </div>
              {/* Dodaj inne pola produktu, które chcesz wyświetlić */}
            </div>
          ))}
      </div>
      <div className="mt-5 flex justify-between">
        <p className="text-2xl">Total: {totalPrice} PLN</p>
        <button
          onClick={handleConfirmSale}
          disabled={data.length === 0}
          className="text-md rounded-sm border border-buttonGray px-4 py-2 hover:bg-[#353535] transition-colors"
        >
          Zatwierdź
        </button>
      </div>
    </div>
  )
}

export default Sells
