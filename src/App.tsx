import { Container } from '@mui/material'

import { Header } from './components/Header'
import { RefreshMoviesButton } from './components/RefreshMoviesButton'
import { MovieTable } from './components/MovieTable'

export const App = () => {
    return (
        <Container>
            <Header />
            <RefreshMoviesButton text="Refresh" />
            <MovieTable />
        </Container>
    )
}
