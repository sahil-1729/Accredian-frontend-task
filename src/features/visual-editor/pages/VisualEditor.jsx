import { useMemo } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import useAppStore from '../../../store/useAppStore'

const VisualEditor = () => {
  const { visualEditor, setVisualEditor } = useAppStore((state) => ({
    visualEditor: state.visualEditor,
    setVisualEditor: state.setVisualEditor,
  }))

  const insights = useMemo(
    () => [
      { label: 'Layers', value: visualEditor.nodes.length },
      { label: 'Selection', value: visualEditor.selectedNodeId ? 'Active' : 'None' },
      { label: 'Clipboard', value: visualEditor.clipboard ? 'Ready' : 'Empty' },
    ],
    [visualEditor],
  )

  const handleAddNode = () => {
    const id = `node-${Date.now()}`
    const nextNode = { id, label: `Layer ${visualEditor.nodes.length + 1}`, createdAt: new Date().toISOString() }
    setVisualEditor({
      nodes: [...visualEditor.nodes, nextNode],
      selectedNodeId: id,
    })
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Visual Editor
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Drag, drop, and orchestrate UI primitives for the product experience shell.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={handleAddNode}>
          Add layer
        </Button>
      </Stack>
      <Grid container spacing={2}>
        {insights.map((insight) => (
          <Grid item xs={12} sm={4} key={insight.label}>
            <Card>
              <CardContent>
                <Typography variant="overline" color="text.secondary">
                  {insight.label}
                </Typography>
                <Typography variant="h5" fontWeight={700}>
                  {insight.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Card sx={{ minHeight: 320 }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="subtitle1" fontWeight={600}>
              Canvas layers
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {visualEditor.nodes.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  No layers yet. Use “Add layer” to seed the canvas.
                </Typography>
              )}
              {visualEditor.nodes.map((node) => (
                <Chip
                  key={node.id}
                  label={node.label}
                  color={node.id === visualEditor.selectedNodeId ? 'primary' : 'default'}
                  onClick={() => setVisualEditor({ selectedNodeId: node.id })}
                />
              ))}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}

export default VisualEditor
