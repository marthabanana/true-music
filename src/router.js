import pathToRegExp from 'path-to-regexp'
import pathMatcher from 'path-match'

function stringify(str) {
  return str.toLowerCase().replace(/\W+/g,' ').trim().replace(/\s+/g, '-')
}

const pathMatch = pathMatcher()

function createRouter({ ctx } = {}) {
  const ROUTES = []

  function getHash() {
    return location.hash.slice(1) || '/'
  }

  let currentRoute
  function navigate(route) {
    const matchedRoute = ROUTES.map(
      r => ({
        ...r,
        path: route,
        match: r.matcher.exec(route),
        params: r.params(route),
      })
    ).find(r => !!r.match)

    if (currentRoute) {
      document.body.setAttribute(`data-route-exiting`, currentRoute.path)
      document.body.setAttribute(`data-route-exiting-route`, stringify(currentRoute.route))

      currentRoute.callbacks.forEach(cb => {
        if (cb && typeof cb.exit === 'function') {
          cb.exit(currentRoute || {}, matchedRoute)
        }
      })
    }

    const { callbacks } = matchedRoute

    callbacks.forEach(cb => {
      let fn
      if (typeof cb === 'function') {
        fn = cb
      }
      else if (typeof cb.enter === 'function') {
        fn = cb.enter
      }
      if (!fn) {
        return
      }
      fn(matchedRoute, currentRoute || {})
    })

    location.hash = `#${route}`

    console.warn(`[router] enter ${route}`, { matchedRoute, currentRoute })

    document.body.setAttribute(`data-route-path`, matchedRoute.path)
    document.body.setAttribute(`data-route-route`, stringify(matchedRoute.route))
    document.body.removeAttribute(`data-route-exiting`)
    document.body.removeAttribute(`data-route-exiting-route`)

    requestAnimationFrame(() => window.scrollTo(0, 0))

    currentRoute = {
      path: route,
      ...matchedRoute
    }
  }

  function router(route, ...callbacks) {
    const loc = getHash()
    if (typeof route === 'string') {
      if (arguments.length >= 2) {
        callbacks = callbacks.filter(
          cb => cb && (typeof cb === 'function' || cb.enter)
        )
        const matcher = pathToRegExp(route)
        ROUTES.push({
          route,
          callbacks,
          matcher,
          params: pathMatch(route),
        })
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
