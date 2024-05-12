import ReactECharts from 'echarts-for-react'
import { Timestamp, collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
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

const DailySellsBarChart: React.FC = () => {
  const [sells, setSells] = useState<SellData[]>([])

  useEffect(() => {
    const fetchSells = async () => {
      try {
        const startOfMonth = new Date()
        startOfMonth.setDate(1)
        startOfMonth.setHours(0, 0, 0, 0)

        const endOfMonth = new Date()
        endOfMonth.setMonth(endOfMonth.getMonth() + 1)
        endOfMonth.setDate(0)
        endOfMonth.setHours(23, 59, 59, 999)

        const q = query(
          collection(db, 'sells'),
          where('date', '>=', Timestamp.fromDate(startOfMonth)),
          where('date', '<=', Timestamp.fromDate(endOfMonth))
        )
        const querySnapshot = await getDocs(q)
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
  }, [])

  const chartData = sells.reduce((acc: { [key: string]: number }, sell) => {
    const date = new Date(sell.date.seconds * 1000).toLocaleDateString()
    if (acc[date]) {
      acc[date] += sell.total
    } else {
      acc[date] = sell.total
    }
    return acc
  }, {})

  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: '{b}: {c} PLN'
    },
    xAxis: {
      type: 'category',
      data: Object.keys(chartData)
    },
    yAxis: {
      type: 'value',
      name: 'Total'
    },
    series: [
      {
        data: Object.values(chartData),
        type: 'bar',
        itemStyle: {
          color: '#B91C1A'
        }
      }
    ]
  }

  return (
    <ReactECharts
      option={option}
      style={{ height: '100%', width: '100%' }}
      opts={{ renderer: 'canvas' }}
      notMerge={true}
    />
  )
}

export default DailySellsBarChart
