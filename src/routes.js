import createDrawing from './draw'
import createArtist from './artist'
import createGenre from './genre'
import createRouter from './router'
import { propagateFrameHeight } from './iframeHeight'
import postMessage from './postMessage'

function onRouteChange({ path }) {
  postMessage(window.top, { pageNavigate: path })
  propagateFrameHeight()
}

function home({ renderGenres, venn, homeEl }) {
  return {
    enter(ctx) {
      venn.style.display = 'block'
      homeEl.style.display = 'block'
      renderGenres()
    },
    exit() {
      venn.style.display = 'none'
      homeEl.style.display = 'none'
    }
  }
}

function genre({ pageGenre, renderGenre, venn, data, getArtistsByGenres, }) {
  return {
    enter({ params }) {
      const { genre } = params

      const artists = getArtistsByGenres([ genre ]).map(
        artist => data.artists[artist]
      ).sort(
        ({ lastModified: a }, { lastModified: b}) => a > b ? -1 : 0
      )

      venn.style.display = 'block'
      pageGenre.style.display = 'block'

      pageGenre.innerHTML = createGenre(data.genres[genre], { artists, })
      requestAnimationFrame(() => {
        renderGenre({ genre, container: venn  })
      })
    },

    exit(current, next) {
      venn.style.display = 'none'
      pageGenre.style.display = 'none'
      pageGenre.innerHTML = ''

      if (!next.params.artist) {
        Array.from(document.querySelectorAll('#venn [data-venn-sets*="::"] text.label')).forEach(label => {
          label.parentNode.removeChild(label)
        })
      }
    }
  }
}

function artist({ pageArtist, data, getArtistsByGenres }) {
  const { artists, genres } = data

  return {
    enter({ params }) {
      const { artist, genre } = params
      const { next, previous } =  getArtistsByGenres([ genre ]).reduce((m, artistKey, i, arr) => {
        if (artistKey === artist && arr.length > 1) {
          m.next = arr[ (i == arr.length - 1) ? 0 : i + 1]
          m.previous = arr[ (i === 0) ? arr.length - 1 : i - 1 ]
          if (m.next === m.previous) {
            m.previous = null
          }
        }
        return m
      }, {
        next: null,
        previous: null,
      })
      pageArtist.innerHTML = createArtist(data.artists[artist], { params, data, next, previous })
      pageArtist.style.display = 'block'
    },

    exit() {
      pageArtist.style.display = 'none'
      pageArtist.innerHTML = ''
    }
  }
}

export default ({ data, }) => {
  const router = createRouter()

  const homeEl = document.getElementById('page-home')
  const main = document.getElementById('main')
  const venn = document.getElementById('page-venn')
  const pageArtist = document.getElementById('page-artist')
  const pageGenre = document.getElementById('page-genre')

  const { renderGenres, renderGenre, getArtistsByGenres } = createDrawing(data)

  router('/', home({ renderGenres, venn, homeEl }), onRouteChange)
  router('/:genre', genre({ pageGenre, data, venn, renderGenre, getArtistsByGenres }), onRouteChange)
  router('/:genre/:artist', artist({ pageArtist, data, getArtistsByGenres }), onRouteChange)
}
