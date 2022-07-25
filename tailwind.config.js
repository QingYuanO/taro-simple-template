// const range = (size) =>
//     Object.fromEntries(
//         [...Array(size).keys()]
//             .slice(1)
//             .map((i) => [`${i}_${size}`, `${(i / size) * 100}%`])
//     );

// module.exports = {
//     prefixer: false,
//     separator: "_",
//     compile: false,
//     globalUtility: false,
//     darkMode: "media",
//     corePlugins: {
//         preflight: false,
//         divideColor: false,
//         divideOpacity: false,
//         divideStyle: false,
//         divideWidth: false,
//         space: false,
//         placeholderColor: false,
//         placeholderOpacity: false,
//     },
//     exclude: [/([0-9]{1,}[.][0-9]*)$/],
//     theme: {
//         width: (theme) => ({
//             auto: "auto",
//             full: "100%",
//             screen: "100vw",
//             ...Object.assign(...[2, 3, 4, 5, 6, 12].map(range)),
//             ...theme("spacing"),
//         }),
//         height: (theme) => ({
//             auto: "auto",
//             full: "100%",
//             screen: "100vh",
//             ...Object.assign(...[2, 3, 4, 5, 6, 12].map(range)),
//             ...theme("spacing"),
//         }),
//         maxHeight: {
//             full: "100%",
//             screen: "100vh",
//         },
//     },
// };

// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        typo: {
          primary: "#222",
          secondary: "#9ca3af",
        },
      },
      boxShadow: {
        custom: `2px 0px 3px rgba(0, 0, 0, 0.003),
        3.3px 0px 10px rgba(0, 0, 0, 0.004), 4.9px 0px 24.8px rgba(0, 0, 0, 0.006),
        10px 0px 69px rgba(0, 0, 0, 0.01)`,
      },
    },
  },
  plugins: [],
  // v3 版本的 tailwindcss 有些不同
  corePlugins: {
    preflight: false,
  },
};
