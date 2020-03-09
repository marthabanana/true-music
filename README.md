# Ballantine's True Music Cyprus

### iFrame Installation

1. Add the iframe in your page.

```html
<iframe id="BTMCFrame" src="https://www2.afrobananarepublic.com/true-music" onload="resizeBTMCFrame(this)"></iframe>
```

2. Create the `resizeBTMCFrame` function that posts a message to the iframe to retrieve its height.

```js
function resizeBTMCFrame(frame) {
    frame.contentWindow.postMessage('FrameHeight', '*')
}
```

3. Add an event listerner to handle the received height from the iframe and adjust the frame's height.

```js
window.addEventListener('message', function (event) {
    if (event.data.hasOwnProperty('FrameHeight')) {
        document.getElementById('BTMCFrame').style.height = event.data.FrameHeight + 'px'
    }
})
```
