
/***
 * @author Yehad Moussaoui <yehad.moussaoui@gmail.com>
 */
const textElement = document.getElementById('text')
/**
 * 
 */
const KnappVal = document.getElementById('option-buttons')

let state = {}

/***
 * @function startGame - start the game
 */
function startGame() {
  state = {}
  VisaTextNode(1)
}

/**
 * Ändra till att visa text i våra textNodes.
 * @param {}
 */
function VisaTextNode(textNodeIndex) {
  const textVal = textNodes.find(textVal => textVal.id === textNodeIndex)
  textElement.innerText = textVal.text 

  
  /**
   * För att ta bort "överflödiga alternativ = knappar, "buttons"
   * @param {} - Tar bort Child för options buttons element
   */
  while (KnappVal.firstChild) {
    KnappVal.removeChild(KnappVal.firstChild)
  }

  /** Skapa en ny knapp och sätt ny knapp = button
   * @param {} - Lyssnar på funktionen "select option"
   */
  textVal.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button') 
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      KnappVal.appendChild(button)
    }
  })
}

/**
 * 
 */

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

/***
 * En funktion för att gå tillbaka till början.NextText sätts till -1. Detta är mindre än 0. Börja om
 * @param {string} [nextTextNodeId] - Om värdet är mindre än noll så börja om
 */
function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  VisaTextNode(nextTextNodeId)
}

/***
 * @constant {number}  - val för olika alternativ
 * @param  {boolean} - Testar vilket state man har valt- sword=svärd eller spjut
 */
const textNodes = [
  {
    id: 1,
    text: 'Plötslig står du mitt emot en drake och du ser ett svärd och ett spjut i den leriga marken. Du ser att din han är skadad och kan bara välja ett vapen. Vilken tar du för att slåss mot draken?',
    options: [
      {
        text: 'Ta svärdet',
        setState: { sword: true },
        nextText: 2
      },
      {
        text: 'Ta spjutet',
        setState: { spjut: true },
        nextText: 2
      }
      
    ]
  },

  
  {
    id: 2,
    text: 'Draken vill inget illa utan erbjuder dig att byta ditt vapen mot guld och diamanter. Vad vill du göra',
    options: [
      {
        text: 'Byt svärdet mot guld och diamanter',
        requiredState: (currentState) => currentState.guld,
        setState: { sword: false, spjut: false , guld:true},
        nextText: 3
      },
      {
        text: 'Byt spjutet mot guld och diamanter',
        requiredState: (currentState) => currentState.guld,
        setState: { sword: false, spju:false, guld: true },
        nextText: 3
      },
      {
        text: 'Behåll ditt vapen',
        nextText: 3
      },
      
     
    ]
  },
  {
    id: 3,
    text: ' Du går vidare för att se vart du hamnar eller om du kommer hem. I horisonten skymtar ett jättestort slott och något som ser ut som en liten by nedanför.',
    options: [
      {
        text: 'Gå mot slottet för att undersöka den',
        nextText: 4
      },
      {
        text: 'Gå mot byn och hitta ett hus att sova i',
        nextText: 5
      },
      {
        text: 'Sov ute för att inte väcka uppmärksamhet',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'I slottet ville du inte annat än att sova så du somnar men blir uppäten av monster.',
    options: [
      {
        text: 'Börja om',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Du bryter in dig i ett hus som verkar tomt. Du somnar men ägaren av huset kommer hem och kallar på bysoldaterna somm fångar dig och slänger in dig i en cell',
    options: [
      {
        text: 'Börja om',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'Du vaknar utvilad för att fortsätta din väg mot slottet',
    options: [
      {
        text: 'Utforska slottet',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'Du står nu öga mot öga mot ett stort monster i slottet. Den ser inte vänlig ut och vill nog äta upp dig.',
    options: [
      {
        text: 'Fly!',
        nextText: 8
      },
      
      {
        text: 'Slåss med ditt svärd',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Kasta ditt sput mot monstret och försök träffa hjärtat',
        requiredState: (currentState) => currentState.spjut,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Monstret är ultrasnabb och fångar dig där du blir uppäten',
    options: [
      {
        text: 'Börja om',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'Du trodde att ditt svärd kunde skydda dig. Du svingar för långsamt och monstret åt upp dig.',
    options: [
      {
        text: 'Börja om',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'Monstret satt och tittade på dig och åt upp dig sen.',
    options: [
      {
        text: 'Börja om',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'Monstret kom springande mot dig men med ditt spjut träffade du monstrets hjärta. Inget mera monster. DU befriade byn och släppte ut alla fångarna som monstret tagit.Nu har du ditt eget slott. Det kommer blir tufft att städa men du har åtminstonde ett slott',
    options: [
      {
        text: 'Nu är du en hjälte. Spela igen?.',
        nextText: -1
      }
    ]
  }
]

startGame()


