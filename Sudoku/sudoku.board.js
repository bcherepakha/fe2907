import { Cell } from './sudoku.cell.js';

export class Board {
    constructor() {
        this.rootEl = document.querySelector('.game__board');
        this.clear();
    }

    clear() {
        this.rootEl.innerText = '';
    }

    fill(boardStr) {
        this.board = boardStr;
        this.clear();

        this.cells = boardStr.split('').map((cellValue, idx) => {
            const cell = new Cell({
                value: cellValue === '.' ? '' : cellValue,
                editable: cellValue === '.',
            });

            cell.setKey(idx);
            cell.addEventListener('activate', this.onActivate.bind(this));

            return cell;
        });

        this.rootEl.append(...this.cells.map(c => c.render()));
    }

    onActivate(e) {
        const activeCell = e.target;
        const {
            row: activeRow,
            column: activeColumn,
            square: activeSquare
        } = activeCell;

        this.cells.forEach(cell => {
            cell.setProps({
                active: cell === activeCell
                    || cell.props.value !== ''
                        && cell.props.value === activeCell.props.value,
                inRange: cell.row === activeRow
                    || cell.column === activeColumn
                    || cell.square === activeSquare,
            });
        });
    }
}
