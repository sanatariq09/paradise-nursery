import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.png', description: 'Produces oxygen at night, improving air quality.', cost: 15 },
      { name: 'Spider Plant', image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3529186_1280.jpg', description: 'Filters formaldehyde and xylene from the air.', cost: 12 },
      { name: 'Peace Lily', image: 'https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg', description: 'Removes mold spores and purifies the air.', cost: 18 },
      { name: 'Boston Fern', image: 'https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg', description: 'Natural humidifier that removes toxins.', cost: 20 },
      { name: 'Rubber Plant', image: 'https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg', description: 'Easy-care plant that absorbs airborne chemicals.', cost: 17 },
      { name: 'Aloe Vera', image: 'https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg', description: 'Purifies air and its gel soothes skin.', cost: 14 },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: 'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?w=400', description: 'Calming scent that promotes relaxation.', cost: 20 },
      { name: 'Jasmine', image: 'https://cdn.pixabay.com/photo/2018/07/24/12/16/jasmine-3558157_1280.jpg', description: 'Sweet fragrance that lifts the mood.', cost: 18 },
      { name: 'Rosemary', image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=400', description: 'Woody aroma, great for cooking too.', cost: 15 },
      { name: 'Mint', image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=400', description: 'Refreshing scent that repels pests.', cost: 12 },
      { name: 'Lemon Balm', image: 'https://images.unsplash.com/photo-1594897030264-ab7d87efc473?w=400', description: 'Citrusy aroma that eases stress.', cost: 14 },
      { name: 'Hyacinth', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400', description: 'Strong floral scent for spring freshness.', cost: 22 },
    ],
  },
  {
    category: 'Succulents and Cacti',
    plants: [
      { name: 'Echeveria', image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400', description: 'Rosette-shaped succulent, very low maintenance.', cost: 10 },
      { name: 'Jade Plant', image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400', description: 'Symbol of good luck and prosperity.', cost: 16 },
      { name: 'Barrel Cactus', image: 'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=400', description: 'Round cactus that thrives on sunlight.', cost: 18 },
      { name: 'Zebra Haworthia', image: 'https://images.unsplash.com/photo-1446071103084-c257b5f70672?w=400', description: 'Striped leaves, perfect for desks.', cost: 11 },
      { name: 'String of Pearls', image: 'https://images.unsplash.com/photo-1463320898484-cdee8141c787?w=400', description: 'Trailing bead-like leaves for hanging pots.', cost: 19 },
      { name: 'Prickly Pear', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400', description: 'Hardy cactus with paddle-shaped pads.', cost: 13 },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand" onClick={onHomeClick}>
          <span className="brand-name">Paradise Nursery</span>
          <span className="brand-tag">Where Green Meets Serenity</span>
        </div>
        <div className="navbar-links">
          <a href="#home" onClick={(e) => { e.preventDefault(); onHomeClick(); }}>Home</a>
          <a href="#plants" onClick={(e) => { e.preventDefault(); setShowCart(false); }}>Plants</a>
          <a href="#cart" className="cart-link" onClick={(e) => { e.preventDefault(); setShowCart(true); }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="34" height="34" aria-label="Shopping cart">
              <rect width="156" height="156" fill="none"></rect>
              <circle cx="80" cy="216" r="12"></circle>
              <circle cx="184" cy="216" r="12"></circle>
              <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
            </svg>
            <span className="cart_quantity_count">{totalQuantity}</span>
          </a>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category) => (
            <section key={category.category}>
              <h2 className="category-title">{category.category}</h2>
              <div className="product-list">
                {category.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <h3 className="product-title">{plant.name}</h3>
                    <p className="product-description">{plant.description}</p>
                    <div className="product-price">${plant.cost}</div>
                    <button
                      className={`product-button ${isInCart(plant.name) ? 'added-to-cart' : ''}`}
                      onClick={() => handleAddToCart(plant)}
                      disabled={isInCart(plant.name)}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
