import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Dice from './Dice';

interface DiceComponentInterface {
    dice: Dice;
}

const DiceComponent = (props: DiceComponentInterface) => {

    return <span><FontAwesomeIcon icon={props.dice.getIcon() as IconProp} /></span>
}

export default DiceComponent;