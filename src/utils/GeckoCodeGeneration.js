
export default function createGeckocode (attackingPiece, defendingPiece, board) {

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
  
  const int8Str = (x) => {
    return ('00' + x.toString(16)).slice(-2);
  }
  
  const int16Str = (x) => {
    return ('0000' + x.toString(16)).slice(-4);
  }

    const port1 = attackingPiece.team === 'white' ? attackingPiece : defendingPiece;
    const port2 = port1 === attackingPiece ? defendingPiece : attackingPiece;

    const port1CharId = charIds[port1.char]
    const port1CharHex = int8Str(port1CharId);
    const port2CharId = charIds[port2.char] 
    const port2CharHex = int8Str(port2CharId);

    const port1StocksHex = int8Str(port1.stocks);
    const port2StocksHex = int8Str(port2.stocks);

    const port1DamageHex = int16Str(port1.damage);
    const port2DamageHex = int16Str(port2.damage);

    const port1Costume = 0;
    const port1CostumeHex = int8Str(port1Costume);
    const port2Costume = 1;
    const port2CostumeHex = int8Str(port2Costume);

    const stageName = stageEnum[board[defendingPiece.y][defendingPiece.x]];
    const stageId = StageIds[stageName];
    const stageHex = int16Str(stageId);

    const geckoCode = 
     `$Match Setup [?]
      C21B148C 00000025
      3C608048 60630530
      48000021 7C8802A6
      38A000F0 3D808000
      618C31F4 7D8903A6
      4E800421 480000F8
      4E800021 2808024C
      00000000 000000FF
      0000${stageHex} 00000000
      00000000 00000000
      00000000 FFFFFFFF
      FFFFFFFF 00000000
      3F800000 3F800000
      3F800000 00000000
      00000000 00000000
      00000000 00000000
      00000000 00000000
      00000000 00000000
      00000000 ${port1CharHex}00${port1StocksHex}${port1CostumeHex}
      00FF0000 09007800
      40000400 ${port1DamageHex}0000
      00000000 3F800000
      3F800000 3F800000
      ${port2CharHex}00${port2StocksHex}${port2CostumeHex} 00FF0000
      09007800 40000400
      ${port2DamageHex}0000 00000000
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

      $Boot To Match [UnclePunch]
      041A45A0 3800000E

      $Skip Memcard Prompt [UnclePunch]
      C21AF6F4 00000004
      2C1D000F 40820014
      3D80801B 618C01AC
      7D8903A6 4E800420
      2C1D0000 00000000

      $Neutral Spawn
      C216E510 00000098 #External/NeutralSpawn/NeutralSpawn.asm
      7C0802A6 90010004
      9421FF20 BE8100B0
      3D808016 618CB41C
      7D8903A6 4E800421
      2C030000 40820480
      2C1C0005 40800478
      3C608048 80639D30
      5463443E 2C03021C
      41820464 3C608048
      80639D30 5463443E
      2C03010F 41820450
      887F24D0 2C030001
      41820054 3B200000
      3B400000 7F43D378
      3D808003 618C241C
      7D8903A6 4E800421
      2C030003 41820010
      7C1CD000 41820014
      3B390001 3B5A0001
      2C1A0004 4081FFD0
      7F83E378 7F24CB78
      88BF24D0 48000115
      480003F4 3B400000
      3B000000 3B200000
      7F23CB78 3D808003
      618C241C 7D8903A6
      4E800421 2C030003
      41820024 7F23CB78
      3D808003 618C3370
      7D8903A6 4E800421
      7C03D000 40820008
      3B180001 3B390001
      2C190004 4180FFBC
      2C180001 41820398
      2C180002 41810390
      3B5A0001 2C1A0003
      4180FF98 3B200000
      3B410080 3B000000
      3AC00000 3AE00000
      7EE3BB78 3D808003
      618C241C 7D8903A6
      4E800421 2C030003
      41820028 7EE3BB78
      3D808003 618C3370
      7D8903A6 4E800421
      7C03C800 4082000C
      7EF8D1AE 3B180001
      3AF70001 2C170004
      4180FFB8 3B390001
      2C190003 4180FFA4
      3B200000 7C79D0AE
      7C03E000 41820010
      3B390001 2C190004
      4180FFEC 7F83E378
      7F24CB78 88BF24D0
      48000009 480002E8
      7C0802A6 90010004
      9421FF20 BE8100B0
      7C7F1B78 7C9E2378
      7CBD2B78 48000121
      7F8802A6 80CD9348
      38A00000 807C0000
      2C03FFFF 4182005C
      7C033000 4182000C
      3B9C0044 4BFFFFE8
      3B9C0004 1C7D0020
      7F9C1A14 1C7E0008
      7F9C1A14 38810080
      C03C0000 D0240000
      C03C0004 D0240004
      38600000 90640008
      7FE3FB78 3D808003
      618C2768 7D8903A6
      4E800421 48000054
      2C1D0001 4182000C
      7FC3F378 48000014
      4800023D 7C6802A6
      7C63F0AE 48000004
      38810080 3D808022
      618C4E64 7D8903A6
      4E800421 7FE3FB78
      38810080 3D808003
      618C2768 7D8903A6
      4E800421 48000004
      7FE3FB78 38810080
      3D808003 618C26CC
      7D8903A6 4E800421
      C0210080 C002A8E8
      FC010040 4081000C
      C022A8F8 48000008
      C022A8CC 7FE3FB78
      3D808003 618C3094
      7D8903A6 4E800421
      BA8100B0 800100E4
      382100E0 7C0803A6
      4E800020 4E800021
      00000020 C2700000
      41200000 42700000
      41200000 C1A00000
      41200000 41A00000
      41200000 C2700000
      41200000 C1A00000
      41200000 42700000
      41200000 41A00000
      41200000 0000001F
      C21B3333 420CCCCD
      421B3333 420CCCCD
      00000000 41000000
      00000000 4279999A
      C21B3333 420CCCCD
      C21B3333 40A00000
      421B3333 420CCCCD
      421B3333 40A00000
      00000008 C2280000
      41D4CCCD 42280000
      41E00000 00000000
      423B999A 00000000
      409CCCCD C2280000
      41D4CCCD C2280000
      40A00000 42280000
      41E00000 42280000
      40A00000 0000001C
      C23A6666 4214CCCD
      423D999A 42153333
      00000000 40E00000
      00000000 426A0000
      C23A6666 4214CCCD
      C23A6666 40A00000
      423D999A 42153333
      423D999A 40A00000
      00000002 C2250000
      41A80000 42250000
      41D80000 00000000
      40A80000 00000000
      42400000 C2250000
      41A80000 C2250000
      40A00000 42250000
      41D80000 42250000
      40A00000 00000003
      C2200000 42000000
      42200000 42000000
      428C0000 40E00000
      C28C0000 40E00000
      C2200000 42000000
      C2200000 40A00000
      42200000 42000000
      42200000 40A00000
      FFFFFFFF 4E800021
      00030102 BA8100B0
      800100E4 382100E0
      7C0803A6 881F24D0
      60000000 00000000

      $Required: Slippi Recording [Fizzi, Achilles, UnclePunch, Nikki, jmlee337, Krohnos]
      *Saves replays, Slippi device must be in Slot B.
      *To disable saving replays, visit the Slippi settings in Config > GameCube
      040679BC 38802600 #Recording/ExtendPlayerBlock.asm
      C23219EC 0000001D #Recording/FlushFrameBuffer.asm
      7C0802A6 90010004
      9421FF20 BE8100B0
      3D808000 618C5604
      7D8903A6 4E800421
      2C030000 418200A8
      806DB64C 83C30000
      83ADB650 7F9EEA14
      2C1D0000 41820090
      3860003C 987C0000
      806DB654 907C0001
      3C608048 80639D30
      5463443E 2C030208
      806DB654 4082003C
      80ADB61C 88850010
      2C040000 4082002C
      8885000F 2C040000
      40820020 80850909
      3884FF85 80E50916
      7C872050 7C041800
      40800008 7C832378
      907C0005 3BBD0009
      7FC3F378 7FA4EB78
      38A00001 3D808000
      618C55F0 7D8903A6
      4E800421 38600000
      906DB650 BA8100B0
      800100E4 382100E0
      7C0803A6 8001001C
      60000000 00000000
      C216D884 00000030 #Recording/SendGameEnd.asm
      7C0802A6 90010004
      9421FF20 BE8100B0
      3D808000 618C5604
      7D8903A6 4E800421
      2C030000 41820144
      3F208046 6339B6A0
      8B590008 2C1A0000
      41820130 830DB64C
      88780004 2C030000
      40820120 3C608048
      80639D30 5463443E
      2C030208 4082001C
      2C1A0002 40820014
      806DB61C 8863000F
      2C030000 418200F4
      83B80000 38600039
      987D0000 9B5D0001
      2C1A0007 4082000C
      88790001 48000008
      3860FFFF 987D0002
      3E808047 62949DA4
      7E83A378 3C808046
      6084B8EC 38A02278
      3D808000 618C31F4
      7D8903A6 4E800421
      3C808046 6084B6A0
      7E83A378 880424D0
      98030006 88040008
      98030004 3D808016
      618C6378 7D8903A6
      4E800421 3AA00000
      7EA3AB78 48000041
      38950003 7C64E9AE
      3AB50001 2C150003
      4081FFE8 7FA3EB78
      38800007 38A00001
      3D808000 618C55F0
      7D8903A6 4E800421
      38600001 98780004
      48000030 3D808047
      618C9DA4 1D6300A8
      7D6B6214 886B0058
      2C030003 4182000C
      886B005E 48000008
      3860FFFF 4E800020
      BA8100B0 800100E4
      382100E0 7C0803A6
      819F2514 00000000
      C216E74C 0000010A #Recording/SendGameInfo.asm
      7C0802A6 90010004
      9421FF20 BE8100B0
      3D808000 618C5604
      7D8903A6 4E800421
      2C030000 41820814
      38600005 3D808037
      618CF1E4 7D8903A6
      4E800421 7C7B1B78
      936DB64C 38800005
      3D808000 618CC160
      7D8903A6 4E800421
      38600770 3D808037
      618CF1E4 7D8903A6
      4E800421 7C7E1B78
      93DB0000 38600000
      906DB650 3C608000
      60635600 80630000
      38630008 38800000
      3D808000 618C55FC
      7D8903A6 4E800421
      7C7C1B78 38600035
      987E0000 3860001C
      987E0001 38600036
      987E0002 386002F8
      B07E0003 38600037
      987E0005 38600040
      B07E0006 38600038
      987E0008 38600054
      B07E0009 38600039
      987E000B 38600006
      B07E000C 3860003A
      987E000E 3860000C
      B07E000F 3860003B
      987E0011 3860002C
      B07E0012 3860003C
      987E0014 38600008
      B07E0015 3860003D
      987E0017 B39E0018
      38600010 987E001A
      38600204 B07E001B
      38600036 987E001D
      3C600310 60630000
      907E001E 387E0022
      7FE4FB78 38A00138
      3D808000 618C31F4
      7D8903A6 4E800421
      387E0062 3880001C
      3D808000 618CC160
      7D8903A6 4E800421
      387E0022 3AA30060
      3A800000 1ED40024
      7ED6AA14 88760001
      2C030000 40820034
      88760000 2C030012
      40820028 3C60804C
      606320BC 1C940044
      7C632214 80630000
      546005EF 4182000C
      38600013 98760000
      3A940001 2C140004
      4180FFB4 387E0022
      3AA30060 3A800000
      1ED40024 7ED6AA14
      88760001 2C030000
      4082002C 88760000
      3D808016 618C9238
      7D8903A6 4E800421
      88960003 7C041800
      4081000C 38600000
      98760003 3A940001
      2C140004 4180FFBC
      3C60804D 80635F90
      907E015A 3A82F228
      3AA00000 3ADE015E
      1EF50008 38600001
      7C76B92E 3AF70004
      7C76B92E 3AB50001
      2C150004 4180FFE4
      3A800000 3ABF0060
      3AFE017E 1F140010
      7F18BA14 1ED40024
      7ED6AA14 88760001
      2C030000 40820040
      8876000A 2C030078
      41820034 3D808023
      618C754C 7D8903A6
      4E800421 7C641B78
      7F03C378 38A00010
      3D808000 618C31F4
      7D8903A6 4E800421
      4800001C 7F03C378
      38800010 3D808000
      618CC160 7D8903A6
      4E800421 3A940001
      2C140004 4180FF88
      8862F234 987E01BE
      8862F23C 987E01BF
      3C608048 80639D30
      5463443E B07E01C0
      3B200000 3C608048
      80639D30 5463443E
      2C030208 4082017C
      38600000 3D808000
      618C5610 7D8903A6
      4E800421 7C791B78
      3A800000 3ABF0060
      3AFE01C2 3B590034
      1C74001F 7F03BA14
      1ED40024 7ED6AA14
      88760001 2C030000
      40820028 1C74001F
      7C83D214 7F03C378
      38A0001F 3D808000
      618C31F4 7D8903A6
      4E800421 4800001C
      7F03C378 3880001F
      3D808000 618CC160
      7D8903A6 4E800421
      3A940001 2C140004
      4180FFA0 3A800000
      3ABF0060 3AFE023E
      3B5900CF 1C74000A
      7F03BA14 1ED40024
      7ED6AA14 88760001
      2C030000 40820028
      1C74000A 7C83D214
      7F03C378 38A0000A
      3D808000 618C31F4
      7D8903A6 4E800421
      4800001C 7F03C378
      3880000A 3D808000
      618CC160 7D8903A6
      4E800421 3A940001
      2C140004 4180FFA0
      3A800000 3ABF0060
      3AFE0266 3B5900F7
      1C74001D 7F03BA14
      1ED40024 7ED6AA14
      88760001 2C030000
      40820028 1C74001D
      7C83D214 7F03C378
      38A0001D 3D808000
      618C31F4 7D8903A6
      4E800421 4800001C
      7F03C378 3880001D
      3D808000 618CC160
      7D8903A6 4E800421
      3A940001 2C140004
      4180FFA0 4800001C
      387E01C2 38800118
      3D808000 618CC160
      7D8903A6 4E800421
      3D808000 618CADF4
      7D8903A6 4E800421
      987E02DA 2C190000
      41820044 387E02DB
      38990394 38A00033
      3D808000 618C31F4
      7D8903A6 4E800421
      3C60803D 6063AD40
      80630000 81830088
      A06C0001 907E030E
      886C0006 907E0312
      4800001C 387E02DB
      3880003B 3D808000
      618CC160 7D8903A6
      4E800421 2C190000
      41820018 7F23CB78
      3D808037 618CF1B0
      7D8903A6 4E800421
      7FC3F378 38800316
      38A00001 3D808000
      618C55F0 7D8903A6
      4E800421 38600205
      3D808037 618CF1E4
      7D8903A6 4E800421
      7C751B78 3C608000
      60635600 80630000
      3AE30008 38600010
      98750000 3860003D
      98750203 38600200
      B0750201 38600000
      98750204 3AC00000
      7C76E050 2C030200
      41810010 B0750201
      38600001 98750204
      38750001 7EE4BB78
      7C84B214 A0B50201
      3D808000 618C31F4
      7D8903A6 4E800421
      7EA3AB78 38800205
      38A00001 3D808000
      618C55F0 7D8903A6
      4E800421 3AD60200
      7C16E000 4180FFA4
      7EA3AB78 3D808037
      618CF1B0 7D8903A6
      4E800421 38600004
      38800007 38A00000
      3D808039 618C01F0
      7D8903A6 4E800421
      48000021 7C8802A6
      38A00000 3D808038
      618CFD54 7D8903A6
      4E800421 48000070
      4E800021 7C0802A6
      90010004 9421FF20
      BE8100B0 806DB64C
      83A30000 838DB650
      7FBDE214 3860003A
      987D0000 806DB654
      907D0001 3C60804D
      80635F90 907D0005
      3C608048 80639D60
      907D0009 838DB650
      3B9C000D 938DB650
      BA8100B0 800100E4
      382100E0 7C0803A6
      4E800020 38600004
      38800007 38A00000
      3D808039 618C01F0
      7D8903A6 4E800421
      48000021 7C8802A6
      38A0000F 3D808038
      618CFD54 7D8903A6
      4E800421 4800012C
      4E800021 7C0802A6
      90010004 9421FF20
      BE8100B0 806DB64C
      83E30000 83CDB650
      7FFFF214 3B600000
      806DC18C 83A30024
      2C1D0000 418200E0
      3B7B0001 2C1B000F
      418100D4 839D002C
      3860003B 987F0000
      806DB654 907F0001
      807C0010 B07F0005
      807C0024 987F0007
      807C002C 907F0008
      807C0040 907F000C
      807C0044 907F0010
      807C004C 907F0014
      807C0050 907F0018
      807C0C9C B07F001C
      807C0D44 907F001E
      807C001C 907F0022
      887C0DD7 987F0026
      887C0DDB 987F0027
      887C0DEB 987F0028
      887C0DEF 987F0029
      807C0518 2C030000
      41820018 8063002C
      2C030000 4182000C
      8863000C 48000008
      3860FFFF 987F002A
      A07C0DA8 B07F002B
      83CDB650 3BDE002D
      93CDB650 3BFF002D
      83BD0008 2C1D0000
      4082FF28 BA8100B0
      800100E4 382100E0
      7C0803A6 4E800020
      BA8100B0 800100E4
      382100E0 7C0803A6
      3C608017 00000000
      C206DA34 00000038 #Recording/SendGamePostFrame.asm
      7C0802A6 90010004
      9421FF20 BE8100B0
      3D808000 618C5604
      7D8903A6 4E800421
      2C030000 41820180
      887F221F 546306F7
      40820174 8B7F000C
      806DB64C 83A30000
      838DB650 7FBDE214
      38600038 987D0000
      806DB654 907D0001
      9B7D0005 7FE3FB78
      3D808000 618C55F8
      7D8903A6 4E800421
      987D0006 807F0004
      987D0007 807F0010
      B07D0008 807F00B0
      907D000A 807F00B4
      907D000E 807F002C
      907D0012 807F1830
      907D0016 807F1998
      907D001A 807F208C
      987D001E A07F2090
      987D001F 807F18C4
      987D0020 7F63DB78
      3D808003 618C3BD8
      7D8903A6 4E800421
      987D0021 807F0894
      907D0022 887F2218
      987D0026 887F221A
      987D0027 887F221B
      987D0028 887F221C
      987D0029 887F221F
      987D002A 807F2340
      907D002B 807F00E0
      987D002F 807F083C
      B07D0030 887F1968
      809F0168 7C632050
      987D0032 887F25FF
      987D0033 807F1988
      2C030000 40820008
      807F198C 987D0034
      807F0080 907D0035
      807F0084 907D0039
      807F008C 907D003D
      807F0090 907D0041
      807F00EC 907D0045
      807F195C 907D0049
      807F0014 907D004D
      A07F18EC B07D0051
      A07F2088 B07D0053
      838DB650 3B9C0055
      938DB650 BA8100B0
      800100E4 382100E0
      7C0803A6 8001001C
      60000000 00000000
      C206B0E0 0000002C #Recording/SendGamePreFrame.asm
      7C0802A6 90010004
      9421FF20 BE8100B0
      3D808000 618C5604
      7D8903A6 4E800421
      2C030000 41820120
      8B7F000C 806DB64C
      83A30000 838DB650
      7FBDE214 38600037
      987D0000 806DB654
      907D0001 9B7D0005
      7FE3FB78 3D808000
      618C55F8 7D8903A6
      4E800421 987D0006
      3C60804D 80635F90
      907D0007 807F0010
      B07D000B 807F00B0
      907D000D 807F00B4
      907D0011 807F002C
      907D0015 807F0620
      907D0019 807F0624
      907D001D 807F0638
      907D0021 807F063C
      907D0025 807F0650
      907D0029 807F065C
      907D002D 3C60804C
      60631FAC 1C9B0044
      7C832214 A0640002
      B07D0031 80640030
      907D0033 80640034
      907D0037 3C608046
      6063B108 3C80804C
      60841F78 88840001
      3884FFFF 2C040000
      40A00008 38840005
      1C840030 7C632214
      1C9B000C 7C832214
      88640002 987D003B
      88640003 987D0040
      807F1830 907D003C
      838DB650 3B9C0041
      938DB650 BA8100B0
      800100E4 382100E0
      7C0803A6 881F2219
      807F065C 00000000
      C2005604 0000000B #Recording/ShouldRecord.asm
      3C608048 80639D30
      5463443E 2C030202
      41820034 2C030302
      4182002C 2C030208
      41820024 2C03010F
      4182001C 2C030120
      41820014 2C03010E
      4182000C 38600000
      4800000C 38600001
      48000004 4E800020
      60000000 00000000
      C208D698 00000005 #Recording/GetLCancelStatus/GetLCancelStatus.asm
      7C050000 4080000C
      38E00001 48000008
      38E00002 8103002C
      98E825FF 7C050000
      60000000 00000000
      C206C324 00000002 #Recording/GetLCancelStatus/ResetLCancelStatus.asm
      38600000 987E25FF
      807E00B0 00000000
      C21A4CB4 00000004 #Common/AllocBuffer.asm
      38600080 3D808037
      618CF1E4 7D8903A6
      4E800421 906DAFC4
      38000000 00000000
      C20055F8 0000000F #Common/GetIsFollower.asm
      7C0802A6 90010004
      9421FF20 BE8100B0
      7C7E1B78 3BE00000
      887E221F 5460EFFF
      41820038 887E000C
      3D808003 618C2330
      7D8903A6 4E800421
      3C80803B 6084CDE0
      1C030003 7C640214
      88030002 2C000000
      40820008 3BE00001
      7FE3FB78 BA8100B0
      800100E4 382100E0
      7C0803A6 4E800020
      60000000 00000000
      C216D294 00000006 #Common/IncrementFrameIndex.asm
      987F0008 3C608048
      80639D58 2C030000
      40820010 3860FF85
      906DB654 48000010
      806DB654 38630001
      906DB654 00000000
      041D460C 809F00EC #Common/Preload Stadium Transformations/Core/GetPreloadedTransition.asm
      C21D14C8 00000002 #Common/Preload Stadium Transformations/Core/Init isLoaded Bool.asm
      38600000 987F00F0
      3BA00001 00000000
      C21D45EC 00000019 #Common/Preload Stadium Transformations/Core/Load Transformation.asm
      887F00F0 2C030000
      408200B8 38600004
      3D808038 618C0580
      7D8903A6 4E800421
      5460103A A87F00E2
      3C80803B 60847F9C
      7C84002E 7C032000
      4182FFD4 909F00EC
      2C040003 4082000C
      38800000 48000034
      2C040004 4082000C
      38800001 48000024
      2C040009 4082000C
      38800002 48000014
      2C040006 40820000
      38800003 48000004
      3C60803E 60631248
      5480103A 7C630214
      806303D8 809F00CC
      38BF00C8 3CC0801D
      60C64220 38E00000
      3D808001 618C6580
      7D8903A6 4E800421
      38600001 987F00F0
      807F00D8 00000000
      C21D4F14 00000002 #Common/Preload Stadium Transformations/Core/Reset isLoaded.asm
      38600000 987F00F0
      806DB2D8 00000000
      041D4610 4800004C #Common/Preload Stadium Transformations/Core/SkipNormalDecision1.asm
      041D4724 4800003C #Common/Preload Stadium Transformations/Core/SkipNormalDecision2.asm
      044DEC18 01000000 #Common/Preload Stadium Transformations/Toggle/PsPreloadToggleEnable.asm
      C21C154C 00000004 #Common/Initialize Stage Data/Init Stage Data.asm
      38800204 3D808000
      618CC160 7D8903A6
      4E800421 281A0000
      60000000 00000000
      C2068EEC 00000006 #Common/Initialize Player Data/Init Player Data.asm
      3BC30000 3C808045
      60848FD0 80840020
      3D808000 618CC160
      7D8903A6 4E800421
      7FC3F378 3C808046
      60000000 00000000
      C216EBAC 0000000C #Common/CSS KO Stars/Asign KO Stars Upon Exiting Dairantou.asm
      3C608047 60639D30
      88630000 2C030002
      40820040 3C60803D
      6063DA00 3D80801A
      618C5F00 7D8903A6
      4E800421 3C60803D
      6063DA00 808D8840
      38840590 38A00001
      3D80801A 618C5F64
      7D8903A6 4E800421
      8001001C 83E10014
      60000000 00000000`

    return geckoCode;

}


