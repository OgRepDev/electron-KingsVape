import { collection, getDocs } from 'firebase/firestore'
import { CalendarIcon, PlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { db } from '../../firebase/firebase.config'

interface Product {
  name: string
  price: number
  quantity: number
}

interface SellData {
  id: string
  date: { seconds: number; nanoseconds: number }
  products: Product[]
  total: number
}

const filterSellsByDate = (sells: SellData[], date: Date): SellData[] => {
  const dateString = date.toISOString().split('T')[0] // Konwertujemy datę na string w formacie YYYY-MM-DD
  return sells.filter((sell) => {
    const sellDate = new Date(sell.date.seconds * 1000)
    const sellDateString = sellDate.toISOString().split('T')[0] // Konwertujemy datę sprzedaży na string w formacie YYYY-MM-DD
    return sellDateString === dateString // Zwracamy tylko sprzedaże z datą równą wybranej dacie
  })
}

const Raports = () => {
  const [selectedDate, setSelectedDate] = useState(new Date()) // Stan przechowujący wybraną datę
  const [sells, setSells] = useState<SellData[]>([])

  useEffect(() => {
    const fetchSells = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'sells'))
        const fetchedData: SellData[] = []
        querySnapshot.forEach((doc) => {
          const sellData = doc.data() as SellData
          fetchedData.push({ ...sellData, id: doc.id })
        })
        setSells(fetchedData)
      } catch (error) {
        console.error('Error updating data:', error)
      }
    }

    fetchSells()

    return () => {}
  }, [])

  const filteredSells = filterSellsByDate(sells, selectedDate)

  return (
    <div className="w-full h-full text-white p-2 flex flex-col gap-4 overflow-hidden">
      <DatePicker
        showIcon
        icon={<CalendarIcon />}
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        className="bg-[#101010] cursor-pointer rounded-lg gap-3 focus:outline-none hover:bg-[#242424] transition-colors"
      />
      {filteredSells.map((sell) => (
        <div
          key={sell.id}
          className="w-full flex flex-col gap-2 border-[0.1rem] border-[#1d1d1d] bg-[#101010] p-2 rounded-lg"
        >
          <div className="w-full flex justify-between items-center">
            <p className="opacity-80 text-base">
              {new Date(sell.date.seconds * 1000).toLocaleString()}
            </p>
            <p className="text-base flex gap-2">
              <span className="text-green-600">
                <PlusIcon />
              </span>{' '}
              {sell.total} PLN
            </p>
          </div>
          <div>
            {sell.products.map((product, index) => (
              <div
                key={index}
                className="flex gap-4 items-center w-full px-6 hover:bg-[#1f1f1f] transition-colors"
              >
                <p className="flex flex-1 gap-2 text-sm items-center">
                  <span className="text-green-900">
                    <PlusIcon />
                  </span>{' '}
                  {product.name}
                </p>
                <p className="flex flex-1 gap-2 text-sm items-center">
                  <span>Ilość: </span>
                  <span className="opacity-70">{product.quantity}</span>
                </p>
                <p className="flex flex-1 gap-2 text-sm items-center">
                  <span>Cena: </span>
                  <span className="opacity-70">{product.price}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Raports
