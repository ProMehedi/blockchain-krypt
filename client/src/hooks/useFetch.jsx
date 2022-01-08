import React from 'react'

const API_KEY = process.env.REACT_APP_GIPHY_API

const useFetch = ({ keyword }) => {
  const [url, setUrl] = React.useState('')

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&q=${keyword}&limit=1`
        )
        const { data } = await response.json()
        setUrl(data[0]?.images?.downsized_medium?.url)
      } catch (error) {
        console.log(error)
        setUrl('https://acegif.com/wp-content/uploads/gif-shaking-head-38.gif')
      }
    }

    keyword && fetchData()
  }, [keyword])

  return url
}

export default useFetch
