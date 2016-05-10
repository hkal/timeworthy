import React from 'react';

import SteamLogo from '../assets/steamlogo.jpg';
import HTBLogo from '../assets/htblogo.png';

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

// TODO: Look into using spread operator here
const priceStyle = Object.assign({color: '#4cae4c'}, emphasisStyle);

class SearchResult extends React.Component {
  render() {
    const game = this.props.game;

    return (
      <div className='well' style={wellStyle}>
        <h4 style={titleStyle}>{game.title}</h4>
        <div className='row'>
          <div className='col-md-12'>
            <img src={game.image} style={{width: '100%'}} />
          </div>
          <div className='col-md-8'>
            <ul style={priceListStyle}>
              <li>Price per hour: <span style={priceStyle}>{game.pricePerHourFormatted}</span></li>
              <li>Price: <span style={emphasisStyle}>{game.priceFormatted}</span></li>
              <li>Time to beat: <span style={emphasisStyle}>{game.mainStoryTimeFormatted}</span></li>
            </ul>
          </div>
          <div className='col-md-4' style={{textAlign: 'right'}}>
            <a href={game.steamUrl} target='_blank'>
              <img src={SteamLogo} width='30' style={{margin: '10px 10px'}}/>
            </a>
            <a href={game.htbUrl} target='_blank'>
              <img src={HTBLogo} width='30' style={{marginRight: '-1px'}} />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchResult;
