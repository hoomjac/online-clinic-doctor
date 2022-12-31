<template>
  <HomeLayout>
    <template #body>
      <div class="inpatient-container">我的</div>
    </template>
  </HomeLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HomeLayout from '../../components/HomeLayout.vue';

export default defineComponent({
  name: 'index',
  components: { HomeLayout },
  setup() {
    return {};
  },
});
</script>
