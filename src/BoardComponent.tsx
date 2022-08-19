import { Modal } from 'react-bootstrap';
import React, { Fragment, useContext, useState } from 'react'
import { BoardContext } from './App'
import DiceComponent from './DiceComponent';
import ShopComponent from './ShopComponent';

const BoardComponent = () => {

    const boardContext = useContext(BoardContext);
    const [shopOpen, setShopOpen] = useState<boolean>(false);

    return (
        <div className='board d-flex align-items-start flex-column'>
            <Modal show={shopOpen} onHide={() => setShopOpen(false)} >
                <Modal.Body>
                    <ShopComponent />
                </Modal.Body>
            </Modal>
            <div className='dicelist d-flex justify-content-center flex-wrap'>
                {boardContext?.board.DiceList.map(x => <DiceComponent key={x.Id} dice={x} />)}
            </div>
            <div className='mt-auto p-2'>
                <button onClick={() => boardContext!.rollAll()}>roll</button>
                <button onClick={() => boardContext!.addDice()}>add dice</button>
                <span>{boardContext?.board.DiceValue}</span>
                <span className='m-2'>{boardContext?.userPoints}</span>
                <button onClick={() => setShopOpen(true)}>shop</button>
            </div>
        </div>
    )
}

export default BoardComponent;