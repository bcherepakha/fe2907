import Settings from './sudoku.settings.js';
import { Board } from './sudoku.board.js';
import { sudoku } from './sudoku.core.js';
import { Keyboard } from './sudoku.keyboard.js';
import { Modal } from './modal.js';

const settings = new Settings(Settings.DEFAULT_COMPLEXITY, onStartGame);
const board = new Board();
const keyboard = new Keyboard();

keyboard.addEventListener('click', onClick);
board.addEventListener('endofgame', onEndGame);

function onStartGame() {
    board.fill(sudoku.generate(settings.complexity));
}

function onClick(e) {
    board.pushKey(e.data);
}

function onEndGame() {
    new Modal({
        text: 'Хотите начать новую игру?',
        actions: [
            {
                text: 'Да',
                type: 'yes',
                action: () => {
                    onStartGame();

                    return true;
                }
            },
            {
                text: 'Нет',
                type: 'no',
                action: () => true
            }
        ]
    });
}
