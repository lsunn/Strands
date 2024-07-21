const board = {
    "theme":"All atwitter",
    "spangram": "BIRDSONG",
    "letters": [
        ['E', 'C', 'E', 'E', 'T', 'I'],
        ['E', 'H', 'W', 'W', 'H', 'S'],
        ['R', 'T', 'S', 'O', 'L', 'T'],
        ['C', 'S', 'D', 'C', 'N', 'E'],
        ['B', 'I', 'R', 'L', 'U', 'G'],
        ['P', 'A', 'R', 'T', 'C', 'K'],
        ['R', 'W', 'C', 'B', 'R', 'L'],
        ['I', 'H', 'E', 'L', 'I', 'L'],
    ],
    "words": [
        {
            word: "SCREECH",
            positions: [
                {row: 3, col: 1}, {row: 3, col: 0}, {row: 2, col: 0}, 
                {row: 1, col: 0}, {row: 0, col: 0}, {row: 0, col: 1}, 
                {row: 1, col: 1}
            ]
        },
        {
            word: "CHIRP",
            positions: [
                {row: 6, col: 2}, {row: 7, col: 1}, {row: 7, col: 0}, 
                {row: 6, col: 0}, {row: 5, col: 0}
            ]
        },
        {
            word: "WARBLE",
            positions: [
                {row: 6, col: 1}, {row: 5, col: 1}, {row: 5, col: 2}, 
                {row: 6, col: 3}, {row: 7, col: 3}, {row: 7, col: 2}
            ]
        },
        {
            word: "CLUCK",
            positions: [
                {row: 3, col: 3 }, {row: 4, col: 3}, {row: 4, col: 4}, 
                {row: 5, col: 4}, {row: 5, col: 5}
            ]
        },
        {
            word: "TRILL",
            positions: [
                {row: 5, col: 3}, {row: 6, col: 4}, {row: 7, col: 4}, 
                {row: 7, col: 5}, {row: 6, col: 5}
            ]
        },
        {
            word: "TWEET",
            positions: [
                {row: 2, col: 1}, {row: 1, col: 2}, {row: 0, col: 2}, 
                {row: 0, col: 3}, {row: 0, col: 4}
            ]
        },
        {
            word: "WHISTLE",
            positions: [
                {row: 1, col: 3}, {row: 1, col: 4}, {row: 0, col: 5}, 
                {row: 1, col: 5}, {row: 2, col: 5}, {row: 2, col: 4}, 
                {row: 3, col: 5}
            ]
        }
    ]
};

export default board;