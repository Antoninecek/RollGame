import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import BoardComponent from './BoardComponent';
import Board from './Board';
import Dice, { DiceSymbol, DiceSymbolTypes, GenerateBaseNumericDice } from './Dice';
import Shop, { GenerateFaceMultiplier2ShopItem, GeneratePassiveRollMultiplier2ShopItem, ShopItem } from './Shop';

export interface BoardContextInterface {
    board: Board;
    rollAll: () => void;
    addDice: () => void;
    userPoints: number;
    shop: Shop;
    passives: ShopItem[];
    addPassive: (item: ShopItem) => void;
    rolls: number;
    rollShop: () => void;
}

export const BoardContext = React.createContext<BoardContextInterface>({} as BoardContextInterface);

function App() {

    const [board, setBoard] = useState<Board | null>(null);
    const [userPoints, setUserPoints] = useState<number>(0);
    const [shop, setShop] = useState<Shop | null>(null);
    const [passives, setPassives] = useState<ShopItem[]>([]);
    const [rolls, setRolls] = useState<number>(0);

    useEffect(() => {
        let dics = [];
        for (let i = 0; i < 11; i++) {
            dics.push(GenerateBaseNumericDice());
        }
        const board = new Board([...dics]);
        setBoard(board);
        const shop = new Shop([], '1');
        shop.Items = shop.createItems(rolls, 10);
        setShop(shop);
    }, [])

    const rollAll = () => {
        let dicelist = board!.DiceList;
        let sum = 0;
        for (let dice of dicelist) {
            dice.roll();
            sum += dice.getValue();
        }
        for (let passive of passives) {
            for (let effect of passive.Effects) {
                sum += effect(sum);
            }
        }
        setBoard({ ...board!, DiceList: dicelist, DiceValue: sum });
        setUserPoints(userPoints + sum);
        setRolls(rolls + 1);
    }

    const addDice = () => {
        setBoard({ ...board!, DiceList: [...board?.DiceList!, GenerateBaseNumericDice()] });
    }

    const addPassive = (item: ShopItem) => {
        setPassives([...passives, item]);
        setUserPoints(userPoints - item.Price);
        setShop({
            ...shop!, Items: shop?.Items.map(x => {
                if (x.Id === item.Id) {
                    x.CanBuy = false;
                }
                return x;
            })!
        });
    }

    const rollShop = () => {
        let items: ShopItem[] = shop!.createItems(rolls, 10);
        setShop({ ...shop!, Items: items })
    }

    if (!board || !shop) return <div>Loading...</div>

    return (
        <div className="App">
            <BoardContext.Provider value={{
                board: board,
                rollAll: rollAll,
                addDice: addDice,
                userPoints: userPoints,
                shop: shop,
                passives: passives,
                addPassive: addPassive,
                rolls: rolls,
                rollShop: rollShop
            }}>
                <BoardComponent />
            </BoardContext.Provider>
        </div>
    );
}

export default App;
