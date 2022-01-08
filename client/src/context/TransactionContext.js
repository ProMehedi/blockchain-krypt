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

  return transactionContract
}

export const TransactionProvider = ({ children }) => {
  const [loading, setLoading] = React.useState(false)
  const [currentAcc, setCurrentAcc] = React.useState('')
  const [formData, setFormData] = React.useState({})
  const [transactions, setTransactions] = React.useState([])
  const [transactionsCount, setTransactionsCount] = React.useState(
    localStorage.getItem('transactionsCount') || 0
  )

  React.useEffect(() => {
    checkWalletConnect()
  }, [])

  const handleInput = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = getEthContract()

        const availableTransactions =
          await transactionsContract.getAllTransactions()

        const structuredTransactions = availableTransactions.map(
          (transaction) => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(
              transaction.timestamp.toNumber() * 1000
            ).toLocaleString(),
            message: transaction.message,
            keyword: transaction.keyword,
            amount: parseInt(transaction.amount._hex) / 10 ** 18,
          })
        )

        console.log(structuredTransactions)

        setTransactions(structuredTransactions)
      } else {
        console.log('Ethereum is not present')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const checkWalletConnect = async () => {
    try {
      if (!ethereum) return alert('Please connect to MetaMask')
      const accounts = await ethereum.request({ method: 'eth_accounts' })
      if (!accounts || !accounts.length)
        return alert('Please connect to MetaMask')
      setCurrentAcc(accounts[0])
      getAllTransactions()
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

  const sendTransaction = async () => {
    try {
      setLoading(true)
      if (!ethereum) return alert('Please connect to MetaMask')

      const transactionContract = getEthContract()
      const parseAmount = ethers.utils.parseEther(formData.amount)

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: currentAcc,
            to: formData.addressTo,
            gas: '0x5208',
            value: parseAmount._hex,
          },
        ],
      })

      const transactionHash = await transactionContract.addToBlockchain(
        formData.addressTo,
        parseAmount,
        formData.message,
        formData.keyword
      )
      await transactionHash.wait()

      const transactionCount = await transactionContract.getTransactionCount()
      localStorage.setItem('transactionsCount', transactionCount.toString())
      setTransactionsCount(transactionCount.toString())

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error)
      throw new Error(error)
    }
  }

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAcc,
        handleInput,
        formData,
        sendTransaction,
        transactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
