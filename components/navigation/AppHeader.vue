<script setup lang="ts">
import {
  Bell,
  ChevronDown,
  Search,
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const recherche = ref(
  typeof route.query.titre === 'string'
    ? route.query.titre
    : ''
)

function rechercher() {
  const query = {
    ...route.query,
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
    query,
  })
}

watch(
  () => route.query.titre,
  (titre) => {
    recherche.value =
      typeof titre === 'string'
        ? titre
        : ''
  },
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

        <NuxtLink to="/echanges" class="relative rounded-lg px-4 py-2.5 text-sm transition-colors" :class="route.path.startsWith('/echanges')
          ? 'bg-blue-50 font-bold text-[var(--color-navy)]'
          : 'font-semibold text-[var(--color-muted)] hover:bg-blue-50 hover:text-[var(--color-navy)]'
          ">
          Mes échanges
          <span
            class="absolute -right-0.5 top-0 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[var(--color-blue)] px-1 text-[10px] font-bold text-white">
            2
          </span>
        </NuxtLink>

        <NuxtLink to="/collection" class="rounded-lg px-4 py-2.5 text-sm transition-colors" :class="route.path.startsWith('/collection')
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

      <!-- Actions utilisateur -->
      <div class="flex shrink-0 items-center gap-3">

        <!-- Notifications -->
        <NuxtLink to="/notifications"
          class="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#E2DDD2] bg-white text-[var(--color-navy)] transition hover:bg-slate-50"
          aria-label="Notifications">
          <Bell :size="20" :stroke-width="1.8" />

          <!-- TODO(Racha): afficher seulement si non lues > 0 -->
          <span
            class="absolute right-[10px] top-[8px] h-2 w-2 rounded-full border-2 border-white bg-[var(--color-danger)]" />
        </NuxtLink>

        <!-- Profil -->
        <div class="relative">
          <!-- TODO(Racha): ouverture du menu profil -->
          <button type="button" class="flex items-center gap-2.5 rounded-xl px-1 py-1 transition hover:bg-slate-50">
            <span
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-yellow)] font-display text-sm font-bold text-[var(--color-navy)]">
              <!-- TODO(Racha): initiales dynamiques -->
              CR
            </span>

            <span class="hidden min-w-[72px] text-left sm:block">
              <span class="block text-sm font-bold leading-tight text-[var(--color-text)]">
                <!-- TODO(Racha): utilisateur.prenom -->
                Camille
              </span>

              <span class="mt-0.5 block text-xs leading-tight text-[var(--color-muted)]">
                <!-- TODO(Racha): utilisateur.ville -->
                Lyon
              </span>
            </span>

            <ChevronDown :size="17" :stroke-width="1.8" class="hidden text-[var(--color-muted)] sm:block" />
          </button>

          <!--
            TODO(Racha):
            menu profil futur :
            - Ma collection
            - Espace modérateur si role MODERATEUR
            - Déconnexion
          -->
        </div>
      </div>
    </div>
  </header>
</template>