import ColorHash from 'color-hash'

const colorHash = new ColorHash({
  lightness: 0.5,
  saturation: 0.6,
})

export function useColors() {
  function getColorFromString(value: string): string {
    return colorHash.hex(value)
  }

  return { getColorFromString }
}
