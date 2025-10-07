<template>
  <v-row>
    <v-col cols="12">
      <v-text-field
        v-model="formData.name"
        label="Nome"
        placeholder="Informe o nome completo"
        :rules="nameRules"
        variant="outlined"
        required
      />
    </v-col>

    <v-col cols="12">
      <v-text-field
        v-model="formData.email"
        label="E-mail"
        placeholder="Informe apenas um e-mail"
        :rules="emailRules"
        variant="outlined"
        type="email"
        required
      />
    </v-col>

    <v-col cols="12" v-if="!isEdit">
      <v-text-field
        v-model="formData.ra"
        label="RA"
        placeholder="Informe o registro acadêmico"
        :rules="raRules"
        variant="outlined"
        maxlength="20"
        @input="formatRA"
        required
      />
    </v-col>

    <v-col cols="12" v-if="!isEdit">
      <v-text-field
        v-model="formData.cpf"
        label="CPF"
        placeholder="Informe o número do documento"
        :rules="cpfRules"
        variant="outlined"
        @input="formatCPF"
        required
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
interface Props {
  formData: any
  isEdit: boolean
  nameRules: Array<(value: string) => boolean | string>
  emailRules: Array<(value: string) => boolean | string>
  raRules: Array<(value: string) => boolean | string>
  cpfRules: Array<(value: string) => boolean | string>
  formatCPF: (event: Event) => void
  formatRA: (event: Event) => void
}

defineProps<Props>()
</script>
