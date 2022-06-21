<template>
  <div :style="'background-color:' + color">
    <b style="font-size: 30px; color: wheat">{{ number }}</b>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    color: String,
    number: Number,
    deckTop: Object,
  },
};
</script>

<style scoped></style>
