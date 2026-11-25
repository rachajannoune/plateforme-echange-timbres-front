import type { Utilisateur } from '~/types/utilisateur'

export default defineNuxtRouteMiddleware(async () => {
    const authStore = useAuthStore()

    // Vérifier la session côté serveur
    if (import.meta.server) {
        const config = useRuntimeConfig()

        try {
            const utilisateur = await $fetch<Utilisateur>(
                `${config.public.apiBase}/api/auth/moi`,
                {
                    headers: useRequestHeaders(['cookie'])
                }
            )

            authStore.utilisateur = utilisateur
        } catch {
            authStore.utilisateur = null
        }
    }

    // Vérifier la session côté navigateur
    if (import.meta.client && !authStore.estConnecte) {
        await authStore.chargerUtilisateur()
    }

    // Visiteur non connecté
    if (!authStore.estConnecte) {
        return navigateTo('/connexion?espace=moderateur')
    }

    // Membre sans droit de modération
    if (!authStore.estModerateur) {
        return navigateTo('/')
    }
})