import * as d3 from 'd3'
import * as venn from 'venn.js'

export default ({ genres, artists, }) => {
  const tooltip = d3.select("body").append("div")
      .attr("class", "venntooltip");

  const genreText = document.createElement('div')
  document.getElementById('venn').append(genreText)

  var chart, div

  function getArtistsByGenres(genreKeys, excludeGenre='') {
    genreKeys = genreKeys.map(g => g.toLowerCase())
    excludeGenre = excludeGenre.toLowerCase()

    return Object.keys(artists).filter(function(artistKey) {
      const artistGenres = artists[artistKey].props.genres.map(g => g.toLowerCase())
      return genreKeys.every(function(genreKey) {
        return (artistGenres.indexOf(genreKey) !== -1
                && excludeGenre !== genreKey)
      })
    })
  }

  function getArtist(artistKey) {

    return artists[artistKey.replace(/^DJ_/, '')]
  }

  function getGenreIntersections(betweenGenreKeys=Object.keys(genres)) {
    betweenGenreKeys = betweenGenreKeys.map(g=>g.toLowerCase())

    const genreKeys = Object.keys(genres).map(g=>g.toLowerCase())

    return genreKeys.map(function(genreKey, i) {
      return genreKeys.slice(i + 1).map(function(nextGenreKey) {

        if (betweenGenreKeys.indexOf(genreKey) === -1 &&
            betweenGenreKeys.indexOf(nextGenreKey) === -1) {
          return null
        }

        const genreArtists = getArtistsByGenres([ genreKey, nextGenreKey ])

        if (!genreArtists.length) {
          return null
        }

        return {
          sets: [ genreKey, nextGenreKey ],
          size: 0.01,
          artists: genreArtists,
        }
      })
    }).flat().filter(function(set) {
      return set && set.artists.length
    })
  }

  function renderGenres() {
    var genreSets = Object.keys(genres).map(function(genreKey, i) {
      const artists = getArtistsByGenres([genreKey])
      return {
        sets: [genreKey],
        label: genres[genreKey].props.name,
        size: artists.length || 0.5,
        genre: genreKey,
        artists: artists,
      }
    })

    var genreInteresections = getGenreIntersections()

    var sets = genreInteresections.concat(genreSets)

    return draw({ sets })
  }

  function renderGenre({ genre, }) {
    var genreInteresections = getGenreIntersections([ genre ])


    var genreArtists = getArtistsByGenres([ genre ])

    var additionalGenreSets = genreInteresections.map(function(intersection) {
      return intersection.sets.filter(function(genreKey) {
        return genre === genreKey ? null : genreKey
      })
    }).flat()
    .map(function(genreKey) {
      const genreArtists = getArtistsByGenres([genre, genreKey])
      const uniqueGenreArtists = genreArtists.filter(
        artistKey => genreArtists.indexOf(artistKey) === -1
      )
      return [
        genreKey,
        genreArtists,
        uniqueGenreArtists
       ]
    })
    .sort(function(a,b) {
      return a[2].length > b[2].length ? -1 : 0
    })
    .slice(0,4)
    .map(function([genreKey, genreArtists, uniqueGenreArtists]) {
      console.warn([genre, genreKey], uniqueGenreArtists)
      const baseSize = Math.min(50, Math.max(15, genreArtists.length) * genreArtists.length)
      return [
        {
          sets: [ genre, genreKey ],
          size: 0.1
        },
        {
          sets: [ genreKey ],
          genre: genreKey,
          label: genres[genreKey].props.name,
          artists: uniqueGenreArtists,
          size: baseSize // / genre.artists.length
        },
      ].concat(
        uniqueGenreArtists.map(function(genreArtist) {
          return [
            {
              sets: [ genreKey, genreArtist ],
              size: 0.01  /// artists.length
            },
            {
              sets: [ genreArtist ],
              genre: genreKey,
              label: getArtist(genreArtist).props.label,
              artist: genreArtist,
              size: baseSize / 5
            }
          ]
        }).slice(0, 3)
      ).flat()
    }).flat()

    var genreSet = {
      genre,
      sets: [ genre ],
      size: 500,
      label: genre,
      artists: genreArtists,
      // tooltip: `${artists.length} artists in ${datum.sets.join(' & ')} only`,
    }
    var artistsSets = genreArtists.map(function(artistKey) {
      return [
        {
            sets: [`${genre}::${artistKey}`],
            genre: genre,
            label: getArtist(artistKey).props.label,
            artist: artistKey,
            size: Math.max(5, genreArtists.length /  5) // / artists.length,
        },
        {
          sets: [genre].concat([`${genre}::${artistKey}`]),
          size: 0.01 /// artists.length
        }
      ]
    }).slice(0,18).flat()

    const genreProps = genres[genre]
    var newSets = [genreSet].concat(additionalGenreSets, artistsSets)

    console.warn({ genre, newSets, genreArtists, additionalGenreSets, genreInteresections })

    return draw({ sets: newSets, genre: genre })
  }

  function handleAreaClick(datum) {
    const { genre, artist } = datum

    console.warn('click', genre, artist, { datum })

    if (genre && artist) {
      location.hash = `/${genre}/${artist}`
    } else if (genre) {
      location.hash = `/${genre}`
    }
  }

  let recentSets

  function addEvents(args) {
    div.selectAll(".venn-circle")
      .on("click", handleAreaClick)
  }

  function draw({ sets, genre }) {
    console.time(`draw ${sets.length}`)
    console.log('draw', { genres, artists, sets })

    var vennEl = document.getElementById('venn')

    chart = venn.VennDiagram()
                     .width(vennEl.clientWidth)
                     .height(vennEl.clientHeight);

    div = d3.select("#venn")


    div.datum(sets).call(chart)

    addEvents({ sets, genre })

    const containers = document.querySelectorAll(`[data-venn-sets].active`)
    Array.from(containers).forEach(container => {
      container.classList.remove('active')
    })
    genreText.classList.remove('active')

    const genreContainer = document.querySelector(`#venn [data-venn-sets="${genre}"]`)

    if (genre && genreContainer) {
      genreContainer.classList.add('active')
      genreText.setAttribute('data-venn-text', genre)
     }

     console.timeEnd(`draw ${sets.length}`)
  }

  return {
    renderGenre,
    renderGenres,
    getArtistsByGenres,
  }
}
