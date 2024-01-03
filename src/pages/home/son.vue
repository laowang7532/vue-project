<template>
  <div class="w-80% h-200px bg-light-50 mx-auto">{{ text }}</div>
</template>
<script setup lang='ts'>
import { onMounted,defineModel } from 'vue';


const text = defineModel<any>('text');

onMounted(() => {
  console.log('text', text.value);
});

</script>
<style lang='scss' scoped></style>