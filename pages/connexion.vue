<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})
import {
  Eye,
  EyeOff,
  LogIn,
} from 'lucide-vue-next'

const email = ref('')
const motDePasse = ref('')

const authStore = useAuthStore()
const router = useRouter()

const chargement = ref(false)
const messageErreur = ref('')
const afficherMotDePasse = ref(false)
const route = useRoute()

const estModerateur = computed(() => {
  return route.query.espace === 'moderateur'
})

async function soumettreConnexion() {
  messageErreur.value = ''
  chargement.value = true

  try {
    await authStore.connecter({
      email: email.value,
      motDePasse: motDePasse.value,
    })

    await router.push('/')
  } catch (error) {
    if (
      typeof error === 'object'
      && error !== null
      && 'data' in error
    ) {
      const data = error.data as {
        message?: string
      }

      messageErreur.value =
        data.message ?? 'Impossible de se connecter.'
    } else {
      messageErreur.value =
        'Impossible de se connecter.'
    }
  } finally {
    chargement.value = false
  }
}

useSeoMeta({
  title: 'Connexion - LaPoste',
  description:
    'Connectez-vous à votre espace collectionneur LaPoste.',
})
</script>

<template>
  <div class="min-h-screen bg-[#FAF9F5] lg:grid lg:grid-cols-2">
    <!-- Partie gauche -->
    <section class="relative hidden overflow-hidden bg-[#FFCD00] p-12 lg:flex lg:min-h-screen lg:flex-col">
      <!-- Logo -->
      <NuxtLink to="/" class="relative z-10 flex items-center gap-3">
        <span
          class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#16296B] font-display text-xl font-extrabold text-white">
          P
        </span>

        <span class="font-display text-2xl font-extrabold text-[#16296B]">
          LaPoste
        </span>
      </NuxtLink>

      <!-- Présentation -->
      <div class="relative z-10 my-auto max-w-[520px]">
        <p class="text-xs font-extrabold uppercase tracking-[0.16em] text-[#16296B]/70">
          Collection · échange · passion
        </p>

        <h1 class="mt-4 font-display text-5xl font-extrabold leading-[1.08] tracking-tight text-[#16223D]">
          Vos timbres ont
          <br>
          encore des histoires
          <br>
          à raconter.
        </h1>

        <p class="mt-6 max-w-[450px] text-base leading-7 text-[#16223D]/75">
          Retrouvez votre collection, découvrez de nouvelles pièces
          et échangez avec d'autres collectionneurs.
        </p>

        <!-- Timbres décoratifs -->
        <div class="mt-10 flex items-end gap-4">
          <div
            class="-rotate-6 flex h-36 w-28 flex-col justify-between border-[6px] border-dotted border-white bg-[#5A4A8F] p-3 text-white shadow-lg">
            <span class="text-[8px] font-bold tracking-widest">
              FRANCE
            </span>

            <span class="text-center font-display text-sm font-bold">
              Métropolitain
            </span>

            <span class="text-right text-[8px]">
              2000
            </span>
          </div>

          <div
            class="flex h-40 w-32 flex-col justify-between border-[6px] border-dotted border-white bg-[#1A4FB0] p-3 text-white shadow-xl">
            <span class="text-[8px] font-bold tracking-widest">
              FRANCE
            </span>

            <span class="text-center font-display text-base font-bold">
              Concorde
            </span>

            <span class="text-right text-[8px]">
              1969
            </span>
          </div>

          <div
            class="rotate-6 flex h-36 w-28 flex-col justify-between border-[6px] border-dotted border-white bg-[#C45345] p-3 text-white shadow-lg">
            <span class="text-[8px] font-bold tracking-widest">
              FRANCE
            </span>

            <span class="text-center font-display text-sm font-bold">
              Collection
            </span>

            <span class="text-right text-[8px]">
              LaPoste
            </span>
          </div>
        </div>
      </div>

      <p class="relative z-10 text-xs font-semibold text-[#16296B]/60">
        Plateforme d'échange entre collectionneurs
      </p>
    </section>

    <!-- Partie droite -->
    <section class="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
      <div class="w-full max-w-[430px]">
        <!-- Logo mobile -->
        <NuxtLink to="/" class="mb-10 flex items-center gap-2.5 lg:hidden">
          <span
            class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFCD00] font-display text-xl font-extrabold text-[#16296B]">
            P
          </span>

          <span class="font-display text-xl font-bold text-[#16296B]">
            LaPoste
          </span>
        </NuxtLink>

        <!-- Titre -->
        <div>
          <p class="text-xs font-extrabold uppercase tracking-[0.14em] text-[#1A4FB0]">
            Espace collectionneur
          </p>

          <h2 class="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#16223D]">
            Bon retour parmi nous
          </h2>

          <p class="mt-2 text-sm leading-6 text-[#717A8B]">
            Connectez-vous pour retrouver votre collection et vos échanges.
          </p>
        </div>

        <!-- Erreur -->
        <div v-if="messageErreur"
          class="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
          role="alert">
          {{ messageErreur }}
        </div>

        <!-- Formulaire -->
        <form class="mt-8 space-y-5" @submit.prevent="soumettreConnexion">
          <!-- Email -->
          <div>
            <label for="email" class="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-[#16223D]">
              Adresse e-mail
            </label>

            <input id="email" v-model="email" type="email" required autocomplete="email" placeholder="vous@exemple.fr"
              class="h-12 w-full rounded-xl border border-[#DDD7CA] bg-white px-4 text-sm text-[#16223D] outline-none transition placeholder:text-[#9AA1AD] focus:border-[#1A4FB0] focus:ring-2 focus:ring-blue-100">
          </div>

          <!-- Mot de passe -->
          <div>
            <label for="mot-de-passe" class="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-[#16223D]">
              Mot de passe
            </label>

            <div class="relative">
              <input id="mot-de-passe" v-model="motDePasse" :type="afficherMotDePasse ? 'text' : 'password'" required
                autocomplete="current-password" placeholder="Votre mot de passe"
                class="h-12 w-full rounded-xl border border-[#DDD7CA] bg-white px-4 pr-12 text-sm text-[#16223D] outline-none transition placeholder:text-[#9AA1AD] focus:border-[#1A4FB0] focus:ring-2 focus:ring-blue-100">

              <button type="button"
                class="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#717A8B] transition hover:bg-slate-100 hover:text-[#16296B]"
                :aria-label="afficherMotDePasse
                    ? 'Masquer le mot de passe'
                    : 'Afficher le mot de passe'
                  " @click="afficherMotDePasse = !afficherMotDePasse">
                <EyeOff v-if="afficherMotDePasse" :size="18" :stroke-width="1.8" />

                <Eye v-else :size="18" :stroke-width="1.8" />
              </button>
            </div>
          </div>

          <!-- Connexion -->
          <button type="submit" :disabled="chargement"
            class="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#FFCD00] px-5 text-sm font-extrabold text-[#16223D] transition hover:bg-[#F4C400] disabled:cursor-not-allowed disabled:opacity-60">
            <LogIn :size="18" :stroke-width="2" />

            {{ chargement ? 'Connexion...' : 'Se connecter' }}
          </button>
        </form>

        <!-- Inscription -->
        <div class="mt-8 border-t border-[#E4DED3] pt-6 text-center" v-if="!estModerateur">
          <p class="text-sm text-[#717A8B]">
            Vous n'avez pas encore de compte ?
          </p>

          <NuxtLink to="/inscription" v-if="!estModerateur"
            class="mt-2 inline-flex font-display text-sm font-extrabold text-[#16296B] transition hover:text-[#1A4FB0]">
            Créer un compte →
          </NuxtLink>
        </div>

        <!-- Retour -->
        <div class="mt-8 text-center">
          <NuxtLink to="/" class="text-xs font-semibold text-[#8A92A0] transition hover:text-[#16296B]">
            ← Retour au catalogue
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>