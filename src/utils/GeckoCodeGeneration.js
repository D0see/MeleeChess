
const createGeckocode = (attackingPiece, defendingPiece, board) => {
    
    const port1Player = attackingPiece.team === 'white' ? attackingPiece : defendingPiece;
    const port2Player = port1Player === attackingPiece ? defendingPiece : attackingPiece;

    const port1CharId = charIds[port1Player.char]
    const port2charId = charIds[port2Player.char] 

    const stageName = stageEnum[board[defendingPiece.y][defendingPiece.x]];
    const stageId = StageIds[stageName];

    const geckoCode =`
    $Match Setup
    C21B148C 00000025 #BootToMatch.asm
    3C608048 60630530
    48000021 7C8802A6
    38A000F0 3D808000
    618C31F4 7D8903A6
    4E800421 480000F8
    4E800021 0808024C
    00000000 000000FF
    000000${stageId} 00000000
    00000000 00000000
    00000000 FFFFFFFF
    FFFFFFFF 00000000
    3F800000 3F800000
    3F800000 00000000
    00000000 00000000
    00000000 00000000
    00000000 00000000
    00000000 00000000
    00000000 ${port1CharId}${1}0400
    00FF0000 09007800
    400004${9} 00000000
    00000000 3F800000
    3F800000 3F800000
    ${port2charId}${1}0402 00FF0000
    09007800 400004${9}
    00000000 00000000
    3F800000 3F800000
    3F800000 09030400
    00FF0000 09007800
    40000401 00000000
    00000000 3F800000
    3F800000 3F800000
    09030400 00FF0000
    09007800 40000401
    00000000 00000000
    3F800000 3F800000
    3F800000 BB610014
    60000000 00000000
    `;

    return geckoCode;

}

const charIds = {
    'Bowser': 0x5,
    'Captain Falcon': 0x0,
    'Donkey Kong': 0x1,
    'Doctor Mario': 0x16,
    'Falco': 0x14,
    'Fox': 0x2,
    'Ganondorf': 0x19,
    'Ice Climbers': 0xE,
    'Jigglypuff': 0xF,
    'Kirby': 0x4,
    'Link': 0x6,
    'Luigi': 0x7,
    'Mario': 0x8,
    'Marth': 0x9,
    'Mewtwo': 0xA,
    'Mr. Game & Watch': 0x19,
    'Ness': 0xB,
    'Peach': 0xC,
    'Pichu': 0x18,
    'Pikachu': 0xD,
    'Roy': 0x17,
    'Samus': 0x10,
    'Sheik': 0x13,
    'Yoshi': 0x11,
    'Young Link': 0x15,
    'Zelda': 0x12,
  };

const StageIds = {
    "Battlefield": 0x1F,
    "Dreamland": 0x1C,
    "Final Destination": 0x20,
    "Fountain Of Dreams": 0x2,
    "Pokemon Stadium": 0x3,
    "Yoshi's Story": 0x8
  };

const stageEnum = {
    1: "Yoshi's Story",
    2: "Pokemon Stadium",
    3: "Final Destination",
    4: "Fountain Of Dreams",
    5: "Battlefield",
    6: "Dreamland"
}
