import { defineStore } from 'pinia'
import type { DonneesConnexion, DonneesInscription, Utilisateur } from '~/types/utilisateur'

export const useAuthStore = defineStore('auth', () => {
    const utilisateur = ref<Utilisateur | null>(null)

    const estConnecte = computed(() => {
        return Boolean(utilisateur.value)
    })

    const estModerateur = computed(() => {
        return utilisateur.value?.role === 'MODERATEUR'
    })

    const {
        recupererUtilisateur,
        connecter: connecterApi,
        deconnecter: deconnecterApi,
        inscrire: inscrireApi,
    } = useAuth()

    async function chargerUtilisateur() {
        try {
            const utilisateurRecupere = await recupererUtilisateur()

            utilisateur.value = utilisateurRecupere
        } catch {
            utilisateur.value = null
        }
    }
    async function connecter(donnees: DonneesConnexion) {

        await connecterApi(donnees)
        await chargerUtilisateur()
    }
    async function deconnecter() {
        await deconnecterApi()
        utilisateur.value = null
    }
    async function inscrire(
        donnees: DonneesInscription
    ) {
        await inscrireApi(donnees)
        await chargerUtilisateur()
    }
    return {
        utilisateur,
        estConnecte,
        estModerateur,
        chargerUtilisateur,
        connecter,
        deconnecter,
        inscrire
    }
})