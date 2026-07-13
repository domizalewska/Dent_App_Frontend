import ColorHash from 'color-hash'

const colorHash = new ColorHash({
  lightness: 0.5,
  saturation: 0.6,
})

export function useColors() {
  function getColorFromString(value: string): string {
    return colorHash.hex(value)
  }

  function getColorWithAlpha(value: string, alpha: number): string {
    const [r, g, b] = colorHash.rgb(value)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  return { getColorFromString, getColorWithAlpha }
}
