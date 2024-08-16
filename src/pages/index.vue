<script lang="ts" setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import ViewDropdown from '#/components/ViewDropdown.vue'
import YearView from '#/components/YearView.vue'
import type { ViewOption } from '#/types/date'
import MonthView from '#/components/MonthView.vue'
import WeekView from '#/components/WeekView.vue'
import DayView from '#/components/DayView.vue'
import { VIEW_OPTIONS } from '#/constants/date'
import DoubleView from '#/components/DoubleView.vue'

const views: Record<string, Component> = {
  year: YearView,
  month: MonthView,
  week: WeekView,
  day: DayView,
  double: DoubleView,
}

const router = useRouter()
const route = useRoute()

const selectedView = ref<ViewOption>(
  VIEW_OPTIONS.find(option => option.id === route.query.view)
  ?? VIEW_OPTIONS[0],
)

const { formater, nextDate, prevDate, resetToToday } = useCalendar()

function handleChangeView(value: ViewOption) {
  router.push({ query: { view: value.id } })
}

function handlePrevious() {
  prevDate(selectedView.value.id)
}

function handleNext() {
  nextDate(selectedView.value.id)
}

const prevLabel = computed(() => {
  if (selectedView.value.id === 'year') {
    return 'Previous year'
  }
  else if (selectedView.value.id === 'month') {
    return 'Previous month'
  }
  else if (selectedView.value.id === 'week') {
    return 'Previous week'
  }
  else {
    return 'Previous day'
  }
})

const nextLabel = computed(() => {
  if (selectedView.value.id === 'year') {
    return 'Next year'
  }
  else if (selectedView.value.id === 'month') {
    return 'Next month'
  }
  else if (selectedView.value.id === 'week') {
    return 'Next week'
  }
  else {
    return 'Next day'
  }
})
</script>

<template>
  <div class="h-0 min-h-[768px] bg-gray-50 border rounded-lg">
    <div class="flex h-full flex-col">
      <header
        class="flex items-center justify-between border-b border-gray-200 px-6 py-4"
      >
        <h1 class="text-base font-semibold leading-6 text-gray-900">
          <span v-if="selectedView.id === 'day'" class="mr-1">
            <time :datetime="formater('MMMM DD, YYYY')">{{
              formater("MMMM DD, YYYY")
            }}</time>
          </span>
          <span
            v-else-if="
              selectedView.id === 'month' || selectedView.id === 'week'
            "
            class="mr-1"
          >
            <time :datetime="formater('MMMM YYYY')">{{
              formater("MMMM YYYY")
            }}</time>
          </span>
          <span v-else class="mr-1">
            <time :datetime="formater('YYYY')">{{ formater("YYYY") }}</time>
          </span>
        </h1>
        <div class="flex items-center">
          <div
            class="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch"
          >
            <button
              type="button"
              class="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
              @click="handlePrevious"
            >
              <span class="sr-only">{{ prevLabel }}</span>
              <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              class="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
              @click="resetToToday"
            >
              Today
            </button>
            <span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button
              type="button"
              class="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
              @click="handleNext"
            >
              <span class="sr-only">{{ nextLabel }}</span>
              <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div class="hidden md:ml-4 md:flex md:items-center">
            <ViewDropdown v-model="selectedView" @change="handleChangeView" />
            <div class="ml-6 h-6 w-px bg-gray-300" />
            <button
              type="button"
              class="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Add event
            </button>
          </div>
        </div>
      </header>
      <component :is="views[selectedView.id]" />
    </div>
  </div>
</template>
