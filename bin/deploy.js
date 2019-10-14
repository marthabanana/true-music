var ghpages = require('gh-pages')
var pgk = require('../package.json')

console.log(`Deploying ${ pgk.name }, release ${ pgk.version } to Github...`)

ghpages.publish('dist', {
    src: '**/*',
    tag: `release-${ pgk.version }`,
    message: `Release ${ pgk.version }`,
}, function(err) {
    if (err) {
        console.log(err.message || err)
        console.log('---')
        console.log('You are still in gh-pages branch and need to checkout master!')
        console.log('git checkout master')
        console.log('---')
    }
    else {
        console.log(`Release ${ pgk.version } deployed to Github!`)
    }
})
