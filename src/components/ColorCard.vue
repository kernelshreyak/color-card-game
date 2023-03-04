<template>
  <div :style="'background-color:' + color">
    <b class="cardelement">{{ number }}</b>
  </div>
</template>

<script>
export default {
  name: 'ColorCard',
  props: {
    color: String,
    number: Number,
    deckTop: Object,
  },
};
</script>

<style scoped>
  .cardelement{
    font-size: 8rem; 
    color: rgb(181, 170, 170);
    max-height: 100%;
    height: auto;
  }
</style>