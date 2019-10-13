import './styles.scss'
import './assets/fonts/interstate-black.otf'
import './assets/fonts/interstate-light.otf'
import './assets/fonts/interstate-regular.otf'

import data from './data.json'

import createRoutes from './routes'
import createTheme from './theme'

createRoutes({ data })

const { style } = createTheme({ data })
document.body.append(style)
