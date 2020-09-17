// See https://tailwindcss.com/docs/configuration for details
module.exports = {
  purge: {
    content: ['./src/**/*.js'],
    options: {
      whitelist: [
        // Colors chosen by content options for buttons
        'bg-red-200',
        'bg-orange-200',
        'bg-yellow-200',
        'bg-green-200',
        'bg-teal-200',
        'bg-blue-200',
        'bg-indigo-200',
        'bg-purple-200',
        'bg-pink-200',
      ],
    }
  },
  
  
  theme: {
    extend: {
      colors: {
        gray: {
          '100': 'hsl(192, 15%,97%)',
          '200': 'hsl(198, 16%, 95%)',
          '300': 'hsl(202, 15%, 91%)',
          '400': 'hsl(199, 14%, 84%)',
          '500': 'hsl(202, 13%, 69%)',
          '600': 'hsl(204, 12%, 52%)',
          '700': 'hsl(206, 14%, 35%)',
          '800': 'hsl(206, 20%, 23%)',
          '900': 'hsl(208, 25%, 14%)',
        }
      },
      width: {
        '78': '19.5rem',
      },
      minHeight: {
        '28': '7rem',
      },
      padding: {
        '1/3': '33.3333%',
      },
      boxShadow: theme => ({
        'lg': '0 2px 6px 0 hsla(0, 0%, 0%, .2)',
        'inner': 'inset 0 0 4px 0 rgba(0, 0, 0, 0.09)',
        'focus': `0 0 0 4px ${theme('colors.blue.400')}`,
        'error': `0 0 0 4px ${theme('colors.red.500')}`,
      }),
      zIndex: {
        'behind': '-1',
      },
      keyframes: {
        shakeX: {
          'from, to': {
            transform: 'translate3d(0, 0, 0)' },
          '10%, 40%, 60%, 90%': {
            transform: 'translate3d(-5px, 0, 0)' },
          '20%, 50%, 80%': {
            transform: 'translate3d(5px, 0, 0)' },
        },
        bounce: {
          '0%, 100%': {
            transform: 'none',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
          },
          '50%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
          },
        },
        fadeOutUp: {
          'from': {
            opacity: '1',
            transform: 'translate3d(-50%, 0, 0)',
          },
          'to': {
            opacity: '0',
            transform: 'translate3d(-50%, -100%, 0)',
          },
        },
      },
      animation: {
        'shakeX': 'shakeX .5s linear 1',
        'fadeOutUp': 'fadeOutUp 1.5s ease-out 1 forwards',
      },
      screens: {
        'max-xsm': {'max': '359px'},
      },
    },
    customForms: theme => ({
      default: {
        input: {
          '&:focus': {
            boxShadow: theme('boxShadow.focus'),
            borderColor: undefined,
          },
        },
        textarea: {
          '&:focus': {
            boxShadow: theme('boxShadow.focus'),
            borderColor: undefined,
          },
        },
      }
    }),
  },
  
  variants: {
    animation: ['responsive', 'hover', 'focus'],
    backgroundColor: ['responsive', 'hover', 'focus', 'disabled'],
    padding: ['responsive', 'odd'],
    margin: ['responsive', 'even'],
    alignSelf: ['responsive', 'even'],
  },
  
  
  // https://github.com/tailwindcss/custom-forms
  plugins: [require("@tailwindcss/custom-forms")],
  
  future: { removeDeprecatedGapUtilities: true },
};
