import React from 'react';
import { Link } from 'react-router-dom';
import './Coin.css'

function Coin(props){
  const { 
    name,
    symbol,
    id,
    logo,
    price,
    marketCap,
    percentChangeDay,
    percentChangeSevenDays,
    percentChangeHour,
    favIcon,
    favoritesList
  } = props;
  
  const percentClass = percent => {
    return percent > 0 ? 'green' : 'red';
  }
  let isFavorite;

  if(favoritesList.includes(id)){
    isFavorite = true
  }
  const decimalPlaces = price >= .01 ? 2 : 4;

  return (
    <div className="rTableRow">
      <div className={"rTableCell" + (isFavorite ? " isFavorite" : "")}>
        {favIcon}
      </div>
      <div className="rTableCell">
        <Link to={`/coins/${id}`}>
          <div className="rTableFlex">
            <img className="table-logo" src={logo} alt={name} />
            {`${name} (${symbol})`}
          </div>
        </Link>
      </div>
      <div className="rTableCell">
        { price && `$${price.toFixed(decimalPlaces)}` }
      </div>
      <div className="rTableCell">
        { percentChangeHour && <span className={percentClass(percentChangeHour)}>{`${percentChangeHour.toFixed(2)}%`}</span>}
      </div>
      <div className="rTableCell">
        { percentChangeDay && <span className={percentClass(percentChangeDay)}>{`${percentChangeDay.toFixed(2)}%`}</span>}
      </div>
      <div className="rTableCell">
        { percentChangeSevenDays && <span className={percentClass(percentChangeSevenDays)}>{`${percentChangeSevenDays.toFixed(2)}%`}</span>}
      </div>
      <div className="rTableCell">
        ${Math.floor(marketCap).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
      </div>
    </div>  
  )
}

export default Coin;