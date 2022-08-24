import { IdGenerator, IDictionary } from "./Interfaces";

class Dice {

    Sides: DiceSymbol[];
    Id: number;
    TopSide: number;

    constructor(sides: DiceSymbol[]) {
        this.Sides = sides;
        this.Id = IdGenerator.generate();
        this.TopSide = 0;
    }

    roll() {
        this.TopSide = Math.floor(Math.random() * this.Sides.length);
    }

    getValue() {
        return this.Sides[this.TopSide].Value;
    }

    getIcon(): string {
        return this.Sides[this.TopSide].Icon;
    }
}

export class DiceSymbol {

    Type: DiceSymbolTypes;
    Value: number = 0;
    Icon: string = '';

    constructor(type: DiceSymbolTypes) {
        this.Type = type;
    }
}

export enum DiceSymbolTypes {
    numeric, multiplier
}

export const GenerateBaseNumericDice = () => new Dice([{ Type: DiceSymbolTypes.numeric, Value: 1, Icon: 'dice-one' }, { Type: DiceSymbolTypes.numeric, Value: 2, Icon: 'dice-two' }, { Type: DiceSymbolTypes.numeric, Value: 3, Icon: 'dice-three' }, { Type: DiceSymbolTypes.numeric, Value: 4, Icon: 'dice-four' }, { Type: DiceSymbolTypes.numeric, Value: 5, Icon: 'dice-five' }, { Type: DiceSymbolTypes.numeric, Value: 6, Icon: 'dice-six' }])

export default Dice