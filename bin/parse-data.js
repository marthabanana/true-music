#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const yamlFront = require('yaml-front-matter')
const md = require('markdown-it')({
  html: true,
})
const chokidar = require('chokidar')

const dataPath = path.join(__dirname, '../', 'data')

function parseFile(filePath) {
  const fileName = filePath.split('/').pop()
  if (filePath.match(/\.md$/)) {
    console.log('[parse] markdown', fileName)
    const contents = fs.readFileSync(filePath, 'utf-8')
    const { mtime: lastModified } = fs.statSync(filePath)
    const { __content, ...props } = yamlFront.loadFront(contents)
    const html = md.render(__content)
    return {
      id: filePath.split('/').slice(-1).join('::').replace(/\..+$/,''),
      // path: filePath,
      lastModified,
      props,
      html,
    }
  }
}

function exportData(data) {
  fs.writeFileSync(path.join(__dirname, '../src/data.json'), JSON.stringify(data, true, 2), 'utf-8')
}

const data = {
  artists: {},
  genres: {},
}

console.log(`watching ${dataPath} for changes...`)
const watcher = chokidar.watch(dataPath)

watcher.on('all', (event, filePath) => {
  const folder = filePath.split('/').slice(-2)[0]
  const fileName = filePath.split('/').pop()
  console.log(`change: ${folder} ${fileName}`)
  if (folder === 'genres') {
    const genre = parseFile(filePath)
    if (genre) {
      data.genres[genre.id] = genre
      exportData(data)
    }
  }
  else if (folder === 'artists') {
    const artist = parseFile(filePath)
    if (artist) {
      data.artists[artist.id] = artist
      exportData(data)
    }
  }
  else if (fileName.match(/\.(png|jpe?g|gif)$/)) {
    console.log('[parse] image', fileName)
    fs.copyFileSync(filePath, path.join(__dirname, '../dist/assets/images', fileName))
  }
})
