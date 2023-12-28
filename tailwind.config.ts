import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
  // darkMode: 'class',
  content: [],
  theme: {
    extend: {
      fontFamily: {
        libreBodoni: ['"Libre Bodoni"', 'serif'],
        bungeeInline: ['"Bungee Inline"', 'cursive']
      },
      container: {
        center: true,
        padding: '1rem',
        width: '1240px',
        screens: {
          xl: '1284px'
        }
      },
      colors: {
        main: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        anchor: 'var(--color-anchor)',
        effects: 'var(--color-effects)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ]
}
