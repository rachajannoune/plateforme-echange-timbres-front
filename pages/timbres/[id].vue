<script setup lang="ts">
const route = useRoute()

const id =
    typeof route.params.id === 'string'
        ? route.params.id
        : ''


const {
    data,
    status,
    error,
    refresh,
} = useTimbre(id)

useSeoMeta({
    title: () =>
        data.value
            ? `${data.value.titre} - LaPoste`
            : 'Détail du timbre - LaPoste',

    description: () =>
        data.value
            ? `Découvrez le timbre ${data.value.titre}, ${data.value.pays}, ${data.value.annee}.`
            : 'Découvrez le détail de ce timbre proposé à l’échange.',
})
</script>
<template>
    <div class="min-h-full bg-[#FAF9F5]">
        <main class="mx-auto max-w-[1220px] px-5 py-9 sm:py-11">

            <!-- Retour au catalogue -->
            <NuxtLink to="/"
                class="mb-7 inline-flex items-center gap-2 text-sm font-bold text-[#16296B] transition hover:text-[#1A4FB0]">
                ← Retour au catalogue
            </NuxtLink>

            <!-- Chargement -->
            <div v-if="status === 'pending'" class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <div class="min-h-[520px] animate-pulse rounded-2xl border border-[#E4DED3] bg-white" />

                <div class="min-h-[520px] animate-pulse rounded-2xl border border-[#E4DED3] bg-white" />
            </div>

            <!-- Erreur / timbre introuvable -->
            <div v-else-if="error" class="rounded-2xl border border-red-200 bg-red-50 px-6 py-14 text-center">
                <div
                    class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 font-display text-lg font-extrabold text-red-700">
                    !
                </div>

                <h1 class="mt-4 font-display text-xl font-extrabold text-red-800">
                    Timbre introuvable
                </h1>

                <p class="mt-2 text-sm text-red-700">
                    Ce timbre n'existe pas ou n'est plus accessible.
                </p>

                <div class="mt-6 flex justify-center gap-3">
                    <button type="button"
                        class="rounded-xl border border-red-200 bg-white px-5 py-2.5 text-sm font-bold text-red-700 transition hover:bg-red-100"
                        @click="() => refresh()">
                        Réessayer
                    </button>

                    <NuxtLink to="/"
                        class="rounded-xl bg-[#16296B] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#1A4FB0]">
                        Retour au catalogue
                    </NuxtLink>
                </div>
            </div>

            <!-- Timbre trouvé -->
            <div v-else-if="data">
                <!-- Titre de la page -->
                <div class="mb-7">
                    <p class="text-xs font-bold uppercase tracking-[0.14em] text-[#717A8B]">
                        Détail du timbre
                    </p>

                    <h1
                        class="mt-2 font-display text-[30px] font-extrabold tracking-tight text-[#16223D] sm:text-[34px]">
                        {{ data.titre }}
                    </h1>

                    <p class="mt-2 text-sm text-[#717A8B]">
                        {{ data.pays }} · {{ data.annee }} · {{ data.theme }}
                    </p>
                </div>

                <!-- Contenu principal -->
                <div class="grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)]">
                    <!-- Partie gauche : photos -->
                    <TimbresTimbrePhotos :timbre="data" />

                    <!-- Partie droite : détails -->
                    <section class="overflow-hidden rounded-2xl border border-[#E4DED3] bg-white shadow-sm">
                        <!-- En-tête -->
                        <div class="border-b border-[#EEE9DF] p-6">
                            <div class="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <span
                                        class="inline-flex rounded-full bg-blue-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#16296B]">
                                        {{ data.statut.replaceAll('_', ' ') }}
                                    </span>

                                    <h2 class="mt-4 font-display text-2xl font-extrabold text-[#16223D]">
                                        {{ data.titre }}
                                    </h2>

                                    <p class="mt-1 text-sm text-[#717A8B]">
                                        {{ data.pays }} · {{ data.annee }}
                                    </p>
                                </div>

                                <span class="rounded-xl bg-[#FFF5BF] px-3 py-2 text-xs font-extrabold text-[#665100]">
                                    {{ data.rarete }}
                                </span>
                            </div>
                        </div>

                        <!-- Informations -->
                        <div class="p-6">
                            <h3 class="font-display text-sm font-extrabold uppercase tracking-[0.08em] text-[#16223D]">
                                Caractéristiques
                            </h3>

                            <dl class="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                                <div>
                                    <dt class="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8A92A0]">
                                        Thème
                                    </dt>

                                    <dd class="mt-1 text-sm font-bold text-[#16223D]">
                                        {{ data.theme }}
                                    </dd>
                                </div>

                                <div>
                                    <dt class="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8A92A0]">
                                        État
                                    </dt>

                                    <dd class="mt-1 text-sm font-bold text-[#16223D]">
                                        {{ data.etat.replaceAll('_', ' ') }}
                                    </dd>
                                </div>

                                <div>
                                    <dt class="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8A92A0]">
                                        Valeur faciale
                                    </dt>

                                    <dd class="mt-1 text-sm font-bold text-[#16223D]">
                                        {{ data.valeurFaciale }}
                                    </dd>
                                </div>

                                <div>
                                    <dt class="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8A92A0]">
                                        Cote estimée
                                    </dt>

                                    <dd class="mt-1 font-display text-xl font-extrabold text-[#16223D]">
                                        {{ data.coteEstimee }} €
                                    </dd>
                                </div>

                                <div>
                                    <dt class="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8A92A0]">
                                        Couleur d'impression
                                    </dt>

                                    <dd class="mt-1 flex items-center gap-2 ftext-sm font-bold text-[#16223D]">
                                        <span class="h-4 w-4 shrink-0 rounded-full border border-black/10"
                                            :style="{ backgroundColor: data.couleurImpression }" />
                                    </dd>

                                </div>

                                <!-- Seulement si la référence existe -->
                                <div v-if="data.referenceCatalogue">
                                    <dt class="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8A92A0]">
                                        Référence catalogue
                                    </dt>

                                    <dd class="mt-1 text-sm font-bold text-[#16223D]">
                                        {{ data.referenceCatalogue }}
                                    </dd>
                                </div>

                                <div>
                                    <dt class="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8A92A0]">
                                        Expertise
                                    </dt>

                                    <dd class="mt-1 text-sm font-bold text-[#16223D]">
                                        {{ data.expertise ? 'Expertisé' : 'Non expertisé' }}
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <!-- Propriétaire -->
                        <div class="border-t border-[#EEE9DF] bg-[#FAF9F5] p-6">
                            <p class="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8A92A0]">
                                Proposé par
                            </p>

                            <div class="mt-3 flex items-center gap-3">
                                <div
                                    class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFCD00] font-display text-sm font-extrabold text-[#16296B]">
                                    {{ data.proprietaire.prenom.charAt(0).toUpperCase() }}
                                </div>

                                <div>
                                    <p class="text-sm font-extrabold text-[#16223D]">
                                        {{ data.proprietaire.prenom }}
                                    </p>

                                    <p class="mt-0.5 text-xs text-[#717A8B]">
                                        {{ data.proprietaire.ville }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="border-t border-[#EEE9DF] p-6">
                            <button type="button"
                                class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFCD00] px-5 py-3.5 text-sm font-extrabold text-[#16223D] transition hover:bg-[#F4C400]">
                                ⇆
                                Proposer un échange
                            </button>

                            <NuxtLink to="/"
                                class="mt-3 flex w-full items-center justify-center rounded-xl border border-[#DDD7CA] bg-white px-5 py-3 text-sm font-bold text-[#16296B] transition hover:border-[#1A4FB0] hover:bg-blue-50">
                                Retour au catalogue
                            </NuxtLink>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    </div>
</template>