import type {
    RareteTimbre,
    StatutTimbre,
    Timbre,
    TimbreCollection
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


interface ReponseMesTimbres {
    page: number
    taille: number
    total: number
    items: TimbreCollection[]
}
interface ParametresMesTimbres {
    page?: number
    taille?: number
    statut?: StatutTimbre
}

//GET /api/timbres

export function useTimbres(
    parametres: ParametresTimbres = {}
) {
    const config = useRuntimeConfig()

    const baseURL = config.public.apiBase
    const headers = useRequestHeaders(['cookie'])
    const {
        data,
        status,
        error,
        refresh
    } = useFetch<ReponseTimbres>(
        `${baseURL}/api/timbres`,
        {
            headers,
            query: parametres,
            credentials: 'include'
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
//GET /api/moi/timbres

export function useMesTimbres(
    parametres: ParametresMesTimbres = {}
) {
    const config = useRuntimeConfig()

    const baseURL = config.public.apiBase
    const headers = useRequestHeaders(['cookie'])

    const {
        data,
        status,
        error,
        refresh
    } = useFetch<ReponseMesTimbres>(
        `${baseURL}/api/moi/timbres`,
        {
            headers,
            query: parametres,
            credentials: 'include'
        }
    )

    return {
        data,
        status,
        error,
        refresh
    }
}