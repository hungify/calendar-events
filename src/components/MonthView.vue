<script setup lang="ts">
import {
  ClockIcon,
} from '@heroicons/vue/20/solid'
import { getMonthDays } from '#/utils/date'
import { DEFAULT_DAYS } from '#/constants/date'
import type { DayInfo } from '#/types/date'

const days = computed(() => {
  return getMonthDays(2024, 6)
})
const selectedDay = days.value.find(day => day.isSelected)

function cellClass(day: DayInfo) {
  let classes = 'flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10'
  if (day.isCurrentMonth) {
    classes += ' bg-white'
  }
  else if (!day.isCurrentMonth) {
    classes += ' bg-gray-50 text-gray-500'
  }

  return classes
}

function timeClass(day: DayInfo) {
  let classes = 'ml-auto flex h-6 w-6 items-center justify-center rounded-full'
  if (day.isToday) {
    classes += ' bg-indigo-600 font-semibold text-white'
  }
  else if (day.isSelected) {
    classes += ' bg-gray-900 font-semibold text-white'
  }

  return classes
}
</script>

<template>
  <div class="lg:flex lg:h-full lg:flex-col">
    <div class="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
      <div class="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
        <div v-for="week in DEFAULT_DAYS" :key="week.id" class="bg-white py-2">
          {{ week.short[0] }}<span class="sr-only sm:not-sr-only">{{ week.short.slice(1) }}</span>
        </div>
      </div>
      <div class="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
        <div class="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
          <div
            v-for="day in days" :key="day.format.LLLL"
            class="relative px-3 py-2"
            :class="[day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-500']"
          >
            <time
              :datetime="day.format.LLLL"
              :class="day.isToday && 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white'"
            >
              {{ day.format.D }}
            </time>

            <!-- Events -->
            <ol v-if="day.events.length > 0" class="mt-2">
              <li v-for="event in day.events.slice(0, 2)" :key="event.id">
                <a :href="event.href" class="group flex">
                  <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                    {{ event.name }}
                  </p>
                  <time :datetime="event.datetime" class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">{{ event.time }}</time>
                </a>
              </li>
              <li v-if="day.events.length > 2" class="text-gray-500">
                + {{ day.events.length - 2 }} more
              </li>
            </ol>
          </div>
        </div>
        <div class="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
          <button
            v-for="day in days" :key="day.format.LLLL" type="button"
            :class="cellClass(day)"
          >
            <time
              :datetime="day.format.LLLL"
              :class="timeClass(day)"
            >
              {{ day.format.D }}
            </time>

            <span class="sr-only">{{ day.events.length }} events</span>
            <span
              v-if="day.events.length > 0"
              class="-mx-0.5 mt-auto flex flex-wrap-reverse"
            >
              <span
                v-for="event in day.events" :key="event.id"
                class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
              />
            </span>
          </button>
        </div>
      </div>
    </div>
    <div v-if="selectedDay" class="px-4 py-10 sm:px-6 lg:hidden">
      <ol class="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
        <li v-for="event in selectedDay.events" :key="event.id" class="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50">
          <div class="flex-auto">
            <p class="font-semibold text-gray-900">
              {{ event.name }}
            </p>
            <time :datetime="event.datetime" class="mt-2 flex items-center text-gray-700">
              <ClockIcon class="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
              {{ event.time }}
            </time>
          </div>
          <a
            :href="event.href"
            class="ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 opacity-0 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:opacity-100 group-hover:opacity-100"
          >
            Edit <span class="sr-only">, {{ event.name }}</span></a>
        </li>
      </ol>
    </div>
  </div>
</template>
