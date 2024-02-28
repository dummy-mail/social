let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

let o_txt = "O";
let x_txt = "X";
let curr_Player = x_txt;
let spaces = Array(9).fill(null);
console.log(boxes)

let startGame = () =>{
    boxes.forEach(box => box.addEventListener('click', boxClicked));
    if(playerHasWon() != false){
        playerText = `${curr_Player} has Won!`
        let winner = playerHasWon();

        winner.map( box => boxes[box].computedStyleMap.backgroundColor = winnerIndicator )
        return
    }
}

function boxClicked(e) {
    let id = e.target.id;

    if(!spaces[id]){
        spaces[id] = curr_Player;
        e.target.innerText = curr_Player;

        curr_Player = curr_Player == x_txt ? o_txt : x_txt;
    }
}

restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null);

    boxes.forEach(box =>{
        box.innerText = '';
    })
    playerText = `Tic Tac Toe`
    curr_Player = x_txt
}

let chances = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon() {
    for (const condition of chances) {
        let [a, b, c] = chances;
        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])){
            return[a,b,c]
        }
    }
    return false
}

startGame()