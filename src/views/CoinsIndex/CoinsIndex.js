import React from 'react'
import CoinList from "../../components/CoinList/CoinList.js"

export default function CoinsIndex() {
  return (
    <div>
      <div className="container">
        <h1>Coin List</h1>
      </div>
      <CoinList />
    </div>
  )
}
