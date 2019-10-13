
import * as d3 from 'd3'
import * as venn from 'venn.js'

export default ({ genres, artists }) => {


  // var sets = genreInteresections.concat(genreSets)

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
      // console.log(i, genreKey)
      return genreKeys.slice(i + 1).map(function(nextGenreKey) {
        // console.log(i, genreKey, nextGenreKey)
        if (betweenGenreKeys.indexOf(genreKey) === -1 &&
            betweenGenreKeys.indexOf(nextGenreKey) === -1) {
          return
        }
        const genreArtists = getArtistsByGenres([genreKey, nextGenreKey])
        return {
          sets: [ genreKey, nextGenreKey ],
          size: 0.01,
          // size: artists.length * 0.5,
          artists: genreArtists,
        }
      })
    }).flat().filter(function(set) {
      return set && set.artists.length
    })
  }

  function renderGenres({ }={}) {
    var genreSets = Object.keys(genres).map(function(genreKey, i) {
      const artists = getArtistsByGenres([genreKey])
      return {
        genre: genreKey,
        sets: [genreKey],
        label: genreKey,
        artists: artists,
        size: artists.length,
      }
    })

    var genreInteresections = getGenreIntersections()

    var sets = genreSets.concat(genreInteresections)

    draw({sets})
  }

  function renderArtists(datum) {
    return datum.sets.map(function(genreKey) {
      var artists = getArtistsByGenres([genreKey])
      // const genre = genres[genreKey]
      return [
        {
          genre: genreKey,
          sets: [ genreKey ],
          label: genreKey,
          size: artists.length,
          artists: artists,
        }
      ].concat(
        artists.map(function(artistKey) {
          return [
            {
              artist: artistKey,
              sets: [ artistKey ],
              label: getArtistName(artistKey),
              size: 1 / artists.length
            },
            {
              sets: [ genreKey, artistKey ],
              size: 1
            }
          ]
        }).flat()
      )
    }).flat()
  }


  function renderIntersectionsWithArtists({ sets }) {


    var genreInteresections = getGenreIntersections(sets)


    var genreArtists = getArtistsByGenres(sets)
    // .filter(function(artistKey) {
    //   return !genreInteresections.find(function(intersection) {
    //     return intersection.artists.includes(artistKey)
    //   })
    // })

    var additionalGenreSets = genreInteresections.map(function(intersection) {
      return intersection.sets.map(function(genre) {
        return sets.includes(genre) ? null : genre
      })
    }).flat().filter(function(r) { return !!r })
    .map(function(genreKey) {
      const genreArtists = getArtistsByGenres(sets.concat([genreKey]))
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
      return a[1].length > b[1].length ? -1 : 0
    })
    .slice(0,4)
    .map(function([genreKey, genreArtists, uniqueGenreArtists]) {
      // var artists = getArtistsByGenres(sets.concat([genreKey]))
      // .filter(function(genreArtist) {
      //   return genre.artists.includes(genreArtist)
      // })
      console.log({genreKey, genreArtists, uniqueGenreArtists})
      const baseSize = Math.min(50, Math.max(15, genreArtists.length) * genreArtists.length)
      return [
        {
          sets: sets.concat([ genreKey ]),
          // label: genreKey,
          // artists: artists,
          // weight: 1000,
          // size: 0.01// / genre.artists.length
          size: 0.1 //artists.length
          // size: 0.3 * artists.length
        },
        {
          sets: [ genreKey ],
          genre: genreKey,
          label: genres[genreKey].props.name,
          // label: `${allGenreArtists.length} ${genres[genreKey].props.name}`,
          // label: genreKey,
          // tooltip: `${artists.length} artists in ${datum.sets.concat([ genreKey ]).join(' & ')}`,
          artists: uniqueGenreArtists,
          // size: Math.min(20, Math.max(50, allGenreArtists.length)) // / genre.artists.length
          size: baseSize // / genre.artists.length
          // size: 30,
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
        }).slice(0, 7)
      ).flat()
    }).flat()
    const genreKey = sets[0]

    var genre = {
      genre: genreKey,
      sets: sets,
      size: 500, //Math.m(50, artists.length),
      label: ` `,
      artists: genreArtists,
      // tooltip: `${artists.length} artists in ${datum.sets.join(' & ')} only`,
    }
    var artistsSets = genreArtists.map(function(artistKey) {
      return [
        {
            sets: [`${genreKey}::${artistKey}`],
            genre: genreKey,
            label: getArtist(artistKey).props.label,
            artist: artistKey,
            size: Math.max(5, genreArtists.length /  5) // / artists.length,
        },
        {
          sets: sets.concat([`${genreKey}::${artistKey}`]),
          size: 0.1 /// artists.length
        }
      ]
    }).slice(0,20).flat()
    const genreProps = genres[genreKey]
    var newSets = [genre].concat(additionalGenreSets, artistsSets)//, genreInteresections)

    console.warn({ genreKey, sets, newSets, genreArtists, additionalGenreSets, genreInteresections })

    draw({ sets: newSets, genre: genreKey })



    // return newDatum
    // div.datum(newDatum).call(chart);
    // addEvents()

    // venn.sortAreas(div, newDatum);
  }


  function renderGenre({ genre }) {
    return renderIntersectionsWithArtists({ sets: [ genre ]})
    var artists = getArtistsByGenres([ genre ])
    // .filter(function(artistKey) {
    //   return !genreInteresections.find(function(intersection) {
    //     return intersection.artists.includes(artistKey)
    //   })
    // })
    const genreProps = genres[genre]

    var genreSet = {
      genre,
      sets: [ genre ],
      size: artists.length,
      label: ' ',
      // label: genreProps.props.name,
      // label: genreProps.html,
      // label: `${genre} (${artists.length} <h1>artists</h1>)`,
      artists: artists,
      // tooltip: `${artists.length} artists in ${datum.sets.join(' & ')} only`,
    }

    var artistsSets = artists.map(function(artistKey) {
      return [
        {
            artist: artistKey,
            genre,
            sets: [artistKey],
            label: getArtist(artistKey).props.label,
            size: 0.1 // / artists.length,
        },
        {
          sets: [genre, artistKey],
          size: 0.01  /// artists.length
        }
      ]
    }).flat()

    // var newDatum = [ genre, ...artistsSets ]
    var sets = [ genreSet, ...artistsSets ]//, genreInteresections)
    // var newDatum = additionalGenreSets.concat(genre, artistsSets)//, genreInteresections)

    console.warn('renderGenre', { genre, genreProps, sets, artists, })

    draw({ sets, genre })

    genreText.innerHTML = genreProps.html

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
    var sets
    if (artist) {
      location.hash = `/${genre}/${artist}`
      // sets = renderArtist(datum)

      // page(`/${genre}/${artist}`)
      // page(`/?g=${genre}&a=${artist}`)
    } else if (genre) {
      location.hash = `/${genre}`
      // page(`/${genre}`)
      // page(`/?g=${genre}`)
      // sets = renderGenre({ genre })
    }
    // console.warn({ datum, sets })

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
    const genreContainer = window.genreContainer = document.querySelector(`#venn [data-venn-sets="${genre}"]`)
    if (genre && genreContainer) {

      // genreContainer.querySelector('path').style.stroke = genres[genre].props.theme

      setTimeout(() => {

        const { width, height, top, left } = genreContainer.getBoundingClientRect()

        genreText.setAttribute('data-venn-text', genre)
        genreText.setAttribute('style', `
          top: ${ top + (height / 20) }px;
          left: ${ left + (width / 6) }px;
          width: ${ width - (width / 3) };
          max-height: ${ height - (height / 2.10)  }px;
        `)
        genreText.innerHTML = genres[genre].html
        genreText.classList.add('active')
      }, 1000)
        genreContainer.classList.add('active')


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
