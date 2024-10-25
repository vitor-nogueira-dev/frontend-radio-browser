import { Radio } from 'lucide-react'
import { useEffect, useState } from 'react'

interface RadioNotFoundProps {
  title: string
  description: string
  type: 'searchRadios' | 'searchFavorites'
}

function RadioNotFound({ title, description, type }: RadioNotFoundProps) {
  const [isSearchRadio, setIsSearchRadio] = useState(false)

  useEffect(() => {
    if (type === 'searchRadios') {
      setIsSearchRadio(true)
    }
  }, [type])

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <div className={`relative mb-4 ${isSearchRadio ? 'w-12 h-12' : 'w-24 h-24'}`}>
        <Radio className={` text-gray-300 ${isSearchRadio ? 'w-12 h-12' : 'w-24 h-24'}`} />
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
          <path
            d="M50 15 L50 85 M15 50 L85 50"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            className="text-primary animate-pulse"
          />
        </svg>
      </div>
      <h3 className={`font-semibold mb-2 ${isSearchRadio ? 'text-lg' : 'text-2xl '}`}>{title}</h3>
      <p className="text-muted-foreground mb-4">
        {description}
      </p>
    </div>
  )
}

export default RadioNotFound;