<template>
  <footer>
    <p>
      Wizards of the Coast, Magic: The Gathering, and their logos are trademarks of Wizards of the
      Coast LLC in the United States and other countries. © 1993-2024 Wizards. All Rights Reserved.
    </p>
    <p>
      Auger is not affiliated with, endorsed, sponsored, or specifically approved by Wizards of the
      Coast LLC. Auger may use the trademarks and other intellectual property of Wizards of the
      Coast LLC, which is permitted under Wizards' Fan Site Policy. MAGIC: THE GATHERING® is a
      trademark of Wizards of the Coast. For more information about Wizards of the Coast or any of
      Wizards' trademarks or other intellectual property, please visit their website at
      https://company.wizards.com/.
    </p>
    <p>
      Card prices and other card data are provided by
      <a href="https://scryfall.com/Scryfall">Scryfall</a>. Scryfall makes no guarantee about its
      price information and recommends you see stores for final prices and details.
    </p>
    <p>
      All other content © 2024 Brett Ormsby • View source on
      <a href="https://github.com/BrettOrmsby/augur">Github</a>
    </p>
  </footer>
</template>

<script lang="ts" setup></script>

<style scoped>
footer {
  padding: var(--block-space);
  background-color: var(--p-surface-800);
  border-top: 1px solid var(--p-content-border-color);
}
p {
  color: var(--p-text-muted-color);
  font-size: 0.875rem;
  display: block;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

a {
  color: var(--p-button-link-color);
  transition: var(--p-form-field-transition-duration);
  text-decoration: none;
}
a:hover {
  color: var(--p-button-link-hover-color);
  text-decoration: underline;
}
</style>
