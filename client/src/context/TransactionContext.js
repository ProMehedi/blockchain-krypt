import React from 'react'
import { ethers } from 'ethers'
import { contractABI, contractAddress } from '../utils/constants'

export const TransactionContext = React.createContext()

const { ethereum } = window

const getEthContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  )

  console.log({ provider, signer, transactionContract })
}

export const TransactionProvider = ({ children }) => {
  const [currentAcc, setCurrentAcc] = React.useState('')

  React.useEffect(() => {
    checkWalletConnect()
  }, [])

  const checkWalletConnect = async () => {
    try {
      if (!ethereum) return alert('Please connect to MetaMask')
      const accounts = await ethereum.request({ method: 'eth_accounts' })
      if (!accounts || !accounts.length)
        return alert('Please connect to MetaMask')
      setCurrentAcc(accounts[0])
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('Please connect to MetaMask')
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      setCurrentAcc(accounts[0])
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  console.log(currentAcc)

  return (
    <TransactionContext.Provider value={{ connectWallet, currentAcc }}>
      {children}
    </TransactionContext.Provider>
  )
}
