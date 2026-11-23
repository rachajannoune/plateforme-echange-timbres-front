<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})

const nom = ref('')
const prenom = ref('')
const email = ref('')
const ville = ref('')
const motDePasse = ref('')
const acceptationCharte = ref(false)

const authStore = useAuthStore()
const router = useRouter()

const chargement = ref(false)
const messageErreur = ref('')
const afficherMotDePasse = ref(false)

/* Règles du mot de passe */
const longueurValide = computed(() =>
  motDePasse.value.length >= 8
)

const minusculeValide = computed(() =>
  /[a-z]/.test(motDePasse.value)
)

const majusculeValide = computed(() =>
  /[A-Z]/.test(motDePasse.value)
)

const chiffreValide = computed(() =>
  /[0-9]/.test(motDePasse.value)
)

const caractereSpecialValide = computed(() =>
  /[^A-Za-z0-9]/.test(motDePasse.value)
)

const motDePasseValide = computed(() =>
  longueurValide.value
  && minusculeValide.value
  && majusculeValide.value
  && chiffreValide.value
  && caractereSpecialValide.value
)

async function soumettreInscription() {
  messageErreur.value = ''
  chargement.value = true

  try {
    await authStore.inscrire({
      nom: nom.value,
      prenom: prenom.value,
      email: email.value,
      ville: ville.value,
      motDePasse: motDePasse.value,
      acceptationCharte: acceptationCharte.value,
    })

    await router.push('/')
  } catch (error) {
    if (
      typeof error === 'object'
      && error !== null
      && 'data' in error
    ) {
      const data = error.data as {
        message?: string
      }

      messageErreur.value =
        data.message ?? 'Impossible de créer le compte.'
    } else {
      messageErreur.value =
        'Impossible de créer le compte.'
    }
  } finally {
    chargement.value = false
  }
}

useSeoMeta({
  title: 'Inscription - LaPoste',
  description:
    'Créez votre compte collectionneur LaPoste.',
})
</script>

<template>
  <div class="min-h-screen bg-[#FAF9F5] lg:grid lg:grid-cols-2">
    <!-- Partie gauche -->
    <section
      class="relative hidden overflow-hidden bg-[#FFCD00] p-12 lg:flex lg:min-h-screen lg:flex-col"
    >
      <!-- Logo -->
      <NuxtLink
        to="/"
        class="relative z-10 flex items-center gap-3"
      >
        <span
          class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#16296B] font-display text-xl font-extrabold text-white"
        >
          P
        </span>

        <span
          class="font-display text-2xl font-extrabold text-[#16296B]"
        >
          LaPoste
        </span>
      </NuxtLink>

      <!-- Présentation -->
      <div class="relative z-10 my-auto max-w-[520px]">
        <p
          class="text-xs font-extrabold uppercase tracking-[0.16em] text-[#16296B]/70"
        >
          Collection · échange · passion
        </p>

        <h1
          class="mt-4 font-display text-5xl font-extrabold leading-[1.08] tracking-tight text-[#16223D]"
        >
          Donnez une nouvelle
          <br>
          histoire à votre
          <br>
          collection.
        </h1>

        <p
          class="mt-6 max-w-[450px] text-base leading-7 text-[#16223D]/75"
        >
          Rejoignez les collectionneurs, partagez vos timbres
          et trouvez les pièces qui manquent à votre collection.
        </p>

        <!-- Timbres décoratifs -->
        <div class="mt-10 flex items-end gap-4">
          <div
            class="-rotate-6 flex h-36 w-28 flex-col justify-between border-[6px] border-dotted border-white bg-[#5A4A8F] p-3 text-white shadow-lg"
          >
            <span class="text-[8px] font-bold tracking-widest">
              FRANCE
            </span>

            <span class="text-center font-display text-sm font-bold">
              Métropolitain
            </span>

            <span class="text-right text-[8px]">
              2000
            </span>
          </div>

          <div
            class="flex h-40 w-32 flex-col justify-between border-[6px] border-dotted border-white bg-[#1A4FB0] p-3 text-white shadow-xl"
          >
            <span class="text-[8px] font-bold tracking-widest">
              FRANCE
            </span>

            <span class="text-center font-display text-base font-bold">
              Concorde
            </span>

            <span class="text-right text-[8px]">
              1969
            </span>
          </div>

          <div
            class="rotate-6 flex h-36 w-28 flex-col justify-between border-[6px] border-dotted border-white bg-[#C45345] p-3 text-white shadow-lg"
          >
            <span class="text-[8px] font-bold tracking-widest">
              FRANCE
            </span>

            <span class="text-center font-display text-sm font-bold">
              Collection
            </span>

            <span class="text-right text-[8px]">
              LaPoste
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Partie droite -->
    <section
      class="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12"
    >
      <div class="w-full max-w-[520px]">
        <!-- Logo mobile -->
        <NuxtLink
          to="/"
          class="mb-8 flex items-center gap-2.5 lg:hidden"
        >
          <span
            class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFCD00] font-display text-xl font-extrabold text-[#16296B]"
          >
            P
          </span>

          <span
            class="font-display text-xl font-bold text-[#16296B]"
          >
            LaPoste
          </span>
        </NuxtLink>

        <!-- En-tête -->
        <div>
          <p
            class="text-xs font-extrabold uppercase tracking-[0.14em] text-[#1A4FB0]"
          >
            Rejoindre la communauté
          </p>

          <h2
            class="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#16223D]"
          >
            Créer votre compte
          </h2>

          <p class="mt-2 text-sm leading-6 text-[#717A8B]">
            Quelques informations suffisent pour commencer votre collection.
          </p>
        </div>

        <!-- Erreur -->
        <div
          v-if="messageErreur"
          class="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
          role="alert"
        >
          {{ messageErreur }}
        </div>

        <form
          class="mt-6 space-y-4"
          @submit.prevent="soumettreInscription"
        >
          <!-- Prénom / Nom -->
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                for="prenom"
                class="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-[#16223D]"
              >
                Prénom
              </label>

              <input
                id="prenom"
                v-model="prenom"
                name="prenom"
                type="text"
                required
                autocomplete="given-name"
                placeholder="Camille"
                class="h-12 w-full rounded-xl border border-[#DDD7CA] bg-white px-4 text-sm text-[#16223D] outline-none transition placeholder:text-[#9AA1AD] focus:border-[#1A4FB0] focus:ring-2 focus:ring-blue-100"
              >
            </div>

            <div>
              <label
                for="nom"
                class="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-[#16223D]"
              >
                Nom
              </label>

              <input
                id="nom"
                v-model="nom"
                name="nom"
                type="text"
                required
                autocomplete="family-name"
                placeholder="Martin"
                class="h-12 w-full rounded-xl border border-[#DDD7CA] bg-white px-4 text-sm text-[#16223D] outline-none transition placeholder:text-[#9AA1AD] focus:border-[#1A4FB0] focus:ring-2 focus:ring-blue-100"
              >
            </div>
          </div>

          <!-- Email -->
          <div>
            <label
              for="email"
              class="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-[#16223D]"
            >
              Adresse e-mail
            </label>

            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              required
              autocomplete="email"
              placeholder="vous@exemple.fr"
              class="h-12 w-full rounded-xl border border-[#DDD7CA] bg-white px-4 text-sm text-[#16223D] outline-none transition placeholder:text-[#9AA1AD] focus:border-[#1A4FB0] focus:ring-2 focus:ring-blue-100"
            >
          </div>

          <!-- Ville -->
          <div>
            <label
              for="ville"
              class="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-[#16223D]"
            >
              Ville
            </label>

            <input
              id="ville"
              v-model="ville"
              name="ville"
              type="text"
              required
              autocomplete="address-level2"
              placeholder="Lyon"
              class="h-12 w-full rounded-xl border border-[#DDD7CA] bg-white px-4 text-sm text-[#16223D] outline-none transition placeholder:text-[#9AA1AD] focus:border-[#1A4FB0] focus:ring-2 focus:ring-blue-100"
            >
          </div>

          <!-- Mot de passe -->
          <div>
            <label
              for="mot-de-passe"
              class="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-[#16223D]"
            >
              Mot de passe
            </label>

            <div class="relative">
              <input
                id="mot-de-passe"
                v-model="motDePasse"
                name="motDePasse"
                :type="afficherMotDePasse ? 'text' : 'password'"
                required
                autocomplete="new-password"
                placeholder="Votre mot de passe"
                class="h-12 w-full rounded-xl border border-[#DDD7CA] bg-white px-4 pr-20 text-sm text-[#16223D] outline-none transition placeholder:text-[#9AA1AD] focus:border-[#1A4FB0] focus:ring-2 focus:ring-blue-100"
              >

              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-bold text-[#717A8B] transition hover:bg-slate-100 hover:text-[#16296B]"
                @click="afficherMotDePasse = !afficherMotDePasse"
              >
                {{ afficherMotDePasse ? 'Masquer' : 'Afficher' }}
              </button>
            </div>

            <!-- Règles du mot de passe -->
            <div
              class="mt-3 grid gap-x-4 gap-y-1.5 sm:grid-cols-2"
            >
              <p
                class="text-xs font-semibold"
                :class="
                  longueurValide
                    ? 'text-emerald-700'
                    : 'text-[#8A92A0]'
                "
              >
                {{ longueurValide ? '✓' : '○' }}
                8 caractères minimum
              </p>

              <p
                class="text-xs font-semibold"
                :class="
                  minusculeValide
                    ? 'text-emerald-700'
                    : 'text-[#8A92A0]'
                "
              >
                {{ minusculeValide ? '✓' : '○' }}
                Une minuscule
              </p>

              <p
                class="text-xs font-semibold"
                :class="
                  majusculeValide
                    ? 'text-emerald-700'
                    : 'text-[#8A92A0]'
                "
              >
                {{ majusculeValide ? '✓' : '○' }}
                Une majuscule
              </p>

              <p
                class="text-xs font-semibold"
                :class="
                  chiffreValide
                    ? 'text-emerald-700'
                    : 'text-[#8A92A0]'
                "
              >
                {{ chiffreValide ? '✓' : '○' }}
                Un chiffre
              </p>

              <p
                class="text-xs font-semibold"
                :class="
                  caractereSpecialValide
                    ? 'text-emerald-700'
                    : 'text-[#8A92A0]'
                "
              >
                {{ caractereSpecialValide ? '✓' : '○' }}
                Un caractère spécial
              </p>
            </div>
          </div>

          <!-- Charte -->
          <label
            class="flex cursor-pointer items-start gap-3 rounded-xl border border-[#E4DED3] bg-white p-4"
          >
            <input
              v-model="acceptationCharte"
              name="acceptationCharte"
              type="checkbox"
              required
              class="mt-0.5 h-4 w-4 rounded border-[#BEB6A8] text-[#16296B] focus:ring-[#1A4FB0]"
            >

            <span class="text-xs leading-5 text-[#717A8B]">
              J'accepte la charte de la communauté et m'engage à décrire
              honnêtement l'état des timbres proposés à l'échange.
            </span>
          </label>

          <!-- Bouton -->
          <button
            type="submit"
            :disabled="
              chargement
              || !motDePasseValide
              || !acceptationCharte
            "
            class="flex h-12 w-full items-center justify-center rounded-xl bg-[#FFCD00] px-5 text-sm font-extrabold text-[#16223D] transition hover:bg-[#F4C400] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {{
              chargement
                ? 'Création du compte...'
                : 'Créer mon compte'
            }}
          </button>
        </form>

        <!-- Connexion -->
        <div
          class="mt-6 border-t border-[#E4DED3] pt-5 text-center"
        >
          <p class="text-sm text-[#717A8B]">
            Vous avez déjà un compte ?
          </p>

          <NuxtLink
            to="/connexion"
            class="mt-2 inline-flex font-display text-sm font-extrabold text-[#16296B] transition hover:text-[#1A4FB0]"
          >
            Se connecter →
          </NuxtLink>
        </div>

        <div class="mt-5 text-center">
          <NuxtLink
            to="/"
            class="text-xs font-semibold text-[#8A92A0] transition hover:text-[#16296B]"
          >
            ← Retour au catalogue
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>