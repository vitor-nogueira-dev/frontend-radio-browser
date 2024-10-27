import React from 'react'
import { Loader2 } from 'lucide-react'

function RadioLoading() {
  return (
    <section className='h-screen'>
      <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-lg shadow-lg">
        <div className="relative w-48 h-48 bg-white rounded-full shadow-inner flex items-center justify-center overflow-hidden">
          <div className="absolute w-40 h-40 bg-gray-100 rounded-full animate-pulse"></div>
          <div className="absolute w-16 h-16 bg-white rounded-full flex items-center justify-center z-10">
            <Loader2 className="w-8 h-8 text-gray-600 animate-spin" />
          </div>
          <div className="absolute w-full h-full border-t-4 border-gray-400 rounded-full animate-spin"></div>
        </div>
        <div className="mt-8 w-32 h-2 bg-gray-400 rounded-full animate-pulse"></div>
        <div className="mt-4 w-24 h-2 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="mt-8 text-lg font-semibold text-gray-700">Sintonizando...</div>
      </div>
    </section>
  )
}

export default RadioLoading