import * as d3 from 'd3'
import * as venn from 'venn.js'

export default ({ genres, artists, }) => {
  const tooltip = d3.select("body").append("div")
      .attr("class", "venntooltip");

  const genreText = document.createElement('div')
  document.getElementById('venn').append(genreText)

  var chart, div

  function getArtistsByGenres(genreKeys, excludeGenre) {
    return Object.keys(artists).filter(function(artistKey) {
      return genreKeys.every(function(genreKey) {
        return artists[artistKey].props.genres.indexOf(genreKey) !== -1 &&
          excludeGenre !== genreKey
      })
    }).map(function(artistKey) {
      // return `DJ_${artistKey}`
      return artistKey
    })
  }

  function getArtist(artistKey) {

    return artists[artistKey.replace(/^DJ_/, '')]
  }
  function getArtistName(artistKey) {

    return getArtist(artistKey).props.short_display_name || artistKey.replace(/_/g, ' ')
  }

  function getGenreIntersections(betweenGenreKeys=Object.keys(genres)) {
    return Object.keys(genres).map(function(genreKey, i, genreKeys) {
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
        label: genreKey,
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
      label: ` `,
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


  function renderArtist(datum) {
    const artist = getArtist(datum.artist)
    // console.warn(artist.props.genres, getGenreIntersections(artist.props.genres))
    return [
      {
        sets: [datum.artist],
        size: 10,
        label: getArtistName(datum.artist),
      }
    ].concat(
      artist.props.genres.map(function(genreKey, i, arr) {
        const excludeGenre = i ? arr[i-1] : null
        const artists = getArtistsByGenres([genreKey], excludeGenre).filter(function(artistKey) {
          return artistKey !== datum.artist
        })//.slice(0,5)
        return [
          {
            genre: genreKey,
            sets: [ genreKey ],
            size: 0.5,
            label: genreKey,
          },
          {
            sets: [datum.artist, genreKey],
            size: 0.1,
          }
        ].concat(
          artists.map(function(artistKey, i, arr) {
            return [
              {
                sets: [ artistKey, ],
                artist: artistKey,
                size: 0.1 * (0.5 / arr.length),
                label: ' '
                // label: getArtistName(artistKey)
              },
              {
                sets: [ artistKey, genreKey ],
                size: 0.1 * (0.1 / arr.length),
                // weight: 0
              }
            ]
          }).flat()
        )
      }).flat()
    )
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

  function handleMouseOver(d, i) {
      // sort all the areas relative to the current item
      // venn.sortAreas(div, d);

      // Display a tooltip with the current size
      var tooltipText = d.tooltip || (d.artists ? d.artists.length + " artists" :  null)

      if (tooltipText) {
        // tooltip.transition().duration(400).style("opacity", .9);
        // tooltip.text(tooltipText);
      }

      // highlight the current path
      // var selection = d3.select(this).transition("tooltip").duration(400);
      // selection.select("path")
      //     .style("fill-opacity", d.sets.length == 1 ? .4 : .1)
      //     .style("stroke-opacity", 1);
  }

  function handleMouseMove() {
      // tooltip.style("left", (d3.event.pageX + 20) + "px")
      //        .style("top", (d3.event.pageY - 28) + "px");
  }

  function handleMouseOut(d, i) {
      // tooltip.transition().duration(400).style("opacity", 0);
      // var selection = d3.select(this).transition("tooltip").duration(400);
      // selection.select("path")
      //     .style("fill-opacity", d.sets.length == 1 ? .25 : .0)
      //     .style("stroke-opacity", 0);
  }

  let recentSets

  function addEvents(args) {
    // div.selectAll("g")
    div.selectAll(".venn-circle")
      .on("click", handleAreaClick)
      .on("mouseover", handleMouseOver)
      .on("mousemove", handleMouseMove)
      .on("mouseout", handleMouseOut);

    if (recentSets) {
      window.removeEventListener('resize', recentSets)
    }

    recentSets = () => draw(args)

    window.addEventListener('resize', recentSets)
  }

  function draw({ sets, genre }) {
    console.time(`draw ${sets.length}`)
    console.log('draw', { genres, artists, sets })

    var vennEl = document.getElementById('venn')

    chart = venn.VennDiagram()
                     .width(vennEl.offsetWidth)
                     .height(vennEl.offsetHeight);

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

      // genreContainer.querySelector('path').style.stroke = genres[genre].props.theme

      genreContainer.classList.add('active')
      // setTimeout(() => {

        genreText.setAttribute('data-venn-text', genre)

        genreText.innerHTML = genres[genre].html
        genreText.classList.add('active')


        function adjust({ count=100, widthA=0, heightA=0, topA=0, leftA=0 }={}) {
          count--
          setTimeout(_ => {
            const { width, height, top, left } = genreContainer.getBoundingClientRect()

            console.warn('adjustment', count, {width, height, top, left},{widthA,heightA,topA,leftA})
            if (count <= 0 || (widthA === width && heightA === height && topA === top && leftA === left)) {
              // stop
              console.warn('stop adjustment')
              return
            }
            genreText.setAttribute('style', `
              left: ${left + (width*0.12)}px;
              top: ${top + (height * 0.12)}px;
              width: ${ width * 0.75 }px;
              max-height: ${ height * 0.65  }px;
            `)

            widthA = width
            heightA = height
            topA = top
            leftA = left

            adjust({count, widthA, heightA, topA, leftA })
          }, 100)
        }
        adjust()
     }
     else {

     }

     console.timeEnd(`draw ${sets.length}`)
  }

  return {
    renderGenre,
    renderGenres,
    getArtistsByGenres,
  }
}
