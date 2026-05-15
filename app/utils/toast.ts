export const toastSuccessStyle = {
  '--normal-bg':
    'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
  '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
  '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))',
}

export const toastErrorStyle = {
  '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
  '--normal-text': 'var(--destructive)',
  '--normal-border': 'var(--destructive)',
}
