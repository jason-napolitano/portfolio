// The API endpoint schema is as follows:
//  -> https://api.iconify.design/{prefix}.json?icons={icons}?pretty=1
//  --> EG: https://api.iconify.design/codicon.json?icons=home&pretty=1
const icons = [
  {
    prefix: 'filters',
    icons: {
      refresh: {
        body: '<path d="M10 11H7.101l.001-.009a4.956 4.956 0 0 1 .752-1.787a5.054 5.054 0 0 1 2.2-1.811c.302-.128.617-.226.938-.291a5.078 5.078 0 0 1 2.018 0a4.978 4.978 0 0 1 2.525 1.361l1.416-1.412a7.036 7.036 0 0 0-2.224-1.501a6.921 6.921 0 0 0-1.315-.408a7.079 7.079 0 0 0-2.819 0a6.94 6.94 0 0 0-1.316.409a7.04 7.04 0 0 0-3.08 2.534a6.978 6.978 0 0 0-1.054 2.505c-.028.135-.043.273-.063.41H2l4 4l4-4zm4 2h2.899l-.001.008a4.976 4.976 0 0 1-2.103 3.138a4.943 4.943 0 0 1-1.787.752a5.073 5.073 0 0 1-2.017 0a4.956 4.956 0 0 1-1.787-.752a5.072 5.072 0 0 1-.74-.61L7.05 16.95a7.032 7.032 0 0 0 2.225 1.5c.424.18.867.317 1.315.408a7.07 7.07 0 0 0 2.818 0a7.031 7.031 0 0 0 4.395-2.945a6.974 6.974 0 0 0 1.053-2.503c.027-.135.043-.273.063-.41H22l-4-4l-4 4z" fill="currentColor"/>',
      },
      gallery: {
        body: '<path d="M32.12 10H3.88A1.88 1.88 0 0 0 2 11.88v18.24A1.88 1.88 0 0 0 3.88 32h28.24A1.88 1.88 0 0 0 34 30.12V11.88A1.88 1.88 0 0 0 32.12 10zM32 30H4V12h28z" class="clr-i-outline clr-i-outline-path-1" fill="currentColor"/><path d="M8.56 19.45a3 3 0 1 0-3-3a3 3 0 0 0 3 3zm0-4.6A1.6 1.6 0 1 1 7 16.45a1.6 1.6 0 0 1 1.56-1.6z" class="clr-i-outline clr-i-outline-path-2" fill="currentColor"/><path d="M7.9 28l6-6l3.18 3.18L14.26 28h2l7.46-7.46L30 26.77v-2L24.2 19a.71.71 0 0 0-1 0l-5.16 5.16l-3.67-3.66a.71.71 0 0 0-1 0L5.92 28z" class="clr-i-outline clr-i-outline-path-3" fill="currentColor"/><path d="M30.14 3a1 1 0 0 0-1-1h-22a1 1 0 0 0-1 1v1h24z" class="clr-i-outline clr-i-outline-path-4" fill="currentColor"/><path d="M32.12 7a1 1 0 0 0-1-1h-26a1 1 0 0 0-1 1v1h28z" class="clr-i-outline clr-i-outline-path-5" fill="currentColor"/>',
      },
      'load-more': {
        body: '<path d="M18 20H4V6h9V4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2v9zm-7.79-3.17l-1.96-2.36L5.5 18h11l-3.54-4.71zM20 4V1h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6h3V4h-3z" fill="currentColor"/>',
      },
    },
    width: 24,
    height: 24,
  },
  {
    prefix: 'buttons',
    icons: {
      'gallery': {
        body: '<path d="M30.14 3a1 1 0 0 0-1-1h-22a1 1 0 0 0-1 1v1h24z" class="clr-i-solid clr-i-solid-path-1" fill="currentColor"/><path d="M32.12 7a1 1 0 0 0-1-1h-26a1 1 0 0 0-1 1v1h28z" class="clr-i-solid clr-i-solid-path-2" fill="currentColor"/><path d="M32.12 10H3.88A1.88 1.88 0 0 0 2 11.88v18.24A1.88 1.88 0 0 0 3.88 32h28.24A1.88 1.88 0 0 0 34 30.12V11.88A1.88 1.88 0 0 0 32.12 10zM8.56 13.45a3 3 0 1 1-3 3a3 3 0 0 1 3-3zM30 28H6l7.46-7.47a.71.71 0 0 1 1 0l3.68 3.68L23.21 19a.71.71 0 0 1 1 0L30 24.79z" class="clr-i-solid clr-i-solid-path-3" fill="currentColor"/>',
      },
    },
    width: 36,
    height: 36,
  },
]

export default icons
