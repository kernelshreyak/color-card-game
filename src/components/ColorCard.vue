<template>
  <div :style="'background-color:' + color">
    <b style="font-size: 9rem; color: '#424242'">{{ number }}</b>
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

<style scoped></style>
