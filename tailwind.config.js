module.exports = {
  content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx,vue}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'steel-blue': {
          100: '#F1F5FB',
          200: '#E4EBF7',
          300: '#B9CCEB',
          400: '#A2BBE4',
          500: '#4F7ECB',
        },
        cyan: {
          100: '#ECF7F8',
          200: '#DAEFF2',
          300: '#9FD6DD',
          400: '#80C8D2',
          500: '#0E97AA',
        },
        green: {
          100: '#EDFAF0',
          200: '#DCF5E1',
          300: '#A3E5AF',
          400: '#85DC96',
          500: '#18BC37',
        },
        orange: {
          100: '#FFF9EA',
          200: '#FFE6D1',
          300: '#FFD7B4',
          400: '#FFCA9C',
          500: '#FF9A43',
        },
        red: {
          100: '#FDF0EF',
          200: '#FBE2E0',
          300: '#F5B2AE',
          400: '#F19993',
          500: '#E43D33',
        },
        grey: {
          100: '#F4F4F4',
          200: '#DEDEDE',
          300: '#BABABA',
          400: '#999999',
          500: '#191919',
        },
        emerald: {
          100: '#F0FAF6',
          200: '#E1F4ED',
          300: '#B0E2D0',
          400: '#96D9C1',
          500: '#38B689',
        },
        blue: {
          100: '#EFF8FE',
          200: '#DFF1FD',
          300: '#B3DFFE',
          400: '#90CFF9',
          500: '#299DEC',
          600: '#1B89E3',
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    // 兼容小程序，将带有 * 选择器的插件禁用
    preflight: false,
  },
};
