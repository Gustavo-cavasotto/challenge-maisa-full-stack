<template>
  <v-app>
    <!-- Header -->
    <v-app-bar color="grey-lighten-1" elevation="0">
      <v-app-bar-title class="d-flex align-center">
        <span class="text-h6 font-weight-bold">Grupo a</span>
      </v-app-bar-title>
      
      <v-spacer></v-spacer>
      
      <v-btn
        color="error"
        variant="text"
        @click="handleLogout"
        prepend-icon="mdi-logout"
      >
        Sair
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer permanent width="250">
      <!-- Módulo Acadêmico -->
      <v-list>
        <v-list-item class="px-4 py-3">
          <v-list-item-title class="text-h6 font-weight-bold text-grey-darken-2">
            Módulo Acadêmico
          </v-list-item-title>
        </v-list-item>
        
        <!-- Alunos -->
        <v-list-item class="px-4 py-2" active>
          <v-list-item-title class="text-body-1 font-weight-medium">
            Alunos
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-container fluid class="pa-6">
        <!-- Title -->
        <v-card class="mb-6" color="grey-lighten-1" elevation="0">
          <v-card-title class="text-center py-4">
            <h1 class="text-h5 font-weight-bold">Consulta de alunos</h1>
          </v-card-title>
        </v-card>

        <!-- Search and Actions -->
        <v-card class="mb-6" elevation="2">
          <v-card-text class="pa-4">
            <v-row>
              <v-col cols="12" md="8">
                <v-text-field
                  v-model="search"
                  label="Digite sua busca"
                  variant="outlined"
                  prepend-inner-icon="mdi-magnify"
                  clearable
                  @click:clear="handleClearSearch"
                  @keyup.enter="handleSearch"
                />
              </v-col>
              <v-col cols="12" md="4" class="d-flex align-center">
                <v-btn
                  color="primary"
                  variant="elevated"
                  @click="handleSearch"
                  class="mr-2"
                >
                  Pesquisar
                </v-btn>
                <v-btn
                  v-if="isAdmin"
                  color="primary"
                  variant="elevated"
                  @click="goToCreate"
                  prepend-icon="mdi-plus"
                >
                  Cadastrar Aluno
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Students Table -->
        <v-card elevation="2">
          <v-data-table
            :headers="headers"
            :items="students"
            :loading="loading"
            class="elevation-0"
            no-data-text="Nenhum aluno encontrado"
            loading-text="Carregando alunos..."
            hide-default-footer
          >
            <template v-slot:item.cpf="{ item }">
              {{ formatCPF(item.cpf) }}
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn
                v-if="isAdmin"
                color="primary"
                variant="text"
                size="small"
                @click="editStudent(item)"
                prepend-icon="mdi-pencil"
              >
                Editar
              </v-btn>
              <v-btn
                v-if="isAdmin"
                color="error"
                variant="text"
                size="small"
                @click="deleteStudent(item)"
                prepend-icon="mdi-delete"
              >
                Excluir
              </v-btn>
              <span v-if="!isAdmin" class="text-grey text-caption">
                Sem permissão
              </span>
            </template>
          </v-data-table>
          
          <!-- Controles de Paginação -->
          <v-card-actions class="justify-space-between">
            <div class="d-flex align-center">
              <span class="text-body-2 mr-4">
                Mostrando {{ students.length }} de {{ pagination.total }} alunos
              </span>
              <v-select
                v-model="pagination.limit"
                :items="[5, 10, 20, 50]"
                label="Por página"
                variant="outlined"
                density="compact"
                style="max-width: 120px"
                @update:model-value="changeLimit"
              />
            </div>
            
            <div class="d-flex align-center">
              <v-btn
                :disabled="!hasPrev"
                @click="prevPage"
                variant="text"
                size="small"
                prepend-icon="mdi-chevron-left"
              >
                Anterior
              </v-btn>
              
              <div class="mx-2">
                <span class="text-body-2">
                  Página {{ currentPage }} de {{ totalPages }}
                </span>
              </div>
              
              <v-btn
                :disabled="!hasNext"
                @click="nextPage"
                variant="text"
                size="small"
                append-icon="mdi-chevron-right"
              >
                Próxima
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>

      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { studentsApi } from '@/services/api'
import type { Student } from '@/types/student'
import type { PaginationParams, PaginationInfo } from '@/types/pagination'
import { ErrorAlert, SuccessAlert, ConfirmDeleteAlert, LoadingAlert, CloseLoadingAlert } from '@/utils/alerts'
import { formatCPF } from '@/utils/formatters'
import { isUserAdmin, clearAuth } from '@/utils/auth'

const isAdmin = computed(() => isUserAdmin())

const students = ref<Student[]>([])
const loading = ref(false)
const search = ref('')

// Paginação
const pagination = ref<PaginationInfo>({
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
  hasNext: false,
  hasPrev: false
})

const currentPage = computed(() => pagination.value.page)
const totalPages = computed(() => pagination.value.totalPages)
const hasNext = computed(() => pagination.value.hasNext)
const hasPrev = computed(() => pagination.value.hasPrev)

const headers = [
  { title: 'Registro Acadêmico', key: 'ra', sortable: true },
  { title: 'Nome', key: 'name', sortable: true },
  { title: 'E-mail', key: 'email', sortable: true },
  { title: 'CPF', key: 'cpf', sortable: true },
  { title: 'Ações', key: 'actions', sortable: false }
]

const loadStudents = async (page = 1, showLoading = false) => {
  loading.value = true
  
  try {
    const params: PaginationParams = {
      page,
      limit: pagination.value.limit,
      search: search.value || undefined
    }
    
    const response = await studentsApi.getAll(params)
    students.value = response.data.data
    pagination.value = response.data.pagination
  } catch (error: any) {
    ErrorAlert('Erro!', error.response.data.message)
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  loadStudents(1, true)
}

const handleClearSearch = () => {
  search.value = ''
  loadStudents(1, true)
}

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    loadStudents(page, true)
  }
}

const nextPage = () => {
  if (hasNext.value) {
    goToPage(currentPage.value + 1)
  }
}

const prevPage = () => {
  if (hasPrev.value) {
    goToPage(currentPage.value - 1)
  }
}

const changeLimit = (newLimit: number) => {
  pagination.value.limit = newLimit
  loadStudents(1, true) 
}

const goToCreate = () => {
  location.hash = '#/student-save'
}

const editStudent = (student: Student) => {
  location.hash = `#/student-save?id=${student.id}`
}

const deleteStudent = async (student: Student) => {
  const result = await ConfirmDeleteAlert(
    'Excluir Aluno',
    `Tem certeza que deseja excluir o aluno ${student.name}?`
  )
  
  if (result.isConfirmed) {
    try {
      await studentsApi.delete(student.id)
      SuccessAlert('Sucesso!', 'Aluno excluído com sucesso')
      await loadStudents()
    } catch (error: any) {
      ErrorAlert('Erro!', error.response.data.message)
    }
  }
}

const handleLogout = () => {
  clearAuth()
  window.location.reload()
}

onMounted(() => {
  loadStudents(1, true)
})
</script>

<style scoped>
.v-navigation-drawer {
  border-right: 1px solid #e0e0e0;
}
</style>
