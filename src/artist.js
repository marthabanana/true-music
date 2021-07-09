import navArrows from './assets/images/nav-prev-next.png'

export default ({ id, html, props: { name, genres } }, { params={}, data:{ artists, genres:allGenres }, next, previous }) => {
  const { genre='' } = params
  const nextArtist = next && artists[next]
  const previousArtist = previous && artists[previous]
  const nextArtistStyle = `
    background-image: url('${ navArrows }');
    background-position: right center;
    left: 0;
  `
  const previousArtistStyle = `
    background-image: url('${ navArrows }');
    background-position: left center;
    right: 0;
  `

  genres = Object.keys(allGenres).filter(g => genres.indexOf(g) !== -1)

  return `
    <section id="artist-${id}" class="artist-details" data-genre-artist="${ genre }">
      <main>
        ${ html }
      </main>
      <footer>
        <ol class="artist-details--genres">
          ${
            genres.map(
              otherGenre => `<li class="artist-details--genres-item ${ otherGenre === genre ? 'is-active' : '' }"><a href="#/${otherGenre}">${ otherGenre }</a></li>`
            ).join('')
          }
        </ol>
        <ul class="artist-details--paging">
          <li class="artist-details--paging-item paging-item paging-item--previous">
          ${
            previousArtist
            ? `<a href="#/${ genre }/${ previous }">
              ${ previousArtist.props.name }
              <span class="paging-item--arrow" style="${previousArtistStyle}">&larr;</span>
            </a>`
            : ''
          }
          </li>
            <li class="artist-details--paging-item paging-item paging-item--next">
            ${
              nextArtist
              ? `<a href="#/${ genre }/${ next }">
                <span class="paging-item--arrow" style="${nextArtistStyle}">&rarr;</span>
                ${ nextArtist.props.name }
              </a>`
              : ''
            }
          </li>
        </ul>

        <ul class="artist-details--paging">
          <li class="artist-details--paging-item paging-item paging-item--previous">
            <a href="#/${ genre }">
              Back
              <span class="paging-item--arrow" style="${previousArtistStyle}">&larr;</span>
            </a>
          </li>
        </ul>
      </footer>
    </section>
  `
}
