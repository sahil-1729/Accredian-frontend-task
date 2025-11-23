import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import useAppStore from '../../../store/useAppStore'
import { generateUIFromPrompt, logPromptSubmission } from '../../../services/promptGenerationService'
import GenerationParameters from '../components/GenerationParameters'
import PresetSuggestions from '../components/PresetSuggestions'
import GeneratedPreview from '../components/GeneratedPreview'

const PromptGenerator = () => {
  const navigate = useNavigate()
  const { promptGenerator, setPromptGenerator, setToast, appendVisualNodes } = useAppStore((state) => ({
    promptGenerator: state.promptGenerator,
    setPromptGenerator: state.setPromptGenerator,
    setToast: state.setToast,
    appendVisualNodes: state.appendVisualNodes,
  }))

  const [isGenerating, setIsGenerating] = useState(false)

  const handlePromptChange = (event) => {
    setPromptGenerator({ activePrompt: event.target.value })
  }

  const handleParametersChange = (newParams) => {
    setPromptGenerator({ parameters: newParams })
  }

  const handlePresetSelect = (prompt) => {
    setPromptGenerator({ activePrompt: prompt })
  }

  const handleGenerate = useCallback(async () => {
    if (!promptGenerator.activePrompt.trim()) {
      setToast('Please enter a prompt', 'warning')
      return
    }

    setIsGenerating(true)
    setPromptGenerator({ generationStatus: 'loading', generationError: null })

    try {
      logPromptSubmission(promptGenerator.activePrompt, {
        layout: promptGenerator.parameters.layout,
        fidelity: promptGenerator.parameters.fidelity,
      })

      const response = await generateUIFromPrompt(
        promptGenerator.activePrompt,
        promptGenerator.parameters,
      )

      setPromptGenerator({
        generatedSchema: response,
        generationStatus: 'success',
        lastRunAt: new Date().toISOString(),
        history: [promptGenerator.activePrompt, ...promptGenerator.history].slice(0, 10),
      })

      setToast('UI generated successfully', 'success')
    } catch (error) {
      console.error('Generation error:', error)
      setPromptGenerator({
        generationError: error.message,
        generationStatus: 'error',
      })
      setToast(error.message, 'error')
    } finally {
      setIsGenerating(false)
    }
  }, [promptGenerator.activePrompt, promptGenerator.parameters, promptGenerator.history, setPromptGenerator, setToast])

  const handleLoadToEditor = useCallback(() => {
    const nodesToAdd = promptGenerator.generatedSchema?.nodes || []
    if (!nodesToAdd.length) {
      setToast('Nothing to load yet. Generate a schema first.', 'info')
      return
    }

    appendVisualNodes(nodesToAdd)

    setToast('Components loaded into editor', 'success')
    navigate('/editor')
  }, [appendVisualNodes, navigate, promptGenerator.generatedSchema, setToast])

  const handleSavePrompt = () => {
    if (!promptGenerator.activePrompt) return
    setPromptGenerator({
      history: [promptGenerator.activePrompt, ...promptGenerator.history].slice(0, 10),
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
          Describe your UI and let AI synthesize components for the visual editor.
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Enter your prompt
              </Typography>
              <TextField
                fullWidth
                multiline
                minRows={4}
                placeholder="Describe the experience you want to assemble..."
                value={promptGenerator.activePrompt}
                onChange={handlePromptChange}
                disabled={isGenerating}
              />
            </Box>

            <GenerationParameters
              parameters={promptGenerator.parameters}
              onParametersChange={handleParametersChange}
            />

            <PresetSuggestions onSelect={handlePresetSelect} />
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end', px: 3, pb: 3, gap: 1 }}>
          <Button
            variant="outlined"
            onClick={handleSavePrompt}
            disabled={isGenerating || !promptGenerator.activePrompt}
          >
            Save prompt
          </Button>
          <Button
            variant="contained"
            startIcon={isGenerating ? <CircularProgress size={20} /> : <BoltRoundedIcon />}
            onClick={handleGenerate}
            disabled={isGenerating || !promptGenerator.activePrompt.trim()}
          >
            {isGenerating ? 'Generating...' : 'Generate UI'}
          </Button>
        </CardActions>
      </Card>

      {promptGenerator.generatedSchema && (
        <GeneratedPreview
          schema={promptGenerator.generatedSchema}
          onLoadToEditor={handleLoadToEditor}
        />
      )}

      {promptGenerator.history.length > 0 && (
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="subtitle2" color="text.secondary">
                Prompt history
              </Typography>
              {promptGenerator.history.map((prompt, index) => (
                <Box
                  key={`${prompt}-${index}`}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    p: 2,
                    backgroundColor: 'background.default',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      borderColor: 'primary.main',
                    },
                  }}
                  onClick={() => setPromptGenerator({ activePrompt: prompt })}
                  role="button"
                  tabIndex={0}
                >
                  <Typography variant="body2">{prompt}</Typography>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      )}
    </Stack>
  )
}

export default PromptGenerator
