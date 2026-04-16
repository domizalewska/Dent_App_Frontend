import type { Component } from 'vue'
import { shallowRef } from 'vue'

const activeComponent = shallowRef<Component | null>(null)
const activeProps = shallowRef<Record<string, unknown> | null>(null)

export function useDialog() {
  function open(component: Component, props?: any) {
    activeComponent.value = component
    activeProps.value = props
  }

  function close() {
    activeComponent.value = null
    activeProps.value = null
  }

  return {
    activeComponent,
    activeProps,
    open,
    close,
  }
}
