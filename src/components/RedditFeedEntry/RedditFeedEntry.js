import React from 'react'
import './RedditFeedEntry.css'

const RedditFeedEntry = props => {
  const { link, title, date } = props;
  const parsedDate = new Date(date);

  const limitWords = (str, wordLimit) => {
    let newWord = ''
    const strArray = str.split(" ")
    for(let i = 0; i < strArray.length; i++){
      newWord += `${strArray[i]} `
      if(i === wordLimit && strArray.length > wordLimit){
        newWord += '...'
        break
      }
    }
    return newWord;
  }

  return(
    <div className="RedditFeedEntry">
      <a href={link} target="_blank" rel="noopener noreferrer">{ limitWords(title, 15) }</a>
      <p><time>{ parsedDate.toLocaleString() }</time></p>
    </div>
  )
}

export default RedditFeedEntry