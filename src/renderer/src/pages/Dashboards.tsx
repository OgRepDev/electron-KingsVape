import DailySellsBarChart from '@renderer/components/DailySellsBarChart'
import { DocumentData, QuerySnapshot, collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
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

const Dashboards = () => {
  const [sells, setSells] = useState<SellData[]>([])
  const [dailyIncome, setDailyIncome] = useState<number>(0)
  const [dailyIncomePercentage, setDailyIncomePercentage] = useState<number>(0)
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0)
  const [totalIncome, setTotalIncome] = useState<number>(0)

  useEffect(() => {
    const fetchSells = async () => {
      try {
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, 'sells'))
        const fetchedData: SellData[] = []
        let previousDailyIncome = 0 // przechowuje wartość przychodu dziennego z poprzedniego dnia
        querySnapshot.forEach((doc) => {
          const sellData = doc.data() as SellData
          fetchedData.push({ ...sellData, id: doc.id })

          // Obliczanie przychodów
          const sellDate = new Date(sellData.date.seconds * 1000)
          const currentDate = new Date()
          const currentMonth = currentDate.getMonth()
          if (sellDate.getDate() === currentDate.getDate()) {
            const currentDailyIncome = previousDailyIncome + sellData.total
            setDailyIncome(currentDailyIncome)
            if (previousDailyIncome !== 0) {
              setDailyIncomePercentage(
                ((currentDailyIncome - previousDailyIncome) / previousDailyIncome) * 100
              )
            } else {
              setDailyIncomePercentage(0)
            }
            previousDailyIncome = currentDailyIncome
          }

          if (sellDate.getMonth() === currentMonth) {
            setMonthlyIncome((prevIncome) => prevIncome + sellData.total)
          }
          setTotalIncome((prevIncome) => prevIncome + sellData.total)
        })
        setSells(fetchedData)
      } catch (error) {
        console.error('Error updating data:', error)
      }
    }

    fetchSells()
  }, [])
  return (
    <div className="p-2 flex flex-col gap-2 w-full h-full">
      <div className="flex bg-[#1b1b1b] rounded-lg p-2 justify-between items-center w-[60vw]">
        <div className="flex-1 flex flex-col">
          <p className="opacity-50 text-xs">Przychód Brutto (Dzienny)</p>
          <p className="text-lg">{dailyIncome.toFixed(2)} PLN</p>
          <div className="flex gap-2 items-center justify-start">
            <div className="h-5 w-5 rounded-full bg-green-900 flex justify-center items-center">
              <div className="h-3 w-3 rounded-full bg-green-700" />
            </div>
            <p className="text-green-700 text-xs">{dailyIncomePercentage.toFixed(2)}%</p>
          </div>
        </div>
        <div className="h-[3rem] mx-4 w-[0.1rem] bg-[#3f3f3f]" />
        <div className="flex-1 flex flex-col">
          <p className="opacity-50 text-xs">Przychód Brutto (Miesięczny)</p>
          <p className="text-lg">{monthlyIncome.toFixed(2)} PLN</p>
          <div className="flex gap-2 items-center justify-start">
            <div className="h-5 w-5 rounded-full bg-red-900 flex justify-center items-center">
              <div className="h-3 w-3 rounded-full bg-red-700" />
            </div>
            <p className="text-red-700 text-xs">-1.15%</p>
          </div>
        </div>
        <div className="h-[3rem] mx-4 w-[0.1rem] bg-[#3f3f3f]" />
        <div className="flex-1 flex flex-col">
          <p className="opacity-50 text-xs">Przychód Brutto (Całościowy)</p>
          <p className="text-lg">{totalIncome.toFixed(2)} PLN</p>
        </div>
      </div>
      <div className="w-full h-full bg-[#1b1b1b] rounded-lg p-2 ">
        <DailySellsBarChart />
      </div>
    </div>
  )
}

export default Dashboards
