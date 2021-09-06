const X = 'x';
const O = 'o';
const EMPTY = '';

function createBoardItem(rowIndex, cellIndex) {
    const cell = document.createElement('div');

    cell.className = 'cross__board-item';

    cell.addEventListener('click', clickByCell(rowIndex, cellIndex));
    cell.addEventListener('animationend', onAnimationEnd);

    return cell;
}

function onAnimationEnd(e) {
    const isXAnimationEnd = e.animationName === 'a-x' && e.target.getAttribute('class') === 'x__line2';
    const isOAnimationEnd = e.animationName === 'a-o';
    const isAnimationEnd = isXAnimationEnd || isOAnimationEnd;

    console.log({ isAnimationEnd });

    if (isAnimationEnd) {
        game.drawSymbol = false;

        const isGameEnd = checkGameEnd(game);

        if (!isGameEnd) {
            game.currentStep = game.currentStep === X ? O : X;
        }
    }
}

function clickByCell(rowIndex, cellIndex) {
    return function step(e) {
        if (game.drawSymbol) {
            return ;
        }

        const currentCellValue = game.board[rowIndex][cellIndex];

        if (currentCellValue !== EMPTY) {
            return ;
        }

        game.board[rowIndex][cellIndex] = game.currentStep;
        game.drawSymbol = true;

        renderBoard(game);
        // const currentCell = e.currentTarget;
        // const currentCell = game.items[rowIndex][cellIndex];

        // if (game.currentStep === X) {
        //     currentCell.append( createX() );
        // } else {
        //     currentCell.append( createO() );
        // }
    };
}

function createBoardRow(rowIndex) {
    const row = document.createElement('div');

    row.className = 'cross__board--row';

    for (let i=0; i<3; i++) {
        const item = createBoardItem(rowIndex, i);

        row.append(item);
    }

    return row;
}

function clearBoard() {
    const board = document.querySelector('.cross__board');

    board.innerText = '';

    for (let i=0; i<3; i++) {
        const row = createBoardRow(i);

        board.append(row);
    }
}

function createX() {
    const rootSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    rootSvg.setAttribute('class', 'x cross__board-item-el');
    rootSvg.setAttribute('viewBox', '0 0 80 80');

    line1.setAttribute('class', 'x__line1');
    line1.setAttribute('x1', '20');
    line1.setAttribute('y1', '10');
    line1.setAttribute('x2', '60');
    line1.setAttribute('y2', '70');

    line2.setAttribute('class', 'x__line2');
    line2.setAttribute('x1', '60');
    line2.setAttribute('y1', '10');
    line2.setAttribute('x2', '20');
    line2.setAttribute('y2', '70');

    rootSvg.append(line1, line2);

    return rootSvg;
}

function createO() {
    const rootSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const ellipeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');

    rootSvg.setAttribute('class', 'o cross__board-item-el');
    rootSvg.setAttribute('viewBox', '0 0 80 80');

    ellipeSvg.setAttribute('cx', '40');
    ellipeSvg.setAttribute('cy', '40');

    ellipeSvg.setAttribute('rx', '20');
    ellipeSvg.setAttribute('ry', '30');

    rootSvg.append(ellipeSvg);

    return rootSvg;
}

document.querySelectorAll('.cross__board-item')[2].append( createX() );

function startGame() {
    const game = {};

    game.currentStep = X;
    game.drawSymbol = false;

    game.board = [
        [ EMPTY, EMPTY, EMPTY ],
        [ EMPTY, EMPTY, EMPTY ],
        [ EMPTY, EMPTY, EMPTY ]
    ];

    clearBoard(game);

    const board = document.querySelector('.cross__board');
    const rows = document.querySelectorAll('.cross__board--row');

    game.boardEl = board;
    game.items = [];

    for (let i=0; i<rows.length; i++) {
        const row = rows[i];
        const cells = Array.from( row.querySelectorAll('.cross__board-item') );

        game.items.push(cells);
    }

    return game;
}

function renderBoard(game) {
    for (let rowNumber=0; rowNumber<game.board.length; rowNumber++) {
        const rowData = game.board[rowNumber];
        const rowCells = game.items[rowNumber];

        for (let cellNumber=0; cellNumber<rowData.length; cellNumber++) {
            const cellData = rowData[cellNumber];
            const cell = rowCells[cellNumber];

            if (cell.children.length > 0) {
                continue ;
            }

            if (cellData === X) {
                cell.append( createX() );
            } else if (cellData === O) {
                cell.append( createO() );
            }
        }
    }
}

function checkGameEnd(game) {
    console.log(game);
    const winRowIndex = game.board.findIndex(function(row) {
        return isLineWin(row, game.currentStep);
    });

    if (winRowIndex > -1) {
        alert(`${game.currentStep} win!`);

        return true;
    }

    const columns = [];

    for (let i=0; i<3; i++) {
        const column = [
            game.board[0][i],
            game.board[1][i],
            game.board[2][i]
        ];

        columns.push(column);
    }

    const winColumnIndex = columns.findIndex(function(column) {
        return isLineWin(column, game.currentStep);
    });

    if (winColumnIndex > -1) {
        alert(`${game.currentStep} win!`);

        return true;
    }

    //TODO: check diagonals

    const hasEmptyCell = game.board.some(function (row) {
        return row.includes(EMPTY);
    });

    if (!hasEmptyCell) {
        alert('Standoff!');

        return true;
    }

    return false;
}

function isLineWin(line, checkedValue) {
    return line.every(function (currentValue) {
        return currentValue === checkedValue;
    });
}

const game = startGame();

renderBoard(game);
