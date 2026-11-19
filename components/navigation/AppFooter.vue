<template>
  <footer class="border-t border-slate-200 bg-white">
    <div
      class="mx-auto flex max-w-[1220px] flex-col gap-4 px-5 py-6 md:flex-row md:items-center md:justify-between"
    >
      <!-- Identité -->
      <div>
        <div class="flex items-center gap-2">
          <span
            class="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--color-yellow)] font-display text-sm font-extrabold text-[var(--color-navy)]"
          >
            P
          </span>

          <p class="font-display text-sm font-bold text-[var(--color-blue)]">
            LaPoste
          </p>
        </div>

        <p class="mt-1.5 text-sm text-[var(--color-muted)]">
          La bourse aux timbres.
        </p>
      </div>

      <!-- Navigation -->
      <nav
        class="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
        aria-label="Navigation du pied de page"
      >
        <NuxtLink
          to="/"
          class="text-[var(--color-muted)] transition-colors hover:text-[var(--color-blue)]"
        >
          Découvrir
        </NuxtLink>

        <NuxtLink
          to="/echanges"
          class="text-[var(--color-muted)] transition-colors hover:text-[var(--color-blue)]"
        >
          Mes échanges
        </NuxtLink>

        <NuxtLink
          to="/collection"
          class="text-[var(--color-muted)] transition-colors hover:text-[var(--color-blue)]"
        >
          Ma collection
        </NuxtLink>
      </nav>

      <p class="text-xs text-[var(--color-muted)]">
        © LaPoste
      </p>
    </div>
  </footer>
</template>