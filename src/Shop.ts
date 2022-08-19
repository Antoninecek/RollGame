import { ShopLevelItems } from "./Configs";
import { GetRandomInteger, IdGenerator, IDictionary } from "./Interfaces";

export class Shop {

    // Items: ShopItem[];
    Level: string;
    Levels: string[];

    constructor(levels: string[]) {
        this.Level = levels[0];
        this.Levels = levels;
        this.Items = [];
    }

    set Items(items: ShopItem[]) { this.Items = items; }
    get Items() { return this.Items };

    createItems = (rolls: number, nItems: number): ShopItem[] => {
        let items = ShopLevelItems[this.Level];
        let allItems: ShopItem[] = [];
        for (let item of items) {
            for (let i = 0; i < item.probability; i++) {
                let it = ShopItem.createInstance(item.item);
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

    static createInstance = (config: ShopItemConfig): ShopItem => {
        let item = new ShopItem();
        item.Id = IdGenerator.generate();
        item.Name = config.Name;
        item.Type = config.Type;
        item.Effects = config.Effects;
        item.BasePrice = config.BasePrice;
        item.Multiplier = config.BasePriceMultiplier;
        item.CanBuy = true;
        return item;
    }

    setPrice = (rolls: number) => this.Price = this.Multiplier(this.BasePrice, rolls);
}

export enum ShopItemType {
    dice, diceFaceUpgrade, passiveRollUpgrade
}

export default Shop;