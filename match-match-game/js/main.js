(function(){
    let intervalID = null;
    const allCards = [
        {
            id: 1,
            src: './img/marvel-icons/black_widow_logo.png',
        },
        {
            id: 2,
            src: './img/marvel-icons/captain_america_logo.png',
        },
        {
            id: 3,
            src: './img/marvel-icons/daredevil_logo.png',
        },
        {
            id: 4,
            src: './img/marvel-icons/deadpool_logo.png',
        },
        {
            id: 5,
            src: './img/marvel-icons/groot_logo.png',
        },
        {
            id: 6,
            src: './img/marvel-icons/hulk_logo.png',
        },
        {
            id: 7,
            src: './img/marvel-icons/ironman_logo.png',
        },
        {
            id: 8,
            src: './img/marvel-icons/jessica_jones_logo.png',
        },
        {
            id: 9,
            src: './img/marvel-icons/shield_logo.png',
        },
        {
            id: 10,
            src: './img/marvel-icons/spider_man_logo.png',
        },
        {
            id: 11,
            src: './img/marvel-icons/wolverine_logo.png',
        },
        {
            id: 12,
            src: './img/marvel-icons/x-men_logo.png',
        }
    ];
    const levelBtns = document.querySelectorAll('.level');
    let skirt = './img/marvel-cover.png';
    let amount = 8;
    let rows = 4;
    let columns = 4;
    let count = 0;
    let usedCards = [];
    let cardToGuess = null;
    let matched = 0;
    let paused = false;
    function shuffle(array) {
        const length = array.length;
        for (let i = length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    function gameInit() {
        clearTimer(intervalID);
        win.style.display = 'none';
        gameField.style.display = 'grid';
        gameField.innerHTML = '';
        counter.innerText = count = 0;
        matched = 0;
        cardToGuess = null;
        gameField.style.gridTemplateRows = `repeat(${rows}, 130px)`;
        gameField.style.gridTemplateColumns = `repeat(${columns}, 130px)`;
        setCards();
        shuffle(usedCards);
        for (let i=0; i<usedCards.length; i++){
            createCard(usedCards[i].src, usedCards[i].id);
        }
    }
    function createCard(src, id){
        let card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-id', id);
        let front = document.createElement('figure');
        front.className = 'front';
        front.style.background = `#fff url('${src}') center/cover`;
        card.appendChild(front);
        let back = document.createElement('figure');
        back.className = 'back';
        back.style.background = `#fff url(./${skirt}) center/contain`;
        card.appendChild(back);
        gameField.appendChild(card);
    }
    function setCards(){
        usedCards = allCards.slice(0, amount).concat(allCards.slice(0, amount));
    }
    function setTimer() {
        let sec = 1, min = 0;
        return setInterval(() => {
            if (sec === 60) {
                min++;
                sec = 0;
            }
            sec < 10 ? timer.innerText = `${min}:0${sec}` : timer.innerText = `${min}:${sec}`;
            sec++;
        }, 1000);
    }
    function clearTimer(intervalID) {
        clearInterval(intervalID);
    }
    function congrats () {
        setTimeout(() => {
            clearTimer(intervalID);
            gameField.style.display = 'none';
            win.style.display = 'flex';

            winnerHail.innerText = `Congratulations! It took you only ${count} steps and ${timer.innerText} minutes to finish the game!`;
        }, 600);
    }
    function setSkirts(skirt){
        const _cards = document.querySelectorAll('.back');
        _cards.forEach((item)=>{
            item.style.background = `#fff url(./${skirt}) center/contain`;
        })
    }
    gameField.addEventListener('click', ()=>{
        let pickedCard = event.target.parentNode;
        if (!pickedCard.classList.contains('card')) return;
        if(count===0) intervalID = setTimer();
        if (!paused&&!pickedCard.classList.contains('matched')&&!pickedCard.classList.contains('picked')){
            counter.innerText=++count;
            pickedCard.classList.add('picked');
            if(!cardToGuess) cardToGuess = pickedCard;
            else if (cardToGuess.dataset.id === pickedCard.dataset.id){
                cardToGuess.classList.add('matched');
                pickedCard.classList.add('matched');
                matched++;
                cardToGuess = null;
            }
            else {
                cardToGuess = null;
                paused = true;
                setTimeout(()=>{
                    document.querySelectorAll('.picked').forEach((item)=>{item.classList.remove('picked')});
                    paused=false;
                }, 600)
            }
            if (matched===amount) congrats();
        }
    });
    newGameBtn.addEventListener('click', () => {
        gameInit();
    });
    rulesBtn.addEventListener('click', ()=>{
       overlay.style.display = 'flex';
    });
    overlay.addEventListener('click', ()=>{
       if (event.target===event.currentTarget) {
           overlay.style.display = 'none';
       }
    });
    skirtsList.addEventListener('click', () => {
        skirt = event.target.getAttribute('src');
        setSkirts(skirt);
    });
    levelBtns.forEach((item)=>{
        item.addEventListener('click', () => {
            switch (item.id) {
                case 'easy': {
                    rows = 2;
                    columns = 5;
                    amount = 5;
                    break;
                }
                case 'medium': {
                    rows = 4;
                    columns = 4;
                    amount = 8;
                    break;
                }
                case 'difficult': {
                    rows = 4;
                    columns = 6;
                    amount = 12;
                    break;
                }
            }
            gameInit();
            document.querySelector('.current-level').classList.remove('current-level');
            item.classList.add('current-level');
        })
    });
    gameInit();
}());

