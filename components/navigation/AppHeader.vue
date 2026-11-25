<script setup lang="ts">
import {
  Bell,
  ChevronDown,
  ChevronRight,
  Search,
  User,
  Images,
  LogOut
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const menuProfilOuvert = ref(false)

// Panneau fermé au démarrage
const authPanelOuvert = ref(false)

// Recherche
const recherche = ref(
  typeof route.query.titre === 'string'
    ? route.query.titre
    : ''
)

// Initiales de l'utilisateur connecté
const initiales = computed(() => {
  if (!authStore.utilisateur) {
    return ''
  }

  return (
    authStore.utilisateur.prenom.slice(0, 1)
    + authStore.utilisateur.nom.slice(0, 1)
  ).toUpperCase()
})

// Fermer le panneau
function fermerAuthPanel(): void {
  authPanelOuvert.value = false
}

// Ouvrir le panneau
function ouvrirAuthPanel(): void {
  authPanelOuvert.value = true
}
//la deconnexion menu
function basculerMenuProfil(): void {
  menuProfilOuvert.value = !menuProfilOuvert.value
}
// Recherche dans le catalogue
function rechercher(): void {
  const query = {
    ...route.query
  }

  delete query.page

  const titre = recherche.value.trim()

  if (titre) {
    query.titre = titre
  } else {
    delete query.titre
  }

  router.push({
    path: '/',
    query
  })
}
//deconnexion du compte
async function seDeconnecter(): Promise<void> {
  try {
    await authStore.deconnecter()

    menuProfilOuvert.value = false

    await navigateTo('/')
  } catch (error) {
    console.error('Erreur lors de la déconnexion :', error)
  }
}
// Synchroniser la recherche avec l'URL
watch(
  () => route.query.titre,
  (titre) => {
    recherche.value =
      typeof titre === 'string'
        ? titre
        : ''
  }
)

// Fermer le panneau après connexion
watch(
  () => authStore.estConnecte,
  (estConnecte) => {
    if (estConnecte) {
      fermerAuthPanel()
    }
  }
)

// Fermer le panneau lors d'un changement de page
watch(
  () => route.path,
  () => {
    fermerAuthPanel()
  }
)
</script>
<template>
  <header class="sticky top-0 z-40 border-b border-slate-200 bg-white">
    <!-- Ligne jaune La Poste -->
    <div class="h-1 bg-[var(--color-yellow)]" />

    <div class="mx-auto flex min-h-[74px] max-w-[1220px] items-center gap-5 px-5">
      <!-- Logo -->
      <NuxtLink to="/" class="flex shrink-0 items-center gap-2.5" aria-label="Retour à l'accueil">
        <span
          class="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-yellow)] font-display text-xl font-extrabold text-[var(--color-navy)]">
          P
        </span>

        <span class="font-display text-xl font-bold tracking-tight text-[var(--color-blue)]">
          LaPoste
        </span>
      </NuxtLink>

      <nav class="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">

        <NuxtLink to="/" class="rounded-lg px-4 py-2.5 text-sm transition-colors" :class="route.path === '/'
          ? 'bg-blue-50 font-bold text-[var(--color-navy)]'
          : 'font-semibold text-[var(--color-muted)] hover:bg-blue-50 hover:text-[var(--color-navy)]'
          ">
          Découvrir
        </NuxtLink>

        <NuxtLink v-if="authStore.estConnecte" to="/echanges"
          class="relative rounded-lg px-4 py-2.5 text-sm transition-colors" :class="route.path.startsWith('/echanges')
            ? 'bg-blue-50 font-bold text-[var(--color-navy)]'
            : 'font-semibold text-[var(--color-muted)] hover:bg-blue-50 hover:text-[var(--color-navy)]'
            ">
          Mes échanges
          <span
            class="absolute -right-0.5 top-0 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[var(--color-blue)] px-1 text-[10px] font-bold text-white">
            2
          </span>
        </NuxtLink>

        <NuxtLink v-if="authStore.estConnecte" to="/collection" class="rounded-lg px-4 py-2.5 text-sm transition-colors"
          :class="route.path.startsWith('/collection')
            ? 'bg-blue-50 font-bold text-[var(--color-navy)]'
            : 'font-semibold text-[var(--color-muted)] hover:bg-blue-50 hover:text-[var(--color-navy)]'
            ">
          Ma collection
        </NuxtLink>
      </nav>

      <!-- Recherche -->
      <div class="ml-auto hidden w-full max-w-[420px] xl:block">
        <label class="relative block">
          <span class="sr-only">
            Rechercher dans le catalogue
          </span>

          <Search :size="19" :stroke-width="1.8"
            class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

          <input type="search" v-model="recherche" @keyup.enter="rechercher" placeholder="Rechercher un timbre"
            class="h-11 w-full rounded-xl border border-[#DDD7CA] bg-white pl-11 pr-4 text-sm text-[var(--color-text)] outline-none transition placeholder:text-slate-500 focus:border-[var(--color-blue)] focus:ring-2 focus:ring-blue-100">
        </label>
      </div>

      <div class="flex shrink-0 items-center gap-3">
        <template v-if="!authStore.authChargee">
          <div class="h-11 w-28" />
        </template>
        <template v-else-if="authStore.estConnecte">
          <!-- Notifications -->
          <NuxtLink to="/notifications"
            class="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#E2DDD2] bg-white text-[var(--color-navy)] transition hover:bg-slate-50"
            aria-label="Notifications">
            <Bell :size="20" :stroke-width="1.8" />

            <span
              class="absolute right-[10px] top-[8px] h-2 w-2 rounded-full border-2 border-white bg-[var(--color-danger)]" />
          </NuxtLink>

          <!-- Profil -->
          <!-- Profil -->
          <div class="relative">
            <button type="button" class="flex items-center gap-2.5 rounded-xl px-1 py-1 transition hover:bg-slate-50"
              :aria-expanded="menuProfilOuvert" aria-label="Menu profil" @click="basculerMenuProfil">
              <span
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-yellow)] font-display text-sm font-bold text-[var(--color-navy)]">
                {{ initiales }}
              </span>

              <span class="hidden min-w-[72px] text-left sm:block">
                <span class="block text-sm font-bold text-[var(--color-text)]">
                  {{ authStore.utilisateur?.prenom }}
                </span>

                <span class="block text-xs text-[var(--color-muted)]">
                  {{ authStore.utilisateur?.ville }}
                </span>
              </span>

              <ChevronDown :size="17" class="text-[var(--color-muted)]" />
            </button>

            <!-- Menu déroulant -->
            <div v-if="menuProfilOuvert"
              class="absolute right-0 top-full z-50 mt-3 w-64 rounded-xl border border-[#E5E0D6] bg-white p-3 shadow-lg">
              <!-- Informations utilisateur -->
              <div class="border-b border-slate-100 px-3 pb-3">
                <p class="font-bold text-[var(--color-text)]">
                  {{ authStore.utilisateur?.prenom }}
                  {{ authStore.utilisateur?.nom }}
                </p>

                <p class="text-xs text-[var(--color-muted)]">
                  {{ authStore.utilisateur?.ville }}
                </p>
              </div>

              <!-- Ma collection -->
              <NuxtLink to="/collection"
                class="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors duration-200 hover:bg-blue-50"
                @click="menuProfilOuvert = false">
                <span
                  class="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[var(--color-blue)] transition-colors group-hover:bg-blue-100">
                  <Images :size="18" :stroke-width="1.8" />
                </span>

                <span class="flex-1">
                  Ma collection
                </span>

                <ChevronRight :size="16" class="text-slate-400 transition-transform group-hover:translate-x-0.5" />
              </NuxtLink>

              <!-- Espace modérateur -->
              <NuxtLink v-if="authStore.estModerateur" to="/moderation"
                class="block rounded-lg px-3 py-2 text-sm text-[var(--color-text)] hover:bg-blue-50"
                @click="menuProfilOuvert = false">
                Espace modérateur
              </NuxtLink>

              <!-- Déconnexion : étape suivante -->
              <div class="mt-2 border-t border-slate-100 pt-2">
                <button type="button"
                  class="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-red-600 transition-colors duration-200 hover:bg-red-50"
                  @click="seDeconnecter">
                  <span
                    class="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 transition-colors group-hover:bg-red-100">
                    <LogOut :size="18" :stroke-width="1.8" />
                  </span>

                  <span class="flex-1">
                    Se déconnecter
                  </span>
                </button>
              </div>
            </div>
          </div>
        </template>

        <template v-else>
          <button type="button" @click="ouvrirAuthPanel"
            class="flex items-center gap-2 rounded-xl border border-[#E2DDD2] bg-white px-4 py-2.5 text-sm font-semibold text-[var(--color-navy)] transition hover:bg-slate-50">
            <User :size="18" :stroke-width="1.8" />
            <span>Se connecter</span>
          </button>
        </template>
      </div>
    </div>
  </header>
  <AuthPanel :ouvert="authPanelOuvert" @fermer="fermerAuthPanel" />
</template>