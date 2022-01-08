import { AiFillPlayCircle } from 'react-icons/ai'
import { SiEthereum } from 'react-icons/si'
import { BsInfoCircle } from 'react-icons/bs'
import { ScaleLoader } from 'react-spinners'
import React from 'react'
import { TransactionContext } from '../context/TransactionContext'
import { shorterAddress } from '../utils/shorterAddress'

const companyCommonStyles =
  'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white'

const Input = ({ placeholder, name, type, value, onChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step='0.0001'
    value={value}
    onChange={onChange}
    name={name}
    className='my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism'
  />
)

const Welcome = () => {
  const {
    connectWallet,
    currentAcc,
    handleInput,
    formData,
    loading,
    sendTransaction,
  } = React.useContext(TransactionContext)

  const handleSubmit = (e) => {
    e.preventDefault()

    sendTransaction()
    console.log(formData)
  }

  return (
    <div className='flex w-full justify-center items-center'>
      <div className='flex lg:flex-row flex-col items-center justify-between md:p-20 py-12 px-4'>
        <div className='flex flex-1 justify-start items-start flex-col md:mr-10'>
          <h1 className='text-3xl sm:text-5xl text-white text-gradient py-1'>
            Send Crypto <br /> across the world
          </h1>
          <p className='text-left my-5 text-white font-light md:w-9/12 w-11/12 text-base'>
            Explore the crypto world. Buy and sell cryptocurrencies easily on
            Krypto.
          </p>
          {!currentAcc ? (
            <button
              onClick={connectWallet}
              className='flex flex-row justify-center items-center text-white text-base font-semibold bg-[#2952e3] py-3 px-6 rounded-full cursor-pointer hover:bg-[#2546bd]'
            >
              <AiFillPlayCircle className='mr-2' />
              <span>Connect Wallet</span>
            </button>
          ) : (
            <p className='text-slate-400 font-light'>
              Wallet Connected: {shorterAddress(currentAcc)}
            </p>
          )}
          <div className='grid sm:grid-cols-3 grid-cols-2 w-full mt-10'>
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
              Reliability
            </div>
            <div className={companyCommonStyles}>Security</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
              Ethereum
            </div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
              Web 3.0
            </div>
            <div className={companyCommonStyles}>Low Fees</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
              Blockchain
            </div>
          </div>
        </div>

        <div className='flex flex-col md:flex-row lg:flex-col flex-1 items-center justify-start w-full lg:mt-0 mt-10'>
          <div className='p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 md:mr-4 lg:mr-0 eth-card .white-glassmorphism '>
            <div className='flex justify-between flex-col w-full h-full'>
              <div className='flex justify-between items-start'>
                <div className='w-10 h-10 rounded-full border-2 border-white flex justify-center items-center'>
                  <SiEthereum fontSize={21} color='#fff' />
                </div>
                <BsInfoCircle fontSize={17} color='#fff' />
              </div>
              <div>
                <p className='text-white font-light text-sm'>
                  {shorterAddress(currentAcc)}
                </p>
                <p className='text-white font-semibold text-lg mt-1'>
                  Ethereum
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className='p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism'
          >
            <Input
              placeholder='Address To'
              name='addressTo'
              type='text'
              onChange={handleInput}
            />
            <Input
              placeholder='Amount (ETH)'
              name='amount'
              type='number'
              onChange={handleInput}
            />
            <Input
              placeholder='Keyword (Gif)'
              name='keyword'
              type='text'
              onChange={handleInput}
            />
            <Input
              placeholder='Enter Message'
              name='message'
              type='text'
              onChange={handleInput}
            />

            <div className='h-[1px] w-full bg-gray-400 my-2' />

            <button
              type='submit'
              disabled={loading}
              className={`flex items-center justify-center text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer ${
                loading && 'opacity-50 cursor-not-allowed bg-[#3d4f7c]'
              }`}
            >
              Send
              {loading && (
                <span className='ml-2 -mb-1'>
                  <ScaleLoader color='#fff' height={15} width={2} />
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Welcome
