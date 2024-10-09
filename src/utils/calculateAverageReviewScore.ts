/**
 * Calculates the average review score for a movie
 * @param reviews - An array of review scores
 * @returns The average review score as a string
 */
export const calculateAverageReviewScore = (reviews: number[]) => {
    const rating = (
        reviews.reduce((acc: number, i: number) => acc + i, 0) / reviews.length
    ).toFixed(1)

    return parseFloat(rating)
}
