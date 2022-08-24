import { GetRandomInteger, IdGenerator, IDictionary } from "./Interfaces";

export enum ShopItemType {
    dice, diceFaceUpgrade, passiveRollUpgrade
}

export interface ShopLevelItemProbability {
    item: ShopItemConfig;
    probability: number;
}

export interface ShopItemConfig {
    Name: string;
    Type: ShopItemType;
    Effects: Function[];
    BasePrice: number;
    BasePriceMultiplier: (basePrice: number, rolls: number) => number;
    Icon: string;
}

export class Shop {

    Items: ShopItem[];
    Level: string;
    Levels: string[];
    LevelIndex: number;

    constructor(levels: string[]) {
        this.Level = levels[0];
        this.LevelIndex = 0;
        this.Levels = levels;
        this.Items = [];
    }

    changeLevelUp = (): Shop => {
        if (this.LevelIndex === this.Levels.length - 1) return { ...this };
        this.LevelIndex += 1;
        this.Level = this.Levels[this.LevelIndex];
        return { ...this };
    }

    createItems = (rolls: number, nItems: number, items: IDictionary<ShopLevelItemProbability[]>): ShopItem[] => {
        let allItems: ShopItem[] = [];
        let levelItems = items[this.Level];
        for (let item of levelItems) {
            for (let i = 0; i < item.probability; i++) {
                let it = new ShopItem(item.item);
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

export class ShopItem {

    Id: number = -1;
    Name: string = '';
    Type: ShopItemType = ShopItemType.passiveRollUpgrade;
    Effects: Function[] = [];
    Price: number = 0;
    private BasePrice: number = 0;
    Multiplier: (basePrice: number, rolls: number) => number = (x, y) => 0;
    CanBuy: boolean = false;
    Icon: string = '';

    constructor(config: ShopItemConfig) {
        this.Id = IdGenerator.generate();
        this.Name = config.Name;
        this.Type = config.Type;
        this.Effects = config.Effects;
        this.BasePrice = config.BasePrice;
        this.Multiplier = config.BasePriceMultiplier;
        this.CanBuy = true;
        this.Icon = config.Icon;
    }

    // static createInstance = (config: ShopItemConfig): ShopItem => {
    //     let item = new ShopItem();
    //     item.Id = IdGenerator.generate();
    //     item.Name = config.Name;
    //     item.Type = config.Type;
    //     item.Effects = config.Effects;
    //     item.BasePrice = config.BasePrice;
    //     item.Multiplier = config.BasePriceMultiplier;
    //     item.CanBuy = true;
    //     return item;
    // }

    setPrice = (rolls: number) => this.Price = this.Multiplier(this.BasePrice, rolls);
}

export default Shop;