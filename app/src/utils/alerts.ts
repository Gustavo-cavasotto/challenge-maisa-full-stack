import Swal from 'sweetalert2'

export function ErrorAlert(title: string, message: string) {
  return Swal.fire({
    icon: 'error',
    title: title,
    text: message,
    background: 'RGB(217,83,79)',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
  })
}

export function SuccessAlert(title: string, message: string) {
  return Swal.fire({
    icon: 'success',
    title: title,
    text: message,
    background: 'RGB(22,163,74)',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
  })
}

export function WarningAlert(title: string, message: string) {
  return Swal.fire({
    icon: 'warning',
    title: title,
    text: message,
    background: 'RGB(245,158,11)',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
  })
}

export function InfoAlert(title: string, message: string) {
  return Swal.fire({
    icon: 'info',
    title: title,
    text: message,
    background: 'RGB(59,130,246)',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
  })
}

export function ConfirmDeleteAlert(title: string, message: string) {
  return Swal.fire({
    title: title,
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sim, excluir!',
    cancelButtonText: 'Cancelar',
    background: '#fff',
    customClass: {
      popup: 'swal2-popup-custom'
    }
  })
}

export function ConfirmAlert(title: string, message: string, confirmText: string = 'Confirmar', cancelText: string = 'Cancelar') {
  return Swal.fire({
    title: title,
    text: message,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#6c757d',
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    background: '#fff',
    customClass: {
      popup: 'swal2-popup-custom'
    }
  })
}

export function LoadingAlert(title: string = 'Carregando...') {
  return Swal.fire({
    title: title,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading()
    }
  })
}

export function CloseLoadingAlert() {
  Swal.close()
}
