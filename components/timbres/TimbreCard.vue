<script setup lang="ts">
import type { Timbre } from '~/types/timbre'
import { ArrowLeftRight, Lock } from 'lucide-vue-next'

const props = defineProps<{
  timbre: Timbre
}>()

const config = useRuntimeConfig()
const baseURL = config.public.apiBase
const auth = useAuthStore()


function trouverPhotoRecto() {
  return props.timbre.photos.find(
    photo => photo.face === 'RECTO'
  )
}

const estMonTimbre = computed(() => {
  if (!auth.utilisateur || !props.timbre) {
    return false
  }

  return auth.utilisateur.id === props.timbre.proprietaireId
})

const statutProposable = computed(() => {
  return (props.timbre.statut === "DISPONIBLE" || props.timbre.statut === "EN_ATTENTE")

})

function urlPhotoRecto() {
  const photo = trouverPhotoRecto()

  if (photo) {
    return baseURL + photo.chemin
  }
}

function classesStatut(statut: Timbre['statut']) {
  const classes = {
    DISPONIBLE: 'bg-emerald-50 text-emerald-700',
    EN_ATTENTE: 'bg-blue-50 text-blue-700',
    RESERVE: 'bg-amber-50 text-amber-700',
    EN_ECHANGE: 'bg-indigo-50 text-indigo-700',
    SUSPENDU: 'bg-red-50 text-red-700',
  }

  return classes[statut]
}

function niveauRarete(rarete: Timbre['rarete']) {
  const niveaux = {
    COURANT: 1,
    RECHERCHE: 2,
    RARE: 3,
  }

  return niveaux[rarete]
}
</script>

<template>
  <article
    class="flex h-full flex-col overflow-hidden rounded-2xl border border-[#E4DED3] bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
    <!-- Timbre -->
    <div class="relative flex h-[205px] items-center justify-center">
      <!-- Statut -->
      <span class="absolute right-0 top-0 z-10 rounded-full px-2.5 py-1 text-[10px] font-bold"
        :class="classesStatut(timbre.statut)">
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

      <!-- Photo réelle -->
      <img v-if="trouverPhotoRecto()" :src="urlPhotoRecto()" :alt="timbre.titre"
        class="h-[170px] w-[128px] object-contain shadow-sm" :class="{
          'opacity-50':
            timbre.statut === 'RESERVE' || timbre.statut === 'EN_ECHANGE'
        }">

      <div v-else
        class="relative flex h-[170px] w-[128px] flex-col justify-between overflow-hidden p-3 text-white shadow-sm"
        :class="{
          'opacity-50':
            timbre.statut === 'RESERVE' || timbre.statut === 'EN_ECHANGE'
        }" :style="{ backgroundColor: timbre.couleurImpression }">
        <div aria-hidden="true" class="pointer-events-none absolute inset-0 opacity-[0.08]"
          style="background-image: repeating-linear-gradient(135deg, white 0, white 1px, transparent 1px, transparent 5px)" />

        <span class="relative font-mono text-[8px] font-bold tracking-[0.2em]">
          {{ timbre.pays.toUpperCase() }}
        </span>

        <div class="relative text-center">
          <p class="font-mono text-[7px] uppercase tracking-wider opacity-80">
            {{ timbre.theme }}
          </p>

          <p class="mt-1 font-display text-sm font-bold leading-tight">
            {{ timbre.titre }}
          </p>
        </div>

        <div class="relative flex items-end justify-between font-mono text-[8px] font-semibold">
          <span>{{ timbre.valeurFaciale }}</span>
          <span>{{ timbre.annee }}</span>
        </div>
      </div>

      <!-- Expertise -->
      <span v-if="timbre.expertise"
        class="absolute bottom-1 right-0 rounded-full bg-blue-50 px-2 py-1 text-[9px] font-semibold text-[#1A4FB0]">
        Expertisé
      </span>
    </div>

    <!-- Propriétaire -->
    <div class="mt-2 flex items-center gap-2.5">
      <div
        class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFCD00] font-display text-[11px] font-bold text-[#16296B]">
        {{ timbre.proprietaire.prenom.charAt(0) }}
      </div>

      <div class="min-w-0">
        <p class="truncate text-sm font-bold text-[#16223D]">
          {{ timbre.proprietaire.prenom }}
        </p>

        <p class="truncate text-[11px] text-[#717A8B]">
          ◉ {{ timbre.proprietaire.ville }}
        </p>
      </div>
    </div>

    <!-- Titre -->
    <h2 class="mt-3 line-clamp-1 font-display text-base font-extrabold text-[#16223D]">
      {{ timbre.titre }}
    </h2>

    <p class="mt-1 truncate font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[#1A4FB0]">
      {{ timbre.theme }} · {{ timbre.annee }}
    </p>

    <!-- Rareté + cote -->
    <div class="mt-3 flex items-center gap-2">
      <div class="flex gap-1">
        <span v-for="niveau in 3" :key="niveau" class="h-1.5 w-1.5 rounded-full" :class="niveau <= niveauRarete(timbre.rarete)
          ? 'bg-[#FFCD00]'
          : 'bg-slate-200'
          " />
      </div>

      <span class="font-display text-sm font-extrabold text-[#16223D]">
        ≈ {{ timbre.coteEstimee }} €
      </span>
    </div>
    <div class="mt-auto space-y-3 pt-4">
      <button v-if="auth.authChargee && !estMonTimbre && statutProposable" type="button"
        class="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#FFCD00] px-4 text-sm font-bold text-[#16223D] transition hover:bg-[#F4C400]">
        <ArrowLeftRight :size="16" />
        Proposer un échange
      </button>

      <button v-else-if="
        auth.authChargee &&
        !estMonTimbre &&
        (timbre.statut === 'RESERVE' || timbre.statut === 'EN_ECHANGE')
      " type="button" disabled
        class="flex h-10 w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-[#E4DED3] bg-white px-4 text-sm font-bold text-[#717A8B]">
        <Lock :size="16" />
        Indisponible
      </button>

      <NuxtLink v-if="timbre.statut !== 'RESERVE' && timbre.statut !== 'EN_ECHANGE'" :to="`/timbres/${timbre.id}`"
        class="flex h-10 w-full items-center justify-center rounded-xl border border-[#DDD7CA] bg-white px-4 text-sm font-bold text-[#16296B] transition hover:border-[#1A4FB0] hover:bg-blue-50">
        Voir le détail →
      </NuxtLink>
    </div>
  </article>
</template>