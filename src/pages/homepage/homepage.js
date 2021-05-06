import React from 'react';
import { useHistory } from 'react-router-dom';
import Learner from '../../components/learner/learner.js';
import TableHeader from '../../components/table-header/table-header.js';
import './homepage.css';

const HomePage = ({learners}) => {
    const history = useHistory();

    let avgGrade = 0;
    learners.forEach(element => {
        avgGrade += Number(element.grade);
    });
    avgGrade = avgGrade / learners.length;

    return(
        <div className="homepage-container">
            <TableHeader avgGrade={ avgGrade.toFixed(2) } />
            <div className="learners-container">
                {   
                    learners.map(({id, firstName, lastName, grade}) => 
                        <Learner 
                            key={ id }
                            id={ id } 
                            firstName={ firstName } 
                            lastName={ lastName } 
                            grade={ grade }
                        />
                    )
                }
                
            </div>
            <button className="addLearnerBtn" onClick={() => history.push('/add')}>ADD LEARNER</button>
        </div>
    )
}

export default HomePage;

