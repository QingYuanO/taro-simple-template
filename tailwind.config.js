/** @type {import('tailwindcss').Config} */
/* eslint-disable import/no-commonjs */
const { createPlugin } = require('weapp-tailwindcss-children');
const tailwindcssTooltipArrowAfter = require('tailwindcss-tooltip-arrow-after')();
const tailwindcssPlugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
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
        primary:{
          DEFAULT:'var(--primary)'
        },
        word: {
          primary: 'var(--word-primary)',
          secondary: 'var(--word-secondary)',
        },
      },
    },
  },
  plugins: [
    createPlugin({ fallbackElements: ['view', 'text', 'image', 'button'] }),
    tailwindcssTooltipArrowAfter,
    tailwindcssPlugin(function ({ addUtilities, addVariant, matchUtilities, theme }) {
      const themes = ['h5', 'weapp'];
      themes.forEach(t => {
        addVariant(t, `.${t} &`);
      });
      addVariant('wx-disabled',`&[disabled]`)
      matchUtilities(
        {
          require: value => ({
            position: 'relative',
            '&::before': {
              content: '*',
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              [value]: '-24rpx',
              color: 'red',
            },
          }),
        },
        { values: { left: 'left', right: 'right' } }
      );
      matchUtilities(
        {
          safe: value => {
            const name = {
              b: 'bottom',
              t: 'top',
              l: 'left',
              r: 'right',
            }[value];
            return {
              'padding-bottom': `constant(safe-area-inset-${name})` /*兼容 IOS<11.2*/,
              'padding-bottom': `env(safe-area-inset-${name})` /*兼容 IOS>11.2*/,
            };
          },
        },
        { values: { b: 'b', t: 't', l: 'l', r: 'r' } }
      );
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
          'expand-area': value => ({
            position: 'relative',
            '&::after': {
              content: '',
              position: 'absolute',
              top: value,
              bottom: value,
              left: value,
              right: value,
              'z-index': 80,
            },
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
        '.all-unset': {
          all: 'unset',
        },
      });
    }),
  ],
  presets: [
    //将rem转换为rpx
    require('tailwindcss-rem2px-preset').createPreset({
      fontSize: 16,
      unit: 'px',
    }),
  ],
  // v3 版本的 tailwindcss 有些不同
  corePlugins: {
    preflight: process.env.TARO_ENV === 'h5',
    container: false,
    darkMode: false,
  },
};
