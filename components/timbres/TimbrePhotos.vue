<script setup lang="ts">
import type { FaceTimbre, Timbre } from '~/types/timbre'

const props = defineProps<{
    timbre: Timbre
}>()
const config = useRuntimeConfig()
const baseURL = config.public.apiBase

const photoRecto = computed(() => {
    return props.timbre.photos.find(
        photo => photo.face === 'RECTO'
    )
})

const photoVerso = computed(() => {
    return props.timbre.photos.find(
        photo => photo.face === 'VERSO'
    )
})

const faceSelectionnee = ref<FaceTimbre>('RECTO')

if (photoRecto.value) {
    faceSelectionnee.value = 'RECTO'
} else if (photoVerso.value) {
    faceSelectionnee.value = 'VERSO'
}

const photoAffichee = computed(() => {
    if (faceSelectionnee.value === 'RECTO') {
        return photoRecto.value
    }

    return photoVerso.value
})

function selectionnerFace(face: FaceTimbre): void {
    faceSelectionnee.value = face
}
</script>

<template>
    <section class="w-full">
        <!-- Photo principale -->
        <div
            class="flex min-h-[470px] items-center justify-center overflow-hidden rounded-2xl border border-[#E4DED3] bg-[#F3F1EB] p-8">
            <!-- Une vraie photo existe -->
            <img v-if="photoAffichee" :src="`${baseURL}${photoAffichee.chemin}`"
                :alt="`${timbre.titre} - ${faceSelectionnee.toLowerCase()}`"
                class="max-h-[430px] max-w-full rounded-xl object-contain shadow-sm">

            <!-- Aucune photo : représentation graphique du timbre -->
            <div v-else
                class="relative flex aspect-[4/5] w-full max-w-[360px] flex-col overflow-hidden border-[10px] border-dotted border-white p-7 text-white shadow-[0_10px_30px_rgba(22,34,61,0.12)]"
                :style="{
                    backgroundColor: timbre.couleurImpression
                }">
                <!-- Pays -->
                <p class="text-xs font-extrabold uppercase tracking-[0.18em] text-[#16223D]">
                    {{ timbre.pays }}
                </p>

                <!-- Centre visuel -->
                <div class="flex flex-1 flex-col items-center justify-center text-center">
                    <div
                        class="mb-5 flex h-28 w-28 items-center justify-center rounded-full border border-[#CFC4AC] bg-[#E5D9BF]">
                        <span class="font-display text-4xl font-extrabold uppercase text-[#16296B]">
                            {{ timbre.titre.charAt(0) }}
                        </span>
                    </div>

                    <p class="text-xs font-bold uppercase tracking-[0.14em] text-[#717A8B]">
                        {{ timbre.theme }}
                    </p>

                    <h3 class="mt-2 font-display text-xl font-extrabold text-[#16223D]">
                        {{ timbre.titre }}
                    </h3>
                </div>

                <!-- Informations inférieures -->
                <div class="flex items-end justify-between gap-4">
                    <span class="text-sm font-bold text-[#16223D]">
                        {{ timbre.valeurFaciale }}
                    </span>

                    <span class="text-sm font-bold text-[#16223D]">
                        {{ timbre.annee }}
                    </span>
                </div>
            </div>
        </div>

        <!-- Sélection RECTO / VERSO -->
        <div v-if="photoRecto || photoVerso" class="mt-4 flex gap-3">
            <!-- RECTO -->
            <button v-if="photoRecto" type="button"
                class="group relative h-24 w-24 overflow-hidden rounded-xl border-2 bg-white p-1 transition" :class="faceSelectionnee === 'RECTO'
                    ? 'border-[#16296B] ring-2 ring-blue-100'
                    : 'border-[#E4DED3] hover:border-[#1A4FB0]'
                    " @click="selectionnerFace('RECTO')">
                <img :src="`${baseURL}${photoRecto.chemin}`" :alt="`${timbre.titre} - recto`"
                    class="h-full w-full rounded-lg object-cover">

                <span
                    class="absolute bottom-1.5 left-1/2 -translate-x-1/2 rounded-md bg-[#16223D]/85 px-2 py-0.5 text-[9px] font-bold text-white">
                    RECTO
                </span>
            </button>

            <!-- VERSO -->
            <button v-if="photoVerso" type="button"
                class="group relative h-24 w-24 overflow-hidden rounded-xl border-2 bg-white p-1 transition" :class="faceSelectionnee === 'VERSO'
                    ? 'border-[#16296B] ring-2 ring-blue-100'
                    : 'border-[#E4DED3] hover:border-[#1A4FB0]'
                    " @click="selectionnerFace('VERSO')">
                <img :src="`${baseURL}${photoVerso.chemin}`" :alt="`${timbre.titre} - verso`"
                    class="h-full w-full rounded-lg object-cover">

                <span
                    class="absolute bottom-1.5 left-1/2 -translate-x-1/2 rounded-md bg-[#16223D]/85 px-2 py-0.5 text-[9px] font-bold text-white">
                    VERSO
                </span>
            </button>
        </div>
    </section>
</template>