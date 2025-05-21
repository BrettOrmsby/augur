<template>
  <main>
    <h1>404</h1>
    <RouterLink to="/search?q='Deny Existence'" class="image-link">
      <img
        src="https://cards.scryfall.io/art_crop/front/1/6/16a14eeb-1c85-4029-a047-39a4efef3f74.jpg"
        alt="Deny Existence"
      />
    </RouterLink>
    <p class="card-link">
      [[<RouterLink to="/search?q='Deny Existence'">Deny Existence</RouterLink>]]
    </p>
    <p>Sorry, this page does not exist.</p>
    <RouterLink to="/">
      <Button label="Go Home" severity="secondary" />
    </RouterLink>
  </main>
</template>

<script lang="ts" setup>
import { Button } from 'primevue'
</script>

<style scoped>
main {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 10vh;
  width: fit-content;
}
h1 {
  text-align: center;
  font-size: 3rem;
}
img {
  width: 100%;
  border-radius: var(--p-border-radius-md);
  aspect-ratio: 300 / 220;
  display: block;
}

a:has(img),
.image-link {
  width: 50%;
  flex-grow: none;
}

p {
  color: var(--p-text-muted-color);
  text-align: center;
}

.card-link {
  margin-top: var(--inline-space);
}

a {
  color: var(--p-primary-color);
  transition: var(--p-form-field-transition-duration);
  text-decoration: none;
}

a:hover {
  color: var(--p-primary-hover-color);
  text-decoration: underline;
}
</style>
