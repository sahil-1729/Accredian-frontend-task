import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import useAppStore from '../../../store/useAppStore'

const PromptGenerator = () => {
  const { promptGenerator, setPromptGenerator } = useAppStore((state) => ({
    promptGenerator: state.promptGenerator,
    setPromptGenerator: state.setPromptGenerator,
  }))

  const handlePromptChange = (event) => {
    setPromptGenerator({ activePrompt: event.target.value })
  }

  const handleSavePrompt = () => {
    if (!promptGenerator.activePrompt) return
    setPromptGenerator({
      history: [promptGenerator.activePrompt, ...promptGenerator.history],
      activePrompt: '',
      lastRunAt: new Date().toISOString(),
    })
  }

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" fontWeight={700}>
          Prompt Generator
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Capture the product context and synthesize prompts that power the editor.
        </Typography>
      </Box>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="subtitle2" color="text.secondary">
              Active prompt
            </Typography>
            <TextField
              multiline
              minRows={4}
              placeholder="Describe the experience you want to assemble..."
              value={promptGenerator.activePrompt}
              onChange={handlePromptChange}
            />
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end', px: 3, pb: 3 }}>
          <Button variant="contained" startIcon={<BoltRoundedIcon />} onClick={handleSavePrompt}>
            Save prompt
          </Button>
        </CardActions>
      </Card>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="subtitle2" color="text.secondary">
              Recent prompts
            </Typography>
            {promptGenerator.history.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                Saved prompts will appear here for quick iteration.
              </Typography>
            )}
            {promptGenerator.history.map((prompt, index) => (
              <Box
                key={`${prompt}-${index}`}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  p: 2,
                  backgroundColor: 'background.default',
                }}
              >
                <Typography variant="body2">{prompt}</Typography>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}

export default PromptGenerator
