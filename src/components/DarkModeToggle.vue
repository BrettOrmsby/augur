<template>
  <Button
    aria-label="Theme Switcher"
    @click="toggleDark()"
    severity="secondary"
    v-tooltip.bottom="generateTooltip('Toggle Colour Mode')"
  >
    <template #icon="iconClass">
      <SunIcon v-if="!isDark" :class="iconClass.class" />
      <MoonIcon v-else :class="iconClass.class" />
    </template>
  </Button>
</template>

<script lang="ts" setup>
import Button from 'primevue/button'
import SunIcon from '@/components/icons/SunIcon.vue'
import MoonIcon from '@/components/icons/MoonIcon.vue'
import { useDark, useToggle } from '@vueuse/core'
import generateTooltip from '@/utils/generateTooltip'

const isDark = useDark({
  selector: ':root',
  valueDark: 'app-dark',
  valueLight: 'app-light'
})

const toggleDark = useToggle(isDark)
</script>

<style scoped></style>
