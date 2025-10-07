<template>
  <v-app>
    <v-app-bar color="grey-lighten-1" elevation="0">
      <v-app-bar-title class="d-flex align-center">
        <span class="text-h6 font-weight-bold">Grupo a</span>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn variant="text" prepend-icon="mdi-arrow-left" @click="goBack">Voltar</v-btn>
    </v-app-bar>

    <v-navigation-drawer permanent width="250">
      <v-list>
        <v-list-item class="px-4 py-3">
          <v-list-item-title class="text-h6 font-weight-bold text-grey-darken-2">
            Módulo Acadêmico
          </v-list-item-title>
        </v-list-item>

        <v-list-item class="px-4 py-2" active>
          <v-list-item-title class="text-body-1 font-weight-medium">
            Alunos
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="pa-6">
        <v-card elevation="2">
          <StudentFormHeader :is-edit="isEdit" />

          <v-card-text class="pa-6">
            <v-form ref="form" @submit.prevent="handleSubmit">
              <StudentFormFields
                :form-data="formData"
                :is-edit="isEdit"
                :name-rules="nameRules"
                :email-rules="emailRules"
                :ra-rules="raRules"
                :cpf-rules="cpfRules"
                :format-c-p-f="formatCPF"
                :format-r-a="formatRA"
              />
            </v-form>
          </v-card-text>

          <StudentFormActions
            :loading="loading"
            @cancel="goBack"
            @submit="handleSubmit"
          />
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { studentsApi } from '@/services/api'
import type { CreateStudentData, Student, UpdateStudentData } from '@/types/student'
import { ErrorAlert, SuccessAlert } from '@/utils/alerts'
import { StudentFormHeader, StudentFormFields, StudentFormActions } from '@/components/students'
import { formatCPFInput, formatRAInput, unformatCPF } from '@/utils/formatters'

const form = ref()
const loading = ref(false)

const params = new URLSearchParams(location.hash.split('?')[1] || '')
const idParam = params.get('id')
const isEdit = computed(() => !!idParam)

const formData = reactive<CreateStudentData & { id?: number }>({
  name: '',
  email: '',
  ra: '',
  cpf: ''
})

const nameRules = [
  (v: string) => !!v || 'Nome é obrigatório',
  (v: string) => v.length >= 2 || 'Nome deve ter pelo menos 2 caracteres'
]

const emailRules = [
  (v: string) => !!v || 'E-mail é obrigatório',
  (v: string) => /.+@.+\..+/.test(v) || 'E-mail deve ser válido'
]

const raRules = [
  (v: string) => !!v || 'RA é obrigatório',
  (v: string) => /^[0-9]+$/.test(v) || 'RA deve conter apenas números'
]

const cpfRules = [
  (v: string) => !!v || 'CPF é obrigatório',
  (v: string) => v.replace(/\D/g, '').length === 11 || 'CPF deve ter 11 dígitos'
]

const formatRA = (e: Event) => {
  formatRAInput(e, (value) => {
    formData.ra = value
  })
}

const formatCPF = (e: Event) => {
  formatCPFInput(e, (value) => {
    formData.cpf = value
  })
}

const goBack = () => {
  location.hash = '#/students'
}

const loadStudent = async (id: number) => {
  try {
    const { data } = await studentsApi.getById(id)
    const s: Student = data.student
    formData.id = s.id
    formData.name = s.name
    formData.email = s.email
    formData.ra = s.ra
    formData.cpf = s.cpf
  } catch (err: any) {
    ErrorAlert('Erro', err.response?.data?.message || 'Não foi possível carregar o aluno')
  }
}

const handleSubmit = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return
  loading.value = true

  try {
    if (isEdit.value) {
      const updateData: UpdateStudentData = { id: formData.id!, name: formData.name, email: formData.email }
      await studentsApi.update(formData.id!, updateData)
      SuccessAlert('Sucesso!', 'Aluno atualizado com sucesso')
    } else {
      const createData: CreateStudentData = { name: formData.name, email: formData.email, ra: formData.ra, cpf: unformatCPF(formData.cpf) }
      await studentsApi.create(createData)
      SuccessAlert('Sucesso!', 'Aluno criado com sucesso')
    }
    goBack()
  } catch (err: any) {
    ErrorAlert('Erro', err.response?.data?.message || 'Falha ao salvar aluno')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (idParam) loadStudent(Number(idParam))
})
</script>

<style scoped>
.v-navigation-drawer {
  border-right: 1px solid #e0e0e0;
}
</style>


