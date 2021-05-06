import React from 'react';
import { useHistory } from 'react-router-dom';
import './learner.css';

const Learner = ({ id, firstName, lastName, grade }) => {

    const history = useHistory();

    const viewLearner = () => {
        history.push(`/individual/${id}`);
    }
    
    return(
        <div className="learner-container">
            <span className="td">{ firstName }</span>
            <span className="td wh">{ lastName }</span>
            <span className="td wh">{ grade }</span>
            <span className="vld" onClick={ viewLearner }>View learner details</span>
        </div>
    )
}

export default Learner;