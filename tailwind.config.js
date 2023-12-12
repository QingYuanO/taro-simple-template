/** @type {import('tailwindcss').Config} */
/* eslint-disable import/no-commonjs */
const { createPlugin } = require('weapp-tailwindcss-children');
const tailwindcssTooltipArrowAfter = require('tailwindcss-tooltip-arrow-after')();
const tailwindcssPlugin = require('tailwindcss/plugin');
const { iconsPlugin, getIconCollections } = require('@egoist/tailwindcss-icons');

const isH5 = process.env.TARO_ENV === 'h5';

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
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [
    createPlugin({ fallbackElements: isH5 ? ['*'] : ['view'] }),
    tailwindcssTooltipArrowAfter,
    require('tailwindcss-animate'),
    require('tailwind-scrollbar'),
    iconsPlugin({
      // Select the icon collections you want to use
      collections: getIconCollections(['lucide']),
    }),
    tailwindcssPlugin(function ({ addUtilities, addVariant, matchUtilities, theme }) {
      const themes = ['h5', 'weapp'];
      themes.forEach(t => {
        addVariant(t, `.${t} &`);
      });
      addVariant('disabled', `&[disabled]`);
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
              'padding-bottom ': `env(safe-area-inset-${name})` /*兼容 IOS>11.2*/,
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
    //将tailwind类的rem单位转化为px，之后taro会将px根据屏幕尺寸转换为对应平台的单位：小程序-rpx，h5-rem
    require('tailwindcss-rem2px-preset').createPreset({
      fontSize: 16,
      unit: 'px',
    }),
  ],
  // v3 版本的 tailwindcss 有些不同
  corePlugins: {
    preflight: isH5,
    container: false,
    darkMode: false,
  },
};
