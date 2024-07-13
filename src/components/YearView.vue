<script setup lang="ts">
import WeekGrid from './WeekGrid.vue'
import { getYearMonths } from '#/utils/date'

const year = new Date().getFullYear()

const months = computed(() => {
  return getYearMonths(year)
})
</script>

<template>
  <div class="bg-white">
    <div
      class="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-16 sm:grid-cols-2 sm:px-6 xl:max-w-none xl:grid-cols-3 xl:px-8 2xl:grid-cols-4"
    >
      <section v-for="month in months" :key="month.format.MMMM" class="text-center">
        <h2 class="text-sm font-semibold text-gray-900">
          {{ month.format.MMMM }}
        </h2>
        <WeekGrid :days="month.days" />
      </section>
    </div>
  </div>
</template>
