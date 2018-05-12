$(document).ready(function () {
    $(document).delegate("button[data-toggle='change-size']", "click", changeSizeHandler);
    loadGame();
});
function changeSizeHandler(e) {
    e.preventDefault();
    var button = $(this);
    var attrs = ["data-rows-count", "data-columns-count", "data-bomb-count"];
    for (var i = 0; i < attrs.length; i++) {
        $("table.sapper-table:first").attr(attrs[i], button.attr(attrs[i]));
    }
    var columns = parseInt(button.attr("data-columns-count"));
    var width = columns * 30 + 2;
    $("div.panel.sapper-table:first").width(width);
    loadGame();
}

function loadGame() {
    $("div.panel.sapper-table:first>.panel-heading>.panel-title span.bombs-refresh").remove();
    $("div.panel.sapper-table:first>.panel-heading>.panel-title span.bombs-count-icon").remove();
    $("div.panel.sapper-table:first>.panel-heading>.panel-title span.timer").remove();
    $("div.panel.sapper-table:first>.panel-heading>.panel-title span.bombs-count").remove();
	 // количество строк
    var rowsCount = parseInt($("table.sapper-table").attr("data-rows-count"));
    // количество колонок
    var columnsCount = parseInt($("table.sapper-table").attr("data-columns-count"));
    // количество бомб
    var bombCount = parseInt($("table.sapper-table").attr("data-bomb-count"));
    // бомбы
    var bombs = [];
    // секунды таймера
    var seconds = 0;
    // игра окончена
    var gameOver = false;
    // использование Math.round() даст неравномерное распределение!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Случайное число для колонки от 0 до кол-ва столбцов -1
function getRandomColumnIndex() {
    return getRandomInt(0, columnsCount - 1);
}
// Случайное число для строки от 0 до кол-ва строк -1
function getRandomRowIndex() {
    return getRandomInt(0, rowsCount - 1);
}
// Создать бомбу со случайными координатами
function getBomb() {
    return [getRandomRowIndex(), getRandomColumnIndex()];
}
// Проверить существование бомбы по массиву с координатами
function checkBomb(bmb) {
     var exists = false;
     for (var b = 0; b < bombs.length; b++) {
     if (bmb[0] === bombs[b][0] && bmb[1] === bombs[b][1]) {
     exists = true;
     break;
}
}
     return exists;
 // получить ячейку
function getCell(ri, ci) {
     var row = $("table.sapper-table>tbody>tr")[ri];
     var cell = $(row).find("td > div")[ci];
     return $(cell);
}
// проверка ячейки, что она ещё не открыта
    function checkCell(cell) {
        return cell.hasClass("cell-closed") && cell.attr("data-flag") === undefined;
    }
    // установить окончание игры
    function setGameOver() {
        gameOver = true;
        var table = $("table.sapper-table:first");
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        td.setAttribute("colspan", columnsCount);
        td.setAttribute("class", "game-over");
        td.innerHTML = "Game Over";
        tr.appendChild(td);
        table.append(tr);
    }
}
