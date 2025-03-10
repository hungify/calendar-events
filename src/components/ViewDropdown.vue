<script lang="ts" setup>
import type { ViewOption } from '#/types/date'
import { VIEW_OPTIONS } from '#/constants/date'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

interface Props {
  modelValue: ViewOption
}

interface Emits {
  (e: 'update:modelValue', id: number): void
  (e: 'change', value: ViewOption): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const view = defineModel<ViewOption>('modelValue')

function handleChange(item: ViewOption) {
  view.value = item
  emit('change', item)
}
</script>

<template>
  <Menu as="div" class="relative">
    <MenuButton
      v-if="view" type="button"
      class="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      {{ view.name }}
      <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
    </MenuButton>

    <Transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems class="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div class="py-1">
          <MenuItem
            v-for="item in VIEW_OPTIONS"
            v-slot="{ active }" :key="item.id"
            @click="handleChange(item)"
          >
            <a
              href="#" class="block px-4 py-2 text-sm"
              :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700']"
            >{{ item.name }}</a>
          </MenuItem>
        </div>
      </MenuItems>
    </Transition>
  </Menu>
</template>
