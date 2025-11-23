import PropTypes from 'prop-types'
import { Box, Button, Card, CardActions, CardContent, Chip, Stack, Typography } from '@mui/material'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'

const GeneratedPreview = ({ schema, onLoadToEditor }) => {
  if (!schema) {
    return null
  }

  const nodeCount = schema.nodes?.length || 0
  const componentTypes = schema.nodes?.map((node) => node.type).filter(Boolean) || []
  const uniqueTypes = [...new Set(componentTypes)]

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Generated Components
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {nodeCount} component{nodeCount !== 1 ? 's' : ''} ready for the editor
            </Typography>
          </Box>

          {uniqueTypes.length > 0 && (
            <Box>
              <Typography variant="caption" color="text.secondary">
                Component types
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
                {uniqueTypes.map((type) => (
                  <Chip key={type} label={type} variant="outlined" size="small" />
                ))}
              </Stack>
            </Box>
          )}

          {schema.metadata && (
            <Box>
              <Typography variant="caption" color="text.secondary">
                Metadata
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5, fontFamily: 'monospace', fontSize: '0.75rem' }}>
                {JSON.stringify(schema.metadata, null, 2).split('\n').slice(0, 3).join('\n')}
                {JSON.stringify(schema.metadata, null, 2).split('\n').length > 3 && '...'}
              </Typography>
            </Box>
          )}
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', px: 3, pb: 3 }}>
        <Button variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={onLoadToEditor}>
          Continue in Editor
        </Button>
      </CardActions>
    </Card>
  )
}

GeneratedPreview.propTypes = {
  schema: PropTypes.shape({
    nodes: PropTypes.array,
    metadata: PropTypes.object,
  }),
  onLoadToEditor: PropTypes.func.isRequired,
}

export default GeneratedPreview
