/* eslint-disable import/no-commonjs */
const { plugin } = require('weapp-tailwindcss-children');

module.exports = {
  content: ['./src/pages/**/*.{html,js,ts,jsx,tsx}', './src/components/**/*.{html,js,ts,jsx,tsx}', './src/app.ts', './src/index.html'],
  theme: {
    tooltipArrows: theme => ({
      'danger-arrow': {
        borderColor: theme('colors.red.400'),
        borderWidth: 1,
        backgroundColor: theme('colors.red.200'),
        size: 10,
        offset: 10,
      },
    }),
    extend: {
      colors: {
        typo: {
          primary: '#222',
          secondary: '#9ca3af',
        },
      },
      boxShadow: {
        custom: `2px 0px 3px rgba(0, 0, 0, 0.003),
        3.3px 0px 10px rgba(0, 0, 0, 0.004), 4.9px 0px 24.8px rgba(0, 0, 0, 0.006),
        10px 0px 69px rgba(0, 0, 0, 0.01)`,
      },
    },
  },
  plugins: [plugin, require('@tailwindcss/line-clamp'), require('tailwindcss-tooltip-arrow-after')()],
  presets: [require('@downwindcss/easings')],
  // v3 版本的 tailwindcss 有些不同
  corePlugins: {
    preflight: false,
    container: false,
  },
};
