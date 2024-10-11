document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Корзина пуста</p>';
    } else {
        let total = 0;
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('product-card');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" width="100">
                <h3>${item.name}</h3>
                <p>Цена: ${item.price} руб.</p>
                <div class="quantity-control">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>
                <button class="remove-item" data-id="${item.id}">Удалить</button>
            `;
            cartItemsContainer.appendChild(cartItem);

            // Подсчет общей суммы
            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = total;

        // Кнопки увеличения и уменьшения количества товара
        const increaseButtons = document.querySelectorAll('.increase-quantity');
        const decreaseButtons = document.querySelectorAll('.decrease-quantity');
        const removeButtons = document.querySelectorAll('.remove-item');

        increaseButtons.forEach(button => {
            button.addEventListener('click', changeQuantity);
        });
        decreaseButtons.forEach(button => {
            button.addEventListener('click', changeQuantity);
        });
        removeButtons.forEach(button => {
            button.addEventListener('click', removeFromCart);
        });
    }

    // Функция изменения количества товара
    function changeQuantity(event) {
        const button = event.target;
        const productId = button.getAttribute('data-id');
        const isIncrease = button.classList.contains('increase-quantity');

        // Обновляем количество товара
        cart = cart.map(item => {
            if (item.id === productId) {
                item.quantity = isIncrease ? item.quantity + 1 : item.quantity - 1;
                if (item.quantity < 1) {
                    item.quantity = 1;
                }
            }
            return item;
        });

        // Сохраняем обновленную корзину и перезагружаем страницу
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.reload();
    }

    // Функция удаления товара из корзины
    function removeFromCart(event) {
        const button = event.target;
        const productId = button.getAttribute('data-id');

        // Обновляем корзину
        cart = cart.filter(item => item.id !== productId);

        // Сохраняем обновленную корзину и перезагружаем страницу
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.reload();
    }
});


// Кнопка для оформления заказа
const checkoutButton = document.getElementById('checkout-button');
const checkoutModal = document.getElementById('checkout-modal');
const closeModal = document.querySelector('.close');

checkoutButton.addEventListener('click', function () {
    checkoutModal.style.display = 'flex';
});

closeModal.addEventListener('click', function () {
    checkoutModal.style.display = 'none';
});

window.addEventListener('click', function (event) {
    if (event.target === checkoutModal) {
        checkoutModal.style.display = 'none';
    }
});
