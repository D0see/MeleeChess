### TODO :
1. Clean the css

## CharacterSelectionApp : 

### Features to add :
1. Port Selector.
2. Dynamic color change based on port selected.
3. Character Veto
4. Can't pick the same character in multiple fields.
5. Add specific lists for each roles.

### Bugs:
//
### ToChange :
- Clean the code, and give props better names.
- Change slide animation from % to vh

## BoardSelectionApp : 

### Features to add :
1. Caption the stages.

### Bugs:
// had a bug where i had 2 custom stages but couldnt replicate it (remember that react doesnt detect change to nested arrays).
### ToChange :
1. Need to do a second path and clean the code.
- Need to useState stages instead of mutating the original array
2. The code for boarddisplay is really disgusting i'm sorry.
3. structured clone might not work when i port this to electron.
- Change slide animation from % to vh

## GameApp : 

### Features to add :
1. PieceClass
- ~constructor~
- possibleMoves method
- ~startingStocks method~
2. ~Build & initialize the playground~
3. ~Display the playground~
4. Build a Box component for PlaygroundGrid
5. On-Off stage display button

### Bugs:

### ToChange :
1. Un-hardcode the css for the playgrounddisplay.