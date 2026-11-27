<script setup lang="ts">
import type { StatutTimbre } from '~/types/timbre'

definePageMeta({
    middleware: 'auth',
})

interface FiltresTimbres {
    page?: number
    statut?: StatutTimbre
}

const route = useRoute()
const router = useRouter()

const statutsAutorises: StatutTimbre[] = [
    'DISPONIBLE',
    'EN_ATTENTE',
    'RESERVE',
    'EN_ECHANGE',
    'SUSPENDU',
]

function lireFiltresDepuisUrl(): FiltresTimbres {
    const pageDemandee =
        typeof route.query.page === 'string'
            ? Number(route.query.page)
            : NaN

    const statut = statutsAutorises.find(
        statutAutorise => statutAutorise === route.query.statut
    )

    return {
        page:
            Number.isInteger(pageDemandee) && pageDemandee > 0
                ? pageDemandee
                : 1,
        statut,
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
} = useMesTimbres(filtres)

function appliquerFiltres(nouveauxFiltres: FiltresTimbres) {
    return router.push({
        path: '/collection',
        query: nouveauxFiltres.statut
            ? { statut: nouveauxFiltres.statut }
            : {},
    })
}

function changerStatut(event: Event) {
    const select = event.currentTarget

    if (!(select instanceof HTMLSelectElement)) {
        throw new TypeError('Le filtre doit provenir d’un élément select.')
    }

    const statut = statutsAutorises.find(
        statutAutorise => statutAutorise === select.value
    )

    return appliquerFiltres({ statut })
}

watch(
    () => route.query,
    () => {
        const nouveauxFiltres = lireFiltresDepuisUrl()

        filtres.page = nouveauxFiltres.page
        filtres.statut = nouveauxFiltres.statut
    },
)

const timbres = computed(() => {
    return data.value?.items ?? []
})
const collectionVide = computed(() => {
    return status.value === 'success' &&
        data.value?.total === 0 &&
        !filtres.statut
})
function changerPage(page: number): void {
    router.push({
        path: '/collection',
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
</script>

<template>
    <main class="min-h-screen bg-[#FAF9F5]">
        <section class="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 class="text-3xl font-extrabold text-[#16223D]">
                        Ma collection
                    </h1>

                    <p v-if="data && !error" class="mt-2 text-sm text-[#717A8B]">
                        {{ data.total }}
                        {{ data.total === 1 ? 'timbre' : 'timbres' }}
                        {{ filtres.statut ? " correspondant au filtre" : "dans votre collection" }}
                    </p>
                </div>

                <NuxtLink to="/collection/ajouter" v-if="!collectionVide"
                    class="rounded-xl bg-[#FFCD00] px-5 py-3 text-sm font-bold text-[#16223D] hover:bg-[#F4C400]">
                    + Ajouter un timbre
                </NuxtLink>
            </div>
            <div class="mb-6 rounded-2xl border border-[#E4DED3] bg-white p-4" v-if="!collectionVide">
                <label for="filtre-statut" class="mb-2 block text-xs font-bold uppercase tracking-wide text-[#717A8B]">
                    Statut
                </label>

                <select id="filtre-statut" :value="filtres.statut ?? ''"
                    class="w-full rounded-xl border border-[#DDD7CA] bg-white px-4 py-3 text-sm text-[#16223D] focus:border-[#1A4FB0] focus:outline-none focus:ring-2 focus:ring-blue-100 sm:w-64"
                    @change="changerStatut">
                    <option value="">Tous</option>
                    <option value="DISPONIBLE">Disponible</option>
                    <option value="EN_ATTENTE">En attente</option>
                    <option value="RESERVE">Réservé</option>
                    <option value="EN_ECHANGE">En échange</option>
                    <option value="SUSPENDU">Suspendu</option>
                </select>
            </div>
            <p v-if="status === 'pending'" role="status" class="py-12 text-center text-[#717A8B]">
                Chargement de votre collection…
            </p>

            <div v-else-if="error" role="alert" class="rounded-2xl border border-red-200 bg-white p-8 text-center">
                <p class="font-bold text-[#16223D]">
                    Impossible de charger votre collection.
                </p>

                <button type="button" class="mt-4 rounded-xl bg-[#FFCD00] px-5 py-3 font-bold text-[#16223D]"
                    @click="refresh()">
                    Réessayer
                </button>
            </div>

            <template v-else-if="status === 'success'">
                <div v-if="data && data.total === 0" class="px-2 pt-3 pb-8 text-center">
                    <div v-if="!filtres.statut" aria-hidden="true"
                        class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF5BF] text-[#16296B]">
                        <svg class="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                            stroke-linecap="round" stroke-linejoin="round">
                            <rect x="4" y="3" width="16" height="18" rx="2" />
                            <path d="M8 8h8M12 11v6M9 14h6" />
                        </svg>
                    </div>

                    <h2 class="font-display text-2xl font-extrabold text-[#16223D]">
                        {{
                            filtres.statut
                                ? 'Aucun timbre ne correspond à ce statut'
                                : 'Votre collection commence ici'
                        }}
                    </h2>

                    <p class="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#717A8B]">
                        {{
                            filtres.statut
                                ? 'Essayez un autre statut ou sélectionnez Tous.'
                                : 'Votre collection est vide.'
                        }}
                    </p>

                    <div v-if="!filtres.statut" class="mx-auto mt-8 grid max-w-3xl gap-5 text-left sm:grid-cols-2">
                        <article
                            class="flex flex-col rounded-2xl border border-[#E4DED3] bg-white p-6 shadow-sm transition hover:shadow-md">
                            <div aria-hidden="true"
                                class="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#1A4FB0]">
                                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="m3 9 2-5h14l2 5M3 9h18M5 9v11h14V9" />
                                    <path d="M9 20v-6h6v6" />
                                </svg>
                            </div>

                            <h3 class="font-display text-lg font-bold text-[#16223D]">
                                Acheter un vrai timbre
                            </h3>

                            <p class="mt-3 text-sm leading-6 text-[#717A8B]">
                                Découvrez les timbres de collection dans la boutique La Poste.
                                Revenez ensuite numériser ceux que vous avez acquis.
                            </p>

                            <div class="mt-auto pt-6">
                                <a href="https://www.laposte.fr/c/timbres-philatelie" target="_blank"
                                    rel="noopener noreferrer"
                                    class="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#DDD7CA] px-4 py-3 text-sm font-bold text-[#16296B] transition hover:border-[#1A4FB0] hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#16296B]">
                                    Ouvrir la boutique
                                    <span aria-hidden="true">↗</span>
                                    <span class="sr-only">(nouvel onglet)</span>
                                </a>
                            </div>
                        </article>

                        <article
                            class="flex flex-col rounded-2xl border border-[#E6D68A] bg-white p-6 shadow-sm transition hover:shadow-md">
                            <div aria-hidden="true"
                                class="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF5BF] text-[#16296B]">
                                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M8 5 6 8H3v12h18V8h-3l-2-3Z" />
                                    <circle cx="12" cy="13" r="4" />
                                </svg>
                            </div>

                            <h3 class="font-display text-lg font-bold text-[#16223D]">
                                Déposer un timbre que je possède
                            </h3>

                            <p class="mt-3 text-sm leading-6 text-[#717A8B]">
                                Ajoutez les photos recto et verso de votre timbre, puis renseignez
                                son état et ses caractéristiques pour créer sa fiche.
                            </p>

                            <div class="mt-auto pt-6">
                                <NuxtLink to="/collection/ajouter"
                                    class="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#FFCD00] px-4 py-3 text-sm font-bold text-[#16223D] transition hover:bg-[#F4C400] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#16296B]">
                                    Déposer mon premier timbre
                                    <span aria-hidden="true">→</span>
                                </NuxtLink>
                            </div>
                        </article>
                    </div>
                </div>

                <div v-else>
                    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <article v-for="timbre in timbres" :key="timbre.id"
                            class="flex flex-col rounded-2xl border border-[#E4DED3] bg-white p-5 shadow-sm">
                            <div class="relative flex h-64 items-center justify-center rounded-xl bg-[#FAF9F5] pt-6">
                                <span class="absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold" :class="{
                                    'bg-emerald-50 text-emerald-700':
                                        timbre.statut === 'DISPONIBLE',
                                    'bg-blue-50 text-blue-700':
                                        timbre.statut === 'EN_ATTENTE',
                                    'bg-amber-50 text-amber-700':
                                        timbre.statut === 'RESERVE',
                                    'bg-indigo-50 text-indigo-700':
                                        timbre.statut === 'EN_ECHANGE',
                                    'bg-red-50 text-red-700':
                                        timbre.statut === 'SUSPENDU'
                                }">
                                    {{
                                        {
                                            DISPONIBLE: 'Disponible',
                                            EN_ATTENTE: 'En attente',
                                            RESERVE: 'Réservé',
                                            EN_ECHANGE: 'En échange',
                                            SUSPENDU: 'Suspendu'
                                        }[timbre.statut]
                                    }}
                                </span>

                                <template v-for="photo in timbre.photos.filter(
                                    photo => photo.face === 'RECTO'
                                )" :key="photo.id">
                                    <img :src="`${$config.public.apiBase}${photo.chemin}`" :alt="timbre.titre"
                                        loading="lazy" class="h-48 w-36 object-contain">
                                </template>

                                <div v-if="!timbre.photos.some(
                                    photo => photo.face === 'RECTO'
                                )" :style="{ backgroundColor: timbre.couleurImpression }"
                                    class="flex h-48 w-36 flex-col justify-between p-4 text-white shadow-md">
                                    <p class="text-[9px] font-bold uppercase tracking-widest">
                                        {{ timbre.pays }}
                                    </p>

                                    <div class="text-center">
                                        <p class="text-[8px] uppercase">
                                            {{ timbre.theme }}
                                        </p>

                                        <p class="mt-2 text-sm font-bold">
                                            {{ timbre.titre }}
                                        </p>
                                    </div>

                                    <div class="flex justify-between gap-2 text-[9px]">
                                        <span>{{ timbre.valeurFaciale }}</span>
                                        <span>{{ timbre.annee }}</span>
                                    </div>
                                </div>
                            </div>

                            <h2 class="mt-5 text-lg font-extrabold text-[#16223D]">
                                {{ timbre.titre }}
                            </h2>

                            <p class="mt-2 text-xs text-[#717A8B]">
                                <span class="font-semibold uppercase text-[#1A4FB0]">
                                    {{ timbre.theme }}
                                </span>
                                · {{ timbre.annee }}
                            </p>

                            <div class="mt-4 flex items-center gap-2">
                                <span class="flex gap-1" aria-hidden="true">
                                    <span v-for="niveau in 3" :key="niveau" class="h-2 w-2 rounded-full" :class="niveau <= {
                                        COURANT: 1,
                                        RECHERCHE: 2,
                                        RARE: 3
                                    }[timbre.rarete]
                                        ? 'bg-[#FFCD00]'
                                        : 'bg-slate-200'
                                        " />
                                </span>

                                <span class="sr-only">
                                    Rareté : {{ timbre.rarete }}.
                                </span>

                                <span class="text-sm font-bold text-[#16223D]">
                                    ≈ {{ timbre.coteEstimee }} €
                                </span>
                            </div>

                            <div class="mt-auto pt-5">
                                <NuxtLink :to="`/timbres/${timbre.id}?origine=collection`"
                                    :aria-label="`Voir le détail du timbre ${timbre.titre}`"
                                    class="flex w-full items-center justify-center rounded-xl border border-[#DDD7CA] px-4 py-3 text-sm font-bold text-[#16296B] transition hover:border-[#1A4FB0] hover:bg-blue-50">
                                    Voir le détail →
                                </NuxtLink>
                            </div>
                        </article>
                    </div>

                    <p v-if="data && data.total > timbres.length" class="mt-6 text-center text-sm text-[#717A8B]">
                        {{ timbres.length }} timbres affichés sur {{ data.total }}.
                    </p>
                    <UiBasePagination v-if="data && totalPages > 1" :page="data.page" :total-pages="totalPages"
                        @changement-page="changerPage" />
                </div>
            </template>
        </section>
    </main>
</template>