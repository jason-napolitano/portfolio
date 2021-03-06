// The API endpoint schema is as follows:
//  -> https://api.iconify.design/{prefix}.json?icons={icons}?pretty=1
//  --> EG: https://api.iconify.design/codicon.json?icons=home&pretty=1
const icons = [
  {
    prefix: 'icons',
    icons: {
      'load-more': {
        body: '<path d="M18 20H4V6h9V4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2v9zm-7.79-3.17l-1.96-2.36L5.5 18h11l-3.54-4.71zM20 4V1h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6h3V4h-3z" fill="currentColor"/>',
      },
    },
    width: 24,
    height: 24,
  },
]

export default icons
