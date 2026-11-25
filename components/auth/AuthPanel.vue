<script setup lang="ts">
const props = defineProps<{
    ouvert: boolean
}>()
const emit = defineEmits<{
    fermer: []
}>()
function fermer(): void {
    emit('fermer')
}

</script>

<template>
    <div v-if="props.ouvert" class="fixed inset-0 z-[100]">
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/40" />

        <!-- Drawer -->
        <aside class="absolute right-0 top-0 h-full w-full max-w-[420px] overflow-y-auto bg-white shadow-2xl">
            <div class="flex h-full flex-col">
                <!-- Fermeture -->
                <div class="flex justify-end p-5">
                    <button type="button" @click="fermer"
                        class="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-lg transition hover:bg-slate-50">
                        ✕
                    </button>
                </div>

                <!-- Contenu -->
                <div class="px-8">
                    <!-- Icône -->
                    <div class="flex justify-center">
                        <div class="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">
                            👤
                        </div>
                    </div>

                    <!-- Titre -->
                    <h2 class="mt-6 text-center font-display text-3xl font-extrabold text-[var(--color-navy)]">
                        Se connecter
                    </h2>

                    <div class="mx-auto mt-6 h-px w-44 bg-slate-200" />

                    <p class="mx-auto mt-6 max-w-[280px] text-center text-sm leading-6 text-[var(--color-muted)]">
                        Choisissez votre espace pour accéder à la plateforme.
                    </p>

                    <!-- Cartes -->
                    <div class="mt-8 space-y-4">
                        <!-- Membre -->
                        <button type="button"
                            class="group flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-[var(--color-blue)] hover:shadow-sm">
                            <div
                                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-yellow)] text-xl">
                                👤
                            </div>

                            <div class="flex-1">
                                <NuxtLink to="/connexion?espace=membre">
                                    <h3 class="font-display text-lg font-bold text-[var(--color-blue)]">
                                        Je suis membre
                                    </h3>

                                    <p class="mt-1 text-sm leading-5 text-[var(--color-muted)]">
                                        Collection, échanges et suivi de vos timbres.
                                    </p>
                                </NuxtLink>
                            </div>

                            <span class="text-2xl text-[var(--color-blue)] transition group-hover:translate-x-1">
                                →
                            </span>
                        </button>

                        <!-- Modérateur -->
                        <button type="button"
                            class="group flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-[var(--color-blue)] hover:shadow-sm">
                            <div
                                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xl">
                                🛡️
                            </div>

                            <div class="flex-1">
                                <NuxtLink to="/connexion?espace=moderateur">
                                    <h3 class="font-display text-lg font-bold text-[var(--color-blue)]">
                                        Je suis modérateur
                                    </h3>

                                    <p class="mt-1 text-sm leading-5 text-[var(--color-muted)]">
                                        Expertise, validation et modération des échanges.
                                    </p>
                                </NuxtLink>
                            </div>

                            <span class="text-2xl text-[var(--color-blue)] transition group-hover:translate-x-1">
                                →
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    </div>
</template>