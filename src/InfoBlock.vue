<template>
  <div class="info-block">
    <div 
      class="title" 
      :class="{ 'ft': props.ft }" 
      :style="{ backgroundColor: props.color }"
    >
      <div class="stripe" v-if="props.ft"></div>
      <div class="text">
        <slot name="title"></slot>
      </div>
      <div class="stripe" v-if="props.ft"></div>
    </div>
    <div class="content" :style="{ borderColor: props.color }">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, defineProps } from 'vue';

const props = defineProps({
  color: {
    type: String,
    default: '#B7BCEA',
  },
  ft: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>

.info-block {
  display: flex;
  flex-direction: column;
  .title {
    align-self: flex-start;
    padding: 0.2em 1.5em;
    color: #000;
    display: flex;
    align-items: center;

    > div {
      display: flex;
      align-items: center;
    }

    &.ft {
      align-self: stretch;
      padding: 0.2em 1em;

      .text {
        margin: 0 1em;
      }
      .stripe {
        flex-grow: 1;
        height: 1px;
        background-color: #000;
      }
    }
  }
  .content {
    padding: 1em;
    border-width: 1px;
    border-style: solid;
    flex-grow: 1;
    background: #000;
    display: flex;
    flex-direction: column;
  }
}

</style>
