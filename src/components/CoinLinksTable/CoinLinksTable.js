import React from 'react'

const CoinLinksTable = props => {
  const { urls, name } = props

  const removeSlashes = url => {
    return url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split("/")[0]
  }

  return(
    <aside className="coin-links">
      <table>
        <thead>
          <tr>
            <th colSpan="2">
              <h2>{ `${name} Resources` }</h2>
            </th>
          </tr>
        </thead>
        <tbody>

          { urls.website[0] &&
            <tr>
              <td>Website</td>
              <td><a className="btn-cta" href={urls.website[0]} target="_blank" rel="noopener noreferrer">{removeSlashes(urls.website[0])}</a></td>
            </tr>
          }

          { urls.announcement[0] &&
              <tr>
                <td>Announcements</td>
                <td><a className="btn-cta" href={urls.announcement[0]} target="_blank" rel="noopener noreferrer">{removeSlashes(urls.announcement[0])}</a></td>
              </tr>
          }
          
          { urls.chat[0] &&
            <tr>
              <td>Chat</td>
              <td><a className="btn-cta" href={urls.chat[0]} target="_blank" rel="noopener noreferrer">{removeSlashes(urls.chat[0])}</a></td>
            </tr>
          }

          { urls.explorer[0] &&
            <tr>
              <td>Explorer</td>
              <td><a className="btn-cta" href={urls.explorer[0]} target="_blank" rel="noopener noreferrer">{removeSlashes(urls.explorer[0])}</a></td>
            </tr>
          }

          { urls.message_board[0] &&
            <tr>
              <td>Message Board</td>
              <td><a className="btn-cta" href={urls.message_board[0]} target="_blank" rel="noopener noreferrer">{removeSlashes(urls.message_board[0])}</a></td>
            </tr>
          }

          { urls.source_code[0] &&
            <tr>
              <td>Source Code</td>
              <td><a className="btn-cta" href={urls.source_code[0]} target="_blank" rel="noopener noreferrer">{removeSlashes(urls.source_code[0])}</a></td>
            </tr>
          }
          
          { urls.technical_doc[0] &&
            <tr>
              <td>Technical Doc</td>
              <td><a className="btn-cta" href={urls.technical_doc[0]} target="_blank" rel="noopener noreferrer">{removeSlashes(urls.technical_doc[0])}</a></td>
            </tr>
          }

          { urls.reddit[0] &&
            <tr>
              <td>Reddit</td>
              <td><a className="btn-cta" href={urls.reddit[0]} target="_blank" rel="noopener noreferrer">{removeSlashes(urls.reddit[0])}</a></td>
            </tr>
          }

          { urls.twitter[0] &&
            <tr>
              <td>Twitter</td>
              <td><a className="btn-cta" href={urls.twitter[0]} target="_blank" rel="noopener noreferrer">{removeSlashes(urls.twitter[0])}</a></td>
            </tr>
          }

        </tbody>
      </table>
    </aside>
  )
}

export default CoinLinksTable