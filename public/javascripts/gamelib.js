const width = 1000;
const height = 400;
const AX = 100;
const AY = 250;
const ASPACE = 100;

var scoreBoard;
var player;
var opponent;
var board;
var obstaclesInfo = [];
var actions = [ ];

var startingTurn = false;
async function refresh() {
    if (player.pm_state == "EndTurn") {
            await updateStates();
     } else {
        if (startingTurn) {
            await updateStates();
            startingTurn = false;            
        }
    } 
}

async function runAction (id) {
    await requestMakeAction(player.pm_id,id,player.pm_state);
    await updateStates();
} 


async function updateStates() {
    player = await requestPlayerMatchInfo(playerMatchId);
    opponent = await requestPlayerMatchInfo(opponentMatchId);   
    obstaclesInfo = await requestObstacles(playerMatchId);
    scoreBoard = new ScoreBoard(player.ply_name, opponent.ply_name, player.pm_count, opponent.pm_count, player.pm_state, opponent.pm_state); 
    
    board = new Board(player.pm_x,player.pm_y,player.pm_extra, opponent.pm_x, opponent.pm_y,opponent.pm_extra, obstaclesInfo);
    
    let actionsInfo = await requestPlayerActions(playerMatchId);
    actions = [];
    let count = 0;
    for (let aInfo of actionsInfo) {
        actions.push(new Action(aInfo.pa_id, aInfo.pa_name, count*ASPACE+AX,AY,runAction));
        count++;
    }
}

async function setup() {
    let canvas = createCanvas(width, height);
    canvas.parent('game');
    await updateStates();
    setInterval(refresh,1000);
}

function draw() {
    background(220);
    if (scoreBoard)
        scoreBoard.draw();
    if (board)
        board.draw();
    for (let action of actions)
        action.draw();
}

function mouseClicked() {
    if (player.pm_state != "EndTurn")
        for (let action of actions)
            action.clicked(mouseX,mouseY);

}