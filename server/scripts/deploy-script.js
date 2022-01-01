import { ethers } from 'hardhat'

const main = async () => {
  const Transactions = await ethers.getContractFactory('Transactions')
  const transactions = await Transactions.deploy()

  await transactions.deployed()

  console.log('Transactions deployed to:', transactions.address)
}

try {
  await main()
} catch (error) {
  console.error(error)
  process.exit(1)
}
