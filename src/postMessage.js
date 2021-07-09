let state = {}

function postMessage(receiver=window.top, message={}) {
  const changes = Object.keys(message).reduce((m, key) => {
    if (!state.hasOwnProperty(key) || state[key] !== message[key]) {
      m[key] = message[key]
    }
    return m
  }, {})

  if (!Object.keys(changes).length) {
    console.debug(`[postMessage] No changes to push for message:`)
    console.debug(message)
    return false
  }

  state = {
    ...state,
    ...changes,
  }

  console.debug('[postMessage]', changes)

  receiver.postMessage(changes, '*')

  return changes
}


export default postMessage
