
import pathToRegExp from 'path-to-regexp'
import pathMatcher from 'path-match'

function stringify(str) {
  return str.toLowerCase().replace(/\W+/g,' ').trim().replace(/\s+/g, '-')
}
const pathMatch = pathMatcher({
  // path-to-regexp options
  // sensitive: false,
  // strict: false,
  // end: false,
})


function createRouter({ ctx } = {}) {
  const ROUTES = []

  function getHash() {
    return location.hash.slice(1) || '/'
  }

  let currentRoute
  function navigate(route) {
    console.warn('[router] go to', route)
    const matchedRoutes = ROUTES.map(
      r => ({
        ...r,
        path: route,
        match: r.matcher.exec(route),
        params: r.params(route),
      })
    ).find(r => !!r.match)

    if (currentRoute && typeof currentRoute.cb.exit === 'function') {
      document.body.setAttribute(`data-route-exiting`, currentRoute.path)
      document.body.setAttribute(`data-route-exiting-route`, stringify(currentRoute.route))
      console.warn(`[router] exit ${currentRoute ? currentRoute.path : null}`, { currentRoute, })
      currentRoute.cb.exit(currentRoute || {}, matchedRoutes)
    }

    const newRoute = [matchedRoutes].find(r => {
      const result = r.cb.enter({ ...r }, currentRoute || {})
      if (result === false) {
        return false
      }
      return true
    })

    if (newRoute) {
      location.hash = `#${route}`

      console.warn(`[router] enter ${route}`, { newRoute, currentRoute })

      document.body.setAttribute(`data-route-path`, newRoute.path)
      document.body.setAttribute(`data-route-route`, stringify(newRoute.route))
      document.body.removeAttribute(`data-route-exiting`)
      document.body.removeAttribute(`data-route-exiting-route`)

      currentRoute = {
        path: route,
        ...newRoute
      }
    }
  }

  function router(route, cb) {
    const loc = getHash()
    if (typeof route === 'string') {
      if (arguments.length === 2 && cb && (typeof cb === 'function' || cb.enter)) {
        const matcher = pathToRegExp(route)
        ROUTES.push({
          route,
          cb,
          matcher,
          params: pathMatch(route),
        })
        console.debug('added route', route, ROUTES, matcher.exec(loc))
        if (matcher.exec(loc)) {
          navigate(loc)
        }
      }
      else if (arguments.length === 1) {
        navigate(route)
      }
    }
    else if (arguments.length === 0) {
      navigate(loc)
    }
  }

  window.addEventListener("hashchange", () => router(), false);

  return router
}

export default createRouter
