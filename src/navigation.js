export default (selector) => {
  const navigation = document.querySelector(selector)
  const body = document.body

  body.addEventListener('click', function(e) {
    if (!navigation.classList.contains('is-hidden')) {
      navigation.classList.toggle('is-hidden')
    }
  }, false)

  navigation.addEventListener('click', function handleClick(e) {
    const { target } = e
    if (navigation.classList.contains('is-hidden')) {
      e.preventDefault()
      e.stopPropagation()
    }
    navigation.classList.toggle('is-hidden')
  }, false)

  navigation.classList.add('is-hidden')
  navigation.classList.add('is-loaded')

  return {
    navigation,
  }
}
