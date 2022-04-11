export const RestaurantListItem = ({ name, rating, price }) => {
  return (
    <div>
      <p>{name}</p> 
      <p>{Array(Math.floor(rating)).fill('⭐️')}</p>
      <p>{price}</p>
    </div>
  );
};