import type { ComponentPublicInstance, ComputedRef, Ref } from 'vue'
import { unref } from 'vue'
export type MaybeElement = HTMLElement | SVGElement | ComponentPublicInstance | undefined | null
export type MaybeRef<T> = T | Ref<T>
export type MaybeReadonlyRef<T> = (() => T) | ComputedRef<T>
export type MaybeComputedRef<T> = MaybeReadonlyRef<T> | MaybeRef<T>
export type UnRefElementReturn<T extends MaybeElement = MaybeElement> = T extends ComponentPublicInstance ? Exclude<MaybeElement, ComponentPublicInstance> : T | undefined

export function resolveUnref<T>(r: MaybeComputedRef<T>): T {
  return typeof r === 'function'
    ? (r as any)()
    : unref(r)
}

export type MaybeElementRef<T extends MaybeElement = MaybeElement> = MaybeRef<T>
export type MaybeComputedElementRef<T extends MaybeElement = MaybeElement> = MaybeComputedRef<T>
export function unrefElement<T extends MaybeElement>(elRef: MaybeComputedElementRef<T>): UnRefElementReturn<T> {
  const plain = resolveUnref(elRef)
  return (plain as ComponentPublicInstance)?.$el ?? plain
}

