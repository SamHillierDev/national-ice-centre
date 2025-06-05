import axios from 'axios'
import type { Event } from '../types/event'

const API_URL = 'https://whatson.motorpointarenanottingham.com/api/challenge'
const CACHE_KEY = 'events_cache'
const CACHE_DURATION = 1000 * 60 * 60 // 1 hour

interface CacheData {
  timestamp: number
  events: Event[]
}

const getCachedEvents = (): Event[] | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (!cached) return null

    const { timestamp, events }: CacheData = JSON.parse(cached)
    const now = Date.now()

    if (now - timestamp > CACHE_DURATION) {
      localStorage.removeItem(CACHE_KEY)
      return null
    }

    return events
  } catch (error) {
    localStorage.removeItem(CACHE_KEY)
    return null
  }
}

const setCachedEvents = (events: Event[]) => {
  try {
    const cacheData: CacheData = {
      timestamp: Date.now(),
      events
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
  } catch (error) {
    localStorage.removeItem(CACHE_KEY)
  }
}

export const fetchEvents = async (): Promise<Event[]> => {
  try {
    const cachedEvents = getCachedEvents()
    if (cachedEvents) {
      return cachedEvents
    }

    const apiKey = import.meta.env.VITE_API_KEY
    const response = await axios({
      method: 'get',
      url: API_URL,
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json'
      }
    })

    if (!response.data) {
      throw new Error('No data received from API')
    }

    const dataArray = Array.isArray(response.data) ? response.data : [response.data]

    const events = dataArray.map((item: any) => {
      const fields = item.fields || {}
      const largeImage = fields.large_image || ''
      const featureImage = fields.feature_image || ''
      const imageUrl = largeImage || featureImage ? `https://d2gloyfobyb8yo.cloudfront.net/dbimages/${largeImage || featureImage}` : ''
      const purchaseUrl = fields.purchase || ''
      
      return {
        id: item.id || '',
        title: fields.title || 'Untitled Event',
        date: fields.date || '',
        image: imageUrl,
        category: Array.isArray(fields.genre) ? fields.genre : ['Other'],
        description: fields.description || '',
        url: purchaseUrl,
        isPanthersGame: fields.title?.toLowerCase().includes('panthers') || false,
        onsaleDate: fields.onsale_date || '',
        offsaleDate: fields.offsale_date || '',
        contentId: fields.content_id || '',
        largeImage: largeImage,
        featureImage: featureImage,
        genre: Array.isArray(fields.genre) ? fields.genre : [],
        when: fields.when || '',
        productTypes: Array.isArray(fields.product_types) ? fields.product_types : []
      }
    })

    setCachedEvents(events)
    return events
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`API Error: ${error.response?.status} - ${error.response?.statusText}`)
    }
    throw error
  }
} 