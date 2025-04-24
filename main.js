document.getElementById('start-button').addEventListener('click', function() {
    document.querySelector('.start-screen').style.opacity = '0';
    
    setTimeout(() => {
        document.querySelector('.start-screen').classList.add('hidden');
        document.querySelector('.game-container').classList.remove('hidden');
        
        // Инициализация игры
        resetLevel();
        renderMap();
    }, 500);
});

const restartLevelButton = document.getElementById('restart-level-button');
restartLevelButton.addEventListener('click', resetLevel);

//Заполнение массива элементами

let map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
    [1,0,0,3,0,1,0,0,0,0,3,0,0,0,1],
    [1,0,0,0,0,1,0,3,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,0,0,0,1,0,1,1,1,1,0,3,0,1],
    [1,1,1,0,0,1,0,0,0,0,1,0,0,0,1],
    [1,2,0,0,0,1,0,0,0,0,1,1,1,0,1],
    [1,2,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,2,0,0,0,1,0,3,0,0,0,0,0,4,1],
    [1,2,0,0,0,1,0,0,0,0,1,0,0,0,1],
    [1,2,1,0,0,1,1,1,1,1,1,3,0,0,1], // 3 элемент должен быть (1)
    [1,2,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

let moveCount = 0;
let timeElapsed = 0;
let timerRunning = false;
let FirstMove = true;
let timerInterval;
let gameEnd = false;

const gameArea = document.querySelector('#map'); // Выбираем элемент с селектором 'map'

let mapCopy = JSON.parse(JSON.stringify(map)); // сохранение копии карты

let manPosition = findManPosition(map);

const victoryMessage = document.createElement('div');
victoryMessage.className = 'victory-message hidden';
victoryMessage.innerHTML = 
    `<h2>Поздравляем!</h2>
    <p>Вы успешно завершили уровень!</p>
    <p>Затрачено времени: <span id="final-time">0</span> сек</p>
    <p>Сделано ходов: <span id="final-moves">0</span></p>
    <button id="restart-button">Играть снова</button>`;
document.body.appendChild(victoryMessage);

// Обработчик для кнопки рестарта
document.getElementById('restart-button')?.addEventListener('click', resetLevel);


let i = 0;
const span = document.querySelector('.lesson');
document.addEventListener('keydown', function(event) {
    if(gameEnd) return;
    switch(event.code){
        case 'ArrowUp':
        case 'KeyW':
            MoveMan(-1, 0);
            break
        case 'ArrowDown':
        case 'KeyS':
            MoveMan(1, 0);
            break
        case 'ArrowLeft':
        case 'KeyA':
            MoveMan(0, -1);
            break
        case 'ArrowRight':
        case 'KeyD':
            MoveMan(0, 1);
            break
    }
});

renderMap();


function findManPosition(map) {
    for (let x = 0; x < map.length; x++) {
        for (let y = 0; y < map[x].length; y++) {
            if (map[x][y] === 4) {
                return { x, y }; 
            }
        }
    }
}


function MoveMan(x, y) {
    moveCount++;
    document.getElementById('move-counter').innerText = 'Сделанно ходов:' + moveCount;
    if (FirstMove) {
        startTimer();
        FirstMove = false;
    }
    const currentX = manPosition.x + x;
    const currentY = manPosition.y + y;
    if (map[currentX][currentY] === 1) {
        return;
    }
    // Проверяем можно ли передвинуть ящик, если след. позиция - позиция ящика
    if (map[currentX][currentY] === 3) {
        const currentBoxX = currentX + x;
        const currentBoxY = currentY + y;
        // Проверка, есть ли перед коробкой стена или другая коробка
        if (map[currentBoxX][currentBoxY] === 1 || map[currentBoxX][currentBoxY] === 3) {
            return;
        }
        // Перемещаем ящик, сохраняя финишную точку если она была
        if (mapCopy[currentBoxX][currentBoxY] === 2) {
            map[currentBoxX][currentBoxY] = 3; // Ящик на финише
        } else {
            map[currentBoxX][currentBoxY] = 3;
        }
        // Восстанавливаем предыдущую клетку (финиш или пусто)
        if (mapCopy[currentX][currentY] === 2) {
            map[currentX][currentY] = 2;
        } else {
            map[currentX][currentY] = 0;
        }
    }
    // Восстанавливаем предыдущую позицию игрока (финиш или пусто)
    if (mapCopy[manPosition.x][manPosition.y] === 2) {
        map[manPosition.x][manPosition.y] = 2;
    } else {
        map[manPosition.x][manPosition.y] = 0;
    }
    // Перемещаем игрока, сохраняя финишную точку если она есть
    manPosition.x = currentX;
    manPosition.y = currentY;
    map[manPosition.x][manPosition.y] = 4;
    
    renderMap();
    winCheck();
}


function renderMap() {
    gameArea.innerHTML = ''; // Очистка игрового поля перед перерисовкой
    for(let x = 0; x < map.length; x++) {
        const row = document.createElement('div');
        row.className = 'row';
        for(let y = 0; y < map[x].length; y++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            // Отображаем финишные точки (они могут быть под другими объектами)
            if (mapCopy[x][y] === 2) {
                cell.classList.add('finish');
            }
            // Добавляем другие элементы поверх финиша
            if(map[x][y] === 0){
                cell.classList.add('floor')
            }
            if(map[x][y] === 1) {
                cell.classList.add('wall');
            } else if(map[x][y] === 3) {
                cell.classList.add('box');
                if (mapCopy[x][y] === 2) {
                    cell.classList.add('box-on-finish');
                }
            } else if(map[x][y] === 4) {
                cell.classList.add('man');
                if (mapCopy[x][y] === 2) {
                    cell.classList.add('man-on-finish');
                }
            }
            row.append(cell);
        }
        gameArea.append(row);
    }
}


function winCheck() {
    for (let x = 0; x < mapCopy.length; x++) {
        for (let y = 0; y < mapCopy[x].length; y++) {
            if (mapCopy[x][y] === 2 && map[x][y] !== 3) {
                return false; 
            }
        }
    }
    gameEnd = true;
    stopTimer();
    showVictoryMessage();
    return true;
}


function resetLevel() {
    hideVictoryMessage();
    map = JSON.parse(JSON.stringify(mapCopy));
    manPosition = findManPosition(map);
    renderMap();
    resetTimer();
    timerRunning = false;
    moveCount = 0;
    document.getElementById("move-counter").innerText = "Сделанно ходов: 0";
    gameEnd = false;
    FirstMove = true;
}


function showVictoryMessage() {
    document.getElementById("final-time").innerText = timeElapsed;
    document.getElementById("final-moves").innerText = moveCount;
    victoryMessage.classList.remove('hidden');
    gameArea.classList.add('blurred');
    document.getElementById("timer").classList.add('blurred');
    document.getElementById("move-counter").classList.add('blurred');
    document.getElementById("restart-level-button").classList.add('blurred')
}

function hideVictoryMessage() {
    victoryMessage.classList.add('hidden');
    gameArea.classList.remove('blurred');
    document.getElementById("timer").classList.remove('blurred');
    document.getElementById("move-counter").classList.remove('blurred');
    document.getElementById("restart-level-button").classList.remove('blurred')
}

function startTimer() {
    if (!timerRunning) {
        timerRunning = true;
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        timerInterval = setInterval(updateTimer, 1000);
    }
}

function updateTimer() {
    if (timerRunning) {
        timeElapsed++;
        document.getElementById("timer").innerText = "Время прохождения: " + timeElapsed + " сек";
    }
}

function stopTimer() {
    timerRunning = false;
    clearInterval(timerInterval);
}

function resetTimer() {
    stopTimer();
    timeElapsed = 0;
    document.getElementById("timer").innerText = "Время прохождения: 0 сек";
    FirstMove = true; // Сбрасываем флаг при рестарте
}