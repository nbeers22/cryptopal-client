export default function() {
  return Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          data: {
            1: {
              name: "Bitcoin",
              urls: {
                website: "http://bitcoin.org",
                technical_doc: "http://bitcoin.org/technical_doc",
                twitter: "http://twitter.com/bitcoin",
                reddit: "http://reddit.com/r/bitcoin",
                message_board: "http://messageboard.com/bitcoin",
                explorer: "http://bitcoinexplorer.com",
                source_code: "http://github.com/bitcoin",
                chat: "http://bitcoinchat.com",
                announcement: "http://bitcoinannouncement.com"
              },
              logo: "http://bitcoinlogo.com",
              symbol: "BTC",
              slug: "bitcoin",
              description: "Bitcoin is a great coin",
              tags: "mineable"
            }
          }
        },
        {
          data: {
            1: {
              cmc_rank: 1,
              max_supply: 21000000,
              total_supply: 21000000,
              circulating_supply: 14000000,
              quote: {
                USD: {
                  market_cap: 50000000000,
                  percent_change_1h: 1.23,
                  percent_change_24h: -1.44,
                  percent_change_7d: 2.4,
                  price: 10023.33,
                  volume_24h: 125300000
                }
              }
            }
          }
        }
      ])
 
  })
}