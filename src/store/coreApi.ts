// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi } from '@reduxjs/toolkit/query/react'
import wxBaseQuery from './wxBaseQuery'

// initialize an empty api service that we'll inject endpoints into later as needed
export const coreApi = createApi({
  baseQuery: wxBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: () => ({}),
})


export const  {} = coreApi
