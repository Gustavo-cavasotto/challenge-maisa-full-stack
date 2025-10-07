<template>
  <v-app>
    <v-main>
      <v-container fluid class="fill-height">
        <v-row justify="center" align="center" class="fill-height">
          <v-col cols="12" sm="8" md="6" lg="4">
            <v-card elevation="8" class="pa-6">
              <v-card-title class="text-center mb-6">
                <h2 class="text-h4 font-weight-bold">Login</h2>
                <p class="text-subtitle-1 text-grey-darken-1 mt-2">Sistema de Gestão de Alunos</p>
              </v-card-title>

              <v-form @submit.prevent="handleLogin" ref="form">
                <LoginFormFields
                  :form-data="loginData"
                  :email-rules="emailRules"
                  :password-rules="passwordRules"
                  :show-password="showPassword"
                  @toggle-password="showPassword = !showPassword"
                />

                <LoginFormActions
                  :loading="loading"
                  :error="error"
                />
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { authApi } from '@/services/api'
import type { LoginData } from '@/types/admin'
import { ErrorAlert, SuccessAlert } from '@/utils/alerts'
import { LoginFormFields, LoginFormActions } from '@/components/auth'

const form = ref()
const loading = ref(false)
const error = ref('')
const showPassword = ref(false)

const loginData = reactive<LoginData>({
  email: '',
  password: ''
})

const emailRules = [
  (v: string) => !!v || 'E-mail é obrigatório',
  (v: string) => /.+@.+\..+/.test(v) || 'E-mail deve ser válido'
]

const passwordRules = [
  (v: string) => !!v || 'Senha é obrigatória',
  (v: string) => v.length >= 3 || 'Senha deve ter pelo menos 3 caracteres'
]

const handleLogin = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return

  loading.value = true
  error.value = ''

  try {
    const response = await authApi.login(loginData)

    if (response.data.status === 200) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      
      SuccessAlert('Sucesso!', 'Login realizado com sucesso')
    window.location.reload()
      
    } else {
      error.value = response.data.message || 'Erro ao fazer login'
      ErrorAlert('Erro', error.value)
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Erro de conexão'
    ErrorAlert('Erro', error.value)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
