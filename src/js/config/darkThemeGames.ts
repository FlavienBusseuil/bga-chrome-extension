import { getColorForDarkMode } from "../utils/misc/colors";
import { waitForObj } from '../utils/misc/wait';

export interface GameConfig {
  customBack?: boolean | string[];
  customPanel?: boolean;
  twoTeams?: boolean;
  overlay?: boolean;
  customDarkMode?: {
    className: string;
    applyGeneralCss: boolean;
  };
  customPlayerStyle?: string;
  playersBack?: string[];
  playersBorder?: string[];
  playersOutline?: string[];
  playersTextColor?: string[];
  customColors?: string[];
  customActions?: {
    init: (cssPath: string) => void;
    setDarkMode?: (darkMode: boolean) => void;
    isDarkMode?: () => Promise<boolean>;
  };
}

export const gamesConfiguration: Record<string, GameConfig> = {
  ageofinnovation: {
    customColors: ["#971923", "#278139", "#70421d", "#1a2126", "#f9ae18", "#1d7ddb"]
  },
  agestofrobinhood: {
    customBack: true,
    overlay: true
  },
  agricola: {
    customBack: true
  },
  ahoy: {
    customPanel: true
  },
  aiye: {
    customPanel: true
  },
  almadi: {
    customPlayerStyle: ".playgroundContainer h2"
  },
  altay: {
    customColors: ["#000000", "#ebb41b", "#e12129", "#00a7d2", "#47a34b"]
  },
  ancientknowledge: {
    customBack: true,
    overlay: true
  },
  aniversus: {
    customBack: true
  },
  apiary: {
    customBack: ["custom-background"],
    customPanel: true
  },
  aquarius: {
    customBack: true
  },
  aquatica: {
    customBack: true,
    customPlayerStyle: ".player-table-board h3"
  },
  arigato: {
    customBack: ["vgincLib_thematic_background_on"]
  },
  architectsofamytis: {
    customBack: true
  },
  arctic: {
    customBack: true
  },
  arboretum: {
    customPlayerStyle: ".player-table h3.title",
    playersBorder: ["#player-table-{{player_id}}", "#player-table-{{player_id}} h3"],
    playersTextColor: ["#player-table-{{player_id}} h3.title"]
  },
  arknova: {
    customBack: true
  },
  arknovamw: {
    customBack: true
  },
  asteria: {
    customBack: true,
    customPanel: true
  },
  azul: {
    customBack: true,
    overlay: true
  },
  azulduel: {
    customBack: true
  },
  azulsummerpavilion: {
    customBack: true,
    overlay: true,
    customPlayerStyle: ".player-name.color",
    playersBorder: ["#player-table-wrapper-{{player_id}} .player-name-box", "#player-table-wrapper-{{player_id}} .player-table"],
    playersTextColor: ["#player-name-shift-{{player_id}}"]
  },
  babydinosaurrescue: {
    playersTextColor: ["[style^=\"color:#{{player_color}}\"]"]
  },
  bagofchips: {
    customPlayerStyle: "#tables .name-wrapper",
    playersBorder: ["#player-table-{{player_id}}"]
  },
  bamboozle: {
    customBack: true,
    overlay: true
  },
  bang: {
    playersBorder: ["#bang-player-{{player_id}} .bang-player-container[style^=\"border: 2px\"]"]
  },
  barrage: {
    overlay: true,
    customActions: {
      init: (cssPath: string) => {
        document.body.style.setProperty("--back-0", `url(${cssPath}img/ui/texture.jpg)`);
        document.body.style.setProperty("--back-1", `url(${cssPath}img/ui/texture_light.jpg)`);
      }
    }
  },
  battlespiritssaga: {
    customBack: true
  },
  beasts: {
    customBack: true,
    overlay: true
  },
  bebop: {
    customBack: true
  },
  beerbread: {
    customBack: true
  },
  belote: {
    twoTeams: true
  },
  betta: {
    customBack: true
  },
  beyond: {
    customBack: true,
    customActions: {
      init: (cssPath: string) => {
        document.body.style.setProperty("--playmat1", `url(${cssPath}img/BYD_Playmat.jpg)`);
        document.body.style.setProperty("--playmat2", `url(${cssPath}img/BYD_Playmat2.jpg)`);
      }
    }
  },
  beyondthesun: {
    customBack: true
  },
  bigmonster: {
    customBack: true
  },
  biomos: {
    customPlayerStyle: "#playersboard div[id^=\"playerposition_\"]"
  },
  bloodrage: {
    customBack: true
  },
  bootydice: {
    customBack: true,
    overlay: true,
    playersBorder: ["#tuto_pp{{player_index_1}}"]
  },
  bossquest: {
    customBack: true
  },
  bunnyboom: {
    customBack: true,
    overlay: true
  },
  bunnykingdom: {
    customBack: true
  },
  butterfly: {
    customPlayerStyle: ".playerHand h3"
  },
  cafe: {
    customBack: true
  },
  cairocorridor: {
    customColors: ["#000000"]
  },
  cannonades: {
    customBack: true,
    customPlayerStyle: ".player-table .c-title"
  },
  canvas: {
    customBack: true
  },
  captainflip: {
    customBack: true
  },
  capybarancapybara: {
    customBack: true
  },
  cardia: {
    customBack: true,
    customPanel: true
  },
  carnegie: {
    customBack: true
  },
  carnuta: {
    customBack: true,
    overlay: true
  },
  carsoncity: {
    customBack: true
  },
  cartographers: {
    customBack: true,
    overlay: true
  },
  castlecombo: {
    customBack: true,
    playersBorder: ["#player-table-{{player_id}}"]
  },
  castleofmadkingludwig: {
    customBack: true
  },
  castlesofcaleira: {
    customBack: true
  },
  catannewenergies: {
    customBack: true
  },
  cathood: {
    customBack: true
  },
  catinthebox: {
    customBack: true
  },
  caverna: {
    customBack: true
  },
  century: {
    customBack: true
  },
  challengers: {
    customBack: ["challengers-pref-background-dark"]
  },
  challengersbeachcup: {
    customBack: ["challengers-pref-background-dark"]
  },
  charuma: {
    customBack: true,
    overlay: true
  },
  cheeztricks: {
    overlay: true
  },
  chemicaloverload: {
    customPlayerStyle: ".player-table > h3"
  },
  chromino: {
    customBack: true
  },
  citadels: {
    customBack: true,
    overlay: true
  },
  cities: {
    customBack: true
  },
  clashofdecks: {
    customBack: true
  },
  classifiedinformation: {
    playersBorder: ["#player-guard-{{player_id}}"]
  },
  coatl: {
    customBack: true,
    customPanel: true
  },
  codexnaturalis: {
    customBack: true
  },
  coffee: {
    customBack: true
  },
  coffeerush: {
    customBack: true,
    overlay: true
  },
  colorflush: {
    customPlayerStyle: ".cfl_name"
  },
  concept: {
    customBack: true
  },
  concordia: {
    playersTextColor: ["[style=\"--player-color: #{{player_color}}\";]"]
  },
  congkak: {
    customBack: true,
    overlay: true
  },
  conspiracy: {
    customBack: true
  },
  contractbridge: {
    twoTeams: true
  },
  cookiebattle: {
    customBack: true
  },
  cosmoctopus: {
    customColors: ["#20134b"]
  },
  craftingthecosmos: {
    customBack: true
  },
  crashandgrab: {
    customBack: true
  },
  crisps: {
    overlay: true
  },
  crybaby: {
    customBack: true,
    overlay: true,
    playersOutline: ["div[style^=\"outline: {{player_color_rgb}}\"]", "div[style^=\"outline-color: {{player_color_rgb}};\"]"]
  },
  cuttle: {
    customBack: ["theme_cuttlefish"]
  },
  darwinsjourney: {
    customBack: true
  },
  daybreak: {
    playersBorder: ["#dbk-hand{{player_id}}"]
  },
  deadcells: {
    customBack: true,
    customColors: ["#3c733a", "#ab3237", "#5c5aa5", "#c97014"]
  },
  deadcellsnewcontent: {
    customBack: true,
    customColors: ["#3c733a", "#ab3237", "#5c5aa5", "#c97014"]
  },
  dedale: {
    customBack: true
  },
  deliverance: {
    customColors: ["#8b4513", "#ee0000", "#ffd700", "#007f00"]
  },
  dewan: {
    customBack: true
  },
  diamonds: {
    overlay: true
  },
  dicycards: {
    customBack: true
  },
  diggingfordinos: {
    playersBorder: ["#player-table-{{player_id}}"],
    playersTextColor: [".player-table[data-color=\"{{player_color_cap}}\"] strong"]
  },
  dobbleconnect: {
    customBack: true
  },
  dogpark: {
    customBack: true
  },
  dontgointhere: {
    customBack: true
  },
  dontletitdie: {
    playersTextColor: ["[style=\"--color: #{{player_color}}\"]", "[style*=\"--player-color: #{{player_color}}\"]"]
  },
  dozito: {
    customBack: true
  },
  draftandwriterecords: {
    customBack: true,
    customDarkMode: {
      className: "bx-background-dark",
      applyGeneralCss: true
    }
  },
  dragonarium: {
    customBack: true,
    overlay: true
  },
  dronesvsseagulls: {
    customPanel: true,
    customActions: {
      init: () => {
        waitForObj('#tokens_wrap', 2000).then((elt) => {
          elt.classList.remove("whiteblock");
        });
      }
    }
  },
  drolesdezebres: {
    customBack: true,
    overlay: true
  },
  duckcover: {
    customBack: true
  },
  dungeonpetz: {
    customBack: true
  },
  dungeonrummy: {
    overlay: true
  },
  dvonn: {
    customBack: true
  },
  earth: {
    customBack: true,
    customDarkMode: {
      className: "ea-background-dark",
      applyGeneralCss: true
    }
  },
  earthabundance: {
    customBack: true,
    customDarkMode: {
      className: "ea-background-dark",
      applyGeneralCss: true
    }
  },
  easypeasy: {
    customBack: true
  },
  ekko: {
    customBack: true
  },
  elawa: {
    customBack: true,
    customPlayerStyle: ".player-table .name-wrapper",
    playersBorder: ["#player-table-{{player_id}}"]
  },
  elongo: {
    customBack: true
  },
  elpasogwt: {
    customPlayerStyle: ".player-board-name",
    playersBorder: ["#gamezone-{{player_id}}"]
  },
  emberleaf: {
    customBack: true
  },
  eminentdomain: {
    customBack: true,
    customPanel: true
  },
  emdomicrocosm: {
    customBack: true,
    customPanel: true
  },
  envelopesofcash: {
    customPanel: true
  },
  equinox: {
    customBack: true
  },
  eriantys: {
    customBack: true
  },
  escapethecurseofthetemple: {
    customBack: true
  },
  evolution: {
    customBack: true
  },
  exhibitiontwentiethcentury: {
    customBack: true
  },
  expeditions: {
    customBack: true
  },
  explodingkittens: {
    customBack: true
  },
  faraway: {
    customBack: true
  },
  fateoffellowship: {
    customBack: true
  },
  fauxraccords: {
    customBack: true
  },
  feastforodin: {
    customBack: ["ffo-pref-background"]
  },
  federation: {
    customBack: true
  },
  festival: {
    customBack: ["black-background", "dark-wood-background"],
    customPanel: true
  },
  fifteendays: {
    customBack: true,
    overlay: true
  },
  fiftyfirststate: {
    customColors: ["#ff0000", "#0000ff", "#ffa500"]
  },
  fightfive: {
    customBack: true
  },
  finca: {
    customBack: true
  },
  firstgiants: {
    overlay: true,
    playersBorder: ["#playerboard_{{player_id}}"],
    playersTextColor: ["#playerboard_{{player_id}}  .player_name"]
  },
  flipseven: {
    customBack: true
  },
  fliptoons: {
    customBack: ["custom-background"]
  },
  flockers: {
    playersTextColor: ["[data-color=\"{{player_color}}\"]"]
  },
  flowers: {
    playersBorder: ["#flw_playZone_{{player_id}}"]
  },
  flowersmandalagame: {
    customBack: true
  },
  forbiddenisland: {
    customBack: true
  },
  forestshuffledartmoor: {
    playersBack: ["#title_{{player_id}}"],
    playersBorder: ["#FSDtable_{{player_id}}"]
  },
  formulad: {
    customActions: {
      init: (cssPath: string) => {
        document.body.style.setProperty("--gears", `url(${cssPath}img/gears.svg)`);
      }
    }
  },
  foxonthetree: {
    customBack: true
  },
  framework: {
    customPlayerStyle: "#player-tabs > .player-tab > span"
  },
  frenchtarot: {
    customBack: true
  },
  fromage: {
    customBack: true,
    customPanel: true
  },
  galacticcruise: {
    customBack: true
  },
  galacticera: {
    customPanel: true
  },
  gangofdice: {
    customBack: true
  },
  gangsta: {
    customBack: true
  },
  gardennation: {
    customBack: true
  },
  gardenrush: {
    customBack: true
  },
  gatsby: {
    customBack: true
  },
  gemsofiridescia: {
    customBack: ["goi_thematicBackground"],
    playersBorder: ["#goi_playerZoneContainer\\:{{player_id}}"]
  },
  giftoftulips: {
    customBack: true
  },
  gipf: {
    customBack: true
  },
  girafferaffe: {
    customBack: true
  },
  gnomehollow: {
    customBack: true,
    customPanel: true
  },
  goblinhood: {
    customBack: true,
    customPlayerStyle: ".player-table > h3"
  },
  goa: {
    customBack: ["goa_pref_background_1"]
  },
  golems: {
    playersBack: ["#pl{{player_id}}_label"]
  },
  goodfortune: {
    customBack: true,
    overlay: true,
    playersBack: ["#mf_playertitle_{{player_index_1}}"],
    playersOutline: ["#mf_zone_player_{{player_index_1}}"]
  },
  gravitysuperstar: {
    customBack: true
  },
  greatsplit: {
    customBack: true
  },
  grund: {
    customBack: true
  },
  gygesdeluxe: {
    customBack: true
  },
  happycity: {
    customBack: true
  },
  hardback: {
    customDarkMode: {
      className: "dark",
      applyGeneralCss: false
    },
    customActions: {
      init: () => {
        const hardbackModeChange = (input: any) => {
          const button = document.getElementById('bga_extension_dark_mode_icon')?.firstChild?.firstChild as any;

          if (button) {
            if (input.value === "2" || (input.value === "0" && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              (window as any).setDarkStyle(true);
            } else {
              (window as any).setDarkStyle(false);
            }
          }
        };

        Promise.all([
          waitForObj('#preference_control_101'),
          waitForObj('#preference_fontrol_101')
        ]).then(([input1, input2]) => {
          input1.addEventListener('change', () => hardbackModeChange(input1));
          input2.addEventListener('change', () => hardbackModeChange(input2));
        });
      },
      setDarkMode: (darkMode: boolean) => {
        const input = document.getElementById('preference_control_101') as any;
        const newValue = (darkMode) ? "2" : "1";

        if (input.value !== newValue) {
          input.value = newValue;
          input.dispatchEvent(new Event("change"));
        }
      },
      isDarkMode: async () => {
        const input = (await waitForObj('#preference_control_101')) as HTMLInputElement;
        return input.value == "2";
      }
    }
  },
  harmonies: {
    customBack: true,
    customColors: ["#ff0000", "#008000", "#ffa500", "#0000ff"]
  },
  heat: {
    customBack: true,
    overlay: true,
    customPlayerStyle: ".player-table .name-wrapper",
    playersBorder: ["#player-table-{{player_id}}"]
  },
  heatchampionship: {
    customBack: true,
    customPlayerStyle: ".player-table .name-wrapper",
    playersBorder: ["#player-table-{{player_id}}"]
  },
  heythatsmyfish: {
    customBack: true
  },
  homesteaders: {
    customPlayerStyle: "#main_container div[id^=\"player_name_\"]"
  },
  hydroracers: {
    customActions: {
      init: () => {
        document.querySelectorAll(".playerBoard .whiteblock.cockpit").forEach(elt => elt.classList.remove("whiteblock"));
      }
    }
  },
  imperialsettlers: {
    customColors: ["#0000ff", "#ff0000", "#ffa500"]
  },
  ink: {
    customBack: true,
    overlay: true,
    playersBack: ["#player-table-{{player_id}} .name-wrapper"],
    playersBorder: ["#player-table-{{player_id}}"]
  },
  insidejob: {
    customBack: true,
    customColors: ["#0000ff", "#ff0000", "#ffa500", "#773300", "#008000"]
  },
  irishgauge: {
    playersBorder: ["#player-table-{{player_id}}", "#player-table-{{player_id}} .player-table-name"],
    playersTextColor: ["#player-table-{{player_id}} .player-table-name"]
  },
  itsawonderfulworld: {
    customBack: true,
    playersBorder: ["#iww-player{{player_id}}"]
  },
  iwari: {
    customBack: true
  },
  iye: {
    customBack: true,
    overlay: true
  },
  jekyllvshide: {
    customBack: true
  },
  jumpdrive: {
    customBack: true,
    playersBorder: ["#jdr-tableau-{{player_id}}"]
  },
  jurassicsnack: {
    customBack: true
  },
  justone: {
    customBack: true
  },
  kado: {
    customBack: true
  },
  kaiser: {
    twoTeams: true
  },
  khiva: {
    customBack: true
  },
  kikaibricolageheads: {
    customBack: true
  },
  kingdomino: {
    playersBorder: [".player_view[style*=\"border-color: #{{player_color}}\"]"]
  },
  kingoftokyo: {
    customBack: true
  },
  kiriaitheduel: {
    customBack: true
  },
  knarr: {
    customBack: true,
    playersTextColor: ["#player-table-{{player_id}}-name"]
  },
  knister: {
    customPlayerStyle: ".knister_plname"
  },
  krosmasterblast: {
    customBack: true
  },
  lafamiglia: {
    customBack: true
  },
  lamarcheducrabe: {
    overlay: true
  },
  lasvegan: {
    customBack: true
  },
  legions: {
    customBack: true,
    overlay: true,
    customColors: ["#770405", "#097138", "#011d4d", "#522886"],
    playersTextColor: ["#player-table-{{player_id}} .name-wrapper .name"]
  },
  lepidoptery: {
    overlay: true
  },
  lesderniersdroides: {
    customPanel: true,
    playersBorder: ["#nameZone{{player_id}}"],
    customActions: {
      init: (cssPath: string) => {
        document.body.style.setProperty("--actionIcons", `url(${cssPath}img/LDD_Cards_Icons.png)`);
        document.body.style.setProperty("--playmat", `url(${cssPath}img/background.jpg)`);
      }
    }
  },
  letsgotojapan: {
    playersBorder: ["#playerhandtitle_{{player_id}}", "#playerhand_{{player_id}}", "#nameplayer_{{player_id}}"]
  },
  lielow: {
    customBack: true
  },
  limit: {
    customBack: ["vgincLib_thematic_background_on"]
  },
  lineit: {
    customBack: true,
    customPlayerStyle: ".player-table .name-wrapper"
  },
  livingforestduel: {
    customBack: true,
    customColors: ["#302879", "#32693b"]
  },
  locomomo: {
    customBack: true
  },
  lorenzo: {
    customBack: true,
    overlay: true,
    playersBack: ["#obrPlayerboardId_{{player_id}} .obr_playerboard_name"],
    playersBorder: ["#obrPlayerboardId_{{player_id}}"]
  },
  lostexplorers: {
    customBack: true
  },
  lostseas: {
    customBack: true
  },
  loveletter: {
    customBack: true,
    overlay: true,
    playersOutline: ["#mf_zone_player_{{player_index_1}}"],
    customActions: {
      init: (cssPath: string) => {
        document.body.style.setProperty("--sceau", `url(${cssPath}img/bg-sceau.png)`);
      }
    }
  },
  lumen: {
    customBack: true,
    customPanel: true,
    customColors: ["#1f3067"]
  },
  lunar: {
    overlay: true
  },
  lure: {
    overlay: true
  },
  luz: {
    customBack: true,
    overlay: true
  },
  maatatahay: {
    customBack: true
  },
  malabares: {
    customBack: true,
    overlay: true
  },
  mantisfalls: {
    customBack: true,
    customPanel: true
  },
  mapmasters: {
    customBack: true,
    playersBorder: ["#house_{{player_id}}", "#hand_grid_{{player_id}}"]
  },
  maracaibo: {
    customPanel: true
  },
  mastersofrenaissance: {
    customBack: true,
    playersTextColor: [".name[id=\"{{player_id}}\"]"]
  },
  matchsticktycoon: {
    customBack: true
  },
  megajackpot: {
    customBack: true
  },
  memoir: {
    customBack: true
  },
  mesos: {
    customBack: true,
    customPanel: true
  },
  mexica: {
    customBack: true
  },
  miams: {
    customBack: true
  },
  middleages: {
    customBack: true
  },
  mindup: {
    customBack: true,
    customPlayerStyle: ".player-table .name-wrapper"
  },
  minirogue: {
    customActions: {
      init: () => {
        const fixSpans = () => {
          document.querySelectorAll('span.mnr-i:not([data-type])').forEach((el) => {
            const t = el.textContent.trim();
            if (t && el.getAttribute('data-type') !== t) el.setAttribute('data-type', t);
          });
        }
        waitForObj('#logs').then((container) => {
          const observer = new MutationObserver(fixSpans);

          observer.observe(container, {
            childList: true,
            subtree: true
          })
        });
      }
    }
  },
  misty: {
    customBack: true
  },
  mojo: {
    customBack: true
  },
  mollyhouse: {
    customBack: true,
    overlay: true
  },
  moonlight: {
    customBack: true,
    customColors: ["#0d383a"]
  },
  monstersmash: {
    customBack: true
  },
  monstertrick: {
    customBack: true,
    overlay: true
  },
  moonshine: {
    customBack: true
  },
  mountaingoats: {
    customBack: true
  },
  moversandshakers: {
    customBack: true,
    overlay: true
  },
  mrjack: {
    customBack: true
  },
  mue: {
    customPlayerStyle: ".mue_bidtablename"
  },
  mycity: {
    customBack: true
  },
  mycityrb: {
    customBack: true
  },
  myshelfie: {
    customPlayerStyle: ".shelf-name"
  },
  mystlingacademy: {
    customBack: true,
    customPanel: true
  },
  mythicbattlesragnarok: {
    customBack: true
  },
  nature: {
    customBack: true
  },
  neonreign: {
    customBack: true
  },
  newfrontiers: {
    customBack: true,
    customActions: {
      init: () => { },
      setDarkMode: (darkMode: boolean) => {
        const input = document.getElementById('preference_control_101') as any;
        input.value = (darkMode) ? "1" : "2";
        input.dispatchEvent(new Event("change"));
      },
      isDarkMode: async () => {
        const input = (await waitForObj('#preference_control_101')) as HTMLInputElement;
        return input.value == "1";
      }
    }
  },
  newton: {
    customBack: true,
    customActions: {
      init: (cssPath: string) => {
        const imgUrl = `${cssPath}img/tiles_sprites.png`;
        document.body.style.setProperty("--quick-action-back", `url(${imgUrl})`);
      }
    }
  },
  nextstation: {
    customBack: true,
    overlay: true
  },
  nextstationparis: {
    overlay: true,
    customActions: {
      init: (cssPath: string) => {
        document.body.style.setProperty("--back-paris", `url(${cssPath}img/bg_paris.jpg)`);
        document.body.style.setProperty("--back-tokyo", `url(${cssPath}img/bg_tokyo.jpg)`);
      }
    }
  },
  nextstationtokyo: {
    overlay: true,
    customActions: {
      init: (cssPath: string) => {
        document.body.style.setProperty("--back-paris", `url(${cssPath}img/bg_paris.jpg)`);
        document.body.style.setProperty("--back-tokyo", `url(${cssPath}img/bg_tokyo.jpg)`);
      }
    }
  },
  nicodemus: {
    customBack: true
  },
  nidavellir: {
    customBack: true
  },
  nimalia: {
    customBack: true,
    customColors: ["#0000ff", "#ff0000", "#ffa500", "#008000"]
  },
  nirds: {
    overlay: true,
    playersBack: ["#player_table_{{player_id}} .title"],
    playersBorder: ["#player_table_{{player_id}}"],
    customActions: {
      init: (cssPath: string) => {
        document.body.style.setProperty("--ext-game-back", `url(${cssPath}img/html-background.jpg)`);
      }
    }
  },
  noah: {
    customBack: true
  },
  norsemen: {
    customBack: true
  },
  notalone: {
    customBack: true,
    customPanel: true
  },
  nowboarding: {
    customBack: true,
    customPanel: true,
    customColors: ["#000000"]
  },
  numberdrop: {
    customBack: true
  },
  nylonppong: {
    overlay: true
  },
  ofknightsandninjas: {
    customBack: true
  },
  ontour: {
    customBack: true
  },
  openseason: {
    customBack: true
  },
  orapamine: {
    customBack: ["orp_pref-thematicBackground-blue", "orp_pref-thematicBackground-red"]
  },
  oriflamme: {
    customBack: true
  },
  origin: {
    customBack: true
  },
  orleans: {
    customBack: true
  },
  pandaspin: {
    customBack: true,
    overlay: true
  },
  pandemic: {
    customBack: true,
    customColors: ["#252525"]
  },
  parklife: {
    overlay: true,
    customColors: ["#333333"]
  },
  paxrenaissance: {
    customBack: true
  },
  perch: {
    customBack: ["bx-background-dark"]
  },
  pergola: {
    customBack: true,
    overlay: true
  },
  photosyntesis: {
    customBack: true
  },
  pilipili: {
    customBack: true,
    overlay: true,
    playersOutline: ["div[style^=\"outline-color: {{player_color_rgb}};\"]", "div[style^=\"outline: {{player_color_rgb}} solid 4px;\"]"]
  },
  pinacoladice: {
    customBack: true,
    overlay: true
  },
  pioneerdaysproject: {
    playersBorder: ["#playerbox-{{player_id}}"]
  },
  piratas: {
    customPlayerStyle: "#playmats .playmat h3",
    playersBorder: ["#playmat_{{player_id}}"]
  },
  piratesunderfire: {
    customBack: true,
    overlay: true
  },
  pisanki: {
    customBack: true
  },
  pixies: {
    customBack: true,
    playersBorder: ["#player-table-{{player_id}}"]
  },
  planetunknown: {
    customBack: true
  },
  pleasedontburnmyvillage: {
    customBack: true,
    playersBorder: [".tableau-container[data-player-id=\"{{player_id}}\"]"],
    playersTextColor: [".tableau-container[data-player-id=\"{{player_id}}\"] .player-tableau-title"],
    customActions: {
      init: () => {
        waitForObj('.background-container').then(() => {
          const color = document.documentElement.style.getPropertyValue('--player-color');
          const darkColor = getColorForDarkMode(color);
          document.documentElement.style.setProperty('--player-color', darkColor.color);
        });
      }
    }
  },
  pocketcats: {
    customBack: true
  },
  popcorn: {
    customBack: ["pop-game-bg"]
  },
  pook: {
    customBack: true
  },
  powervacuum: {
    overlay: true
  },
  pyramidoft: {
    customBack: true
  },
  qo: {
    customBack: true
  },
  quadratacanada: {
    customBack: true
  },
  quartermastergeneraleastfront: {
    customBack: true
  },
  quiltable: {
    overlay: true
  },
  quirkyquarks: {
    customBack: true
  },
  qwinto: {
    playersBack: ["#qwinto-player-board-background-{{player_id}} .qwinto_name_tag"],
    playersBorder: ["#qwinto-player-board-background-{{player_id}}"]
  },
  raceforthegalaxy: {
    customBack: true
  },
  rainforest: {
    playersBorder: ["#playerZone_{{player_id}}"],
    playersTextColor: ["#playerZone_{{player_id}} p"]
  },
  ratsofwistar: {
    customBack: true,
    overlay: true
  },
  rauha: {
    customBack: true
  },
  rednotice: {
    customBack: true,
    overlay: true
  },
  reefgardens: {
    playersBack: ["#playerBoard[data-p-id=\"{{player_id}}\"] #title", "#playerBoard[data-p-id=\"{{player_id}}\"] #shells"]
  },
  reforest: {
    overlay: true,
    playersBack: ["#re-player-area-{{player_id}} .re-player-area-name"],
    customActions: {
      init: (cssPath: string) => {
        document.body.style.setProperty("--ext-game-back", `url(${cssPath}img/re-background-light.jpg)`);
      }
    }
  },
  refuge: {
    customBack: true,
    playersBorder: ["#player-table-{{player_id}}"]
  },
  resist: {
    customColors: ["#782520"]
  },
  restinpeace: {
    customBack: true
  },
  riverofgold: {
    customColors: ["#000000", "#ff0000", "#008000", "#0000ff", "#ffffff"],
    playersBorder: ["#rog_player_delivered_resizable-{{player_id}}"]
  },
  roadtothreehoundred: {
    playersTextColor: ["#rt300_plname_{{player_id}}"]
  },
  rollandbump: {
    customBack: true
  },
  rollintotown: {
    customBack: ["rt-pref-background-dark"]
  },
  rollthroughtheagesthebronzeage: {
    customBack: true
  },
  romirami: {
    customBack: true,
    customDarkMode: {
      className: "bx-background-dark",
      applyGeneralCss: true
    }
  },
  rowdypartners: {
    playersTextColor: ["[style=\"--player-color: #{{player_color}}\";]"]
  },
  rttaironage: {
    playersBack: ["[style=\"background-color: {{player_color_rgb}};\"]"]
  },
  rumbleplanet: {
    customBack: true,
    playersBorder: ["#player-table-{{player_id}}"]
  },
  rumblenation: {
    customBack: true
  },
  safariwitness: {
    customBack: true
  },
  sail: {
    overlay: true
  },
  sakura: {
    overlay: true
  },
  santorini: {
    customBack: true
  },
  schottentotten: {
    customBack: true
  },
  screampark: {
    customBack: ["scp_pref-themedBg"],
    playersBorder: ["#scp_playerZone-{{player_id}}"]
  },
  scratchandcatch: {
    customBack: true,
    overlay: true
  },
  scythe: {
    customBack: true,
    customPanel: true
  },
  seasaltpaper: {
    customBack: true
  },
  seashells: {
    customBack: ["vgincLib_thematic_background_on"],
    playersTextColor: ["strong[data-color=\"{{player_color}}\"]"]
  },
  seasons: {
    customBack: true
  },
  secretmoon: {
    customBack: true
  },
  seventhseacityoffivesails: {
    customBack: true,
    customPanel: true
  },
  sevenwondersdice: {
    customBack: true,
    overlay: true,
    playersTextColor: [".bga-score-sheet_player-name[style=\"--player-color: #{{player_color}}\";]"]
  },
  sfynx: {
    overlay: true
  },
  shogi: {
    customBack: ["shg_theme1", "shg_theme2"]
  },
  siam: {
    customColors: ["#0000ff", "#ffa500"]
  },
  similo: {
    customBack: true
  },
  skatelegend: {
    customPlayerStyle: ".player-table .name-wrapper",
    playersBorder: ["#player-table-{{player_id}}"]
  },
  skirmishbattlefordraconia: {
    customBack: true
  },
  skull: {
    customBack: true
  },
  skullking: {
    customBack: true
  },
  skyteam: {
    customBack: true
  },
  smallworld: {
    customBack: true
  },
  sobektwoplayers: {
    customBack: true
  },
  solarsentinels: {
    customBack: true
  },
  solstis: {
    customBack: true
  },
  soothsayers: {
    customBack: true,
    playersOutline: ["#player-board-{{player_id}}"]
  },
  spacebase: {
    customBack: true
  },
  spaceempires: {
    customBack: true
  },
  spacelab: {
    customBack: true
  },
  spacestationphoenix: {
    customBack: true,
    customPanel: true
  },
  spellcrafter: {
    customBack: true
  },
  spirited: {
    playersBack: ["#sp-player-area-{{player_id}} .sp-player-area-name-spacer"],
    playersOutline: ["#sp-player-area-{{player_id}} .sp-road-slot", "#sp-player-area-{{player_id}} .sp-player-area-wonders", "#sp-player-area-{{player_id}} .sp-player-area-camp>.slot"]
  },
  spiritsoftheforest: {
    customBack: true,
    overlay: true
  },
  splitter: {
    customPlayerStyle: ".splitter_plname"
  },
  splendor: {
    customBack: true
  },
  splendorduel: {
    customBack: true
  },
  splendorexpansions: {
    customBack: true
  },
  spookytower: {
    customBack: true,
    overlay: true,
    playersBack: ["#player_{{player_id}}_label"],
    playersBorder: ["#player_board_{{player_id}}"]
  },
  spyworld: {
    customBack: true
  },
  stalkexchange: {
    customBack: true
  },
  stella: {
    customBack: true
  },
  stupormundi: {
    customPlayerStyle: ".stm_playermat_label"
  },
  super: {
    customBack: true
  },
  superstore: {
    overlay: true,
    customColors: ["#2d5787", "#613d31", "#f36c45", "#8b4e6e"]
  },
  supermegaluckybox: {
    customBack: ["smlb_background"]
  },
  symbiose: {
    customBack: true,
    customColors: ["#024573"],
    playersBorder: ["[style*=\"border-top: 2px solid #{{player_color}};\"]"]
  },
  tacta: {
    customBack: true,
    overlay: true
  },
  tagteam: {
    overlay: true,
    customActions: {
      init: (cssPath: string) => {
        document.body.style.setProperty("--back-2", `url(${cssPath}img/backgrounds/tt-bg-blue.jpg)`);
        document.body.style.setProperty("--back-3", `url(${cssPath}img/backgrounds/tt-bg-green.jpg)`);
        document.body.style.setProperty("--back-4", `url(${cssPath}img/backgrounds/tt-bg-purple.jpg)`);
        document.body.style.setProperty("--back-5", `url(${cssPath}img/backgrounds/tt-bg-red.jpg)`);
        document.body.style.setProperty("--back-6", `url(${cssPath}img/backgrounds/tt-bg-yellow.jpg)`);
      }
    }
  },
  takenokolor: {
    customBack: true,
    customPlayerStyle: ".player-table .name"
  },
  tallyup: {
    customBack: true,
    overlay: true,
    playersBorder: ["#tuto_pp{{player_index_1}}"]
  },
  talon: {
    customBack: true
  },
  taluva: {
    customBack: true
  },
  tanglewoodsred: {
    customBack: true
  },
  tapestry: {
    customBack: true,
    overlay: true
  },
  tekken: {
    customBack: true
  },
  terraformingmars: {
    customBack: true,
    customPlayerStyle: ".mfull .playerboard_side_name, .mcompact .player_area_name",
    customColors: ["#ff0000", "#0000ff", "#008000", "#ffa500"]
  },
  terramystica: {
    customColors: ["#971923", "#278139", "#70421d", "#1a2126", "#f9ae18", "#1d7ddb"]
  },
  terranova: {
    customColors: ["#971923", "#278139", "#70421d", "#1a2126", "#f9ae18", "#1d7ddb"]
  },
  texasholdem: {
    customBack: ["dark-wood-vertical-background", "dark-wood-horizontal-background"]
  },
  thecrew: {
    customBack: true
  },
  thecrewdeepsea: {
    customBack: true
  },
  thedwarfking: {
    customBack: true
  },
  thefoxintheforest: {
    customColors: ["#5e3f85"],
    overlay: true
  },
  thegamemakers: {
    customBack: true
  },
  thegang: {
    customBack: true,
    playersBorder: ["#plrevealzone_{{player_id}} .plboard_top", "#plboard_{{player_id}} .plboard_top "]
  },
  thegreatamericanfoxhunt: {
    playersBack: ["#TGAFH_player_{{player_id}}"]
  },
  theguildofmerchantexplorers: {
    customPlayerStyle: ".tab_header, .player_board .player_nametag",
    playersBorder: ["#tab_header_board_{{player_id}}"]
  },
  thehanginggardens: {
    customBack: true,
    overlay: true
  },
  thekingofthewoods: {
    customBack: true
  },
  theninesonsofthedragon: {
    customBack: true
  },
  thewhitecastle: {
    customBack: ["custom-background"]
  },
  theyellowhouse: {
    customBack: true
  },
  thirteenleaves: {
    customBack: ["classic_theme_disabled"],
    playersBorder: ["#overall_player_board_{{player_id}}"]
  },
  tickettoride: {
    customBack: true,
    customPanel: true
  },
  tickettorideeurope: {
    customBack: true,
    customPanel: true
  },
  tickettoridemaps: {
    customBack: true,
    customPanel: true
  },
  tikal: {
    customBack: true
  },
  tinyturbocars: {
    customBack: true
  },
  tipperary: {
    playersBorder: ["#player-board-{{player_id}}"]
  },
  tirnanog: {
    customBack: true,
    overlay: true
  },
  tiwanaku: {
    customBack: true
  },
  toybattle: {
    customBack: true,
    overlay: true
  },
  towerup: {
    customBack: true,
    overlay: true
  },
  trailblazers: {
    customBack: true
  },
  trektwelve: {
    customBack: true
  },
  treos: {
    playersBack: ["#gamezone-{{player_id}} .player-board-name"],
    playersBorder: ["#gamezone-{{player_id}}"]
  },
  trickarus: {
    customBack: true
  },
  trio: {
    customBack: true
  },
  trok: {
    customBack: true,
    overlay: true
  },
  tsukurutenten: {
    customBack: true,
    overlay: true
  },
  tucano: {
    customBack: true,
    customPlayerStyle: ".tuc_header"
  },
  tuned: {
    customBack: true
  },
  turingmachine: {
    customBack: true
  },
  twinpalms: {
    customPanel: true
  },
  twelvechips: {
    customBack: true
  },
  twilightimperium: {
    customBack: true
  },
  twinkletwinkle: {
    customBack: true
  },
  ultimaterailroads: {
    customBack: true
  },
  upordown: {
    customBack: true,
    playersBorder: ["#player-table-{{player_id}}"],
    playersTextColor: ["#player-table-{{player_id}} .player-table-name"]
  },
  vaalbara: {
    customBack: true
  },
  verdant: {
    customBack: true,
    customColors: ["#2d3691"],
    playersBorder: ["#house_{{player_id}}"]
  },
  verso: {
    customBack: true,
    overlay: true
  },
  visions: {
    customBack: true,
    playersOutline: ["div[style^=\"outline: {{player_color_rgb}}\"]"]
  },
  viticulture: {
    customPanel: true
  },
  vivacatrina: {
    customBack: true
  },
  wanderingtowers: {
    customBack: true,
    overlay: true
  },
  welcometothemoon: {
    playersBorder: ["#score-sheet-{{player_id}}", "#score-sheet-{{player_id}} .player-name"]
  },
  whist: {
    twoTeams: true
  },
  wingspan: {
    customBack: ["wsp_background_paper"]
  },
  wispwood: {
    customBack: ["dark_background_on"],
    playersOutline: ["#player-wrap-{{player_id}} .grid-background"]
  },
  wizardscup: {
    customBack: true,
    overlay: true
  },
  wizardsgrimoire: {
    customBack: true,
    customPlayerStyle: ".wg-title",
    playersBorder: [".wg-title.ext_player_{{player_id}}", "#player-table-{{player_id}}-health", "#player-table-{{player_id}} .player-table"]
  },
  wonderfulkingdom: {
    customBack: true,
    customPlayerStyle: ".wk_zone_playername"
  },
  wordtraveler: {
    customBack: true
  },
  yaxha: {
    customBack: true,
    playersBorder: ["#pyramid-container-{{player_id}} .player-name-text .text-container"]
  },
  yokaipagoda: {
    playersBorder: [".game_results_player[style=\"border-left: 4px solid #{{player_color}}\"]"]
  },
  zenith: {
    customBack: true
  },
  zuuli: {
    customPlayerStyle: ".writes.lg"
  }
};