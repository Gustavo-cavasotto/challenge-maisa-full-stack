<template>
  <v-card-actions class="pa-6 pt-0">
    <v-spacer></v-spacer>
    <v-btn
      color="grey"
      variant="elevated"
      @click="$emit('cancel')"
      :disabled="loading"
    >
      Cancelar
    </v-btn>
    <v-btn
      color="primary"
      variant="elevated"
      @click="$emit('submit')"
      :loading="loading"
    >
      Salvar
    </v-btn>
  </v-card-actions>
</template>

<script setup lang="ts">
interface Props {
  loading: boolean
}

interface Emits {
  (e: 'cancel'): void
  (e: 'submit'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>
