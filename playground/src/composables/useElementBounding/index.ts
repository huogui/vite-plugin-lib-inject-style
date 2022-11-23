import { unrefElement } from '../unrefElement'
import type { MaybeComputedElementRef } from '../unrefElement'

export function useElementBounding(target: MaybeComputedElementRef) {
  const el = unrefElement(target)
  if (!el)
    return
  const rect = el.getBoundingClientRect()
  return rect
}

export type UseElementBoundingReturn = ReturnType<typeof useElementBounding>
