import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Grid, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { BoardContext, BoardContextInterface } from './App';
import { ShopItem } from './Shop';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ShopComponent = () => {

    const boardContext = useContext(BoardContext)

    return (
        <Grid container sx={style}>
            <Grid item>
                {boardContext?.shop.Items.map(x => <ShopItemComponent key={x.Id} item={x} />)}
            </Grid>
            <Grid item>
                <Typography variant='h4'>lvl:{boardContext.shop.Level}</Typography>
                <Button onClick={() => {
                    if (boardContext.userPoints > boardContext.shop.RollPrice) {
                        boardContext.rollShop();
                    }
                }}>roll shop {boardContext.shop.RollPrice}</Button>
            </Grid>
        </Grid>
    )
}

export interface ShopItemComponentPropsInterface {
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
            <div>
                <FontAwesomeIcon icon={'lock'} />
            </div>
        )
    }

    return (
        <div onClick={() => buy()}>
            <FontAwesomeIcon icon={props.item.Icon as IconProp} />
            <span>
                {`${props.item.Name} - ${props.item.Price}`}
            </span>
        </div>
    )
}

export default ShopComponent;