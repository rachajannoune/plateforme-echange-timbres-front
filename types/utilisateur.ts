export type RoleUtilisateur =
    | 'MEMBRE'
    | 'MODERATEUR'

export type StatutUtilisateur =
    | 'SUSPENDU'
    | 'ACTIF'


export interface Utilisateur {
    id: string
    prenom: string
    nom: string
    email: string
    ville: string

    role: RoleUtilisateur
    statut: StatutUtilisateur

    dateAcceptationChart: string
    dateInscription: string
}

export interface DonneesConnexion {
    email: string
    motDePasse: string
}

export interface DonneesInscription {
    prenom: string
    nom: string
    email: string
    ville: string
    motDePasse: string
    acceptationCharte: boolean
}
