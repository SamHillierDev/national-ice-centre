import { useState, useEffect } from 'react'
import { EventCard } from './EventCard'
import { fetchEvents } from '../services/eventService'
import type { Event } from '../types/event'
import { format, parse, isWithinInterval, startOfMonth, endOfMonth } from 'date-fns'

interface EventListProps {
  selectedCategory: string
}

interface GroupedEvent extends Event {
  dates: string[]
}

export const EventList = ({ selectedCategory }: EventListProps) => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMonth, setSelectedMonth] = useState<string>('all')
  const [localCategory, setLocalCategory] = useState<string>('all')

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true)
        const data = await fetchEvents()

        const groupedEvents = data.reduce((acc: GroupedEvent[], event) => {
          const existingEvent = acc.find(e => e.title === event.title)
          
          if (existingEvent) {
            if (!existingEvent.dates) {
              existingEvent.dates = [existingEvent.date]
            }
            existingEvent.dates.push(event.date)
          } else {
            acc.push({
              ...event,
              dates: [event.date]
            })
          }
          
          return acc
        }, [])

        setEvents(groupedEvents)
        setError(null)
      } catch (err) {
        setError('Failed to load events. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [])

  const categories = ['all', ...new Set(events.flatMap(event => event.category))]
  const months = ['all', ...new Set(events.flatMap(event => 
    event.dates ? event.dates.map(date => format(new Date(date), 'MMMM yyyy')) : [format(new Date(event.date), 'MMMM yyyy')]
  ))]

  const filteredEvents = events.filter(event => {
    const now = new Date()
    const onsaleDate = new Date(event.onsaleDate)
    const offsaleDate = new Date(event.offsaleDate)
    const isOnSale = isWithinInterval(now, {
      start: onsaleDate,
      end: offsaleDate
    })

    if (!isOnSale) {
      return false
    }

    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase())
    if (!matchesSearch) {
      return false
    }

    if (selectedCategory === 'panthers') {
      if (!event.isPanthersGame) {
        return false
      }
    } else if (selectedCategory === 'hospitality') {
      const isHospitality = 
        event.title.toLowerCase().includes('hospitality') || 
        (event.when && event.when.toLowerCase().includes('hospitality packages')) ||
        (event.productTypes && event.productTypes.some(type => type.toLowerCase().includes('hospitality'))) ||
        (event.genre && event.genre.some(g => g.toLowerCase().includes('hospitality'))) ||
        (event.contentId && event.contentId.toLowerCase().includes('hospitality')) ||
        (event.description && event.description.toLowerCase().includes('hospitality'))
      if (!isHospitality) {
        return false
      }
    } else if (selectedCategory === 'all') {
      if (localCategory !== 'all' && !event.category.includes(localCategory)) {
        return false
      }
    }

    if (selectedMonth !== 'all') {
      const [month, year] = selectedMonth.split(' ')
      const selectedDate = parse(`${month} ${year}`, 'MMMM yyyy', new Date())
      
      const hasDateInMonth = (event.dates || [event.date]).some(date => 
        isWithinInterval(new Date(date), {
          start: startOfMonth(selectedDate),
          end: endOfMonth(selectedDate)
        })
      )
      
      if (!hasDateInMonth) {
        return false
      }
    }

    return true
  })

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {selectedCategory === 'all' && (
          <>
            <select
              value={localCategory}
              onChange={(e) => setLocalCategory(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {months.map(month => (
                <option key={month} value={month}>
                  {month.charAt(0).toUpperCase() + month.slice(1)}
                </option>
              ))}
            </select>
          </>
        )}
      </div>

      {filteredEvents.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No events found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
            />
          ))}
        </div>
      )}
    </div>
  )
} 