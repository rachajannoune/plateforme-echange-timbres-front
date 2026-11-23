import type {
    RareteTimbre,
    StatutTimbre,
    Timbre
} from '~/types/timbre'

interface ReponseTimbres {
    page: number
    taille: number
    total: number
    items: Timbre[]
}

interface ParametresTimbres {
    page?: number
    taille?: number
    titre?: string
    theme?: string
    rarete?: RareteTimbre
    statut?: StatutTimbre
    ville?: string
}
//GET /api/timbres

export function useTimbres(
    parametres: ParametresTimbres = {}
) {
    const config = useRuntimeConfig()

    const baseURL = config.public.apiBase

    const {
        data,
        status,
        error,
        refresh
    } = useFetch<ReponseTimbres>(
        `${baseURL}/api/timbres`,
        {
            query: parametres
        }
    )

    return {
        data,
        status,
        error,
        refresh
    }
}

//GET /api/timbres/:id

export function useTimbre(id: string) {
    const config = useRuntimeConfig()

    const baseURL = config.public.apiBase

    const {
        data,
        status,
        error,
        refresh
    } = useFetch<Timbre>(
        `${baseURL}/api/timbres/${id}`,
    )

    return {
        data,
        status,
        error,
        refresh
    }
}