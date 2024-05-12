import { deleteDoc, doc } from 'firebase/firestore'
import { X } from 'lucide-react'
import { useRef } from 'react'
import { db } from '../../firebase/firebase.config'

interface ModalDeleteProps {
  onExit: () => void
  productId: string
  updateData: () => void
}

export default function ModalDelete({ onExit, productId, updateData }: ModalDeleteProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  const closeModal = (e) => {
    if (modalRef.current === e.target) onExit()
  }

  const toggleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'warehouse', productId))
      console.log(`Usunięto produkt o ID: ${productId}`)
      onExit()
      updateData()
    } catch (error) {
      console.error('Błąd podczas usuwania produktu:', error)
    }
  }

  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-10"
    >
      <div className="flex flex-col gap-4 bg-[#1f1f1f] rounded-md p-[1rem]">
        <div className="flex justify-end">
          <button onClick={onExit}>
            <X />
          </button>
        </div>
        <p>Czy na pewno chcesz usunąć ten produkt?</p>
        <div className="flex justify-end items-center gap-2">
          <button
            onClick={toggleDelete} // Dodaj obsługę przycisku "Tak"
            className="bg-red-700 rounded-md hover:bg-red-900 px-[1rem] py-[0.5rem] transition-colors"
          >
            Tak
          </button>
          <button
            onClick={onExit}
            className="bg-slate-700 rounded-md hover:bg-slate-800 px-[1rem] py-[0.5rem] transition-colors"
          >
            Anuluj
          </button>
        </div>
      </div>
    </div>
  )
}
