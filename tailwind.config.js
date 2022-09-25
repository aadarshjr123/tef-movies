module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",'./node_modules/tw-elements/dist/js/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        RobotoMono: ["Roboto Mono", "monospace"],
      },
      boxShadow: {
        '3xl': '0 0 20px 10px rgba(0, 0, 0, 1)',
      },
      colors: {
        hotstar: '#131A27',
      },
      
      width: {
        '150': '30rem',
        '200': '32rem',
        '300': '40rem',
        '400': '50rem',
        '500': '60rem',
        '550': '65rem',
        '600': '70rem',
      },
      height: {
        '200': '32rem',
        '110': '26rem',
        '120': '28rem',
        '140': '30rem',
        '190': '35rem',
        '82': '21rem',
        '83': '24rem',
        '300': '34rem',
        '400': '50rem',
        '450': '60rem',
        '550': '65rem',

      },
      marginTop: {
        '18':'4rem',
      },
      marginLeft: {
        '110':'26rem',
      },
      borderWidth: {
        '1': '1px',
      }
    },
    keyframes: {
      'fade-in-down': {
          '0%': {
              opacity: '0',
              transform: 'translateY(-10px)'
          },
          '100%': {
              opacity: '1',
              transform: 'translateY(0)'
          },
      },
      'pulse': {
        '0%': {
            opacity: '1',
            // transform: 'translateY(-10px)'
        },
        '100%': {
            opacity: '1',
            transform: 'translateY(0)'
        },
        '50%': {
          opacity: '.5',
          // transform: 'translateY(0)'
      }
    },
  },
  animation: {
      'fade-in-down': 'fade-in-down 0.5s ease-out',
      'pulse':'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
  }
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}
