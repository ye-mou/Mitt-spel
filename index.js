const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Plötslig står du mitt emot en drake och du ser ett svärd och ett spjut i den leriga marken. Du ser att din han är skadad och kan bara välja ett vapen. Vilken tar du för att slåss mot draken?',
    options: [
      {
        text: 'Ta svärdet',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'Ta spjutet',
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
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'Byt spjutet mot guld och diamanter',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3
      },
      {
        text: 'Behåll ditt vapen',
        nextText: 3
      }
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
    text: 'Du använder ditt svärd för att bryta dig in ett hus som verkar tomt. Du somnar men ägaren av huset kommer hem och kallar på bysoldaterna somm fångar dig och slänger in dig i en cell',
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
        text: 'Släng guld på den',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Slåss med ditt svärd',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'Kasta ditt sput mot monstret och försök träffa hjärtat',
        requiredState: (currentState) => currentState.blueGoo,
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
    text: 'Du trodde att ditt svärd kunde skydda dig. Du svingar för långsamt och monstret åt upp digYou foolishly thought this monster could be slain with a single sword.',
    options: [
      {
        text: 'Börja om',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'Monstret satt och tittade på dig när du slängde ditt gild på den och åt upp dig sen.',
    options: [
      {
        text: 'Börja om',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'Monstret kom springande mot dig men med ditt spjut träffade du monstrets hjärta. Inget mera monster. DU befriade slotett och släppte ut fångarna på slottet.Nu har du ditt eget slott. Det kommer blir tufft att städa men du har ett slott',
    options: [
      {
        text: 'Nu är du en hjälte. Spela igen?.',
        nextText: -1
      }
    ]
  }
]

startGame()


