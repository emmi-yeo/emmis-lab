// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // 🌞 Light Mode Palette
        light: {
          bg: '#E9EBEC',             // page background
          box: '#FFFFFF',            // card / box background
          extra: '#D7D7D7',          // dividers / subtle accents
          hover: '#FBD144',          // hover yellow
          accent: '#FBD144',         // same as hover (for consistency)
          border: '#575757',         // border
          text: {
            primary: '#19191B',      // headings
            secondary: '#3D3D3D',    // subheadings
            tertiary: '#575757',     // body / muted
          },
        },

        // 🌙 Dark Mode Palette
        dark: {
          bg: '#0C151D',             // page background
          box: '#171F26',            // card / box background
          extra: '#0C151D',          // accent background
          hover: '#FFE071',          // hover yellow
          accent: '#FFE071',         // accent highlight
          border: '#A3ABB2',         // border
          text: {
            primary: '#F1F2F4',      // headings
            secondary: '#A3ABB2',    // subheadings
            tertiary: '#A3ABB2',     // body / muted
          },
        },
      },

      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },

      fontSize: {
        // Consistent typography scale across site
        'title-lg': ['2.25rem', { lineHeight: '2.75rem', fontWeight: '700' }], // ≈36px
        'title-xl': ['3rem', { lineHeight: '3.5rem', fontWeight: '700' }],     // ≈48px (hero)
        'subtitle': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '600' }], // ≈18px
        'body': ['0.95rem', { lineHeight: '1.6rem', fontWeight: '400' }],      // ≈15px
        'small': ['0.85rem', { lineHeight: '1.4rem', fontWeight: '400' }],     // ≈13.6px
      },

      boxShadow: {
        subtle: '0 2px 6px rgba(0, 0, 0, 0.05)',
        card: '0 4px 10px rgba(0, 0, 0, 0.08)',
        'card-dark': '0 4px 10px rgba(0, 0, 0, 0.3)',
      },

      borderRadius: {
        xl: '0.75rem', // for rounded-xl cards
      },

      transitionDuration: {
        300: '300ms',
      },
    },
  },
  plugins: [],
};
