import {moveCells, moveLeft, moveRight, moveUp, moveDown, getIsGameOver} from "./logic";
import {getCurrentPosition} from "./App";

describe("test movement", () => {
    it("движение 1", () => {
        expect(moveCells([0, 0, 0, 2])).toEqual([2, 0, 0, 0]);
    });

    it("сложение", () => {
        expect(moveCells([2, 0, 0, 2])).toEqual([4, 0, 0, 0]);
    });

    it("движение 2", () => {
        expect(moveCells([4, 0, 0, 2])).toEqual([4, 2, 0, 0]);
    });

    it("движение и сложение", () => {
        expect(moveCells([0, 2, 2, 0])).toEqual([4, 0, 0, 0]);
    });

    it("движение и сложение 2", () => {
        expect(moveCells([0, 0, 2, 2])).toEqual([4, 0, 0, 0]);
    });

    it("движение и сложение 3", () => {
        expect(moveCells([0, 2, 2, 2])).toEqual([4, 2, 0, 0]);
    });

    it("без изменений", () => {
        expect(moveCells([2, 4, 8, 16])).toEqual([2, 4, 8, 16]);
    });

    it("сложение 3", () => {
        expect(moveCells([4, 2, 2, 0])).toEqual([4, 4, 0, 0]);
    });

    it("сложение 4", () => {
        expect(moveCells([4, 0, 2, 2])).toEqual([4, 4, 0, 0]);
    });

    it("несколько сложений", () => {
        expect(moveCells([2, 2, 4, 4])).toEqual([4, 8, 0, 0]);
    });
});

describe("move to left", () => {
    it("case 1", () => {
        const before = [
            0, 0, 0, 2,
            2, 0, 0, 2,
            4, 0, 0, 2,
            0, 2, 2, 0
        ];

        const after = [
            2, 0, 0, 0,
            4, 0, 0, 0,
            4, 2, 0, 0,
            4, 0, 0, 0
        ];
        expect(moveLeft(before, 4)).toEqual(after);
    });

    it("case 2", () => {
        const before = [
            0, 2, 2, 2,
            2, 4, 8, 16,
            4, 2, 2, 0,
            2, 2, 4, 4
        ];

        const after = [
            4, 2, 0, 0,
            2, 4, 8, 16,
            4, 4, 0, 0,
            4, 8, 0, 0
        ];
        expect(moveLeft(before, 4)).toEqual(after);
    });
});

describe("move to right", () => {
    it("case 1", () => {
        const before = [
            2, 0, 0, 0,
            2, 0, 0, 2,
            4, 0, 0, 2,
            0, 2, 2, 0
        ];

        const after = [
            0, 0, 0, 2,
            0, 0, 0, 4,
            0, 0, 4, 2,
            0, 0, 0, 4
        ];
        expect(moveRight(before, 4)).toEqual(after);
    });


    it("case 2", () => {
        const before = [
            0, 0, 2, 2,
            0, 2, 2, 2,
            2, 4, 8, 16,
            2, 2, 4, 4
        ];

        const after = [
            0, 0, 0, 4,
            0, 0, 2, 4,
            2, 4, 8, 16,
            0, 0, 4, 8
        ];
        expect(moveRight(before, 4)).toEqual(after);
    });
});

describe("move to up", () => {
    it ("case 1", () => {
        const before = [
                   2, 0, 0, 2,
                   2, 2, 4, 4,
                   4, 2, 4, 8,
                   4, 0, 2, 16
            ];
        const after = [
                   4, 4, 8, 2,
                   8, 0, 2, 4,
                   0, 0, 0, 8,
                   0, 0, 0, 16
             ];
        expect(moveUp(before, 4)).toEqual(after)
    })
    it ("case 2", () => {
        const before = [
            2, 2, 8, 2,
            2, 2, 4, 2,
            0, 2, 4, 8,
            4, 0, 2, 8
        ];
        const after = [
            4, 4, 8, 4,
            4, 2, 8, 16,
            0, 0, 2, 0,
            0, 0, 0, 0
        ];
        expect(moveUp(before, 4)).toEqual(after)
    })
})

describe("move to down", () => {
    it ("case 1", () => {
        const before = [
            2, 0, 0, 2,
            2, 2, 4, 4,
            4, 2, 4, 8,
            4, 0, 2, 16
        ];
        const after = [
            0, 0, 0, 2,
            0, 0, 0, 4,
            4, 0, 8, 8,
            8, 4, 2, 16
        ];
        expect(moveDown(before, 4)).toEqual(after)
    })
    it ("case 2", () => {
        const before = [
            2, 2, 8, 2,
            2, 2, 4, 2,
            0, 2, 4, 8,
            4, 0, 2, 8
        ];
        const after = [
            0, 0, 0, 0,
            0, 0, 8, 0,
            4, 2, 8, 4,
            4, 4, 2, 16
        ];
        expect(moveDown(before, 4)).toEqual(after)
    })
})

describe("game over check", () => {
    it ("case 1", () => {
        const before = [
            2, 32, 8, 2,
            4, 64, 16, 4,
            8, 32, 8, 32,
            16, 4, 2, 16
        ];
        expect(getIsGameOver(before, 4)).toEqual(true)
    })
    it ("case 2", () => {
        const before = [
            64, 2, 4, 2,
            32, 8, 16, 4,
            2, 16, 8, 16,
            8, 4, 64, 0
        ];
        expect(getIsGameOver(before, 4)).toEqual(false)
    })
    it ("case 3", () => {
        const before = [
            4, 2, 64, 8,
            32, 128, 32, 16,
            2, 128, 2, 4,
            4, 64, 8, 16
        ];
        expect(getIsGameOver(before, 4)).toEqual(false)
    })
})

describe("get curren position", () => {
    const size = 4;
    it ("left", () => {
        const lastMove = "left";
        expect(getCurrentPosition({lastMove, size, index: 0})).toEqual(0);
        expect(getCurrentPosition({lastMove, size, index: 5})).toEqual(1);
        expect(getCurrentPosition({lastMove, size, index: 10})).toEqual(2);
        expect(getCurrentPosition({lastMove, size, index: 15})).toEqual(3);
    })

    it ("right", () => {
        const lastMove = "right";
        expect(getCurrentPosition({lastMove, size, index: 0})).toEqual(3);
        expect(getCurrentPosition({lastMove, size, index: 5})).toEqual(2);
        expect(getCurrentPosition({lastMove, size, index: 10})).toEqual(1);
        expect(getCurrentPosition({lastMove, size, index: 15})).toEqual(0);
    })

    it ("up", () => {
        const lastMove = "up";
        expect(getCurrentPosition({lastMove, size, index: 0})).toEqual(0);
        expect(getCurrentPosition({lastMove, size, index: 5})).toEqual(1);
        expect(getCurrentPosition({lastMove, size, index: 10})).toEqual(2);
        expect(getCurrentPosition({lastMove, size, index: 15})).toEqual(3);
    })

    it ("down", () => {
        const lastMove = "down";
        expect(getCurrentPosition({lastMove, size, index: 0})).toEqual(3);
        expect(getCurrentPosition({lastMove, size, index: 5})).toEqual(2);
        expect(getCurrentPosition({lastMove, size, index: 10})).toEqual(1);
        expect(getCurrentPosition({lastMove, size, index: 15})).toEqual(0);
    })
})
