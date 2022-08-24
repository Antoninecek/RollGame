import { GetRandomInteger, IDictionary } from "./Interfaces";
import { ShopItemConfig, ShopItemType, ShopLevelItemProbability } from "./Shop";

const priceMultiplierRollBased = (basePrice: number, rolls: number): number => basePrice + basePrice * rolls + GetRandomInteger(basePrice * (basePrice + rolls));

const BaseShopItemEffects: IDictionary<(x: number) => number> = {
    'multiplier2Function': (x: number) => x * 2,
    'multiplier3Function': (x: number) => x * 3
}

const multiplier2Function = (x: number) => x * 2;
const multiplier3Function = (x: number) => x * 3;

const BaseShopItems: IDictionary<ShopItemConfig> = {
    'facemulti2': { Name: 'face multipl 2x', Type: ShopItemType.diceFaceUpgrade, Effects: [multiplier2Function], BasePrice: 10, BasePriceMultiplier: priceMultiplierRollBased, Icon: 'ambulance' },
    'rollmulti2': { Name: 'roll multipl 2x', Type: ShopItemType.passiveRollUpgrade, Effects: [multiplier2Function], BasePrice: 5, BasePriceMultiplier: priceMultiplierRollBased, Icon: 'ambulance' },
    'rollmulti3': { Name: 'roll multipl 3x', Type: ShopItemType.passiveRollUpgrade, Effects: [multiplier3Function], BasePrice: 5, BasePriceMultiplier: priceMultiplierRollBased, Icon: 'ambulance' }
};

const BaseStandardShopLevels: string[] = ['1', '2', '3', '4', '5', '6'];

const BaseShopLevelItems: IDictionary<ShopLevelItemProbability[]> = {
    '1': [{ item: BaseShopItems['rollmulti2'], probability: 9 }, { item: BaseShopItems['rollmulti3'], probability: 1 }],
    '2': [{ item: BaseShopItems['rollmulti2'], probability: 5 }, { item: BaseShopItems['rollmulti3'], probability: 5 }],
    '3': [{ item: BaseShopItems['rollmulti2'], probability: 5 }, { item: BaseShopItems['rollmulti3'], probability: 5 }],
    '4': [{ item: BaseShopItems['rollmulti2'], probability: 5 }, { item: BaseShopItems['rollmulti3'], probability: 5 }],
    '5': [{ item: BaseShopItems['rollmulti2'], probability: 5 }, { item: BaseShopItems['rollmulti3'], probability: 5 }],
    '6': [{ item: BaseShopItems['rollmulti2'], probability: 1 }, { item: BaseShopItems['rollmulti3'], probability: 9 }],
}

class GameConfig {
    ShopItems: IDictionary<ShopItemConfig>;
    ShopLevels: string[];
    ShopLevelItems: IDictionary<ShopLevelItemProbability[]>;
    ShopItemEffects: IDictionary<(x: number) => number>;

    constructor() {
        this.ShopLevels = BaseStandardShopLevels;
        this.ShopItems = BaseShopItems;
        this.ShopLevelItems = BaseShopLevelItems;
        this.ShopItemEffects = BaseShopItemEffects;
    }

    Init = () => {

    }
}

export default GameConfig;