import type { Movies } from '../types'
import { calculateAverageReviewScore } from './calculateAverageReviewScore'

export const sortMoviesByRating = (movies: Movies, sortOrder: 'asc' | 'desc' | 'default') => {
    if (!movies) return []

    const sortedMovies = [...movies]

    if (sortOrder === 'asc') {
        return sortedMovies.sort((a, b) => {
            const ratingA = calculateAverageReviewScore(a.reviews) || 0
            const ratingB = calculateAverageReviewScore(b.reviews) || 0
            return ratingA - ratingB
        })
    }

    if (sortOrder === 'desc') {
        return sortedMovies.sort((a, b) => {
            const ratingA = calculateAverageReviewScore(a.reviews) || 0
            const ratingB = calculateAverageReviewScore(b.reviews) || 0
            return ratingB - ratingA
        })
    }

    // For default, return the unsorted list
    return movies
}
