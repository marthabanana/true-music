var GENRES = {
  LEFTFIELD: [],
  HOUSE: [],
  TECHNO: [],
  DISCO: [],
  FUNK_WORLD: [],
  REGGAE: [],
  DRUM_N_BASS: [],
  PSYCHEDELIC: [],
  HIP_HOP: [],
  OTHER: []
}


var ARTISTS = {
  MILTON_FIELDS: {
    name: 'MILTON_FIELDS',
    genres: [ 'LEFTFIELD', 'TECHNO' ]
  },
  SPIVAK: {
    name: 'SPIVAK',
    genres: [ 'LEFTFIELD', ]
  },
  SIXONESIX: {
    name: 'SIXONESIX',
    genres: [ 'LEFTFIELD', ]
  },
  MR_FOX: {
    name: 'MR_FOX',
    genres: [ 'LEFTFIELD', 'DISCO' ]
  },
  LAMBROS: {
    name: 'LAMBROS',
    genres: [ 'LEFTFIELD', ]
  },
  FLEMING: {
    name: 'FLEMING',
    genres: [ 'LEFTFIELD', ]
  },
  SOFRONIS: {
    name: 'SOFRONIS',
    genres: [ 'LEFTFIELD', 'FUNK_WORLD', 'OTHER' ]
  },
  BANDINI: {
    name: 'BANDINI',
    genres: [ 'LEFTFIELD', ]
  },
  DUMAL: {
    name: 'DUMAL',
    genres: [ 'LEFTFIELD', ]
  },
  MARIANNA: {
    name: 'MARIANNA',
    genres: [ 'LEFTFIELD', ]
  },
  ALEXIS: {
    name: 'ALEXIS',
    genres: [ 'LEFTFIELD', ]
  },
  NAYIA: {
    name: 'NAYIA',
    genres: [ 'LEFTFIELD' ],
  },
  MOHAMA_TAJALOF: {
    name: 'MOHAMA_TAJALOF',
    genres: [ 'LEFTFIELD', 'TECHNO' ]
  },
  MARCUS_EDEN: {
    name: 'MARCUS_EDEN',
    genres: [ 'HOUSE', 'DRUM_N_BASS' ]
  },
  GEORGE_DANDRE: {
    name: 'GEORGE_DANDRE',
    genres: [ 'HOUSE', 'DISCO' ]
  },
  BOMBASOUL: {
    name: 'BOMBASOUL',
    genres: [ 'HOUSE', 'DISCO' ]
  },
  BILLYD: {
    name: 'BILLYD',
    genres: [ 'HOUSE' ]
  },
  FIALAS: {
    name: 'FIALAS',
    genres: [ 'HOUSE' ]
  },
  ARISTODEMOS: {
    name: 'ARISTODEMOS',
    genres: [ 'HOUSE', 'DISCO' ]
  },
  FANTIS: {
    name: 'FANTIS',
    genres: [ 'HOUSE' ]
  },
  ZIGY: {
    name: 'ZIGY',
    genres: [ 'HOUSE' ]
  },
  KINEZA: {
    name: 'KINEZA',
    genres: [ 'HOUSE' ]
  },
  PAUL_LAZA: {
    name: 'PAUL_LAZA',
    genres: [ 'HOUSE', 'DISCO' ]
  },
  MANICMIKE: {
    name: 'MANICMIKE',
    genres: [ 'HOUSE', 'TECHNO' ]
  },
  BONBON: {
    name: 'BONBON',
    genres: [ 'HOUSE' ]
  },
  MPAKKALIS: {
    name: 'MPAKKALIS',
    genres: [ 'HOUSE' ]
  },
  DEMI: {
    name: 'DEMI',
    genres: [ 'HOUSE' ]
  },
  KN: {
    name: 'KN',
    genres: [ 'HOUSE' ]
  },
  DANNY: {
    name: 'DANNY',
    genres: [ 'HOUSE' ]
  },
  PAT_SIAZ: {
    name: 'PAT_SIAZ',
    genres: [ 'HOUSE' ]
  },
  GIO: {
    name: 'GIO',
    genres: [ 'HOUSE' ]
  },
  DJK: {
    name: 'DJK',
    genres: [ 'HOUSE' ]
  },
  PAZZI: {
    name: 'PAZZI',
    genres: [ 'HOUSE' ]
  },
  MOSES: {
    name: 'MOSES',
    genres: [ 'HOUSE' ]
  },
  ANGELIKI: {
    name: 'ANGELIKI',
    genres: [ 'HOUSE' ]
  },
  APARAPIRA: {
    name: 'APARAPIRA',
    genres: [ 'HOUSE' ]
  },
  MEMO: {
    name: 'MEMO',
    genres: [ 'HOUSE' ]
  },
  VANKON: {
    name: 'VANKON',
    genres: [ 'HOUSE' ]
  },
  KALAQS: {
    name: 'KALAQS',
    genres: [ 'HOUSE', 'TECHNO' ]
  },
  CHEMIST: {
    name: 'CHEMIST',
    genres: [ 'HOUSE' ]
  },
  TSIAMIS: {
    name: 'TSIAMIS',
    genres: [ 'HOUSE' ]
  },
  SAVVIDES: {
    name: 'SAVVIDES',
    genres: [ 'HOUSE' ]
  },
  MARCOS: {
    name: 'MARCOS',
    genres: [ 'HOUSE', 'DISCO' ]
  },
  PATSAS: {
    name: 'PATSAS',
    genres: [ 'HOUSE', 'DISCO' ]
  },
  COACH: {
    name: 'COACH',
    genres: [ 'HOUSE', 'DISCO' ]
  },
  TONY: {
    name: 'TONY',
    genres: [ 'HOUSE' ]
  },
  NOK: {
    name: 'NOK',
    genres: [ 'HOUSE' ]
  },
  ASHIOTIS: {
    name: 'ASHIOTIS',
    genres: [ 'HOUSE' ]
  },
  SOBOMONK: {
    name: 'SOBOMONK',
    genres: [ 'HOUSE', 'TECHNO' ]
  },
  VONIATI: {
    name: 'VONIATI',
    genres: [ 'HOUSE' ]
  },

  PLASMATIK: {
    genres: [ 'TECHNO' ]
  },
  PLUSONE: {
    genres: [ 'TECHNO' ]
  },
  INA: {
    genres: [ 'TECHNO' ]
  },
  ALEX_TOMB: {
    genres: [ 'TECHNO' ]
  },
  NICOLA_P: {
    genres: [ 'TECHNO' ]
  },
  PM: {
    genres: [ 'TECHNO' ]
  },
  DIMI_KASS: {
    genres: [ 'TECHNO' ]
  },
  NICOLAS_G: {
    genres: [ 'TECHNO' ]
  },
  MATOX: {
    genres: [ 'TECHNO' ]
  },
  FIALAS: {
    genres: [ 'TECHNO' ]
  },
  BORISOV: {
    genres: [ 'TECHNO' ]
  },
  DEEPNA: {
    genres: [ 'TECHNO' ]
  },
  DALTON: {
    genres: [ 'TECHNO' ]
  },
  VETERANOS: {
    genres: [ 'TECHNO' ]
  },
  ELENKRIG: {
    genres: [ 'TECHNO' ]
  },
  LOS_CIERVOS: {
    genres: [ 'TECHNO' ]
  },
  KONTELLO: {
    genres: [ 'TECHNO' ]
  },
  JORGE_PLATA: {
    genres: [ 'TECHNO' ]
  },
  MARCETA: {
    genres: [ 'TECHNO' ]
  },
  VALENTINO_ASSIOTI: {
    genres: [ 'TECHNO' ]
  },
  RAIF: {
    genres: [ 'TECHNO' ]
  },
  ARGY_K: {
    genres: [ 'TECHNO' ]
  },
  ATESH_K: {
    genres: [ 'TECHNO' ]
  },
  TOTI_K: {
    genres: [ 'TECHNO' ]
  },
  CIPRIAN: {
    genres: [ 'TECHNO' ]
  },
  SLOW: {
    genres: [ 'TECHNO' ]
  },
  LATYP: {
    genres: [ 'TECHNO' ]
  },
  MAYO: {
    genres: [ 'TECHNO' ]
  },
  ESTEP: {
    genres: [ 'TECHNO' ]
  },
  MESITIS: {
    genres: [ 'TECHNO' ]
  },
  SOCRATES: {
    genres: [ 'TECHNO' ]
  },
  GUSTAV: {
    genres: [ 'TECHNO' ]
  },
  VSIM: {
    genres: [ 'TECHNO' ]
  },
  SPORTINGLUB: {
    genres: [ 'TECHNO' ]
  },
  MOTIF: {
    genres: [ 'TECHNO' ]
  },
  DAOUTIS: {
    genres: [ 'TECHNO' ]
  },
  SOULDEEP: {
    genres: [ 'TECHNO' ]
  },
  PRIVILEGE: {
    genres: [ 'TECHNO' ]
  },
  QASH: {
    genres: [ 'TECHNO' ]
  },
  ALEX_CLE: {
    genres: [ 'TECHNO' ]
  },
  THALIS: {
    genres: [ 'TECHNO' ]
  },
  JOHNNYROOM: {
    genres: [ 'TECHNO' ]
  },
  RAW_SILVER: {
    genres: [ 'TECHNO' ]
  },
  JORALSKY: {
    genres: [ 'TECHNO' ]
  },
  NIKOMAS: {
    genres: [ 'TECHNO' ]
  },
  RAT: {
    genres: [ 'TECHNO' ]
  },
  WANDER_WONDER: {
    genres: [ 'TECHNO' ]
  },
  UVGLOV: {
    genres: [ 'TECHNO' ]
  },

  COTSIOS_PIKATILLIS: {
    genres: [ 'DISCO', 'FUNK_WORLD' ],
  },
  AFRO_FOX: {
    genres: [ 'DISCO' ],
  },
  HARRY_BORG: {
    genres: [ 'DISCO' ],
  },

  DJ_MAGOS: {
    genres: [ 'FUNK_WORLD', 'HIP_HOP' ]
  },
  CHARIS: {
    genres: [ 'FUNK_WORLD' ]
  },
  VASSILIS_PALAMAS: {
    genres: [ 'FUNK_WORLD' ]
  },
  KOULLA_KATSIKORONOU: {
    genres: [ 'FUNK_WORLD' ]
  },
  CLAUDIO: {
    genres: [ 'FUNK_WORLD', 'OTHER' ]
  },
  MESKALIDO_SOUNDS: {
    genres: [ 'FUNK_WORLD' ]
  },
  RADIO_PANGEA: {
    genres: [ 'FUNK_WORLD' ]
  },
  KRAOU: {
    genres: [ 'FUNK_WORLD' ]
  },

  JAH_STAR: {
    genres: [ 'REGGAE' ]
  },
  HIGH_STATION: {
    genres: [ 'REGGAE' ]
  },
  ROOTS_CREW: {
    genres: [ 'REGGAE' ]
  },
  DJ_MONDAY: {
    genres: [ 'REGGAE' ]
  },
  SELECTOR_RED: {
    genres: [ 'REGGAE' ]
  },
  CONSTANTINOS: {
    genres: [ 'REGGAE' ]
  },
  PAN_KHAOS: {
    genres: [ 'REGGAE' ]
  },
  ANTONIS: {
    genres: [ 'REGGAE' ]
  },
  DUB_THOMAS: {
    genres: [ 'REGGAE' ]
  },
  ANDREAS_KASSOS: {
    genres: [ 'REGGAE' ]
  },
  JOHNNY_BLUE: {
    genres: [ 'REGGAE', 'PSYCHEDELIC' ]
  },
  CONSTANTINOS_HADJIPETROU: {
    genres: [ 'REGGAE' ]
  },
  SUZIE_SELECTA: {
    genres: [ 'REGGAE' ]
  },
  LONTOS: {
    genres: [ 'REGGAE' ]
  },
  MED_DRED: {
    genres: [ 'REGGAE' ]
  },
  HADJIMIKE:     {
    genres: [ 'REGGAE' ]
  },
  PANARETOU_JR: {
    genres: [ 'REGGAE' ]
  },
  MRS_HCN: {
    genres: [ 'REGGAE' ]
  },
  PORTIERO: {
    genres: [ 'REGGAE' ]
  },
  MINERALS: {
    genres: [ 'REGGAE', 'PSYCHEDELIC' ]
  },
  SYRINA: {
    genres: [ 'REGGAE' ]
  },

  VY: {
    genres: [ 'DRUM_N_BASS' ],
  },
  SPEKTRON: {
    genres: [ 'DRUM_N_BASS', 'PSYCHEDELIC' ],
  },
  PHAT_FINX: {
    genres: [ 'DRUM_N_BASS' ],
  },
  SLACK_DJ: {
    genres: [ 'DRUM_N_BASS' ],
  },
  TOMMY: {
    genres: [ 'DRUM_N_BASS' ],
  },
  GROUNDERX: {
    genres: [ 'DRUM_N_BASS' ],
  },
  DMITRY_NE: {
    genres: [ 'DRUM_N_BASS' ],
  },
  PHIL_G: {
    genres: [ 'DRUM_N_BASS' ],
  },
  AIVITA: {
    genres: [ 'DRUM_N_BASS' ],
  },
  KNEB: {
    genres: [ 'DRUM_N_BASS' ],
  },
  DJ_SIPHER: {
    genres: [ 'DRUM_N_BASS' ],
  },
  ANUBIS: {
    genres: [ 'DRUM_N_BASS' ],
  },
  NOMADIK: {
    genres: [ 'DRUM_N_BASS' ],
  },
  JUST_JACKSON: {
    genres: [ 'DRUM_N_BASS' ],
  },

  ACID_BUBBLE: {
    genres: [ 'PSYCHEDELIC' ]
  },
  MARATUS: {
    genres: [ 'PSYCHEDELIC' ]
  },
  REEVOKE: {
    genres: [ 'PSYCHEDELIC' ]
  },
  KACID: {
    genres: [ 'PSYCHEDELIC' ]
  },
  TSETSOSTERON: {
    genres: [ 'PSYCHEDELIC' ]
  },
  ONEIRONAUT: {
    genres: [ 'PSYCHEDELIC' ]
  },
  CLAW: {
    genres: [ 'PSYCHEDELIC' ]
  },
  SENSIGRAM: {
    genres: [ 'PSYCHEDELIC' ]
  },
  ZAIKLOPHOBIA: {
    genres: [ 'PSYCHEDELIC' ]
  },
  KOMFUZIUS: {
    genres: [ 'PSYCHEDELIC' ]
  },
  TRIPPING_GURUS: {
    genres: [ 'PSYCHEDELIC' ]
  },
  B_PSYCHO: {
    genres: [ 'PSYCHEDELIC' ]
  },
  PSYCLOPS: {
    genres: [ 'PSYCHEDELIC' ]
  },
  MOJO: {
    genres: [ 'PSYCHEDELIC' ]
  },
  PSYBAMARU: {
    genres: [ 'PSYCHEDELIC' ]
  },
  MISTER_SAIKO: {
    genres: [ 'PSYCHEDELIC' ]
  },
  CHAANGA: {
    genres: [ 'PSYCHEDELIC' ]
  },
  CENTAURO: {
    genres: [ 'PSYCHEDELIC' ]
  },
  ZEN: {
    genres: [ 'PSYCHEDELIC' ]
  },
  NOMAD_25: {
    genres: [ 'PSYCHEDELIC' ]
  },
  STITCH: {
    genres: [ 'PSYCHEDELIC' ]
  },
  DIGITALX: {
    genres: [ 'PSYCHEDELIC' ]
  },
  MR_RIGHT: {
    genres: [ 'PSYCHEDELIC' ]
  },

  ANDREAS_ALEX: {
    genres: [ 'HIP_HOP' ],
  },
  D_PRANK: {
    genres: [ 'HIP_HOP' ],
  },
  DJ_BKAS: {
    genres: [ 'HIP_HOP' ],
  },

  PUEBLO_FRANCO: {
    genres: [ 'OTHER' ],
  },
  MIGHTY_SCOOP: {
    genres: [ 'OTHER' ],
  },
  DR_CORDOBA: {
    genres: [ 'OTHER' ],
  },
  PANAIS_PLAYS: {
    genres: [ 'OTHER' ],
  },
  COSTAS_SAVVIDES: {
    genres: [ 'OTHER' ],
  },
  POL_EM: {
    genres: [ 'OTHER' ],
  },
  MR_PAKMAN: {
    genres: [ 'OTHER' ],
  },
  STEF: {
    genres: [ 'OTHER' ],
  },
  KARA: {
    genres: [ 'OTHER' ],
  },
  MASHA: {
    genres: [ 'OTHER' ],
  },
  ANDY_PERVINCA: {
    genres: [ 'OTHER' ],
  },

}
