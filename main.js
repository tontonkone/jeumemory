const board = document.querySelector("#board");

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


const cards = document.querySelectorAll('.card');
let matching = 0;
let disckCheck = false;
let cardOne, cardTwo;

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

function matchImg(img1, img2) {

    if (img1 === img2) {

        cardOne.removeEventListener('click', flipcard);
        cardTwo.removeEventListener('click', flipcard);

        cardOne = cardTwo = "";
        return (disckCheck = false);
    }

    if (img1 !== img2) {

        setTimeout(() => {
            cardOne.classList.add('vibration');
            cardTwo.classList.add('vibration');
        }, 300);

        setTimeout(() => {
            cardOne.classList.remove('vibration', 'flip');
            cardTwo.classList.remove('vibration', 'flip');

            cardOne = cardTwo = "";
            return disckCheck = false;

        }, 1000);
    }
}

cards.forEach(card => {
    card.addEventListener('click', flipcard)
})
