import React from 'react';

const priceListStyle = {
  marginTop: '10px',
  padding: 0,
  listStyle: 'none'
};

const wellStyle = {
  boxShadow: 'none',
  WebkitBoxShadow: 'none'
};

const titleStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

const emphasisStyle = {
  fontWeight: 500
};

class SearchResult extends React.Component {
  render() {
    const game = this.props.game;

    return (
      <div className='well' style={wellStyle}>
        <h4 style={titleStyle}>{game.title}</h4>
        <div>
          <img src={game.image} style={{width: '100%'}} />
          <ul style={priceListStyle}>
            <li>Price per hour: <span style={emphasisStyle}>{game.pricePerHourFormatted}</span></li>
            <li>Price: <span style={emphasisStyle}>{game.priceFormatted}</span></li>
            <li>Time to beat: <span style={emphasisStyle}>{game.mainStoryTimeFormatted}</span></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default SearchResult;
