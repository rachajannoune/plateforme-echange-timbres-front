<template>
  <div
    class="flex min-h-screen flex-col bg-[var(--color-background)] text-[var(--color-text)]"
  >
    <NavigationAppHeader />

    <main class="flex-1">
      <slot />
    </main>

    <NavigationAppFooter />
  </div>
</template>