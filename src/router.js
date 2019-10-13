
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
    console.log('go to', route)
    const matchedRoutes = ROUTES.map(
      r => ({
        ...r,
        path: route,
        match: r.matcher.exec(route),
        params: r.params(route),
      })
    ).filter(r => r.match)

    console.log('go to', matchedRoutes)

    if (currentRoute && typeof currentRoute.cb.exit === 'function') {
      document.body.setAttribute(`data-route-exiting`, currentRoute.path)
      document.body.setAttribute(`data-route-exiting-route`, stringify(currentRoute.route))
      currentRoute.cb.exit({})
      console.warn(`[router] exit ${currentRoute ? currentRoute.path : null}`, { currentRoute, })
    }

    if (matchedRoutes) {
      location.hash = `#${route}`
      const newRoute = matchedRoutes.find(async r => {
        const result = r.cb.enter({ ...r }, currentRoute)
        if (result === false) {
          return false
        }
        return true
      })
      console.warn(`[router] enter ${route}`, { newRoute, currentRoute })
      if (newRoute) {
        document.body.setAttribute(`data-route-path`, newRoute.path)
        document.body.setAttribute(`data-route-route`, stringify(newRoute.route))
        document.body.removeAttribute(`data-route-exiting`)
        document.body.removeAttribute(`data-route-exiting-route`)
        currentRoute = newRoute
      }
    }
  }

  function router(route, cb) {
    const loc = getHash()
    if (typeof route === 'string') {
      if (arguments.length === 2 && cb &&
          (typeof cb === 'function') || cb.enter) {
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
