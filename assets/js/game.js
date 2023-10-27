const LEVEL_EASY = "LEVEL_EASY";
const LEVEL_MEDIUM = "LEVEL_MEDIUM";
const LEVEL_HARD = "LEVEL_HARD";
const LEVEL_CPS = "LEVEL_CPS";


const IS_DEBUG = true;

// function game() {
// properties
var level = LEVEL_EASY;
var nHeight = 0;
var nWidth = 0;

// state
var nDuration = 10 * 1000;
var nCurrentTime = 0;
var nDelay = 0;

var nSuccessCount = 0;
var nMissedCount = 0;
var total_shown = 0;
// for downCount, 10s, 9s, ...
var intervalMain = null;

// for next turn, ...
var timeoutDelay = null;

// array for cell data, item type: boolean
var cellData = [];
var isRunning = false;
var isTurnSuccess = false;

/**
 * initialize Game data
 */
function resetGameData(p_level) {
    switch (p_level) {
        case LEVEL_EASY:
            nHeight = nWidth = 3;
            nDuration = 10 * 1000;
            nDelay = 2 * 1000;
            break;
        case LEVEL_MEDIUM:
            nHeight = nWidth = 4;
            nDuration = 10 * 1000;
            nDelay = 1 * 1000;
            break;
        case LEVEL_HARD:
            nHeight = nWidth = 5;
            nDuration = 10 * 1000;
            nDelay = 0.5 * 1000;
            break;
        case LEVEL_CPS:
            nDuration = 10 * 1000;
            nHeight = nWidth = 1;
            nDelay = 10 * 1000;
            break;
        default:
            break;
    }
    nCurrentTime = 0;
    nSuccessCount = 0;
    nMissedCount = 0;
    intervalMain = null;
    timeoutDelay = null;

    _resetCellData();
    update();
}

/**
 * reset cell data
 * @private
 */
function _resetCellData() {
    cellData = [];
    for (var i = 0; i < nWidth * nHeight; i++) {
        cellData.push(false)
    }

}

/**
 * Start Game
 */
function startGame(p_level = LEVEL_EASY) {
    // reset game data with specified level
    resetGameData(p_level);

    isRunning = true;
    intervalMain = setInterval(_downCount, 1000);
    _nextTurn();
}

/**
 * Stop Game
 */
function stopGame() {
    if (intervalMain) {
        clearInterval(intervalMain);
    }

    if (timeoutDelay) {
        clearTimeout(timeoutDelay);
    }

    if (isRunning) {
        isRunning = false;
    } else {
        return;
    }

    _log("stopGame", "Game Over")
    Game_result(nSuccessCount, nMissedCount);
}

/**
 * Click a cell
 * @param x: 0 based index of x axis
 * @param y: 0 based index of y axis
 * @private
 */
function clickCell(x, y) {
    if (!isRunning) {
        _log("_clickCell", "Please start a new Game");
        return;
    }

    if (x < 0 || x >= nWidth) {
        _log("_clickCell", "wrong X");
        return;
    }

    if (y < 0 || y >= nHeight) {
        _log("_clickCell", "wrong Y");
        return;
    }

    if (isTurnSuccess) {
        _log("_clickCell", "you clicked the correct cell, already");
        return;
    }

    if (!isRunning) {
        _log("clickCell", "Game Over");
        alert("Please start a new game!");
        return;
    }
    // check if user clicked the correct cell?
    var cellIndex = x * nWidth + y;

    if (cellData[cellIndex] === true) {
        isTurnSuccess = true;
        nSuccessCount++;
        _nextTurn();
    } else {
        nMissedCount++;
    }
    update();
}

/**
 * execute next turn
 * @private
 */
function _nextTurn() {
    if (nCurrentTime >= nDuration) {
        stopGame();
        return;
    }

    // remove setTimeout
    if (timeoutDelay) {
        clearTimeout(timeoutDelay);
    }

    // reset cell data
    _resetCellData();

    // generate next value
    var nextIndex = __getRandomIndexBetween(0, nWidth - 1);
    cellData[nextIndex] = true;

    //Total Count
    total_shown++;
    isTurnSuccess = false;

    // wait user's clicking
    timeoutDelay = setTimeout(_nextTurn, nDelay);

    update();
}

/**
 * Count down every second
 * @private
 */
function _downCount() {
    if (nCurrentTime > nDuration) {
        _log("_downCount", "time is over");
        stopGame();
        return;
    }

    nCurrentTime += 1000;

    _updateRemainingTime();
}

/**
 * output log if needed (IS_DEBUG === true)
 * @param tag
 * @param message
 * @private
 */
function _log(tag, message) {
    if (IS_DEBUG) {
        console.log(tag, message);
    }
}

/**
 * get 0 based index between min and max randomly
 * @param min
 * @param max
 * @returns {number}
 * @private
 */
function __getRandomIndexBetween(min, max) {
    var x = Math.round(Math.random() * (max - min) + min);
    var y = Math.round(Math.random() * (max - min) + min);
    var ret = x * nWidth + y;
    _log('__getRandomIndexBetween', ret);
    return ret;
}


/***********************************************************************/
//                  VISUAL METHODS
/***********************************************************************/
function update() {
    _updateBoard();
    _updateRemainingTime();
    _updateScore();

    //height=width set
    try {
        var cell = document.getElementsByClassName('game_style')[0];
        var width = cell.rows[0].cells[0].clientWidth;
        var cells = document.querySelectorAll('#game_board td');
        if (cells && cells.length) {
            for (var item of cells) {
                item.height = width;
            }
        }
    } catch (e) {
    }
}

function _updateBoard() {
    var html = '';
    for (var x = 0; x < nWidth; x++) {
        html += '<tr>';
        for (var y = 0; y < nHeight; y++) {
            var index = x * nWidth + y;
            if (cellData[index] === true) {
                html += ('<td onclick="clickCell(' + x + ',' + y + ');" style="background: deeppink"></td>');
            } else {
                html += ('<td onclick="clickCell(' + x + ',' + y + ');" style="background: white"></td>');
            }
        }
        html += '</tr>';
    }

    var board = document.getElementById('game_board');
    if (board) {
        board.innerHTML = html;
    }
}

function _updateRemainingTime() {
    var element = document.getElementById('remaining_time');
    if (element) {
        var remaining_time = (nDuration - nCurrentTime) / 1000;
        if (remaining_time < 10)
            remaining_time = '0' + remaining_time;
        element.innerHTML = "00 : " + remaining_time;
    }
}

function _updateScore() {
    var element = document.getElementById('score');
    if (element) {
        element.innerHTML = nSuccessCount;
    }
}

// }
