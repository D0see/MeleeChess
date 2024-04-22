- White is Port 1, Black is port 2;

### TODO :
1. Clean the css (clear the css namespace by adding modules instead of global css files)
-App.css
2. learn electron.js
3. Add costume selection
4. ~Parse .slp replays~

## CharacterSelectionApp : 

### Features to add :
1. Port Selector.
2. Dynamic color change based on port selected.
3. Character Veto
4. Can't pick the same character in multiple fields.
5. Add specific lists for each roles.

### Bugs:

### ToChange :
- Clean the code, and find better prop names.
- Change slide animation from % to vh
- Make the stage selector prettier

## BoardSelectionApp : 

### Features to add :

### Bugs:
// had a bug where i had 2 custom stages but couldnt replicate it (remember that react doesnt detect changes to nested arrays).

### ToChange :
1. Need to do a second path and clean the code.
2. Need to useState stages instead of mutating the original array
3. Change slide animation from % to vh

## GameApp : 
- Lose on King capture

### Features to add :
1. ~make electron.js launch dolphin with the generated gecko code on capture.~

### Bugs:
~LRA-STARTING makes the next dolphin instance close right after it opens.~
~Selecting game&watch instead spawns ganondorf~

### ToChange :
1. Un-hardcode the css for the playgrounddisplay.
2. for balancing issues i might delete the ability to promote to a queen
3. ~Change default folder for slp writing.~

### Priority
1. Paye une pinte à Gu
