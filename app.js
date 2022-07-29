let api_url = 'https://api.quotable.io/random';
const quoteIn = document.querySelector('p')
const car = document.querySelector('i');
let pourcentage;
const input = document.querySelector('textarea');
const button = document.querySelector('button');
const notification = document.querySelector('h1');
let  newTime;

let spanIn;

const getQuote = () => {
    return new Promise((resolve, reject) => {
        fetch(api_url)
        .then(res => res.json())
        .then(data => {
            const content = data.content;
            content.split("").forEach(element => {
                const span = document.createElement('span');
                span.innerHTML = element;
                quoteIn.appendChild(span)
            });
            spanIn= document.querySelectorAll('span');

        })
    })
}
getQuote()

let fail = 0;

input.addEventListener('input', () =>{
    spanIn.forEach((element, index) =>{
        if(input.value[index]){
            if(element.innerHTML === input.value[index]){
                spanIn[index].classList.add('success')
            }else{
                spanIn[index].classList.add('fail')
                fail++;
            }
            if(fail >3){
                input.value = input.value.slice(0, -1)
                
            }
            if(index === spanIn.length -1){
                if(fail === 0){
                    end()
                    quoteIn.innerHTML = "";
                    input.value = "";
                    pourcentage = 0;
                    clearInterval(newTime)
                    car.style.left = `${pourcentage}%`;
                    button.style.display = 'inline-block';
                    input.disabled = true;
                }
            }else{
                carMove(index, spanIn.length-1)
            }            

        }else{
            spanIn[index].classList.remove('success');
            spanIn[index].classList.remove('fail');
        }
    })
    if(input.value.length > spanIn.length){
        input.value = input.value.slice(0, -1)
    }
    fail = 0;
})


let sec = 5;
let min = 0;
const timerHtml = document.querySelector("#timer")

const timer = ()=>{
    timerHtml.innerHTML = `${min} : ${sec}`
}

const startGame = ()=>{
    const timeInterval = setInterval(() => {
        sec--;
        input.disabled = true;
        timer();
        
        if(sec === 0){
            counterTime()
            notification.innerHTML = `Game has started`
            setTimeout(() => {
                notification.innerHTML = ` `
            }, 2000);
            input.disabled = false;
            input.focus();
            
            clearInterval(timeInterval)
            
        }
        
    }, 1000);
    
}
startGame()

const carMove = (index, indexLength) =>{
    pourcentage = (index * 100 / indexLength) - 5;
    car.style.left = `${pourcentage}%`
}

const counterTime = ()=>{
    newTime = setInterval(() => {
        sec++;
        if(sec === 60){
            min++;
            sec =0;
        }
        timer();
    }, 1000);
       
}

button.addEventListener('click', () =>{
    sec = 5;
    min = 0;
    getQuote()
    startGame()
    input.value = ""

})

const end = () =>{
    let word =1;
    spanIn.forEach(element =>{
        if (element.innerHTML === " "){
            word++;
        }
    })
    let munite = Number(`${min}.${sec}`)
    let wordPerMunite = word / munite;
    notification.innerHTML = `You get ${Math.round(wordPerMunite)} WPM`
    setTimeout(() => {
        notification.innerHTML = ` `
    }, 2000);
    
}








