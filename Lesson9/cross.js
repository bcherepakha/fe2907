const X = 'x';
const O = 'o';
const EMPTY = '';

function createBoardItem() {
    const cell = document.createElement('div');

    cell.className = 'cross__board-item';

    return cell;
}

function createBoardRow() {
    const row = document.createElement('div');

    row.className = 'cross__board--row';

    for (let i=0; i<3; i++) {
        const item = createBoardItem();

        row.append(item);
    }

    return row;
}

function clearBoard(game) {
    const board = document.querySelector('.cross__board');

    board.innerText = '';

    for (let i=0; i<3; i++) {
        const row = createBoardRow(game);

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

    // TODO: in home

    return rootSvg;
}

// <svg class="o cross__board-item-el" viewBox="0 0 80 80">
//     <ellipse cx="40" cy="40" rx="20" ry="30"></ellipse>
// </svg>

document.querySelectorAll('.cross__board-item')[2].append( createX() );

function startGame() {
    const game = {};

    game.board = [
        [ X, O, EMPTY ],
        [ EMPTY, X, EMPTY ],
        [ EMPTY, EMPTY, O ]
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
    console.log( game );

    for (let rowNumber=0; rowNumber<game.board.length; rowNumber++) {
        const rowData = game.board[rowNumber];
        const rowCells = game.items[rowNumber];

        for (let cellNumber=0; cellNumber<rowData.length; cellNumber++) {
            const cellData = rowData[cellNumber];
            const cell = rowCells[cellNumber];

            cell.innerText = '';

            if (cellData === X) {
                cell.append( createX() );
            } else if (cellData === O) {
                cell.append( createO() );
            }
        }
    }
}

const game = startGame();

renderBoard(game);
