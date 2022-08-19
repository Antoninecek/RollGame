import { IDictionary } from "./Interfaces";

class Dice {

    Sides: DiceSymbol[];
    Id: number;
    TopSide: number;

    constructor(sides: DiceSymbol[]) {
        this.Sides = sides;
        this.Id = GenerateDiceId();
        this.TopSide = 0;
    }

    roll() {
        this.TopSide = Math.floor(Math.random() * this.Sides.length);
    }

    getValue() {
        return this.Sides[this.TopSide].Value;
    }
}

let diceId = 1;
let GenerateDiceId = () => diceId++;

export class DiceSymbol {

    Type: DiceSymbolTypes;
    Value: number;

    constructor(type: DiceSymbolTypes, value: number) {
        this.Type = type;
        this.Value = value;
    }
}

export enum DiceSymbolTypes {
    numeric, multiplier
}

export const GenerateBaseNumericDice = () => new Dice([{ Type: DiceSymbolTypes.numeric, Value: 1 }, { Type: DiceSymbolTypes.numeric, Value: 2 }, { Type: DiceSymbolTypes.numeric, Value: 3 }, { Type: DiceSymbolTypes.numeric, Value: 4 }, { Type: DiceSymbolTypes.numeric, Value: 5 }, { Type: DiceSymbolTypes.numeric, Value: 6 }])

export const DiceIcons: IDictionary<string> = {
    '1': 'bi bi-dice-1',
    '2': 'bi bi-dice-2',
    '3': 'bi bi-dice-3',
    '4': 'bi bi-dice-4',
    '5': 'bi bi-dice-5',
    '6': 'bi bi-dice-6',
}

export default Dice