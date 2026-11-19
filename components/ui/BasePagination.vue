<script setup lang="ts">
interface PropsPagination {
    page: number
    totalPages: number
}

const props = defineProps<PropsPagination>()

const emit = defineEmits<{
    changementPage: [page: number]
}>()

function allerVersLaPage (page:number): void {
 if (page >= 1 && page <= props.totalPages ) {
        emit('changementPage', page)

 }
}
</script>
<template>
  <nav
    v-if="totalPages > 1"
    class="mt-8 flex items-center justify-center gap-2"
    aria-label="Pagination"
  >
    <!-- Précédent -->
    <button
      type="button"
      :disabled="page === 1"
      class="rounded-xl border border-[#E4DED3] bg-white px-4 py-2 text-sm font-semibold text-[#16296B] transition hover:border-[#1A4FB0] hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#E4DED3] disabled:hover:bg-white"
      @click="allerVersLaPage(page - 1)"
    >
      Précédent
    </button>

    <!-- Numéros des pages -->
    <button
      v-for="numeroPage in totalPages"
      :key="numeroPage"
      type="button"
      class="flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-bold transition"
      :class="
        numeroPage === page
          ? 'border-[#16296B] bg-[#16296B] text-white'
          : 'border-[#E4DED3] bg-white text-[#16296B] hover:border-[#1A4FB0] hover:bg-blue-50'
      "
      @click="allerVersLaPage(numeroPage)"
    >
      {{ numeroPage }}
    </button>

    <!-- Suivant -->
    <button
      type="button"
      :disabled="page === totalPages"
      class="rounded-xl border border-[#E4DED3] bg-white px-4 py-2 text-sm font-semibold text-[#16296B] transition hover:border-[#1A4FB0] hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#E4DED3] disabled:hover:bg-white"
      @click="allerVersLaPage(page + 1)"
    >
      Suivant
    </button>
  </nav>
</template>