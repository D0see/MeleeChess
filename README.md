### TODO :
1. Clean the css
2. Ask gu to explain gecko codes to me.
3. build a functionnal gecko code generator.
4. learn electron.js

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
// had a bug where i had 2 custom stages but couldnt replicate it (remember that react doesnt detect changes to nested arrays).
### ToChange :
1. Need to do a second path and clean the code.
- Need to useState stages instead of mutating the original array
2. The code for boarddisplay is really disgusting i'm sorry.
3. structured clone might not work when i port this to electron.
- Change slide animation from % to vh

## GameApp : 

### Features to add :
1. make electron.js launch dolphin with the generated gecko code on capture.
2. ~Build the piecedatadisplayer~ 
3. Add castling & pawnpromotion

### Bugs:


### ToChange :
1. Un-hardcode the css for the playgrounddisplay.

### Priority
1. Paye une pinte à Gu
2. Ne pas balancer les références des objets dans les setUsestate (Refactor SelectedPiece)
3. refactorer le code pour remplacer les comparaisons d'objets par des comparaisons de coordonnées -> Replace selectedPiece with selectedPieceId
                                                                                                   -> ~Add a unique identifier to PieceClass this.Id = Idgenerator~ 
                                                                                                   -> ~Integrate this.Id in the logic.~ 