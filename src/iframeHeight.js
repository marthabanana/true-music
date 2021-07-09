import postMessage from './postMessage'

const main = document.querySelector('#main')

function getPageHeight() {
  const { scrollHeight } = main
  const { top } = main.getBoundingClientRect()
  return scrollHeight + top + 50
}

let previous = null
let frameHeightTimeout = null
let lastCall = null
export function propagateFrameHeight(context=window.top) {

  try {
    const pageHeight = Math.floor(getPageHeight())

    if (!previous || pageHeight !== previous) {
      postMessage(context, { pageHeight })

      if (frameHeightTimeout) {
        clearTimeout(frameHeightTimeout)
      }

      frameHeightTimeout = setTimeout(
        () => propagateFrameHeight(context)
        , 200
      )
    }

    previous = pageHeight
    lastCall = Date.now()

    return true
  } catch(e) {
    console.error('propagateFrameHeight', e)
  }
}

window.addEventListener('message', function (event) {
  if (event.data === 'pageHeight') {
    propagateFrameHeight(event.source)
  }
});

window.addEventListener('load', e => {
  propagateFrameHeight()
})

window.addEventListener('resize', e => {
  propagateFrameHeight()
})

if (window !== window.top) {
  document.body.classList.add('in-frame')
}

