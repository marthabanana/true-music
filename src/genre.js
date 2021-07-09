import navArrows from './assets/images/nav-prev-next.png'

export default ({ id, html, props:{ name, theme }, lastModified, }, { artists }={}) => {
  const backBtnStyle = `
    background-image: url('${ navArrows }');
    background-position: left center;
    right: 0;
  `

  return `
    <section id="genre-${id}" class="genre-details" data-genre="${id}">
      <span class="paging-item paging-item--previous" style="display: block;margin: 0 auto 30px;width: 40px;">
        <a href="#/" title="Back">
          Back
          <span class="paging-item--arrow" style="${backBtnStyle}">&larr;</span>
        </a>
      </span>
      <main>
        ${html}
      </main>
      <footer>
        <h3 class="genre-artists--title">Most Recently Added</h3>
        <ol class="genre-artists">
        ${
          artists.map(
            ({ id: artistId, html, props: { name, image  } }) =>
            `<li class="genre-artists--artist">
              <a href="#/${id}/${artistId}">
              <h1>${name}</h1>
              ${
                image ? `<img src="${image}" alt="${ name }" />` : ''
              }
              </a>
            </li>`
          ).join('')
        }
        </ol>
      </footer>
    </section>
  `
}
