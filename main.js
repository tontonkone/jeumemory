const board = document.querySelector("#board");

// creer le tableaux  du jeu
const createBoard = (board) => {

    for (let i = 0; i < 1; i++) {
        let ul = document.createElement('ul');
        ul.classList.add('cards')
        board.appendChild(ul)
        let index = 0;

        for (let j = 1; j <= 16; j++) {

            if (index == 8) index = 0;
            index++
            let li = document.createElement('li');
            let divfront = document.createElement('div');
            let divback = document.createElement('div');

            let img = document.createElement('img');
            img.src = `img/image-${index}.png`;
            img.alt = 'picture of card';

            divback.classList.add('view', 'view-back');
            divfront.classList.add('view', 'view-front');
            li.classList.add('card');


            divback.appendChild(img)
            li.appendChild(divfront);
            li.appendChild(divback);
            ul.append(li)
        }
    }
}
createBoard(board);

// select toute les cartes 
const cards = document.querySelectorAll('.card');
const reset = document.querySelector('.reset');
const score = document.querySelector('.score');

let countScore = 0;
let matchCard = 0;
let disckCheck = false;
let cardOne, cardTwo;

reset.addEventListener('click',()=>{
    countScore = 0;
    score.innerText = "Votre score"
    cardshuffle();
});

/**
 * fonction qui retourne les carte
 * qui recupere les images de la carte une et deux
 * elle prends aussi la functon match qui verifie les cartes identique
 * @param {*} el 
 * @returns 
 */
function flipcard(el) {

    let checked = el.target;

    if (checked !== cardOne && !disckCheck) {

        checked.classList.add('flip');

        if (!cardOne) {
            return (cardOne = checked);
        }
    }

    cardTwo = checked;

    disckCheck = true;

    let imgOne = cardOne.querySelector('.view-back img').src;
    let imgTwo = cardTwo.querySelector('.view-back img').src;

    matchImg(imgOne, imgTwo);
}

/**
 * cette fonction vérifie si les images sont identiques 
 * @param {*} img1 
 * @param {*} img2 
 * @returns 
 */

function matchImg(img1, img2) {

    if (img1 === img2) {

        matchCard++
        if(matchCard === 8 ) {
            countScore++;
            score.innerText = `Votre score ${countScore}`;
            console.log(countScore);
            setTimeout(() => {
                cardshuffle();
            }, 900);

        }

        cardOne.removeEventListener('click', flipcard);
        cardTwo.removeEventListener('click', flipcard);

        cardOne = cardTwo = "";
        return (disckCheck = false);
    }

    if (img1 !== img2) {

        setTimeout(() => {
            cardOne.classList.add('vibration');
            cardTwo.classList.add('vibration');
        }, 200);

        setTimeout(() => {
            cardOne.classList.remove('vibration', 'flip');
            cardTwo.classList.remove('vibration', 'flip');

            cardOne = cardTwo = "";
            return disckCheck = false;

        }, 700);
    }
}

/**
 * function qui melange les cartes 
 */

function cardshuffle(){

    cardOne = cardTwo = "";
    disckCheck = false;
    matchCard = 0;
    
    let array = [1, 2, 3, 4, 5,6, 7, 8, 1, 2, 3, 4, 5,6, 7, 8];

    array.sort(()=>(Math.random() > 0.5 ? 1 : -1));

    console.log(array)

    cards.forEach((card, index ) => {
        card.classList.remove('flip');

        let tagImg = card.querySelector('.view-back img');
        tagImg.src = `img/image-${array[index]}.png`;
        console.log(tagImg.src)

        card.addEventListener('click', flipcard);
    })
}

cardshuffle();

cards.forEach(card => {
    /*  card.classList.add('flip') */
   
card.addEventListener('click', flipcard);
})
