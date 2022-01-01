require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.4',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/NoePHddXV_hhmgJMVF4xG_6-W7wrM7bN',
      accounts: [
        'da710ad4bd5931a76ee16fda805b6d68cde9efb8c6b915917dedf42d3cac1fb3',
      ],
    },
  },
}
