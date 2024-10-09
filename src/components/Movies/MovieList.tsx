import { useState, useMemo, useEffect } from 'react'
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    Box,
    Rating,
    Stack,
    Modal,
} from '@mui/material'

import { calculateAverageReviewScore, sortMoviesByRating } from '../../utils'
import { useMovies, useMovieCompanies } from '../../hooks'
import { MovieReviewForm } from './MovieReviewForm'

export const MovieList = () => {
    const { isFetching: isFetchingMovies, error: errorMovies, data: dataMovies } = useMovies()
    const {
        isFetching: isFetchingMovieCompanies,
        error: errorMovieCompanies,
        data: dataMovieCompanies,
    } = useMovieCompanies()

    const isFetchingListData = isFetchingMovies || isFetchingMovieCompanies
    const errorFetchingListData = errorMovies || errorMovieCompanies
    const showData = !isFetchingListData && !errorFetchingListData

    const movieLength = useMemo(
        () => (errorFetchingListData ? 0 : dataMovies?.length),
        [dataMovies?.length, errorFetchingListData],
    )
    const [selectedMovie, setSelectedMovie] = useState<number | null>(null)
    const [sortOrder, setSortOrder] = useState<'default' | 'asc' | 'desc'>('default')

    const sortedMovies = useMemo(() => {
        if (!dataMovies) return []

        return sortMoviesByRating(dataMovies, sortOrder)
    }, [dataMovies, sortOrder])

    const handleSortToggle = () => {
        setSortOrder((prevOrder) => {
            switch (prevOrder) {
                case 'asc':
                    return 'desc'
                case 'desc':
                    return 'default'
                case 'default':
                default:
                    return 'asc'
            }
        })
    }

    useEffect(() => {
        if (selectedMovie) {
            setSelectedMovie(null)
        }
    }, [showData])

    return (
        <Stack spacing={2}>
            <TableContainer component={Paper}>
                <Box px={2}>
                    <p>Total movies displayed: {movieLength}</p>
                </Box>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    fontWeight: 'bold',
                                }}
                            >
                                Movie Title
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                }}
                                align="right"
                                onClick={handleSortToggle}
                            >
                                Rating {sortOrder === 'asc' && '(asc)'}
                                {sortOrder === 'desc' && '(desc)'}
                                {sortOrder === 'default' && '(default)'}
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: 'bold',
                                }}
                                align="right"
                            >
                                Producer
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {isFetchingListData && (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        )}

                        {!isFetchingListData && errorFetchingListData && (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    There was an error fetching the movies. Please refresh using the
                                    button above.
                                </TableCell>
                            </TableRow>
                        )}

                        {showData &&
                            sortedMovies?.map((movie) => {
                                const movieProducer = dataMovieCompanies?.find(
                                    (movieCompany) => movieCompany.id === movie.filmCompanyId,
                                )?.name
                                const isSelected =
                                    selectedMovie && selectedMovie === parseInt(movie.id)

                                return (
                                    <TableRow
                                        key={movie.id}
                                        sx={{
                                            '&:last-child td, &:last-child th': { border: 0 },
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                                cursor: 'pointer',
                                            },
                                            backgroundColor: isSelected
                                                ? 'rgba(0, 0, 0, 0.04)'
                                                : 'inherit',
                                        }}
                                        onClick={() => {
                                            setSelectedMovie(parseInt(movie.id))
                                        }}
                                    >
                                        <TableCell>{movie.title}</TableCell>
                                        <TableCell
                                            align="right"
                                            sx={{
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            <Rating
                                                value={
                                                    calculateAverageReviewScore(movie.reviews) || 0
                                                }
                                                precision={0.1}
                                                readOnly
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell align="right">{movieProducer}</TableCell>
                                    </TableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </TableContainer>

            {selectedMovie && (
                <Modal
                    open={!!selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                    sx={{
                        display: {
                            lg: 'none',
                        },
                    }}
                >
                    <Box>
                        <MovieReviewForm
                            movieId={selectedMovie}
                            setSelectedMovie={setSelectedMovie}
                        />
                    </Box>
                </Modal>
            )}

            {selectedMovie && (
                <Stack
                    sx={{
                        display: {
                            xs: 'none',
                            lg: 'block',
                        },
                    }}
                >
                    <MovieReviewForm movieId={selectedMovie} />
                </Stack>
            )}
        </Stack>
    )
}
