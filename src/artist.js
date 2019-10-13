export default ({ id, html, props: { name, genres } }, { params={}, data, next, previous }) => {
  const { genre='' } = params
  const nextArtist = next && data.artists[next]
  const previousArtist = previous && data.artists[previous]

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
          ${
            previousArtist ? `
              <li class="artist-details--paging-item">
                <a href="#/${ genre }/${ previous }">
                  <span>&larr;</span>
                  ${ previousArtist.props.name }
                </a>
              </li>
            ` : ''
          }
          ${
            nextArtist ? `
              <li class="artist-details--paging-item">
                <a href="#/${ genre }/${ next }">
                  ${ nextArtist.props.name }
                  <span>&rarr;</span>
                </a>
              </li>
            ` : ''
          }
        </ul>
      </footer>
    </section>
  `
}
