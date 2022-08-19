import { GetRandomInteger, IdGenerator, IDictionary } from "./Interfaces";

export class Shop {

    Items: ShopItem[];
    Level: string;

    constructor(items: ShopItem[], level: string) {
        this.Items = items;
        this.Level = level;
    }

    createItems = (rolls: number, nItems: number): ShopItem[] => {
        let items = ShopLevelItems[this.Level];
        let allItems: ShopItem[] = [];
        for (let item of items) {
            for (let i = 0; i < item.probability; i++) {
                let it = item.item();
                it.setPrice(rolls);
                allItems.push(it);
            }
        }
        let choosedItems = [];
        for (let i = 0; i < nItems; i++) {
            let randomNumber = GetRandomInteger(allItems.length);
            let selected = allItems[randomNumber];
            choosedItems.push(selected);
            allItems = allItems.filter(x => x.Id !== selected.Id);
        }
        return choosedItems;
    }

}

interface ShopLevelItemProbability {
    item: () => ShopItem;
    probability: number;
}

export class ShopItem {

    Id: number;
    Name: string;
    Type: ShopItemType;
    Effects: Function[];
    Price: number;
    private BasePrice: number;
    Multiplier: (basePrice: number, rolls: number) => number;
    CanBuy: boolean;

    constructor(name: string, type: ShopItemType, effects: Function[], basePrice: number, multiplier: (basePrice: number, rolls: number) => number) {
        this.Name = name;
        this.Type = type;
        this.Effects = effects;
        this.Price = 0;
        this.Multiplier = multiplier;
        this.BasePrice = basePrice;
        this.Id = IdGenerator.generate();
        this.CanBuy = true;
    }

    setPrice = (rolls: number) => this.Price = this.Multiplier(this.BasePrice, rolls);
}

export enum ShopItemType {
    dice, diceFaceUpgrade, passiveRollUpgrade
}

const multiplier2Function = (x: number) => x * 2;
const multiplier3Function = (x: number) => x * 3;
const priceMultiplierRollBased = (basePrice: number, rolls: number): number => basePrice + basePrice * rolls + GetRandomInteger(basePrice * (basePrice + rolls));

export const GenerateFaceMultiplier2ShopItem = () => new ShopItem('face multipl 2x', ShopItemType.diceFaceUpgrade, [multiplier2Function], 10, priceMultiplierRollBased);

export const GeneratePassiveRollMultiplier2ShopItem = () => new ShopItem('roll multipl 2x', ShopItemType.passiveRollUpgrade, [multiplier2Function], 5, priceMultiplierRollBased);

export const GeneratePassiveRollMultiplier3ShopItem = () => new ShopItem('roll multipl 3x', ShopItemType.passiveRollUpgrade, [multiplier3Function], 5, priceMultiplierRollBased);

const ShopLevelItems: IDictionary<ShopLevelItemProbability[]> = {
    '1': [{ item: GeneratePassiveRollMultiplier2ShopItem, probability: 9 }, { item: GeneratePassiveRollMultiplier3ShopItem, probability: 1 }],
    '2': [{ item: GeneratePassiveRollMultiplier2ShopItem, probability: 5 }, { item: GeneratePassiveRollMultiplier3ShopItem, probability: 5 }],
}

export default Shop;