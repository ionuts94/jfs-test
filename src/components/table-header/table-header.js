import React from 'react';
import './table-header.css';

const TableHeader = ({ avgGrade }) => {
    return(
        <div className="table-header-container">
            <span className="th">FIRST NAME</span>
            <span className="th wh">LAST NAME</span>
            <span className="th wh">GRADE</span>
            <span className="th">AVERAGE GRADE { avgGrade } </span>
        </div>
    );
}

export default TableHeader;