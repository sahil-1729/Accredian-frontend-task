import { Box, Button, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 360 }}>
      <Stack spacing={2} alignItems="center" textAlign="center">
        <Typography variant="h3" fontWeight={700}>
          404
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We could not find the view you were looking for.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/editor')}>
          Back to editor
        </Button>
      </Stack>
    </Box>
  )
}

export default NotFound
