export default defineAppConfig({
  app: {
    name: 'Dent App',
    description: 'Frontend aplikacji dentystycznej',
  },

  ui: {
    radius: 'md',
    theme: 'light',
  },

  layout: {
    default: 'default',
  },

  features: {
    darkMode: true,
    appointments: true,
    patients: true,
  },

  api: {
    timeout: 5000,
  },
});
