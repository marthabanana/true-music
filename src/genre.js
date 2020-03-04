export default ({ id, html, props:{ name, theme }, lastModified, }, { artists }={}) => {

  const dummy = document.createElement('script')
  dummy.type = 'text/template'
  dummy.innerHTML = html

  const preview = dummy.querySelectorAll('img')

  console.log({ preview })

  return `
    <section id="genre-${id}" class="genre-details" data-genre="${id}">
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
