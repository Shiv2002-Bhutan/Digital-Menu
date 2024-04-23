let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 3000); 
}

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    window.scrollTo({
      top: section.offsetTop,
      behavior: 'smooth'
    });
  }
}

const vegMenu = document.getElementById('vegMenuItems');
const nonVegMenu = document.getElementById('nonVegMenuItems');
const drinksMenu = document.getElementById('drinksMenuItems');
const pizzaMenu = document.getElementById('pizzaMenuItems');
const searchInput = document.getElementById('searchInput');
const footer = document.getElementById('footer');
const itemCountSpan = document.getElementById('itemCount');
const proceedButton = document.getElementById('proceedButton');

const dishes = [
  { name: 'Veg Dish 1', category: 'Veg', image: 'https://via.placeholder.com/150', price: 10 },
  { name: 'Veg Dish 2', category: 'Veg', image: 'https://via.placeholder.com/150', price: 12 },
  { name: 'Veg Dish 3', category: 'Veg', image: 'https://via.placeholder.com/150', price: 15 },
  { name: 'Veg Dish 4', category: 'Veg', image: 'https://via.placeholder.com/150', price: 15 },
  { name: 'Non-Veg Dish 1', category: 'Non-Veg', image: 'https://via.placeholder.com/150', price: 15 },
  { name: 'Non-Veg Dish 2', category: 'Non-Veg', image: 'https://via.placeholder.com/150', price: 18 },
  { name: 'Non-Veg Dish 3', category: 'Non-Veg', image: 'https://via.placeholder.com/150', price: 20 },
  { name: 'Non-Veg Dish 4', category: 'Non-Veg', image: 'https://via.placeholder.com/150', price: 20 },
  { name: 'Drink 1', category: 'Drinks', image: 'https://via.placeholder.com/150', price: 5 },
  { name: 'Drink 2', category: 'Drinks', image: 'https://via.placeholder.com/150', price: 6 },
  { name: 'Drink 3', category: 'Drinks', image: 'https://via.placeholder.com/150', price: 7 },
  { name: 'Drink 4', category: 'Drinks', image: 'https://via.placeholder.com/150', price: 7 },
  { name: 'Pizza 1', category: 'Pizza', image: 'https://via.placeholder.com/150', price: 20 },
  { name: 'Pizza 2', category: 'Pizza', image: 'https://via.placeholder.com/150', price: 25 },
  { name: 'Pizza 3', category: 'Pizza', image: 'https://via.placeholder.com/150', price: 30 },
  { name: 'Pizza 3', category: 'Pizza', image: 'https://via.placeholder.com/150', price: 30 },
];

let totalItemCount = 0;

function renderMenuByCategory(category, container) {
  container.innerHTML = '';
  const filteredDishes = dishes.filter(dish => dish.category === category);
  const limitedDishes = filteredDishes.slice(0, 4); // Limit to first 4 dishes...change according to need
  limitedDishes.forEach(dish => {
    const menuItem = document.createElement('div');
    menuItem.classList.add('menu-item');
    menuItem.innerHTML = `
      <div class="dish-info">
        <h2 class="dish-name">${dish.name}</h2>
        <div class="image">
          <img src="${dish.image}" alt="${dish.name}">
        </div>
        <p class="dish-price">NU.${dish.price}</p>
      </div>
      <div class="quantity">
        <input class="quantity-input" type="number" min="0" value="0">
      </div>
      <button class="add-button" onclick="addToOrder('${dish.name}', ${dish.price})">Add to Order</button>
    `;
    container.appendChild(menuItem);
  });
}

function renderAllMenus() {
  renderMenuByCategory('Veg', vegMenu);
  renderMenuByCategory('Non-Veg', nonVegMenu);
  renderMenuByCategory('Drinks', drinksMenu);
  renderMenuByCategory('Pizza', pizzaMenu);
}



searchInput.addEventListener('input', function() {
  filterMenuItems(this.value);
});

function decrement(btn) {
  const input = btn.parentElement.querySelector('.quantity-input');
  if (parseInt(input.value) > 0) {
    input.value = parseInt(input.value) - 1;
  }
}

function addToOrder(name, price) {
  const quantity = parseInt(event.target.parentElement.querySelector('.quantity-input').value);
  if (quantity == 0) {
    alert('Please select a quantity');
    return;
  } 
  totalItemCount += quantity;
  updateFooter(totalItemCount);
}

function updateFooter(itemCount) {
  if (itemCount > 0) {
    footer.style.display = 'block';
    itemCountSpan.textContent = `${itemCount} item${itemCount !== 1 ? 's' : ''} added`;
    proceedButton.style.display = 'block';
  } else {
    footer.style.display = 'none';
  }
}

renderAllMenus();
