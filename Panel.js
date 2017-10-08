/**
 * Created by weiqiuhan on 2017/10/3.
 */
var Panel = {
    createNew : function () {
        var panel = {};
        panel.GAME_OVER = false;
        panel.existCellList = [];


        var CELL_WIDTH = 40,
            CELL_HEIGHT = 40,
            PANEL_X = 100,
            PANEL_Y = 100,
            PANEL_CEL_WID = 10,
            PANEL_CEL_HEI = 10;

        panel.getWidth = function () {
            return PANEL_CEL_WID;
        };
        panel.getHeight = function () {
            return PANEL_CEL_HEI;
        };

        panel.getRandomBrick = function () {
            panel.currentList = [];
            var randnum = Math.round(Math.random() * 1),
                b;
            switch (randnum) {
                case 0:  b = Brick1.createNew(panel);
                    break;
                case 1:  b = Brick2.createNew(panel);
                    break;
            }
            panel.currentList.push(b);
            panel.draw();
            for (var i = 0; i < b.cellList.length; i++) {
                if (b.cellList[i].alreadyHave()) {
                    panel.GAME_OVER = true;
                }
            }
        };

        panel.checkAndRemove = function () {
            var row = PANEL_CEL_HEI - 1;
            while (true) {
                if (row < 0) break;
                if (lineCanRemove(row)) {
                    removeLine(row);
                } else {
                    row -= 1;
                }
            }
        };

        function lineCanRemove(line) {
            var count = 0;
            for (var i = 0; i < panel.existCellList.length; i++) {
                if (panel.existCellList[i].y == line) {
                    count += 1;
                }
            }
            return count == PANEL_CEL_WID;
        }

        function removeLine(line) {
            var newList = [];
            for (var i = 0; i < panel.existCellList.length; i++) {
                var newLine = panel.existCellList[i];
                if (newLine.y < line) {
                    newLine.y += 1;
                    newList.push(newLine);
                } else if (newLine.y > line) {
                    newList.push(newLine);
                }
            }
            panel.existCellList = newList;
        }

        panel.draw = function () {
            panel.clear();
            drawPanel();
            for (var i = 0; i < panel.currentList.length; i++) {
                panel.currentList[i].draw(panel);
            }
            for (var i = 0; i < panel.existCellList.length; i++) {
                panel.existCellList[i].draw(panel);
            }

        };

        panel.drawRec = function (x, y) {
            drawRec(x, y);
        };

        panel.clear = function () {
            content.clearRect(PANEL_X, PANEL_Y, PANEL_X + CELL_WIDTH * PANEL_CEL_WID, PANEL_Y + CELL_HEIGHT * PANEL_CEL_HEI);
        };

        var canvas = document.getElementById('canvasID');
        canvas.width = PANEL_X + CELL_WIDTH * PANEL_CEL_WID;
        canvas.height = PANEL_Y + CELL_HEIGHT * PANEL_CEL_HEI;
        var content = canvas.getContext('2d');

        function drawPanel() {
            content.strokeRect(PANEL_X, PANEL_Y, CELL_WIDTH * PANEL_CEL_WID, CELL_HEIGHT * PANEL_CEL_HEI);
        }

        function drawRec(x, y) {
            if (y >= 0) {
                content.strokeRect(PANEL_X + x * CELL_WIDTH, PANEL_Y + y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
            }
        }
        return panel;
    }
}