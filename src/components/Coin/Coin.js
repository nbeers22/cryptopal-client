import React from 'react'

function Coin(props){
  const { name, symbol, price, marketCap, percentChangeDay } = props;
  return (
    <div className="rTableRow">
      <div className="rTableCell">
        {`${name} (${symbol})`}
      </div>
      <div className="rTableCell">
        {`$${price.toFixed(2)}`}
      </div>
      <div className="rTableCell">
        {`%${percentChangeDay.toFixed(2)}`}
      </div>
      <div className="rTableCell">
        ${Math.floor(marketCap).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
      </div>
    </div>  
  )
}

export default Coin;