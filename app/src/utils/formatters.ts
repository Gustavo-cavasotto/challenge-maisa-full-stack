export const formatCPF = (cpf: string): string => {
  if (!cpf) return ''
  
  const numbers = cpf.replace(/\D/g, '')
  
  if (numbers.length <= 3) return numbers
  if (numbers.length <= 6) return numbers.replace(/(\d{3})(\d+)/, '$1.$2')
  if (numbers.length <= 9) return numbers.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3')
  return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

export const formatCPFInput = (e: Event, callback: (value: string) => void): void => {
  const target = e.target as HTMLInputElement
  let value = target.value.replace(/\D/g, '')
  if (value.length > 11) value = value.slice(0, 11)
  
  const formatted = formatCPF(value)
  callback(formatted)
}
    
export const formatRAInput = (e: Event, callback: (value: string) => void): void => {
  const target = e.target as HTMLInputElement
  let value = target.value.replace(/\D/g, '')
  if (value.length > 20) value = value.slice(0, 20)
  callback(value)
}

export const unformatCPF = (cpf: string): string => {
  return cpf.replace(/\D/g, '')
}
