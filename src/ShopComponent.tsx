import React, { useContext } from 'react';
import { BoardContext, BoardContextInterface } from './App';
import { ShopItem } from './Shop';

const ShopComponent = () => {

    const boardContext = useContext(BoardContext)

    let id: number = 1;

    return (
        <div className='d-flex'>
            <div>
                {boardContext?.shop.Items.map(x => <ShopItemComponent key={x.Id} item={x} />)}
            </div>
            <div>
                <button onClick={() => boardContext.rollShop()}>roll shop</button>
            </div>
        </div>
    )
}

interface ShopItemComponentPropsInterface {
    item: ShopItem,
}

const ShopItemComponent = (props: ShopItemComponentPropsInterface) => {

    const boardContext = useContext<BoardContextInterface>(BoardContext);

    const canBuy = () => {
        return boardContext.userPoints >= props.item.Price;
    }

    const buy = () => {
        canBuy() && boardContext.addPassive(props.item);
    }

    if (!props.item.CanBuy) {
        return (
            <div className="bi bi-lock-fill"></div>
        )
    }

    return (
        <div onClick={() => buy()}>{`${props.item.Name} - ${props.item.Price}`}</div>
    )
}

export default ShopComponent;