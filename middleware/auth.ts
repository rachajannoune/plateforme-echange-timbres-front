import type { Utilisateur } from '~/types/utilisateur'

export default defineNuxtRouteMiddleware(async (to) => {
    const authStore = useAuthStore()

    // Vérification côté serveur (SSR)
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

    // Vérification côté navigateur
    if (import.meta.client && !authStore.estConnecte) {
        await authStore.chargerUtilisateur()
    }

    // Si non connecté : redirection
    if (!authStore.estConnecte) {
        return navigateTo({
            path: '/connexion',
            query: {
                redirect: to.fullPath
            }
        })
    }
})