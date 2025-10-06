<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Login from './views/Login.vue'
import StudentsList from './views/StudentsList.vue'
import StudentSave from './views/StudentSave.vue'

const currentView = ref('login')
const routes: Record<string, any> = {
  login: Login,
  students: StudentsList,
  'student-save': StudentSave
}

const checkAuth = () => {
  const token = localStorage.getItem('token')
  if (token) {
    currentView.value = handleHashChange()
  } else {
    currentView.value = 'login'
  }
}

const handleHashChange = () => {
  const raw = location.hash.replace('#/', '')
  const hash = raw.split('?')[0] // suporta parâmetros, ex: student-save?id=1
  if (hash && routes[hash]) return hash
  return 'students'
}

onMounted(() => {
  checkAuth()
  window.addEventListener('hashchange', () => {
    if (currentView.value !== 'login') {
      currentView.value = handleHashChange()
    }
  })
})


;(window as any).checkAuth = checkAuth
</script>

<template>
  <div>
    <Login v-if="currentView === 'login'" />
    <component :is="routes[currentView] || StudentsList" v-else />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  font-family: 'Roboto', sans-serif;
}
</style>
