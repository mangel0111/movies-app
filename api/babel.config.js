const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        esmodules: true,
      },
      corejs: {
        version: '3',
        proposals: true,
      },
      useBuiltIns: 'entry',
    },
  ],
]
// ]
// const plugins = [
//   '@babel/plugin-proposal-class-properties',
//   '@babel/plugin-proposal-function-bind',
//   '@babel/plugin-transform-runtime',
// ]

module.exports = { presets }
