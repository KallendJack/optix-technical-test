import { useState, Dispatch, SetStateAction } from 'react'
import { TextField, Paper, Button, Stack, CircularProgress, Alert } from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useMovies } from '../../hooks'
import { endpoints } from '../../endpoints'

type MovieReviewFormProps = {
    movieId: number
    setSelectedMovie?: Dispatch<SetStateAction<number | null>>
}

interface IFormInput {
    rating: number
    message: string
}

const schema = yup
    .object({
        rating: yup
            .number()
            .typeError('Rating is required and must be a number')
            .required('Rating is required and must be a number')
            .min(0.1, 'Rating must be at least 0.1')
            .max(5, 'Rating cannot be more than 5'),
        message: yup
            .string()
            .required('Message is required')
            .max(100, 'Message cannot exceed 100 characters'),
    })
    .required()

export const MovieReviewForm = (props: MovieReviewFormProps) => {
    const { movieId, setSelectedMovie } = props

    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const { data: dataMovies } = useMovies()
    const movieName = dataMovies?.find((movie) => parseInt(movie.id) === movieId)?.title
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<IFormInput>({
        resolver: yupResolver(schema),
    })

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const { rating, message } = data

        try {
            const response = await fetch(endpoints.submitReview, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    movieId,
                    rating,
                    message,
                }),
            })

            if (!response.ok) {
                throw new Error('Something went wrong')
            }

            const json = await response.json()

            setSuccessMessage(json.message)

            reset()
        } catch (error) {
            console.error('Error submitting review:', error)
        }
    }

    return (
        <Paper
            sx={{
                padding: 2,
            }}
        >
            {setSelectedMovie && (
                <Button
                    onClick={() => {
                        setSelectedMovie(null)
                    }}
                    variant="contained"
                    color="inherit"
                >
                    Back
                </Button>
            )}

            <div>
                <h2>You have selected &apos;{movieName}&apos;</h2>
                <p>Please leave a review below</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <TextField
                        type="text"
                        label="Rating (1-5)"
                        fullWidth
                        error={!!errors.rating}
                        helperText={errors.rating?.message}
                        {...register('rating', {
                            required: true,
                        })}
                    />

                    <TextField
                        type="text"
                        label="Message"
                        fullWidth
                        multiline
                        maxRows={4}
                        error={!!errors.message}
                        helperText={errors.message?.message}
                        {...register('message', {
                            required: true,
                        })}
                    />

                    <Button type="submit" variant="contained">
                        {isSubmitting ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Submit Review'
                        )}
                    </Button>

                    {isSubmitSuccessful && <Alert severity="success">{successMessage}</Alert>}
                </Stack>
            </form>
        </Paper>
    )
}
