import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReddit, faTwitter } from '@fortawesome/free-brands-svg-icons'

function SocialLinks(props){
  let reddit,twitter;

  if(props.twitter){
    twitter = <li className="twitter"><a href={props.twitter} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /></a></li>
  }
  if(props.reddit){
    reddit = <li className="reddit"><a href={props.reddit} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faReddit} /></a></li>
  }
  return(
    <ul className="social">
      {reddit}
      {twitter}
    </ul>
  )
}

export default SocialLinks;