import createDrawing from './draw'
import createArtist from './artist'
import createRouter from './router'

function home({ renderGenres, venn }) {
  return {
    enter(ctx) {
      venn.style.display = 'block'
      renderGenres()
    },
    exit() {
      venn.style.display = 'none'
    }
  }
}

function genre({ renderGenre, venn, }) {
  return {
    enter({ params }) {
      const { genre } = params

      venn.style.display = 'block'
      renderGenre({ genre, container: venn  })
    },

    exit(current, next) {
      venn.style.display = 'none'
      if (!next.params.artist) {
        Array.from(document.querySelectorAll('#venn [data-venn-sets*="::"] text.label')).forEach(label => {
          label.parentNode.removeChild(label)
        })
      }
    }
  }
}

function artist({ pageArtist, data, }) {
  const { artists, genres } = data

  const artistsByGenre = Object.keys(genres).reduce((m, genreKey) => {
    m[genreKey] = Object.keys(artists).filter(
      artistKey => artists[artistKey].props.genres.indexOf(genreKey) !== -1
    )
    return m
  }, {})

  return {
    enter({ params }) {
      const { artist, genre } = params
      const { next, previous } = artistsByGenre[genre].reduce((m, artistKey, i, arr) => {
        if (artistKey === artist && arr.length > 1) {
          m.next = arr[ (i == arr.length - 1) ? 0 : i + 1]
          m.previous = arr[ (i === 0) ? arr.length - 1 : i - 1 ]
        }
        return m
      }, {
        next: null,
        previous: null,
      })
      pageArtist.innerHTML = createArtist(data.artists[artist], { params, data, next, previous })
      pageArtist.style.display = 'block'
      document.body.scrollTop = 0
    },

    exit() {
      pageArtist.style.display = 'none'
    }
  }
}

export default ({ data, }) => {
  const router = createRouter()

  const main = document.getElementById('main')
  const venn = document.getElementById('page-venn')
  const pageArtist = document.getElementById('page-artist')

  const { renderGenres, renderGenre } = createDrawing(data)

  router('/', home({ renderGenres, venn }))
  router('/:genre', genre({ venn, renderGenre }))
  router('/:genre/:artist', artist({ pageArtist, data, }))
}
