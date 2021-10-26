/**
 * Skæri, blað, steinn.
 * Spilað gegnum console.
 */

/** Hámarks fjöldi best-of leikja, ætti að vera jákvæð heiltala stærri en 0 */
const MAX_BEST_OF = 10;

/** Global breyta sem heldur utan um heildar sigra */
let wins = 0;

/** Global breyta sem heldur utan um heildar töp */
let losses = 0;

/**
 * Athugar hvort gefin tala sé gild sem best-of gildi.
 * @param {number} bestOf Tala sem skal athuga
 * @return {boolean} true eða false
 */
function isValidBestOf(bestOf) {
  // TODO útfæra
  if(parseInt(bestOf) % 2 == 0 || parseInt(bestOf) > 10) return false;
  return true;
}
console.assert(isValidBestOf(1) === true, '1 er valid best of');
console.assert(isValidBestOf(2) === false, '2 er ekki er valid best of');
console.assert(isValidBestOf(9) === true, '9 er valid best of');

function playAsText(play) {
  // TODO útfæra
  if(play === "1") return "Skæri";
  if(play === "2") return "Blað";
  if(play === "3") return "Steinn";
  return "Óþekkt";
}
console.assert(playAsText('1') === 'Skæri', '1 táknar skæri');
console.assert(playAsText('2') === 'Blað', '2 táknar blað');
console.assert(playAsText('3') === 'Steinn', '3 táknar steinn');
console.assert(playAsText('foo') === 'Óþekkt', 'Annað er óþekkt');

/**
 * Athugar hvort spilari eða tölva vinnur.
 * @param {number} player Það sem spilari spilaði
 * @param {number} computer Það sem tölva spilaði
 * @returns -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
function checkGame(player, computer) {
  // TODO útfæra
  if(player === computer) return 0;
  if(player === "1" && computer === "2") return 1;
  if(player === "1" && computer === "3") return -1;
  if(player === "2" && computer === "1") return -1;
  if(player === "2" && computer === "3") return 1;
  if(player === "3" && computer === "1") return 1;
  if(player === "3" && computer === "2") return -1;
}
console.assert(checkGame('1', '2') === 1, 'Skæri vinnur blað');
console.assert(checkGame('2', '3') === 1, 'Blað vinnur stein');
console.assert(checkGame('3', '1') === 1, 'Steinn vinnur skæri');
console.assert(checkGame('1', '1') === 0, 'Skæri og skæri eru jafntefli');
console.assert(checkGame('1', '3') === -1, 'Skæri tapar fyrir stein');

/**
 * Spilar einn leik.
 * @return {boolean} -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
function round() {
  // TODO útfæra
  // 1. Spyrja um hvað spilað, ef cancel, hætta
  // 2. Ef ógilt, tölva vinnur
  // 3. Velja gildi fyrir tölvu með `Math.floor(Math.random() * 3) + 1` sem skilar heiltölu á [1, 3]
  // 4. Nota `checkGame()` til að finna hver vann
  // 5. Birta hver vann
  // 6. Skila hver vann
  
  let playerOut = prompt("Hverju vilt þú leika út? (1 fyrir skæri, 2 fyrir blað og 3 fyrir steinn)");
  if(playerOut == null) return null;
  if(playAsText(playerOut) == "Óþekkt") {
    alert("Þú spilaðir ólöglega út. Tölvan vann þennan leik :(");
    return -1;
  }
  let computerOut = (Math.floor(Math.random() * 3) + 1).toString();
  let winner = checkGame(playerOut, computerOut);

  alert("Þú spilar út " + playAsText(playerOut) + "\n" + "Tölvan spilar út " + playAsText(computerOut) + "\n" + 
  (winner === 1 ? "Þú vannst!" : (winner === -1 ? "Tölvan vann þennan leik :(" : "Þessi leikur fór jafntefli")));
  return winner;
}
// Hér getum við ekki skrifað test þar sem fallið mun biðja notanda um inntak!

/**
 * Spilar leik og bætir útkomu (sigur eða tap) við í viðeigandi global breytu.
 */
function play() {
  // TODO útfæra
  // 1. Spyrja um fjölda leikja
  // 2. Staðfesta að fjöldi leikja sé gilt gildi
  // 3. Keyra fjölda leikja og spila umferð þar til sigurvegari er krýndur
  // 4. Birta hvort spilari eða tölva vann
  let amountOfGames = parseInt(prompt("Hversu marga leiki viltu spila? (oddatala lægri en 10)"));
  if(!isValidBestOf(amountOfGames)) {
    alert("Ólöglegur fjöldi leikja!");
    return;
  }
  let playerWins = 0;
  let computerWins = 0;
  let winningNumberOfGames = Math.floor(amountOfGames/2)+1;
  for(let i = 0; i<amountOfGames; i++) {
      let result = round();
      while(result !== null && result == 0) result = round();
      if(result == null) return;
      if(result == 1) playerWins++;
      else if(result == -1) computerWins++;

      alert(`Staðan er ${playerWins}-${computerWins}`);

      if(playerWins == winningNumberOfGames) {
          wins++;
          break;
      } else if (computerWins == winningNumberOfGames) {
          losses++;
          break;
      }
  }
  alert(playerWins == winningNumberOfGames ? "Þú vannst umferðina!" : "Tölvan vann umferðina:(");
}
// Hér getum við ekki skrifað test þar sem fallið mun biðja notanda um inntak!

/**
 * Birtir stöðu spilara.
 */
function games() {
  // TODO útfæra
  alert(`Þú hefur spilað ${wins+losses} umferðir og unnið ${wins} af þeim (${wins/(wins+losses)*100}% sigurhlutfall)`);
}
// Hér getum við ekki skrifað test þar sem fallið les úr global state
