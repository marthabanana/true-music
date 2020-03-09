window.addEventListener('message', function (event) {
  if (event.data == "FrameHeight") {
    const body = document.body
    const html = document.documentElement
    const FrameHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    )
    event.source.postMessage({ FrameHeight }, "*");
  }
});
