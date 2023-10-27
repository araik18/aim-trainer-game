var choose_difficulty = "EASY";
var container = document.getElementById('container');

function Choose_difficulty() {
    container.innerHTML = '<div id="Difficulty_choose"  style="margin: auto">' +
        '<div>' +
        '<img id="logo" src="assets/img/play.png" style="vertical-align: middle;float:left;">\n' +
        '<img id="letter" src="assets/img/letter.png" style="vertical-align: middle;float:right;"></div>\n' +
        '<div class="difficulty" style="clear: left, right;">\n' +
        '        Difficulty :\n' +
        '    </div><br><br>\n' +
        '    <div>\n' +
        '        <table class="table_difficulty">\n' +
        '            <tr>\n' +
        '                <td><button class="difficulty_item" onclick="setGameLevel(\'EASY\', event)" style="background: yellow">EASY</button></td>\n' +
        '                <td><button class="difficulty_item" onclick="setGameLevel(\'HARD\', event)">HARD</button></td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td><button class="difficulty_item" onclick="setGameLevel(\'MEDIUM\', event)">MEDIUM</button></td>\n' +
        '                <td><button class="difficulty_item" onclick="setGameLevel(\'CPS\', event)">CPS</button></td>\n' +
        '            </tr>\n' +
        '        </table>\n' +
        '    </div>\n' +
        '    <button class="next" onclick="game_start()">Begin</button>'
    '</div>\n';
}

function setGameLevel(level, event) {
    choose_difficulty = level;
    var buttons = document.getElementsByClassName('difficulty_item');
    for (var button of buttons) {
        button.setAttribute("style", "background: white;")
    }
    event.target.setAttribute("style", "background: yellow;")
}

function game_start() {
    if (choose_difficulty == "") {
        alert('Choose difficulty!');
        return;
    }
    Game_page();
}


function Game_page() {
    //New page
    container.innerHTML = '<div id="game_page"><div class="timeframe">\n' +
        '<img id="logo" src="assets/img/play.png" style="vertical-align: middle;">\n' +
        '        <span id="remaining_time" class="Timer">00 : 10</span>\n' +
        '        <span style="margin-left: 17vw">Score: <b id="score"></b></span>\n' +
        '    </div>\n' +
        '    <div id="game_area" style="">\n' +
        '        <table id="game_board" class="game_style">\n' +
        '        </table>\n' +
        '    </div></div>';

    startGame("LEVEL_" + choose_difficulty);
}

function Game_result(p_nSuccessCount, p_nMissedCount) {
    var cps = (p_nSuccessCount + p_nMissedCount) / 10;
    var Accuracy = (p_nSuccessCount / (p_nSuccessCount + p_nMissedCount)) * 100;
    console.log(p_nSuccessCount + "  " + p_nMissedCount);
    container.innerHTML = '<div id="Difficulty_choose"  style="margin: auto">' +
        '<div>' +
        '<img id="logo" src="assets/img/play.png" style="vertical-align: middle;float:left;">\n' +
        '<img id="letter" src="assets/img/letter.png" style="vertical-align: middle;float:right;"></div>\n' +
        '<div class="difficulty" style="clear: left, right;">\n' +
        '        Result :\n' +
        '    </div><br><br>\n' +
        '    <div>\n' +
        '        <table class="table_difficulty">\n' +
        '            <tr>\n' +
        '                <td><button class="difficulty_item">CPS: ' + cps + '</button></td>\n' +
        '                <td><button class="difficulty_item">Total Hit: ' + nSuccessCount + '</button></td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td><button class="difficulty_item">Accuracy: ' + Accuracy.toFixed(1) + '%</button></td>\n' +
        '                <td><button class="difficulty_item">Mode: ' + choose_difficulty + '</button></td>\n' +
        '            </tr>\n' +
        '        </table>\n' +
        '    </div>\n' +
        '    <button class="next" onclick="Final_page()">Next</button>'
    '</div>\n';
}

function Final_page() {
    container.innerHTML = '<div id="mainpage" style="margin: auto">\n' +
        '        <img id="logo" src="assets/img/play.png" style="vertical-align: middle;float:left;">\n' +
        '        <div class="headername" style="margin: auto; clear: left;">The Simple Aim <br> Tranier</div>\n' +
        '        <button class="next1" onclick="return Choose_difficulty()">Retry</button><br><br>\n' +
        '        <button class="next1" onclick="window.location.reload(true);">Main Menu</button>\n' +
        '    </div>';
}
