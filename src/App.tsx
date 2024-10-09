import { Box, Container } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Header } from './components/Header'
import { MovieList, MovieRefresh } from './components/Movies'

const queryClient = new QueryClient()

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Container
                sx={{
                    marginBottom: 2,
                }}
            >
                <Header />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <MovieRefresh text="Refresh" />
                    <MovieList />
                </Box>
            </Container>
        </QueryClientProvider>
    )
}
