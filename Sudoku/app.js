import Settings from './sudoku.settings.js';
import { Board } from './sudoku.board.js';
import { sudoku } from './sudoku.core.js';

const settings = new Settings(Settings.DEFAULT_COMPLEXITY, onStartGame);
const board = new Board();

function onStartGame(complexity) {
    board.fill(sudoku.generate(settings.complexity));

    console.log( settings, board, sudoku );
}
