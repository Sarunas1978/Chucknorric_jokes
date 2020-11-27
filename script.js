// add button on each card "random color" it should change cards background color to random
// add counter in top of the page, to show hom many items there is in array
// add "total letters" in top of page to show hom many letters in total all jokes values have summed up
// add input on the bottom of the card, when input value is changed it should change joke value
// add input and button in top of page "set date" when input value is added and button clicked, all cards time should change to input value
//
let colorArray = ['#FF6633','#FFB399', '#FF33FF', '#FFFF99','#00B3E6',
    '#E6B333', '#3366E6',
    '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900',
    '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A',
    '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC',
    '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF',
    '#E666FF', '#4DB3FF', '#1AB399',

    '#E666B3', '#33991A',
    '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980',
    '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00',
    '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
let array=[]
let arrayLetters=[]

//Button add
let button= document.createElement("button")
button.innerText = "ADD"
document.body.appendChild(button)
button.addEventListener("click", addItem)

//button counter
let counter=document.createElement("button")
counter.innerHTML="Counter:  0"
document.body.appendChild(counter)

//button letter count
let letters=document.createElement("button")
letters.innerHTML="Letters count:  0"
document.body.appendChild(letters)

let inputTime=document.createElement("input")
inputTime.placeholder="Enter time and press enter"
inputTime.type="date"
inputTime.classList.add("input", "inputDate")
document.body.appendChild(inputTime)

let buttonEnter=document.createElement("button")
buttonEnter.innerText="Enter"
document.body.appendChild(buttonEnter)
buttonEnter.addEventListener('click', addTimeToCards)

let divMain=document.createElement("div")
divMain.classList.add("displayFlex", "flexWrap")
document.body.appendChild(divMain)

function addTimeToCards(event){
    let cards = event.path[1].getElementsByClassName("date")
    for (let i = 0; i < cards.length ; i++) {
        cards[i].innerHTML=event.target.previousSibling.value
    }
   console.log(cards)
}

function random(number){
    return Math.round(Math.random()*--number)
}
function counterCount(){
    counter.innerHTML=`Counter:  ${array.length}`
}
function  counterLettersJoke() {
    let a = 0;
    let lettersCount = document.getElementsByClassName("value")
    for (let i = 0; i < lettersCount.length; i++) {
        a += (lettersCount[i].innerHTML).length
        //console.log(lettersCount[i].innerHTML + " " + a)
    }
    letters.innerHTML=`Letters count:  ${a}`
}

function changeValueJoke(event){
    console.log(event)
    let val=event.path[1].getElementsByClassName("value")
    val[0].innerHTML=event.target.value
    console.log(val)
}


function addItem(){
    fetch("https://api.chucknorris.io/jokes/random")
        .then(response=> response.json())
        .then(data => {

            let div= document.createElement("div")
            div.classList.add("card")
            div.addEventListener('click', ()=> {
                this.style.backgroundColor="grey"
                setTimeout(()=>this.style.backgroundColor="magenta",2000)
            })

            let img= document.createElement("img")
            img.classList.add("icon")
            img.src=data.icon_url

            let x=document.createElement("button")
            x.classList.add("floatRight")
            x.innerHTML="x"
            x.style.border="0px"
            x.setAttribute("id",data.id)
            x.addEventListener("click", deleteCard)

            let date=document.createElement("div")
            date.classList.add("date")
            date.innerHTML=(data.created_at).split(" ")[0]

            let url=document.createElement("a")
            url.classList.add("url")
            url.innerHTML=data.url
            url.href=data.url

            let value=document.createElement("div")
            value.classList.add("value")
            value.innerHTML=data.value

            let buttonColor=document.createElement("button")
            buttonColor.innerText="Change color"
            buttonColor.addEventListener('click', ()=>
                div.style.backgroundColor=colorArray[random(colorArray.length)])


            let input=document.createElement("input")
            input.style.width="100%"
            input.placeholder="press ENTER for a change"
            input.classList.add("input")
            input.setAttribute("id", "input"+array.length)
            input.addEventListener('input', changeValueJoke )

            divMain.appendChild(div)
            div.appendChild(img)
            div.appendChild(x)
            div.appendChild(date)
            div.appendChild(url)
            div.appendChild(value)
            div.appendChild(buttonColor)
            div.appendChild(input)
            arrayLetters.push("input"+array.length)
            array.push(data.id)
            counterCount();
            counterLettersJoke()

        })
}
// takes all div with class "card" if it has event button pressed (identified by id)
function deleteCard(event){
    let classArray=document.getElementsByClassName("card")
    console.log(event)
   for (let i = 0; i < array.length; i++) {
         if (array[i]===event.target.id){
             classArray[i].remove();
             arrayLetters.filter((item, index)=> index!==i)
             array=array.filter((item, index)=> index!==i)
             counterCount()
             counterLettersJoke()
         }
    }
}