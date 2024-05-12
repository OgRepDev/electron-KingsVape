import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase.config'

interface ProductData {
  id: string
  name: string
  price: number
  brand: string
  quantity: number
  category: string
  barcode: string
}

export const getAllProducts = (sortBy: 'asc' | 'desc' | 'zero') => {
  const [data, setData] = useState<ProductData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'warehouse'))
        const fetchedData: ProductData[] = []
        querySnapshot.forEach((doc) => {
          const productData = doc.data() as ProductData
          fetchedData.push({ ...productData, id: doc.id })
        })

        // Sortowanie danych na podstawie wybranej opcji
        let sortedData: ProductData[]
        if (sortBy === 'asc') {
          sortedData = fetchedData.sort((a, b) => a.quantity - b.quantity)
        } else if (sortBy === 'desc') {
          sortedData = fetchedData.sort((a, b) => b.quantity - a.quantity)
        } else {
          // Jeśli sortBy === 'zero', sortujemy tak, aby produkty z ilością równą zero były na początku
          sortedData = fetchedData.sort((a, b) => {
            if (a.quantity === 0) return -1
            if (b.quantity === 0) return 1
            return 0
          })
        }

        setData(sortedData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [sortBy])

  // Funkcja do aktualizacji danych
  const updateData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'warehouse'))
      const fetchedData: ProductData[] = []
      querySnapshot.forEach((doc) => {
        const productData = doc.data() as ProductData
        fetchedData.push({ ...productData, id: doc.id })
      })
      setData(fetchedData)
    } catch (error) {
      console.error('Error updating data:', error)
    }
  }

  return { data, updateData } // Zwróć także funkcję aktualizacji danych
}
