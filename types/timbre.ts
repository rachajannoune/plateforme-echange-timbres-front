export type RareteTimbre =
    | 'COURANT'
    | 'RECHERCHE'
    | 'RARE'

export type StatutTimbre =
    | 'DISPONIBLE'
    | 'EN_ATTENTE'
    | 'RESERVE'
    | 'EN_ECHANGE'
    | 'SUSPENDU'

export type EtatTimbre =
    | 'NEUF'
    | 'NEUF_SANS_GOMME'
    | 'OBLITERE'

export type FaceTimbre =
    | 'RECTO'
    | 'VERSO'


export interface ProprietaireTimbre {
    id: string
    prenom: string
    ville: string
}
export interface PhotoTimbre {
    id:string
    face: FaceTimbre
    chemin: string
    typeMime:string
}

export interface Timbre {
    id: string
    proprietaireId: string

    titre: string
    theme: string
    pays: string
    annee: number

    valeurFaciale: string
    coteEstimee: number
    couleurImpression: string

    rarete: RareteTimbre
    etat: EtatTimbre
    referenceCatalogue: string | null
    statut: StatutTimbre

    expertise: boolean
    version: number
    dateDepot: string

    proprietaire: ProprietaireTimbre
    photos: PhotoTimbre[]
}