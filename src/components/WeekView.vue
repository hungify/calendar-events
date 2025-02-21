<script setup lang="ts">
import type { DayInfo } from '#/types/date'
import { getTimeSlots } from '#/utils/date'
import { onMounted, ref } from 'vue'

const container = ref<HTMLDivElement | null>(null)
const containerNav = ref<HTMLDivElement | null>(null)
const containerOffset = ref<HTMLDivElement | null>(null)

const { daysOfWeek } = useCalendar()

const timesOfDay = computed(() => {
  return getTimeSlots()
})

function dateClassSM(day: DayInfo) {
  let classes = 'items-center justify-center font-semibold h-8 w-8'

  if (day.isToday) {
    classes += ' ml-1.5 flex rounded-full bg-indigo-600 text-white'
  }

  return classes
}

function dateClass(day: DayInfo) {
  let classes = 'mt-1 flex h-8 w-8 items-center justify-center font-semibold'

  if (day.isToday) {
    classes += ' flex rounded-full bg-indigo-600 text-white'
  }

  return classes
}

onMounted(() => {
  // Set the container scroll position based on the current time.
  const currentMinute = new Date().getHours() * 60
  if (!container.value || !containerNav.value || !containerOffset.value)
    return

  container.value.scrollTop
    = ((container.value.scrollHeight - containerNav.value.offsetHeight - containerOffset.value.offsetHeight)
      * currentMinute)
    / 1440
})
</script>

<template>
  <div ref="container" class="isolate flex flex-auto flex-col overflow-auto bg-white">
    <div style="width: 165%" class="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
      <div ref="containerNav" class="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8">
        <div class="grid grid-cols-7 text-sm leading-6 sm:hidden">
          <button
            v-for="day in daysOfWeek" :key="day.date"
            type="button"
            class="flex flex-col items-center pb-3 pt-2"
            :class="{
              'text-gray-400': day.isPast,
              'text-gray-900': !day.isPast,
            }"
          >
            {{ day.format.ddd.at(0) }}
            <span
              :class="dateClass(day)"
            >
              {{ day.format.D }}
            </span>
          </button>
        </div>

        <div class="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 sm:grid">
          <div class="col-end-1 w-14" />
          <div v-for="day in daysOfWeek" :key="day.date" class="flex items-center justify-center py-3">
            <span
              :class="{
                'flex items-baseline': day.isToday,
                'text-gray-400': day.isPast,
                'text-gray-900': !day.isPast,
              }"
            >
              {{ day.format.ddd }}
              <span
                :class="dateClassSM(day)"
              >
                {{ day.date }}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div class="flex flex-auto">
        <div class="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
        <div class="grid flex-auto grid-cols-1 grid-rows-1">
          <!-- Horizontal lines -->
          <div class="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100" style="grid-template-rows: repeat(48, minmax(3.5rem, 1fr))">
            <div ref="containerOffset" class="row-end-1 h-7" />
            <template
              v-for="time in timesOfDay"
              :key="time"
            >
              <div>
                <div
                  class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
                >
                  {{ time.hA }}
                </div>
              </div>
              <div />
            </template>
          </div>

          <!-- Vertical lines -->
          <div class="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
            <div class="col-start-1 row-span-full" />
            <div class="col-start-2 row-span-full" />
            <div class="col-start-3 row-span-full" />
            <div class="col-start-4 row-span-full" />
            <div class="col-start-5 row-span-full" />
            <div class="col-start-6 row-span-full" />
            <div class="col-start-7 row-span-full" />
            <div class="col-start-8 row-span-full w-8" />
          </div>

          <!-- Events -->
          <ol class="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8" style="grid-template-rows: 1.75rem repeat(288, minmax(0, 1fr)) auto">
            <li class="relative mt-px flex sm:col-start-3" style="grid-row: 74 / span 12">
              <a href="#" class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100">
                <p class="order-1 font-semibold text-blue-700">Breakfast</p>
                <p class="text-blue-500 group-hover:text-blue-700">
                  <time datetime="2022-01-12T06:00">6:00 AM</time>
                </p>
              </a>
            </li>
            <li class="relative mt-px flex sm:col-start-3" style="grid-row: 92 / span 30">
              <a href="#" class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100">
                <p class="order-1 font-semibold text-pink-700">Flight to Paris</p>
                <p class="text-pink-500 group-hover:text-pink-700">
                  <time datetime="2022-01-12T07:30">7:30 AM</time>
                </p>
              </a>
            </li>
            <li class="relative mt-px hidden sm:col-start-6 sm:flex" style="grid-row: 122 / span 24">
              <a href="#" class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-100 p-2 text-xs leading-5 hover:bg-gray-200">
                <p class="order-1 font-semibold text-gray-700">Meeting with design team at Disney</p>
                <p class="text-gray-500 group-hover:text-gray-700">
                  <time datetime="2022-01-15T10:00">10:00 AM</time>
                </p>
              </a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>
