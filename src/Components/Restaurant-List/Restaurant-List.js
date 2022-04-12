export const RestaurantListItem = ({ name, rating, price }) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>{Array(Math.floor(rating)).fill('⭐️')}</p>
      <p>{price}</p>
    </div>
  );
};
