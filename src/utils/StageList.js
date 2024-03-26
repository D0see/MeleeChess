export const stageEnum = {
    1: "Yoshi's Story",
    2: "Pokemon Stadium",
    3: "Final Destination",
    4: "Fountain Of Dreams",
    5: "Battlefield",
    6: "Dreamland"
}

const normalStage = {
    name: 'normal board',
    layout:
    [[3, 6, 6, 6, 6, 6, 6, 3],
    [3, 2, 2, 2, 2, 2, 2, 3],
    [3, 2, 5, 5, 5, 5, 2, 3],
    [3, 4, 2, 1, 1, 2, 4, 3],
    [3, 4, 2, 1, 1, 2, 4, 3],
    [3, 2, 5, 5, 5, 5, 2, 3],
    [3, 2, 2, 2, 2, 2, 2, 3],
    [3, 6, 6, 6, 6, 6, 6, 3]]
};

const badStage = {
    name: 'bad board',
    layout:
    [[3, 6, 6, 1, 6, 6, 6, 3],
    [3, 2, 2, 1, 3, 3, 3, 3],
    [3, 2, 5, 1, 5, 5, 2, 3],
    [3, 4, 2, 1, 1, 2, 4, 6],
    [6, 4, 2, 1, 1, 2, 4, 3],
    [3, 2, 5, 5, 1, 5, 2, 3],
    [3, 3, 3, 3, 1, 2, 2, 3],
    [3, 6, 6, 6, 1, 6, 6, 3]]
};

export const stages = [normalStage, badStage];