import { FilterButton } from '@renderer/components/FilterButton'
import { FilterQuantityButton } from '@renderer/components/FilterQuantityButton'
import ModalDelete from '@renderer/components/ModalDelete'
import { ProductCardList } from '@renderer/components/ProductCardList'
import { getAllProducts } from '@renderer/hooks/getAllProducts'
import { ChevronsDown, ChevronsUp, PlusIcon, Skull } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface ProductData {
  id: string
  name: string
  price: number
  quantity: number
  barcode: string
  brand: string
  category: string
}

const Warehouse = () => {
  const { data, updateData } = getAllProducts('desc')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([])
  const [productIdToDelete, setProductIdToDelete] = useState<string>('') // Stan productIdToDelete
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'asc' | 'desc' | 'zero'>('asc')

  useEffect(() => {
    console.log('Data before filtering:', data)
    let filteredData = data

    // Filtrowanie po nazwie
    filteredData = filteredData.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Filtrowanie po kategorii, jeśli została wybrana
    if (selectedCategory) {
      filteredData = filteredData.filter((product) => product.category === selectedCategory)
    }

    if (sortBy !== 'zero') {
      filteredData = filteredData.filter((product) => product.quantity !== 0)
    }

    if (sortBy === 'zero') {
      filteredData = filteredData.filter((product) => product.quantity === 0)
    }

    // Sortowanie danych
    if (sortBy === 'asc') {
      filteredData.sort((a, b) => a.quantity - b.quantity)
    } else if (sortBy === 'desc') {
      filteredData.sort((a, b) => b.quantity - a.quantity)
    }

    console.log('Filtered data:', filteredData)
    setFilteredProducts(filteredData)
  }, [data, searchQuery, selectedCategory, sortBy])

  return (
    <div className="flex h-full w-full">
      {productIdToDelete && ( // Wyświetlamy modal tylko gdy productIdToDelete jest ustawiony
        <ModalDelete
          onExit={() => setProductIdToDelete('')} // Resetowanie productIdToDelete po zamknięciu modala
          productId={productIdToDelete}
          updateData={updateData}
        />
      )}
      <div className="h-full flex flex-col justify-center items-center px-[0.5vmax] py-[1rem] w-[350px] max-w-[350px] min-w-[350px]">
        <div className="px-[2vmax] py-[1rem] flex justify-center items-center">
          <p className="text-[1rem] opacity-60">Filtry</p>
        </div>
        <div className="bg-[#1b1b1b] rounded-lg p-[1vmax] w-full h-full mb-[1vmax]">
          <div className="h-full w-full flex flex-col gap-[1.5vmax]">
            <div className="flex flex-col gap-[0.5vmax]">
              <FilterButton
                title="Wszystko"
                number={data.length}
                onClick={() => setSelectedCategory(null)}
                isSelected={selectedCategory === null}
              />
              <FilterButton
                title="Liquidy"
                number={data.filter((product) => product.category === 'Liquid').length}
                onClick={() => setSelectedCategory('Liquid')}
                isSelected={selectedCategory === 'Liquid'}
              />
              <FilterButton
                title="Sprzęt"
                number={data.filter((product) => product.category === 'Sprzęt').length}
                onClick={() => setSelectedCategory('Sprzęt')}
                isSelected={selectedCategory === 'Sprzęt'}
              />
              <FilterButton
                title="Akcesoria"
                number={data.filter((product) => product.category === 'Akcesoria').length}
                onClick={() => setSelectedCategory('Akcesoria')}
                isSelected={selectedCategory === 'Akcesoria'}
              />
              <FilterButton
                title="Grzałki"
                number={data.filter((product) => product.category === 'Grzałki').length}
                onClick={() => setSelectedCategory('Grzałki')}
                isSelected={selectedCategory === 'Grzałki'}
              />
            </div>
            <div className="flex justify-between items-center gap-[0.2vmax]">
              <FilterQuantityButton
                title="Rosnąco"
                icon={<ChevronsUp />}
                onFilter={() => setSortBy('asc')}
              />
              <div className="h-full w-[0.02vmax] bg-[#242424]" />
              <FilterQuantityButton
                title="Malejąco"
                icon={<ChevronsDown />}
                onFilter={() => setSortBy('desc')}
              />
              <div className="h-full w-[0.02vmax] bg-[#242424]" />
              <FilterQuantityButton
                title="Braki"
                icon={<Skull />}
                onFilter={() => setSortBy('zero')}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-col py-[1rem] px-[1rem]">
        <div className="w-full flex justify-between">
          <div className="px-[1.5rem] py-[0.5rem] mb-[0.5rem] bg-white rounded-lg flex justify-start items-center w-[500px]">
            <input
              type="text"
              placeholder="Wyszukaj produkt"
              className="bg-transparent border-none outline-none w-full text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Link to={'/addproduct'}>
            <button className="bg-red-700 mb-[0.5rem] hover:bg-red-900 transition-colors py-[0.5rem] px-[1.5rem] rounded-lg text-white flex justify-center items-center gap-2 text-md">
              <PlusIcon />
              <p>Dodaj nowy produkt</p>
            </button>
          </Link>
        </div>
        <div className="flex flex-col gap-[0.5rem] w-full max-h-[80vh] overflow-y-auto">
          {filteredProducts.map((product) => {
            return (
              <ProductCardList
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                quantity={product.quantity}
                barcode={product.barcode}
                brand={product.brand}
                onDelete={() => setProductIdToDelete(product.id)} // Wywołanie handleDelete po kliknięciu na ikonę usuwania
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Warehouse
