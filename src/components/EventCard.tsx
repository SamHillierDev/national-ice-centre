import { useState } from 'react'
import type { Event } from '../types/event'
import { format } from 'date-fns'

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(true)

  const formatDates = (dates: string[]): string => {
    if (!dates || dates.length === 0) return ''

    const parsedDates = dates
      .map(date => new Date(date))
      .sort((a, b) => a.getTime() - b.getTime())
      .filter((date, index, self) => 
        index === self.findIndex((d) => d.getTime() === date.getTime())
      )
    
    const month = format(parsedDates[0], 'MMMM')
    const year = format(parsedDates[0], 'yyyy')
    const formattedDates = parsedDates.map(date => format(date, 'EEE d'))
    let dateString = formattedDates.join(', ')
    if (formattedDates.length > 1) {
      const lastCommaIndex = dateString.lastIndexOf(',')
      dateString = dateString.substring(0, lastCommaIndex) + ' &' + dateString.substring(lastCommaIndex + 1)
    }
    
    return `${dateString} ${month} ${year}`
  }

  const formattedDate = formatDates(event.dates || [event.date])

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
      <div className="relative aspect-[16/9] bg-gray-100">
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-[#0066CC] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {!imageError && event.image && (
          <img
            src={event.image}
            alt={event.title}
            className={`w-full h-full object-cover ${isImageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
            onLoad={() => setIsImageLoading(false)}
            onError={() => {
              setImageError(true)
              setIsImageLoading(false)
            }}
          />
        )}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-gray-400">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
              {event.category[0]}
            </span>
          </div>
          <span className="text-sm text-gray-500">{formattedDate}</span>
        </div>
        <h3 className="text-xl font-semibold text-[#333333] mb-2 line-clamp-2">{event.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-gray-500">
              {event.isPanthersGame ? event.time : format(new Date(event.date), 'h:mm a')}
            </span>
          </div>
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-[#0066CC] text-white rounded hover:bg-[#0052A3] transition-colors"
          >
            Book Now
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
} 