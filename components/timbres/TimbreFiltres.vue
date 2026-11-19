<script setup lang="ts">
import type {
  RareteTimbre,
  StatutTimbre,
} from '~/types/timbre'

interface FiltresTimbres {
  theme?: string
  rarete?: RareteTimbre
  statut?: StatutTimbre
  ville?: string
}

const props = defineProps<FiltresTimbres>()

const filtres = reactive<FiltresTimbres>({
  ...props,
})

watch(
  () => props,
  (nouveauxProps) => {
    filtres.theme = nouveauxProps.theme
    filtres.rarete = nouveauxProps.rarete
    filtres.statut = nouveauxProps.statut
    filtres.ville = nouveauxProps.ville
  },
  {
    deep: true,
  },
)
const emit = defineEmits<{
  filtrage: [filtres: FiltresTimbres]
}>()

watch(
  filtres,
  (nouveauxFiltres) => {
    emit('filtrage', nouveauxFiltres)
  },
)

function reinitialiserFiltres(): void {
  filtres.theme = ''
  filtres.rarete = undefined
  filtres.statut = undefined
  filtres.ville = ''
}
</script>

<template>
  <section class="mb-7">
    <div
      class="flex flex-col gap-3 rounded-2xl border border-[#E4DED3] bg-white p-4 shadow-sm lg:flex-row lg:items-end"
    >
      <!-- Thème -->
      <div class="min-w-0 flex-1">
        <label
          for="filtre-theme"
          class="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.12em] text-[#717A8B]"
        >
          Thème
        </label>

        <input
          id="filtre-theme"
          v-model="filtres.theme"
          type="text"
          placeholder="Tous les thèmes"
          class="h-10 w-full rounded-xl border border-[#DDD7CA] bg-white px-3 text-sm text-[#16223D] outline-none transition focus:border-[#1A4FB0] focus:ring-2 focus:ring-blue-100"
        >
      </div>

      <!-- Rareté -->
      <div class="min-w-0 flex-1">
        <label
          for="filtre-rarete"
          class="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.12em] text-[#717A8B]"
        >
          Rareté
        </label>

        <select
          id="filtre-rarete"
          v-model="filtres.rarete"
          class="h-10 w-full rounded-xl border border-[#DDD7CA] bg-white px-3 text-sm text-[#16223D] outline-none transition focus:border-[#1A4FB0] focus:ring-2 focus:ring-blue-100"
        >
          <option :value="undefined">
            Toutes
          </option>

          <option value="COURANT">
            Courant
          </option>

          <option value="RECHERCHE">
            Recherché
          </option>

          <option value="RARE">
            Rare
          </option>
        </select>
      </div>

      <!-- Statut -->
      <div class="min-w-0 flex-1">
        <label
          for="filtre-statut"
          class="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.12em] text-[#717A8B]"
        >
          Statut
        </label>

        <select
          id="filtre-statut"
          v-model="filtres.statut"
          class="h-10 w-full rounded-xl border border-[#DDD7CA] bg-white px-3 text-sm text-[#16223D] outline-none transition focus:border-[#1A4FB0] focus:ring-2 focus:ring-blue-100"
        >
          <option :value="undefined">
            Tous
          </option>

          <option value="DISPONIBLE">
            Disponible
          </option>

          <option value="EN_ATTENTE">
            En attente
          </option>

          <option value="RESERVE">
            Réservé
          </option>

          <option value="EN_ECHANGE">
            En échange
          </option>

          <option value="SUSPENDU">
            Suspendu
          </option>
        </select>
      </div>

      <!-- Ville -->
      <div class="min-w-0 flex-1">
        <label
          for="filtre-ville"
          class="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.12em] text-[#717A8B]"
        >
          Ville
        </label>

        <input
          id="filtre-ville"
          v-model="filtres.ville"
          type="text"
          placeholder="Toutes les villes"
          class="h-10 w-full rounded-xl border border-[#DDD7CA] bg-white px-3 text-sm text-[#16223D] outline-none transition focus:border-[#1A4FB0] focus:ring-2 focus:ring-blue-100"
        >
      </div>

      <!-- Réinitialisation -->
      <button
        type="button"
        class="h-10 shrink-0 rounded-xl border border-[#DDD7CA] bg-[#FAF9F5] px-4 text-xs font-bold text-[#16296B] transition hover:border-[#1A4FB0] hover:bg-blue-50"
        @click="reinitialiserFiltres"
      >
        Réinitialiser
      </button>
    </div>
  </section>
</template>
