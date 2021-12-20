import type { NextPage } from 'next'
import { FormEvent, useState } from 'react'
import { SearchResults } from '../components/SearchResults'

interface Results {
  totalPrice:number;
  data:any[]
}

const Home: NextPage = () => {
  const [search,setSearch] = useState('')
  const [results,setResults] = useState<Results>({
    totalPrice:0,
    data:[]
  })
  
  const handleSearch = async(event:FormEvent) => {
    event.preventDefault()

    if(!search.trim()) {
      return;
    }

    
    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json();

    const formatter = new Intl.NumberFormat('pt-BR', {
      style:'currency',
      currency:'BRL'
    })
    
    const products = data.map(product => {
      return {
        id:product.id,
        title:product.title,
        price:product.price,
        priceFormatted:formatter.format(product.price)
      }
    })
    

    const totalPrice = data.reduce((total, product) => {
      return total +  product.price
  }, 0) 
    setResults({totalPrice, data: products});
  } 
  
  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input 
        type="text" 
        value={search} 
        onChange={e => setSearch(e.target.value)} 
        />
        <button type="submit">Buscar</button>
      </form>
      <SearchResults 
      results={results?.data}
      totalPrice={results?.totalPrice}
      />
    </div>
  )
}

export default Home
