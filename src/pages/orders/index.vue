<template>
  <HomeLayout>
    <template #body>
      <div class="inpatient-container">接诊订单</div>
    </template>
  </HomeLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HomeLayout from '../../components/HomeLayout.vue';

export default defineComponent({
  name: 'index',
  setup() {
    return {};
  },
  components: { HomeLayout },
});
</script>
