import Dice from "./Dice";

class Board {

    DiceList: Dice[];
    DiceValue: number;

    constructor(diceList: Dice[], diceValue?: number) {
        this.DiceList = diceList;
        this.DiceValue = diceValue ?? 0;
    }

}

export default Board;