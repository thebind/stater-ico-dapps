import React from 'react';

const PortfolioItem = (props) => {
    console.log(props);
    // http://localhost:3000/dashboard/portfolio/edit/99
    return (
        <div>Portfolio Item of {props.match.params.id}</div>
    );
}

export default PortfolioItem;
