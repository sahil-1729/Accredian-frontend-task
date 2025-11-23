import { Alert, Snackbar } from '@mui/material'
import useAppStore from '../../store/useAppStore'

const Toast = () => {
  const { toastMessage, toastSeverity } = useAppStore((state) => ({
    toastMessage: state.ui.toastMessage,
    toastSeverity: state.ui.toastSeverity,
  }))
  const clearToast = useAppStore((state) => state.clearToast)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    clearToast()
  }

  return (
    <Snackbar
      open={!!toastMessage}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        onClose={handleClose}
        severity={toastSeverity}
        sx={{ width: '100%' }}
        variant="filled"
      >
        {toastMessage}
      </Alert>
    </Snackbar>
  )
}

export default Toast
