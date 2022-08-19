import { GetRandomInteger, IDictionary } from "./Interfaces";
import { ShopItem, ShopItemConfig, ShopItemType, ShopLevelItemProbability } from "./Shop";

const multiplier2Function = (x: number) => x * 2;
const multiplier3Function = (x: number) => x * 3;
const priceMultiplierRollBased = (basePrice: number, rolls: number): number => basePrice + basePrice * rolls + GetRandomInteger(basePrice * (basePrice + rolls));

export const ShopItems: IDictionary<ShopItemConfig> = {
    'facemulti2': { Name: 'face multipl 2x', Type: ShopItemType.diceFaceUpgrade, Effects: [multiplier2Function], BasePrice: 10, BasePriceMultiplier: priceMultiplierRollBased },
    'rollmulti2': { Name: 'roll multipl 2x', Type: ShopItemType.passiveRollUpgrade, Effects: [multiplier2Function], BasePrice: 5, BasePriceMultiplier: priceMultiplierRollBased },
    'rollmulti3': { Name: 'roll multipl 3x', Type: ShopItemType.passiveRollUpgrade, Effects: [multiplier3Function], BasePrice: 5, BasePriceMultiplier: priceMultiplierRollBased }
};

export const StandardShopLevels: string[] = ['1', '2', '3', '4', '5', '6'];

export const ShopLevelItems: IDictionary<ShopLevelItemProbability[]> = {
    '1': [{ item: ShopItems['rollmulti2'], probability: 9 }, { item: ShopItems['rollmulti2'], probability: 1 }],
    '2': [{ item: ShopItems['rollmulti2'], probability: 5 }, { item: ShopItems['rollmulti2'], probability: 5 }],
    '3': [{ item: ShopItems['rollmulti2'], probability: 5 }, { item: ShopItems['rollmulti2'], probability: 5 }],
    '4': [{ item: ShopItems['rollmulti2'], probability: 5 }, { item: ShopItems['rollmulti2'], probability: 5 }],
    '5': [{ item: ShopItems['rollmulti2'], probability: 5 }, { item: ShopItems['rollmulti2'], probability: 5 }],
    '6': [{ item: ShopItems['rollmulti2'], probability: 5 }, { item: ShopItems['rollmulti2'], probability: 5 }],
}