import React from 'react'
import CoinList from "../../components/CoinList/CoinList.js"

export default function CoinsIndex() {
  return (
    <div>
      <div className="container">
        <h1>Coin List</h1>
      </div>
      <section className="coin-list">
        <CoinList />
      </section>
    </div>
  )
}
