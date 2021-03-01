import React from 'react';
import { useHistory } from 'react-router-dom';
import './foot.css'


function BasicFooter(){
    const history = useHistory();


    function handlePicClick() {
        history.push(`/`)
    }
    return (
        <div className="foot">
            <div className='imggg' onClick={handlePicClick}>
            </div>
            <div className="out1">
                <a className="w11" href='https://github.com/robertvogue'>Robert Vogtritter</a>
            </div>
            <div className='in'>
                <a className="w11" href='https://github.com/RobertVogue/SnowJaws'>GitHub</a>
            </div>
            <div className="out2">
                <a className="w11" href='https://linkedin.com/in/robertvogtritter'>LinkedIn</a>
            </div>
        </div>
    )
}
export default BasicFooter
