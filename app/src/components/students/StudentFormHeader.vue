<template>
  <v-card-title class="text-center py-4 bg-grey-lighten-1">
    <h2 class="text-h6 font-weight-bold">
      {{ isEdit ? 'Editar Aluno' : 'Cadastro de Aluno' }}
    </h2>
  </v-card-title>
</template>

<script setup lang="ts">
interface Props {
  isEdit: boolean
}

defineProps<Props>()
</script>

<style scoped>
.v-card-title {
  border-bottom: 1px solid #e0e0e0;
}
</style>
