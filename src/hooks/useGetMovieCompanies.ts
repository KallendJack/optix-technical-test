import { useQuery } from '@tanstack/react-query'

import { endpoints } from '../endpoints'
import type { MovieCompanies } from '../types'

/**
 * Hook to fetch movie companies
 * @returns A query object with the movie companies
 */
export const useMovieCompanies = () => {
    return useQuery<MovieCompanies>({
        retry: false,
        queryKey: ['movieCompanies'],
        queryFn: async () => {
            const response = await fetch(endpoints.movieCompanies)

            return await response.json()
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })
}
