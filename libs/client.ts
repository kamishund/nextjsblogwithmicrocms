import { createClient } from 'microcms-js-sdk'
export const client = createClient({
  serviceDomain: 'shundaitechblog',
  apiKey: process.env.API_KEY || '',
})