export async function copy(str: string) {
  try {
    await navigator.clipboard.writeText(str)
    return str
  }
  catch (error) {
    return String(error)
  }
}
