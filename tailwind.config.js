/* eslint-disable import/no-commonjs */
const { plugin } = require('weapp-tailwindcss-children');
const lineClamp = require('@tailwindcss/line-clamp');
const tailwindcssTooltipArrowAfter = require('tailwindcss-tooltip-arrow-after')();
const tailwindcssPlugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/pages/**/*.{html,js,ts,jsx,tsx}', './src/components/**/*.{html,js,ts,jsx,tsx}', './src/app.ts', './src/index.html'],
  darkMode: 'class',
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
        word: {
          primary: '#222',
          secondary: '#9ca3af',
        },
      },
      spacing: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
    },
  },
  plugins: [
    plugin,
    lineClamp,
    tailwindcssTooltipArrowAfter,
    tailwindcssPlugin(function ({ addUtilities, addVariant, matchUtilities, theme }) {
      const themes = ['products'];
      themes.forEach(t => {
        addVariant(t, `.theme-${t} &`);
      });
      matchUtilities(
        {
          square: value => ({
            width: value,
            height: value,
          }),
          circular: value => ({
            width: value,
            height: value,
            'border-radius': '100%',
          }),
        },
        { values: theme('spacing') }
      );
      addUtilities({
        '.flex-col-center': {
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center',
          'flex-direction': 'column',
        },
        '.flex-center': {
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center',
          'flex-direction': 'row',
        },
      });
    }),
  ],
  presets: [
    //添加一些缓动函数https://easings.net/zh-cn
    require('@downwindcss/easings'),
    //将rem转换为rpx
    require('tailwindcss-rem2px-preset').createPreset({
      fontSize: 40,
      unit: 'rpx',
    }),
  ],
  // v3 版本的 tailwindcss 有些不同
  corePlugins: {
    preflight: false,
    container: false,
    darkMode: false,
  },
};
