import React, { Component } from 'react';
import SteamLogo from '../../assets/steamlogo.jpg';
import HTBLogo from '../../assets/htblogo.png';
import './index.scss';

export default (props) => {
  const game = props.game;
  const priceListItem = (game.salePrice) ? (
    <li>
      Price: <span className='strike-out'>{game.priceFormatted}</span> <span className='price'>{game.salePriceFormatted}</span>
    </li>
  ) : (
    <li>
      Price: <span className='emphasis'>{game.priceFormatted}</span>
    </li>
  );

  return (
    <div className='well'>
      <h4>{game.title}</h4>
      <div className='row'>
        <div className='col-xs-12'>
          <img src={game.image} style={{width: '100%'}} />
        </div>
        <div className='col-xs-8'>
          <ul className='price-list'>
            <li>Price per hour: <span className='price'>{game.pricePerHourFormatted}</span></li>
            { priceListItem }
            <li>Time to beat: <span className='emphasis'>{game.mainStoryTimeFormatted}</span></li>
          </ul>
        </div>
        <div className='col-xs-4' style={{textAlign: 'right'}}>
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
};
