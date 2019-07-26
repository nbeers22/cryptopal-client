import React from 'react';
import { Link } from 'react-router-dom';

function Coin(props){
  const { name, symbol, id, price, marketCap, percentChangeDay } = props;
  return (
    <div className="rTableRow">
      <div className="rTableCell">
        <Link to={`/coins/${id}`}>{`${name} (${symbol})`}</Link>
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