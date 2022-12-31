<template>
  <view
    class="h-full bg-[length:100%_250px] bg-no-repeat overflow-x-hidden overflow-y-scroll"
    :style="{
      backgroundImage: linearGradient,
    }"
  >
    <view class="px-4">
      <view class="flex justify-center align-middle">
        <!-- <image mode="aspectFit" src="../static/hospital-logo.webp" class="w-4/5 h-14"></image> -->
        <div class="text-xl text-white w-4/5 py-4 text-center">福建省人民医院</div>
      </view>
      <slot name="body"></slot>
    </view>
  </view>
</template>

<script lang="ts">
import { computed } from '@vue/reactivity';
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'HomeLayout',
  props: {
    bgColor: {
      type: String as PropType<string>,
      required: false,
      default: '#4F7ECB',
    },
  },
  setup(props) {
    const linearGradient = computed(() => `linear-gradient(to bottom, ${props.bgColor}, ${props.bgColor} 36%, #fff)`);

    return {
      linearGradient,
    };
  },
});
</script>

<!-- background: linear-gradient(#2677ff 194px, #f2f3f5 0); -->
<!-- bg-gradient-to-b from-steel-blue-500 via-steel-blue-500 to-white-->
