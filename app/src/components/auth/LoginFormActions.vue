<template>
  <v-btn
    type="submit"
    color="primary"
    size="large"
    block
    :loading="loading"
    class="mb-4"
  >
    Entrar
  </v-btn>

  <v-alert
    v-if="error"
    type="error"
    variant="tonal"
    class="mb-4"
  >
    {{ error }}
  </v-alert>
</template>

<script setup lang="ts">
interface Props {
  loading: boolean
  error: string
}

defineProps<Props>()
</script>
