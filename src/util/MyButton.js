import React from 'react'

import { Tooltip } from '@material-ui/core';
import {IconButton}  from '@material-ui/core';


const MyButton = ({children, onClick, tip, btnClassName, tipClassName}) => {
    return ( 
        <div>
            <Tooltip title={tip} className={tipClassName} placement="top">
                <IconButton onClick={onClick} className={btnClassName}>
                    {children}
                </IconButton>
            </Tooltip>
        </div>
     );
}
 
export default MyButton;
