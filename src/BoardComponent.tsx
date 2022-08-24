// import { Modal } from 'react-bootstrap';
import { Grid, Modal, Typography } from '@mui/material';
import { Fragment, useContext, useState } from 'react'
import { BoardContext } from './App'
import DiceComponent from './DiceComponent';
import ShopComponent from './ShopComponent';

const BoardComponent = () => {

    const boardContext = useContext(BoardContext);
    const [shopOpen, setShopOpen] = useState<boolean>(false);

    return (
        <Grid container>
            <Modal open={shopOpen} onClose={() => setShopOpen(false)} >
                <Fragment>
                    <ShopComponent />
                </Fragment>
            </Modal>
            <Grid item>
                {boardContext?.board.DiceList.map(x => <DiceComponent key={x.Id} dice={x} />)}
            </Grid>
            <Grid item>
                <button onClick={() => boardContext!.rollAll()}>roll</button>
                {/* <button onClick={() => boardContext!.addDice()}>add dice</button> */}
                <span>{boardContext?.board.DiceValue}</span>/
                <span className='m-2'>{boardContext?.userPoints}</span>
                <button onClick={() => setShopOpen(true)}>shop</button>
                <div>{boardContext.rolls}</div>
            </Grid>
        </Grid>
    )
}

export default BoardComponent;