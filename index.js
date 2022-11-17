window.addEventListener.('DOMContentLoaded',function)

const textElement = document.getElementById("welcome");
const knappElement = document.getElementById("knappVal");

let state = {}

function startGame(){
    state = {}
    showTextNode(1)

}

function showTextNode(TextNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id ===
        TextNodeIndex)
        textElement.innerText = textNode.text


}

function SelectOption (option){

}

const textNodes = [
    {
        id:1
        text: 'Du måste se att detta inte ör något som vi har koka'
        options:[
            {
                text:'Ta pillret',
                setState:{blueGoo: true}
                nextText:2

                
            },
            {
                text:'Lämna den',
                nextText: 2
            }
        ]

    },
    {
        id:2
    }
]

startGame();