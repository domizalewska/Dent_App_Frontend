import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  window.Pusher = Pusher

  const port = Number(config.public.reverbPort)
  const tls = config.public.reverbScheme === 'https'

  const echo = new Echo({
    broadcaster: 'reverb',
    key: config.public.reverbKey,
    wsHost: config.public.reverbHost,
    wsPort: tls ? 443 : port,
    wssPort: tls ? port : 443,
    forceTLS: tls,
    enabledTransports: tls ? ['wss'] : ['ws'],
    disableStats: true,
  })

  return {
    provide: { echo },
  }
})
