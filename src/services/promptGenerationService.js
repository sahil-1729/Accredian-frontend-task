import apiClient from './apiClient'

export const generateUIFromPrompt = async (prompt, parameters = {}) => {
  const payload = {
    prompt,
    layout: parameters.layout || 'grid',
    fidelity: parameters.fidelity || 'high',
  }

  try {
    const response = await apiClient.post('/generate', payload)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to generate UI')
  }
}

export const logPromptSubmission = (prompt, metadata = {}) => {
  if (import.meta.env.DEV) {
    console.log('Prompt submitted:', {
      prompt,
      timestamp: new Date().toISOString(),
      ...metadata,
    })
  }

  try {
    apiClient.post('/telemetry/prompt-submission', {
      prompt,
      metadata,
      timestamp: new Date().toISOString(),
    }).catch((error) => {
      if (import.meta.env.DEV) {
        console.warn('Failed to log telemetry:', error)
      }
    })
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('Telemetry error:', error)
    }
  }
}
