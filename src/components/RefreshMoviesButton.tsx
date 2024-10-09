type RefreshMoviesButtonProps = {
    text: string
}

export const RefreshMoviesButton = ({ text }: RefreshMoviesButtonProps) => (
    <button data-testid="refresh-movies-button">{text}</button>
)

// const refreshButton = (buttonText: any) => {
//     if (mockMovieCompanyData) {
//         return <button>{buttonText}</button>
//     } else {
//         return <p>No movies loaded yet</p>
//     }
// }
