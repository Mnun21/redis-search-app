import Head from 'next/head'
import Image from 'next/image'
import CarForm from "../lib/CarForm"
import SearchForm from '../lib/SearchForm'

export default function Home() {
  return (
    <div>
      <CarForm />
      <SearchForm />
    </div>
  )
}
