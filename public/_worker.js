const BOT_AGENTS = {
  googlebot: true,
  'yahoo! slurp': true,
  bingbot: true,
  yandex: true,
  baiduspider: true,
  facebookexternalhit: true,
  twitterbot: true,
  rogerbot: true,
  linkedinbot: true,
  embedly: true,
  'quora link preview': true,
  showyoubot: true,
  outbrain: true,
  'pinterest/0.': true,
  'developers.google.com/+/web/snippet': true,
  slackbot: true,
  vkshare: true,
  w3c_validator: true,
  redditbot: true,
  applebot: true,
  whatsapp: true,
  flipboard: true,
  tumblr: true,
  bitlybot: true,
  skypeuripreview: true,
  nuzzel: true,
  discordbot: true,
  'google page speed': true,
  qwantify: true,
  pinterestbot: true,
  'bitrix link preview': true,
  'xing-contenttabreceiver': true,
  'chrome-lighthouse': true,
  telegrambot: true
}

const IGNORE_EXTENSIONS = {
  '.js': true,
  '.css': true,
  '.xml': true,
  '.less': true,
  '.png': true,
  '.jpg': true,
  '.jpeg': true,
  '.gif': true,
  '.pdf': true,
  '.doc': true,
  '.txt': true,
  '.ico': true,
  '.rss': true,
  '.zip': true,
  '.mp3': true,
  '.rar': true,
  '.exe': true,
  '.wmv': true,
  '.doc': true,
  '.avi': true,
  '.ppt': true,
  '.mpg': true,
  '.mpeg': true,
  '.tif': true,
  '.wav': true,
  '.mov': true,
  '.psd': true,
  '.ai': true,
  '.xls': true,
  '.mp4': true,
  '.m4a': true,
  '.swf': true,
  '.dat': true,
  '.dmg': true,
  '.iso': true,
  '.flv': true,
  '.m4v': true,
  '.torrent': true,
  '.woff': true,
  '.ttf': true,
  '.svg': true,
  '.webmanifest': true
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const requestUserAgent = (request.headers.get('User-Agent') || '').toLowerCase()

    if (!BOT_AGENTS[requestUserAgent]) return env.ASSETS.fetch(request)

    const xPrerender = request.headers.get('X-Prerender')
    const pathName = url.pathname.toLowerCase()
    const ext = pathName.slice(pathName.lastIndexOf('.') || pathName.length)

    if (!xPrerender && !IGNORE_EXTENSIONS[ext]) {
      const headersToSend = new Headers(request.headers)

      headersToSend.set('X-Prerender-Token', process.env.PRERENDER_IO_API_KEY)

      return await fetch(`https://service.prerender.io/${request.url}`, { headers: headersToSend, redirect: 'manual' })
    } else {
      return env.ASSETS.fetch(request)
    }
  }
}
