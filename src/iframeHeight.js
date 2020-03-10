function getMaxHeight() {
  const { scrollHeight } = document.querySelector('#main').scrollHeight
  return scrollHeight + 200
}

export function propagateFrameHeight(context=window.top) {
  try {
    const FrameHeight = getMaxHeight()
    context.postMessage({ FrameHeight }, '*')
    return true
  } catch(e) {
    console.error('propagateFrameHeight', e)
  }
}

window.addEventListener('message', function (event) {
  if (event.data === 'FrameHeight') {
    propagateFrameHeight(event.source)
  }
});

window.addEventListener('load', e => {
  propagateFrameHeight()
})
