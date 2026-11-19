<script setup lang="ts">
import type {
  RareteTimbre,
  StatutTimbre,
} from '~/types/timbre'

interface FiltresTimbres {
  page?: number
  titre?: string
  theme?: string
  rarete?: RareteTimbre
  statut?: StatutTimbre
  ville?: string
}

type FiltresAvances = Omit<FiltresTimbres, 'titre'>

const route = useRoute()
const router = useRouter()

function lireFiltresDepuisUrl(): FiltresTimbres {
  return {
    page:
      typeof route.query.page === 'string' &&
        Number(route.query.page) > 0
        ? Number(route.query.page)
        : 1,
    titre:
      typeof route.query.titre === 'string' && route.query.titre
        ? route.query.titre
        : undefined,

    theme:
      typeof route.query.theme === 'string' && route.query.theme
        ? route.query.theme
        : undefined,

    rarete:
      typeof route.query.rarete === 'string' && route.query.rarete
        ? route.query.rarete as RareteTimbre
        : undefined,

    statut:
      typeof route.query.statut === 'string' && route.query.statut
        ? route.query.statut as StatutTimbre
        : undefined,

    ville:
      typeof route.query.ville === 'string' && route.query.ville
        ? route.query.ville
        : undefined,
  }
}

const filtres = reactive<FiltresTimbres>(
  lireFiltresDepuisUrl()
)

const {
  data,
  status,
  error,
  refresh,
} = useTimbres(filtres)

function appliquerFiltres(
  nouveauxFiltres: FiltresAvances,
) {
  router.push({
    path: '/',
    query: {
      ...(filtres.titre
        ? { titre: filtres.titre }
        : {}),

      ...(nouveauxFiltres.theme
        ? { theme: nouveauxFiltres.theme }
        : {}),

      ...(nouveauxFiltres.rarete
        ? { rarete: nouveauxFiltres.rarete }
        : {}),

      ...(nouveauxFiltres.statut
        ? { statut: nouveauxFiltres.statut }
        : {}),

      ...(nouveauxFiltres.ville
        ? { ville: nouveauxFiltres.ville }
        : {}),
    },
  })
}

watch(
  () => route.query,
  () => {
    const nouveauxFiltres =
      lireFiltresDepuisUrl()

    filtres.page = nouveauxFiltres.page
    filtres.titre = nouveauxFiltres.titre
    filtres.theme = nouveauxFiltres.theme
    filtres.rarete = nouveauxFiltres.rarete
    filtres.statut = nouveauxFiltres.statut
    filtres.ville = nouveauxFiltres.ville
  },
  {
    deep: true,
  },
)
function changerPage(page: number): void {
  router.push({
    path: '/',
    query: {
      ...route.query,
      page: String(page),
    },
  })
}
const totalPages = computed(() => {
  if (!data.value) {
    return 0
  }

  return Math.ceil(
    data.value.total / data.value.taille
  )
})
useSeoMeta({
  title: 'Découvrir les timbres - LaPoste',
  description:
    'Découvrez les timbres proposés à l’échange par les collectionneurs.',
})
</script>

<template>
  <div class="min-h-full bg-[#FAF9F5]">
    <main class="mx-auto max-w-[1220px] px-5 py-9 sm:py-11">
      <!-- En-tête -->
      <div class="mb-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 class="font-display text-[28px] font-extrabold tracking-tight text-[#16223D]">
            Timbres à échanger
          </h1>

          <p class="mt-2 max-w-[650px] text-sm leading-6 text-[#717A8B]">
            Parcourez les timbres proposés par la communauté.
            Repérez une pièce, proposez l’un des vôtres en échange.
          </p>
        </div>

        <!-- Statistiques -->
        <div v-if="data" class="flex items-center gap-6">
          <p class="text-sm text-[#717A8B]">
            <strong class="mr-1 font-display text-xl text-[#16223D]">
              {{ data.total }}
            </strong>

            timbres
          </p>
        </div>
      </div>

      <!-- Filtres -->
      <TimbresTimbreFiltres :theme="filtres.theme" :rarete="filtres.rarete" :statut="filtres.statut"
        :ville="filtres.ville" @filtrage="appliquerFiltres" />

      <!-- Chargement -->
      <div v-if="status === 'pending'" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div v-for="n in 8" :key="n" class="h-[410px] animate-pulse rounded-2xl border border-[#E4DED3] bg-white" />
      </div>

      <!-- Erreur -->
      <div v-else-if="error" class="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <p class="font-display font-bold text-red-800">
          Impossible de charger les timbres.
        </p>

        <p class="mt-2 text-sm text-red-700">
          Une erreur est survenue lors du chargement du catalogue.
        </p>

        <button type="button"
          class="mt-4 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-800"
          @click="() => refresh()">
          Réessayer
        </button>
      </div>

      <!-- Résultats -->
      <div v-else-if="data?.items.length" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <TimbresTimbreCard v-for="timbre in data.items" :key="timbre.id" :timbre="timbre" />
      </div>

      <!-- Aucun résultat -->
      <div v-else class="rounded-2xl border border-dashed border-[#D8D1C4] bg-white px-6 py-14 text-center">
        <div
          class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFCD00] font-display text-lg font-extrabold text-[#16296B]">
          P
        </div>

        <h2 class="mt-4 font-display text-xl font-bold text-[#16223D]">
          Aucun timbre trouvé
        </h2>

        <p class="mt-2 text-sm text-[#717A8B]">
          Essayez de modifier ou de supprimer certains filtres.
        </p>
      </div>

      <!-- Pagination -->
      <UiBasePagination v-if="data && totalPages > 1" :page="data.page" :total-pages="totalPages"
        @changement-page="changerPage" />

    </main>
  </div>
</template>