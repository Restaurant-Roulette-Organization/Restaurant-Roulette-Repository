import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function RestaurantDetail() {


  return (
    <div>
      <h3 className="title">{name}</h3>
      <div className="restaurant-image" style={{ backgroundImage: `url(${image_url})` }}></div>
      <p className="price">{price}</p>
      <p>{rating}</p>
      <p>{location}</p>
      <p>{phoneNumber}</p>
      <div className="favorite" onClick={() => clickHandler()}>
        {checked ? '❤️' : '🤍'}
      </div>
      <div>{notes}</div>
    </div>
  );
}
