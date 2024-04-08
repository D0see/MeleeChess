### TODO :
1. Clean the css
2. build a functionnal gecko code generator (started)
3. learn electron.js

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

## BoardSelectionApp : 

### Features to add :
1. Caption the stages.

### Bugs:
// had a bug where i had 2 custom stages but couldnt replicate it (remember that react doesnt detect changes to nested arrays).

### ToChange :
1. Need to do a second path and clean the code.
2. Need to useState stages instead of mutating the original array
3. ~The code for boarddisplay is really disgusting i'm sorry.~
4. ~structured clone might not work when i port this to electron.~ -> Change to stringify -> parse
5. Change slide animation from % to vh

## GameApp : 

### Features to add :
1. make electron.js launch dolphin with the generated gecko code on capture.
2. Add castling & pawnpromotion
3. Pat check

### Bugs:

### ToChange :
1. Un-hardcode the css for the playgrounddisplay.

### Priority
1. Paye une pinte à Gu
