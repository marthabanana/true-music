export default ({ data }) => {
  const style = document.createElement('style')
  style.setAttribute('type', 'text/css')

  const genreThemes = Object.keys(data.genres).reduce((m, genre) => {
    const { theme } = data.genres[genre].props

    return `
      ${m}
      g[data-venn-sets="${genre}"] ~ g.venn-circle {
        visibility: hidden;
      }
      g[data-venn-sets="${genre}"].active ~ g.venn-circle {
        visibility: visible;
      }
      g[data-venn-sets="${genre}"] {
        visibility: visible !important;
        text-transform: uppercase;
      }
      g[data-venn-sets="${genre}"] path {
        stroke: ${ theme } !important;
        fill: #000;
        stroke-width: 10px;
      }

      g[data-venn-sets^="${genre}::"] path {
        fill: ${ theme } !important;
        stroke: #000;
        stroke-width: 5px ;
      }

      g[data-venn-sets="${genre}"].active path {
        stroke-width: 20px ;
      }
      div[data-venn-text="${genre}"] h1 {
        color: ${ theme };
      }
      body[data-route-path="/${ genre }"] div[data-venn-text="${genre}"] {
        display: block;
      }
      body[data-route-path^="/${ genre }/"] {
        background-color: ${ theme };
      }
      [data-navigate-to="${genre}"] {
         color: ${ theme };
      }
      [data-navigate-to="${genre}"] a:active {
        color: #fff !important;
        background-color: ${ theme };
      }
    `
  }, ``)

  style.innerHTML = genreThemes

  return {
    style
  }
}
