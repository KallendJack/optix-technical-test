import { useQuery } from '@tanstack/react-query'

import { endpoints } from '../endpoints'
import type { Movies } from '../types'

/**
 * Hook to fetch movies
 * @returns A query object with the movies
 */
export const useMovies = () => {
    return useQuery<Movies>({
        retry: false,
        queryKey: ['movies'],
        queryFn: async () => {
            const response = await fetch(endpoints.movies)

            return await response.json()
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })
}
