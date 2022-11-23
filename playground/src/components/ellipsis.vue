<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useElementBounding } from '../composables'
import { ellipsisEmits, ellipsisProps } from './ellipsis'

const props = defineProps(ellipsisProps)

const emit = defineEmits(ellipsisEmits)

const { content, foldVisible, rows, ellipsisText, foldText } = props

const beforeRefreshFunc = ref<() => void>()
const realContentLenth = ref(0)
const realContentBoxRef = ref<HTMLElement>()
const realContentBoxTailRef = ref<HTMLElement>()

const realContent = computed(() => {
  return content.substr(0, realContentLenth.value)
})
const watchData = computed(() => {
  return [content, foldText, ellipsisText, rows, foldVisible]
})

const refresh = async () => {
  beforeRefreshFunc.value && (beforeRefreshFunc.value)()
  let stopLoop = false
  beforeRefreshFunc.value = () => { stopLoop = true }
  realContentLenth.value = content.length
  const checkLoop = async (start: number, end: number) => {
    if (stopLoop || start + 1 >= end) {
      beforeRefreshFunc.value = undefined
      return
    }
    const realContentBoxRect = useElementBounding(realContentBoxRef)
    const realContentBoxTailRect = useElementBounding(realContentBoxTailRef)

    if (!realContentBoxRect || !realContentBoxTailRect)
      return

    const overflow = realContentBoxTailRect.bottom > realContentBoxRect.bottom

    if (overflow)
      end = realContentLenth.value
    else
      start = realContentLenth.value

    realContentLenth.value = Math.floor((start + end) / 2)
    await nextTick()
    checkLoop(start, end)
  }
  await nextTick()
  checkLoop(0, realContentLenth.value)
}

const foldClickHandle = (event: MouseEvent | TouchEvent) => {
  emit('foldClick', event)
}
watch(watchData, () => {
  refresh()
}, { immediate: true })
</script>

<template>
  <div class="r-ellipsis-container" role="ellipsisContainer">
    <div class="r-ellipsis__shadow">
      <textarea :rows="rows" readonly />
      <div ref="realContentBoxRef" class="r-ellipsis__shadow-box">
        <span>{{ realContent }}</span>
        <slot name="ellipsis">
          <span>{{ ellipsisText }}</span>
          <span class="r-ellipsis__ellipsis-btn">{{ foldText }}</span>
        </slot>
        <span ref="realContentBoxTailRef" />
      </div>
    </div>
    <div class="r-ellipsis__real-box" role="realBox">
      <span>{{ realContent }}</span>
      <slot v-if="realContentLenth < content.length || foldVisible" name="ellipsis">
        <span>{{ ellipsisText }}</span>
        <span class="r-ellipsis__ellipsis-btn" @click="foldClickHandle">{{ foldText }}</span>
      </slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.r-ellipsis-container {
    text-align: left;
    position: relative;
    line-height: 1.5;
    .r-ellipsis__shadow {
        width: 100%;
        display: flex;
        pointer-events: none;
        opacity: 0;
        user-select: none;
        position: absolute;
        outline: green solid 1px;
        textarea {
            border: none;
            flex: auto;
            padding: 0;
            resize: none;
            overflow: hidden;
            font-size: inherit;
            line-height: inherit;
            outline: none;
        }
        .r-ellipsis__shadow-box {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
        }
    }
    .r-ellipsis__ellipsis-btn {
        cursor: pointer;
        color: #3775ff;
    }
}
</style>
