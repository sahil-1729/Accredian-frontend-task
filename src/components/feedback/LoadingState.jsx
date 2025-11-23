import PropTypes from 'prop-types'
import { Box, CircularProgress, Stack, Typography } from '@mui/material'

const LoadingState = ({ message = 'Loading...' }) => (
  <Box sx={{ textAlign: 'center' }}>
    <Stack spacing={2} alignItems="center">
      <CircularProgress color="primary" thickness={5} />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Stack>
  </Box>
)

LoadingState.propTypes = {
  message: PropTypes.string,
}

export default LoadingState
