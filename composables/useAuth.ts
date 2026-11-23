import type { DonneesConnexion, DonneesInscription, Utilisateur } from "~/types/utilisateur"

export function useAuth() {
    const config = useRuntimeConfig()
    const baseURL = config.public.apiBase

    // POST /api/auth/connexion
    async function connecter(
        donnees: DonneesConnexion
    ) {
        const reponse = await $fetch(
            `${baseURL}/api/auth/connexion`,
            {
                method: 'POST',
                body: donnees,
                credentials: 'include'
            }
        )

        return reponse
    }
    // POST /api/auth/inscription
    async function inscrire(
        donnees: DonneesInscription
    ) {
        const reponse = await $fetch(
            `${baseURL}/api/auth/inscription`,
            {
                method: 'POST',
                body: donnees,
                credentials: 'include'
            }
        )

        return reponse
    }
    // GET /api/auth/moi

    async function recupererUtilisateur() {
        const reponse = await $fetch<Utilisateur>(
            `${baseURL}/api/auth/moi`,
            {
                credentials: 'include',
            }
        )

        return reponse

    }
    //POST /api/auth/deconnexion
    async function deconnecter() {
        const reponse = await $fetch(
            `${baseURL}/api/auth/deconnexion`,
            {
                method: 'POST',
                credentials: 'include',
            }
        )

        return reponse
    }
    return {
        connecter,
        inscrire,
        recupererUtilisateur,
        deconnecter
    }
}
