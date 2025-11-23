import PropTypes from 'prop-types'
import { Box, FormControl, InputLabel, MenuItem, Select, Slider, Stack, Typography } from '@mui/material'

const fidelityLevels = [
  { value: 'low', label: 'Low (Quick)' },
  { value: 'medium', label: 'Medium (Balanced)' },
  { value: 'high', label: 'High (Detailed)' },
]

const layoutOptions = [
  { value: 'grid', label: 'Grid' },
  { value: 'flex', label: 'Flex' },
  { value: 'stack', label: 'Stack' },
]

const GenerationParameters = ({ parameters, onParametersChange }) => {
  const handleFidelityChange = (event, newValue) => {
    const fidelityMap = { 1: 'low', 2: 'medium', 3: 'high' }
    onParametersChange({ ...parameters, fidelity: fidelityMap[newValue] })
  }

  const handleLayoutChange = (event) => {
    onParametersChange({ ...parameters, layout: event.target.value })
  }

  const fidelityValue = { low: 1, medium: 2, high: 3 }[parameters.fidelity] || 2

  return (
    <Box sx={{ p: 2, backgroundColor: 'background.default', borderRadius: 2 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Layout
          </Typography>
          <FormControl fullWidth size="small">
            <InputLabel>Layout Type</InputLabel>
            <Select
              label="Layout Type"
              value={parameters.layout}
              onChange={handleLayoutChange}
            >
              {layoutOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Fidelity: {fidelityLevels.find((l) => l.value === parameters.fidelity)?.label}
          </Typography>
          <Slider
            value={fidelityValue}
            onChange={handleFidelityChange}
            min={1}
            max={3}
            step={1}
            marks={[
              { value: 1, label: 'Low' },
              { value: 2, label: 'Medium' },
              { value: 3, label: 'High' },
            ]}
            valueLabelDisplay="off"
          />
        </Box>
      </Stack>
    </Box>
  )
}

GenerationParameters.propTypes = {
  parameters: PropTypes.shape({
    layout: PropTypes.string,
    fidelity: PropTypes.string,
  }).isRequired,
  onParametersChange: PropTypes.func.isRequired,
}

export default GenerationParameters
