<template>
  <v-text-field
    v-model="formData.email"
    label="E-mail"
    type="email"
    :rules="emailRules"
    variant="outlined"
    prepend-inner-icon="mdi-email"
    class="mb-4"
    required
  />

  <v-text-field
    v-model="formData.password"
    label="Senha"
    :type="showPassword ? 'text' : 'password'"
    :rules="passwordRules"
    variant="outlined"
    prepend-inner-icon="mdi-lock"
    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    @click:append-inner="$emit('toggle-password')"
    class="mb-6"
    required
  />
</template>

<script setup lang="ts">
interface Props {
  formData: any
  emailRules: Array<(value: string) => boolean | string>
  passwordRules: Array<(value: string) => boolean | string>
  showPassword: boolean
}

interface Emits {
  (e: 'toggle-password'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>
