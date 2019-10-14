#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const artists = [
  [ "Milton Fields","","","","","","ELECTRO","POST-PUNK","NEW WAVE","BREAKS","","","","","","","" ],
  [ "Sixonesix","HOUSE","DISCO","TECHNO","","","","","","","LEFTFIELD HOUSE","","","","","","" ],
  [ "Mr. Fox","HOUSE","DISCO","TECHNO","","","","POST-PUNK","","","LEFTFIELD HOUSE","","","","","","" ],
  [ "Rob Fleming","","","","","","","","NEW WAVE","","","","FUNK","GROOVE","","","" ],
  [ "Sofronis","","","","","","","","","","","","","","","","" ],
  [ "Marianna","","","","","","","POST-PUNK","NEW WAVE","","LEFTFIELD HOUSE","","","","","","" ],
  [ "Mohama","HOUSE","DISCO","TECHNO","","","ELECTRO","POST-PUNK","","","","","","","","","" ],
  [ "Patsas","HOUSE","DISCO","","","","","","","","","","","","","","" ],
  [ "Markus Eden","HOUSE","DISCO","TECHNO","","","","","","","","","","","UK GARAGE","","" ],
  [ "Georges D'André","HOUSE","DISCO","","","","","","","","","","","","","TECH HOUSE","" ],
  [ "Gustav","HOUSE","","TECHNO","","","ELECTRO","","","BREAK-BEAT","","","","","UK GARAGE","","" ],
  [ "Bombasoul","","","","","","","","","","","","","","","","" ],
  [ "Vsim","HOUSE","","TECHNO","","","","","","","","","","","","","" ],
  [ "Socrates","HOUSE","","TECHNO","","","ELECTRO","","","BREAKS","","","","","","","" ],
  [ "Aristodemos","HOUSE","","","","","ELECTRO","","","","","","FUNK","","","","" ],
  [ "RAW SILVER","","","TECHNO","","","","","","","LEFTFIELD HOUSE","","","","","","" ],
  [ "ALEX TOMB","","","TECHNO","","","","","","","","","","","","","" ],
  [ "Mesitis","HOUSE","","TECHNO","","","","","","BREAK-BEAT","","","","","","","" ],
  [ "ina","HOUSE","","TECHNO","","","ELECTRO","","","BREAK-BEAT","","","","","UK GARAGE","","" ],
  [ "Atesh K.","","","TECHNO","","","","","","BREAK-BEAT","","","","","","TECH HOUSE","" ],
  [ "n.o.k","HOUSE","DISCO","","","","","","","","","","FUNK","","","","" ],
  [ "Fantis","HOUSE","","TECHNO","","","","","","","","","","","","","" ],
  [ "ARGY K ","","","TECHNO","","","","","","","","","","","","","" ],
  [ "Bonch","","","TECHNO","","","","","","","","","","","","TECH HOUSE","" ],
  [ "Geechemist","","","","","","","","","","","","","","","","" ],
  [ "Plasmatic","HOUSE","","TECHNO","","","","","","","","","","","","","" ],
  [ "Marcos","HOUSE","DISCO","","","","","","NEW WAVE","","","","","","","","" ],
  [ "Cotsios o Pikatillis","","","","","","","","","","","","","","","","" ],
  [ "Alexis","","","","","","","","","","","","","","","","" ],
  [ "Plus One","","","","","","","","","","","","","","","","" ],
  [ "BillyD","HOUSE","","TECHNO","","","","","","","","","","","","","" ],
  [ "Michel Fialas","HOUSE","","TECHNO","","","","","","","","","","","","","" ],
  [ "RAIF","HOUSE","","","","","","","","","","","","","","","" ],
  [ "Kontello","HOUSE","","TECHNO","","","","","","","","","","","","TECH HOUSE","" ],
  [ "Barlic Gutter","HOUSE","DISCO","","","","","","","","","","","","","","" ],
  [ "MANIC MAIK","HOUSE","","TECHNO","","","","","","","","","","","","","" ],
  [ "Demi Consta","HOUSE","","TECHNO","","","","","","","","","","","","","" ],
  [ "Matox","HOUSE","","TECHNO","","","","","","","","","","","","TECH HOUSE","" ],
  [ "Nicolas G","HOUSE","","TECHNO","","","","","","","","","","","","TECH HOUSE","" ],
  [ "Aparapira Parape","HOUSE","DISCO","TECHNO","","","","","","","","","","","","","" ],
  [ "Slow","HOUSE","","TECHNO","","","","","","","","","","","","","" ],
  [ "Latyp","HOUSE","","TECHNO","","","","","","","","","","","","","" ],
  [ "Motif","","","TECHNO","","","","","","","","","","","","","" ],
]

function stringify(str) {
  return str.toLowerCase().replace(/\W+/g,' ').trim().replace(/\s+/g, '-')
}

artists.forEach(
 ([ long_name, ...genres]) => {
   const fileName = stringify(long_name)
   const filePath = path.join(__dirname, '../', 'data', 'artists', `${fileName}.md`)
   fs.writeFileSync(filePath, `
---
name: ${ long_name }
label: ${ long_name.split(' ').map(w => w.charAt(0).toUpperCase()).join('') }
genres:
  - ${ genres.filter(g => !!g).map(g => stringify(g) ).join('\n  - ') || 'other' }
---

# ${long_name}

![](./assets/images/sample.png)

**Lorem ipsum dolor sit amet**, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in *reprehenderit in voluptate* velit dolore eu fugiat nulla pariatur. Excepteur sint [occaecat cupidatat non proident](#/), sunt in culpa qui officia deserunt mollit anim id est laborum.

   `.trim(), 'utf-8')
 }
)
