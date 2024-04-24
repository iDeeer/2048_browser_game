// ボードのサイズ
const size = 4;

// 初期化
let board = [];
for (let i = 0; i < size; i++) {
    board[i] = [];
    for (let j = 0; j < size; j++) {
        board[i][j] = 0;
    }
}

// 新しいタイルを追加する関数
function addTile() {
    let emptyCells = [];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] === 0) {
                emptyCells.push({ x: i, y: j });
            }
        }
    }
    if (emptyCells.length > 0) {
        let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomCell.x][randomCell.y] = Math.random() < 0.9 ? 2 : 4;
    }
}

// ゲームの状態を表示する関数
function displayBoard() {
    let output = "<pre>";
    for (let i = 0; i < size; i++) {
        output += board[i].join('\t') + '\n';
    }
    output += "</pre>";
    document.body.innerHTML = output;
}

// 初期の2つのタイルを追加
addTile();
addTile();
displayBoard();

// ゲームのメインループ
document.addEventListener('keydown', function(event) {
    let moved = false;
    switch (event.key) {
        case 'ArrowUp':
            moved = moveUp();
            break;
        case 'ArrowDown':
            moved = moveDown();
            break;
        case 'ArrowLeft':
            moved = moveLeft();
            break;
        case 'ArrowRight':
            moved = moveRight();
            break;
    }
    if (moved) {
        addTile();
        displayBoard();
    }
});

// 上下左右への移動関数
function moveUp() {
    let moved = false;
    for (let j = 0; j < size; j++) {
        for (let i = 1; i < size; i++) {
            if (board[i][j] !== 0) {
                let k = i - 1;
                while (k >= 0 && board[k][j] === 0) {
                    k--;
                }
                if (k >= 0 && board[k][j] === board[i][j]) {
                    board[k][j] *= 2;
                    board[i][j] = 0;
                    moved = true;
                } else {
                    board[k + 1][j] = board[i][j];
                    if (k + 1 !== i) {
                        board[i][j] = 0;
                        moved = true;
                    }
                }
            }
        }
    }
    return moved;
}

function moveDown() {
    let moved = false;
    for (let j = 0; j < size; j++) {
        for (let i = size - 2; i >= 0; i--) {
            if (board[i][j] !== 0) {
                let k = i + 1;
                while (k < size && board[k][j] === 0) {
                    k++;
                }
                if (k < size && board[k][j] === board[i][j]) {
                    board[k][j] *= 2;
                    board[i][j] = 0;
                    moved = true;
                } else {
                    board[k - 1][j] = board[i][j];
                    if (k - 1 !== i) {
                        board[i][j] = 0;
                        moved = true;
                    }
                }
            }
        }
    }
    return moved;
}

function moveLeft() {
    let moved = false;
    for (let i = 0; i < size; i++) {
        for (let j = 1; j < size; j++) {
            if (board[i][j] !== 0) {
                let k = j - 1;
                while (k >= 0 && board[i][k] === 0) {
                    k--;
                }
                if (k >= 0 && board[i][k] === board[i][j]) {
                    board[i][k] *= 2;
                    board[i][j] = 0;
                    moved = true;
                } else {
                    board[i][k + 1] = board[i][j];
                    if (k + 1 !== j) {
                        board[i][j] = 0;
                        moved = true;
                    }
                }
            }
        }
    }
    return moved;
}

function moveRight() {
    let moved = false;
    for (let i = 0; i < size; i++) {
        for (let j = size - 2; j >= 0; j--) {
            if (board[i][j] !== 0) {
                let k = j + 1;
                while (k < size && board[i][k] === 0) {
                    k++;
                }
                if (k < size && board[i][k] === board[i][j]) {
                    board[i][k] *= 2;
                    board[i][j] = 0;
                    moved = true;
                } else {
                    board[i][k - 1] = board[i][j];
                    if (k - 1 !== j) {
                        board[i][j] = 0;
                        moved = true;
                    }
                }
            }
        }
    }
    return moved;
}
