import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@mui/material'

type MovieRefreshProps = {
    text: string
}

export const MovieRefresh = (props: MovieRefreshProps) => {
    const { text } = props

    const queryClient = useQueryClient()

    return (
        <Button variant="contained" onClick={() => queryClient.invalidateQueries()}>
            {text}
        </Button>
    )
}
