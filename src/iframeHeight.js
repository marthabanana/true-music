function getMaxHeight() {
  const { scrollHeight } = document.querySelector('#main')
  return scrollHeight + 200
}

export function propagateFrameHeight(context=window.top, previous) {
  try {
    const FrameHeight = getMaxHeight()
    if (!previous || FrameHeight !== previous) {
      context.postMessage({ FrameHeight }, '*')
      setTimeout(() => propagateFrameHeight(context, FrameHeight), 200)
    }
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
