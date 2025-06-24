export const withApiErrorHandling = async <T>(
  fn: () => Promise<T>,
  context: string
): Promise<T> => {
  try {
    return await fn()
  } catch (error) {
    console.error(`[${context}]`, error)

    // можно вставить devToast(`[${context}] ошибка запроса`)
    // или logErrorToSentry({ error, context })

    throw new Error(`Ошибка в ${context}`)
  }
}
