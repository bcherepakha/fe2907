import { Cell } from './sudoku.cell.js';
import { sudoku } from './sudoku.core.js';
import EventSource from './eventSource.js';

export class Board extends EventSource {
    constructor() {
        super();

        this.activeCell = null;
        this.rootEl = document.querySelector('.game__board');
        this.clear();
    }

    get currentBoard() {
        return this.cells.map(cell => {
            if (cell.props.error) {
                return '.';
            }

            return cell.props.value || '.';
        }).join('');
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

    pushKey(value) {
        if (!this.activeCell || !this.activeCell.isEditable) {
            return null;
        }

        if (typeof value !== 'number' || value <= 0 || value > 9) {
            return null;
        }

        if (this.checkEndOfGame()) {
            return null;
        }

        const { currentBoard } = this;
        const candidates = sudoku.get_candidates(currentBoard);
        const { square, squareKey } = this.activeCell;
        const currentCandidates = candidates[square][squareKey];

        this.activeCell.setProps({
            value: value.toString(),
            error: !currentCandidates.includes(value.toString())
        });

        this.render();

        if (this.checkEndOfGame()) {
            this.dispatch('endofgame');
        }
    }

    checkEndOfGame() {
        const { currentBoard } = this;
        const isEnd = !currentBoard.includes('.');

        return isEnd;
    }

    onActivate(e) {
        const activeCell = e.target;

        this.activeCell = activeCell;
        this.render();
    }

    render() {
        const { activeCell } = this;
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
