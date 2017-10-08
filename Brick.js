/**
 * Created by weiqiuhan on 2017/10/3.
 */
var Brick = {
    createNew: function (panel) {
        var brick = {};
        brick.cellList = [];

        brick.moveDown = function () {
            for (var i = 0; i < brick.cellList.length; i++) {
                brick.cellList[i].y += 1;
            }
            if (!checkBorder()) {
                for (var i = 0; i < brick.cellList.length; i++) {
                    brick.cellList[i].y -= 1;
                }
            }
            if (!moveValid()) {
                for (var i = 0; i < brick.cellList.length; i++) {
                    brick.cellList[i].y -= 1;
                }
                addToPanel();
                panel.checkAndRemove();
                anotherBrick();
                return false;
            }
            panel.draw();
            return true;
        };

        brick.moveRight = function () {
            for (var i = 0; i < brick.cellList.length; i++) {
                brick.cellList[i].x += 1;
            }
            if (!checkBorder() || !moveValid()) {
                brick.moveLeft();
                return;
            }
            panel.draw();
        };

        brick.moveLeft = function () {
            for (var i = 0; i < brick.cellList.length; i++) {
                brick.cellList[i].x -= 1;
            }
            if (!checkBorder() || !moveValid()) {
                brick.moveRight();
                return;
            }
            panel.draw();
        };

        brick.rotate = function () {
            brick.doRotate();
            if (!checkBorder() || !moveValid()) {
                brick.doRotate();
                return;
            }
            panel.draw();
        };

        brick.draw = function () {
            for (var i = 0; i < brick.cellList.length; i++) {
                brick.cellList[i].draw(panel);
            }
        };

        function checkBorder() {
            for (var i = 0; i < brick.cellList.length; i++) {
                var borderFlag = brick.cellList[i].checkBorder();
                if (!borderFlag) return false;
            }
            return true;
        }

        function moveValid() {
            for (var i = 0; i < brick.cellList.length; i++) {
                var movaFlag = brick.cellList[i].moveValid();
                if (!movaFlag) return false;
            }
            return true;
        }

        function addToPanel() {
            for (var i = 0; i < brick.cellList.length; i++) {
                panel.existCellList.push(brick.cellList[i]);
            }
        }

        function anotherBrick() {
            panel.getRandomBrick();
            panel.draw();
        }

        return brick;
    }
};

var Brick1 = {
    createNew : function (panel) {
        var brick = Brick.createNew(panel),
            cell = Cell.createNew(panel),
            cell1 = Cell.createNew(panel),
            cell2 = Cell.createNew(panel),
            cell3 = Cell.createNew(panel);
        cell.x = 0;
        cell.y = -2;
        cell1.x = 0;
        cell1.y = -1;
        cell2.x = 1;
        cell2.y = -2;
        cell3.x = 1;
        cell3.y = -1;
        brick.cellList.push(cell);
        brick.cellList.push(cell1);
        brick.cellList.push(cell2);
        brick.cellList.push(cell3);

        brick.doRotate = function () {

        };

        return brick;
    }
};

var Brick2 = {
    createNew : function (panel) {
        var brick = Brick.createNew(panel),
            cell = Cell.createNew(panel),
            cell1 = Cell.createNew(panel),
            cell2 = Cell.createNew(panel),
            cell3 = Cell.createNew(panel);
        cell.x = 0;
        cell.y = -4;
        cell1.x = 0;
        cell1.y = -1;
        cell2.x = 0;
        cell2.y = -2;
        cell3.x = 0;
        cell3.y = -3;
        brick.cellList.push(cell);
        brick.cellList.push(cell1);
        brick.cellList.push(cell2);
        brick.cellList.push(cell3);

        var rotateFlag = false;
        brick.doRotate = function () {
            if (!rotateFlag) {
                cell.x -= 1;
                cell.y += 1;
                cell2.x += 1;
                cell2.y -= 1;
                cell1.x += 2;
                cell1.y -= 2;
            } else {
                cell.x += 1;
                cell.y -= 1;
                cell2.x -= 1;
                cell2.y += 1;
                cell1.x -= 2;
                cell1.y += 2;
            }
            rotateFlag = !rotateFlag;
        };
        return brick;
    }
};

var Cell = {
    createNew : function (panel) {
        var cell = {};
        cell.x = 0;
        cell.y = 0;

        cell.draw = function () {
            panel.drawRec(cell.x, cell.y);
        };

        cell.checkBorder = function () {
            if (cell.x < 0 || cell.x > panel.getWidth() || cell.y > panel.getHeight()) {
                return false;
            }
            return true;
        };

        cell.moveValid = function () {
            if (cell.y == panel.getHeight() || cell.x == panel.getWidth() || cell.alreadyHave()) {
                return false;
            }
            return true;
        };

        cell.alreadyHave = function() {
            for (var i = 0; i < panel.existCellList.length; i++) {
                if (cell.x == panel.existCellList[i].x && cell.y == panel.existCellList[i].y) {
                    return true;
                }
            }
            return false;
        }
        return cell;
    }
};