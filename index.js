/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + 20;

    if ( (rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge) || (rockLeftEdge > dodgerLeftEdge && rockRightEdge < dodgerRightEdge) || (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge)){
      return true;
    } else {return false;}
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0

  rock.style.top = top

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
   GAME.append(rock);
   rockInterval = setInterval(function(){
     moveRock();
   }, 1000)


  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    top += 1;
    rock.style.top = `${top}px`;
    if(checkCollision(rock) === true){
      clearInterval(rockInterval);
      ROCKS.forEach(function(rock){
        rock.remove();
      });
      endGame();
    } else if(top > 380){
      rock.remove();
    }
  }

  ROCKS.push(rock)

  // Finally, return the rock element you've created
  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval);
  alert("YOU LOSE!");
  START.style.display = 'auto';
}

function moveDodger(e) {
  console.log(e.which);
   if(e.which === LEFT_ARROW){
     moveDodgerLeft();
   } else if(e.which === RIGHT_ARROW){
     moveDodgerRight();
   }
}

function moveDodgerLeft() {
   var left = positionToInteger(DODGER.style.left);
   if(left > 0){
      DODGER.style.left = `${left - 10}px`;
   }
}

function moveDodgerRight() {
   var left = positionToInteger(DODGER.style.left);
   if(left < 360){
      DODGER.style.left = `${left + 10}px`;
   }
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
