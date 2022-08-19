import React from 'react';
import Dice, { DiceIcons } from './Dice';

interface DiceComponentInterface {
    dice: Dice;
}

const DiceComponent = (props: DiceComponentInterface) => {

    return <span className={`dice mx-1 ${DiceIcons[props.dice.Sides[props.dice.TopSide].Value]}`}></span>
}

export default DiceComponent;