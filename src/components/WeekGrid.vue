<script lang="ts" setup>
import type { DayInfo } from '#/types/date'
import { DEFAULT_DAYS } from '#/constants/date'

interface Props {
  days: DayInfo[]
}

defineProps<Props>()

function cellClass(dayIdx: number, daysLength: number) {
  const classes = {
    0: 'rounded-tl-lg',
    6: 'rounded-tr-lg',
    [daysLength - 7]: 'rounded-bl-lg',
    [daysLength - 1]: 'rounded-br-lg',
  }

  return classes[dayIdx]
}
</script>

<template>
  <div class="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
    <div
      v-for="day in DEFAULT_DAYS"
      :key="day.id"
    >
      {{ day.narrow }}
    </div>
  </div>
  <div class="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
    <button
      v-for="(day, dayIdx) in days" :key="day.id" type="button"
      class="py-1.5 hover:bg-gray-100 focus:z-10"
      :class="[
        day.isCurrentMonth ? 'bg-white text-gray-900' : 'bg-gray-50 text-gray-400',
        cellClass(dayIdx, days.length),
      ]"
    >
      <time
        :datetime="String(day.format.LLLL)"
        class="mx-auto flex h-7 w-7 items-center justify-center rounded-full"
        :class="{
          'bg-indigo-600 font-semibold text-white': day.isToday && day.isCurrentMonth,
        }"
      >
        {{ day.format.D }}
      </time>
    </button>
  </div>
</template>
