<template>
  <div class="about">
    <h1>{{ id }}</h1>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  setup() {
    const route = useRoute();
    onMounted(() => {
      console.log(route.query);
    });
    const id = ref(route.params.id);
    return { id };
  }
});
</script>
