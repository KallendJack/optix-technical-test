export type Movie = {
    id: string
    reviews: number[]
    title: string
    filmCompanyId: string
    cost: number
    releaseYear: number
}

export type Movies = Movie[]

export type MovieCompany = {
    id: string
    name: string
}

export type MovieCompanies = MovieCompany[]
