import PropTypes from 'prop-types'
import { Box, Button, Stack, Typography } from '@mui/material'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'

const presets = [
  {
    label: 'Simple Form',
    prompt: 'Create a simple registration form with email and password fields, a submit button, and a sign-in link at the bottom.',
  },
  {
    label: 'Product Card',
    prompt: 'Design a product card component showing an image placeholder, product title, price, star rating, and a buy button.',
  },
  {
    label: 'Dashboard Header',
    prompt: 'Build a dashboard header with a title, subtitle, date range selector, and action buttons for export and settings.',
  },
  {
    label: 'User Profile',
    prompt: 'Create a user profile card with avatar, name, bio, follow button, and social media links.',
  },
]

const PresetSuggestions = ({ onSelect }) => {
  return (
    <Box>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
        <LightbulbOutlinedIcon fontSize="small" color="action" />
        <Typography variant="subtitle2" color="text.secondary">
          Quick start with presets
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {presets.map((preset) => (
          <Button
            key={preset.label}
            variant="outlined"
            size="small"
            onClick={() => onSelect(preset.prompt)}
            sx={{ textTransform: 'capitalize' }}
          >
            {preset.label}
          </Button>
        ))}
      </Stack>
    </Box>
  )
}

PresetSuggestions.propTypes = {
  onSelect: PropTypes.func.isRequired,
}

export default PresetSuggestions
