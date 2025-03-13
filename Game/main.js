let map = [
    [0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,3,0,3,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,3,0,0,1,0,0,0,0,0,0,0,0,0],
    [1,1,1,0,1,3,1,1,0,1,0,0,0,1,1,1,1,1,1],
    [1,0,0,0,1,0,1,1,0,1,1,1,1,1,0,0,2,2,1],
    [1,0,3,0,0,0,0,0,0,0,0,0,0,0,4,0,2,3,1],
    [1,1,1,1,1,0,1,1,1,0,1,0,1,1,0,0,2,2,1],
    [0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0]
]

//Заполнение массива элементами


const gameArea = document.querySelector('#map'); // Выбираем элемент с селектором 'map'

for(let x = 0; x < map.length; x++) { // Проходим по каждой строке массива
    const row = document.createElement('div'); // Создаем новый div для строки
    row.className = 'row'; // Добавляем класс 'row' к строке

    for(let y = 0; y < map[x].length; y++) { // Проходим по каждой ячейке в строке
        const cell = document.createElement('div'); // Создаем новый div для ячейки
        cell.className = 'cell'; // Добавляем класс 'cell' к ячейке

        if(map[x][y] == 1) {
            cell.classList.add('wall'); // Если значение 1, добавляем класc 'wall'
        } else if(map[x][y] == 2){
            cell.classList.add('finish') // Если значение 2, добавляем класс 'finish'
        } else if(map[x][y] == 3) {
            cell.classList.add('box'); // Если значение 3, добавляем класс 'box'
        } else if(map[x][y] == 4) {
            cell.classList.add('man'); // Если значение 4, добавляем класс 'man'
        }

        row.append(cell); // Добавляем ячейку к строке
    }

    gameArea.append(row); // Добавляем строку к игровому полю
}

console.log(gameArea); // Выводим игровое поле в консоль для проверки

//Отслеживание нажатых клавиш 

let i = 0;
const span = document.querySelector('.lesson');
document.addEventListener('keydown', function(event) {
    switch(event.code){
        case 'ArrowUp':
            console.log('Вверх');
            break
        case 'ArrowDown':
            console.log('Вниз');
            break
        case 'ArrowLeft':
            console.log('Влево');
            break
        case 'ArrowRight':
            console.log('Вправо');
            break
        case 'KeyW':
            console.log('Вверх');
            break
        case 'KeyS':
            console.log('Вниз');
            break
        case 'KeyA':
            console.log('Влево');
            break
        case 'KeyD':
            console.log('Вправо');
            break
    }
});