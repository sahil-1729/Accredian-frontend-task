import PropTypes from 'prop-types'
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import TuneRoundedIcon from '@mui/icons-material/TuneRounded'

const textVariants = ['h2', 'h3', 'h4', 'h5', 'subtitle1', 'body1', 'body2', 'overline']
const buttonVariants = ['contained', 'outlined', 'text']
const layoutNodeTypes = ['artboard', 'section', 'stack', 'card']
const alignOptions = [
  { label: 'Start', value: 'flex-start' },
  { label: 'Center', value: 'center' },
  { label: 'End', value: 'flex-end' },
  { label: 'Stretch', value: 'stretch' },
]
const justifyOptions = [
  { label: 'Start', value: 'flex-start' },
  { label: 'Center', value: 'center' },
  { label: 'End', value: 'flex-end' },
  { label: 'Space-between', value: 'space-between' },
  { label: 'Space-around', value: 'space-around' },
]

const numberValue = (value) => (typeof value === 'number' || value === 0 ? value : '')

const PropertiesPanel = ({ node, onUpdateProps, onUpdateMeta }) => {
  if (!node) {
    return (
      <Card>
        <CardContent sx={{ py: 10 }}>
          <Stack spacing={1} alignItems="center">
            <TuneRoundedIcon color="disabled" />
            <Typography variant="body2" color="text.secondary">
              Select a layer on the canvas to edit its properties.
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    )
  }

  const layerProps = node.props || {}
  const isLayoutNode = layoutNodeTypes.includes(node.type)

  const handleNumberChange = (key) => (event) => {
    const value = event.target.value
    onUpdateProps({ [key]: value === '' ? undefined : Number(value) })
  }

  const handleTextChange = (key) => (event) => {
    onUpdateProps({ [key]: event.target.value })
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Properties
          </Typography>
          <Typography variant="h6">{node.label || node.type}</Typography>
          <Typography variant="caption" color="text.disabled">
            {node.type}
          </Typography>
        </Box>

        <Stack spacing={2}>
          <TextField
            label="Layer label"
            value={node.label || ''}
            onChange={(event) => onUpdateMeta({ label: event.target.value })}
            fullWidth
          />

          {node.type === 'text' && (
            <>
              <TextField
                label="Copy"
                multiline
                minRows={2}
                value={layerProps.text || ''}
                onChange={handleTextChange('text')}
                fullWidth
              />
              <TextField
                select
                label="Variant"
                value={layerProps.variant || 'body1'}
                onChange={handleTextChange('variant')}
                fullWidth
              >
                {textVariants.map((variant) => (
                  <MenuItem key={variant} value={variant}>
                    {variant}
                  </MenuItem>
                ))}
              </TextField>
            </>
          )}

          {node.type === 'button' && (
            <>
              <TextField
                label="Label"
                value={layerProps.text || ''}
                onChange={handleTextChange('text')}
                fullWidth
              />
              <TextField
                select
                label="Variant"
                value={layerProps.variant || 'contained'}
                onChange={handleTextChange('variant')}
                fullWidth
              >
                {buttonVariants.map((variant) => (
                  <MenuItem key={variant} value={variant}>
                    {variant}
                  </MenuItem>
                ))}
              </TextField>
            </>
          )}

          {node.type === 'metric' && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label="Label" value={layerProps.label || ''} onChange={handleTextChange('label')} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Value" value={layerProps.value || ''} onChange={handleTextChange('value')} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Suffix"
                  value={layerProps.suffix || ''}
                  onChange={handleTextChange('suffix')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Trend" value={layerProps.trend || ''} onChange={handleTextChange('trend')} fullWidth />
              </Grid>
            </Grid>
          )}
        </Stack>

        {isLayoutNode && (
          <Stack spacing={2}>
            <Divider flexItem>
              <Typography variant="caption" color="text.secondary">
                Layout
              </Typography>
            </Divider>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Direction"
                  value={layerProps.direction || 'column'}
                  onChange={handleTextChange('direction')}
                  fullWidth
                >
                  <MenuItem value="column">Column</MenuItem>
                  <MenuItem value="row">Row</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Alignment"
                  value={layerProps.align || 'flex-start'}
                  onChange={handleTextChange('align')}
                  fullWidth
                >
                  {alignOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Justify"
                  value={layerProps.justify || 'flex-start'}
                  onChange={handleTextChange('justify')}
                  fullWidth
                >
                  {justifyOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Gap"
                  type="number"
                  inputProps={{ step: 1, min: 0 }}
                  value={numberValue(layerProps.gap)}
                  onChange={handleNumberChange('gap')}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Stack>
        )}

        <Stack spacing={2}>
          <Divider flexItem>
            <Typography variant="caption" color="text.secondary">
              Style
            </Typography>
          </Divider>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Padding (px)"
                type="number"
                inputProps={{ step: 4, min: 0 }}
                value={numberValue(layerProps.padding)}
                onChange={handleNumberChange('padding')}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Radius (px)"
                type="number"
                inputProps={{ step: 2, min: 0 }}
                value={numberValue(layerProps.radius)}
                onChange={handleNumberChange('radius')}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Background"
                value={layerProps.background || ''}
                onChange={handleTextChange('background')}
                placeholder="#FFFFFF"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Text color"
                value={layerProps.color || ''}
                onChange={handleTextChange('color')}
                placeholder="#111827"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Width (px)"
                type="number"
                inputProps={{ step: 10, min: 0 }}
                value={numberValue(layerProps.width)}
                onChange={handleNumberChange('width')}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Height (px)"
                type="number"
                inputProps={{ step: 10, min: 0 }}
                value={numberValue(layerProps.height)}
                onChange={handleNumberChange('height')}
                fullWidth
              />
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  )
}

PropertiesPanel.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    props: PropTypes.object,
  }),
  onUpdateProps: PropTypes.func.isRequired,
  onUpdateMeta: PropTypes.func.isRequired,
}

PropertiesPanel.defaultProps = {
  node: null,
}

export default PropertiesPanel
