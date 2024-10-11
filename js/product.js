document.addEventListener("DOMContentLoaded", function () {
    const productDetailContainer = document.getElementById('product-detail');

    // Получаем id продукта из URL параметров
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Проверяем, передан ли параметр id
    if (!productId) {
        productDetailContainer.innerHTML = '<p>Товар не найден.</p>';
        return;
    }

    // Загружаем XML файл с товарами
    fetch('data/products.xml')
        .then(response => response.text())
        .then(xmlText => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "application/xml");

            // Находим товар по id
            const product = Array.from(xmlDoc.getElementsByTagName('product'))
                                .find(product => product.getElementsByTagName('id')[0].textContent === productId);

            // Если товар найден
            if (product) {
                const name = product.getElementsByTagName('name')[0].textContent;
                const description = product.getElementsByTagName('description')[0].textContent;
                const price = product.getElementsByTagName('price')[0].textContent;
                const image = product.getElementsByTagName('image')[0].textContent;

                // Отображаем структурированную информацию о товаре
                productDetailContainer.innerHTML = `
                    <div class="product-image">
                        <img src="${image}" alt="${name}">
                    </div>
                    <div class="product-info">
                        <h2>${name}</h2>
                        <p>${description}</p>
                        <p class="price">Цена: ${price} руб.</p>
                        <button class="add-to-cart" data-id="${productId}" data-name="${name}" data-price="${price}" data-image="${image}">Купить</button>
                    </div>
                `;

                // Добавляем товар в корзину
                const addToCartButton = document.querySelector('.add-to-cart');
                addToCartButton.addEventListener('click', addToCart);
            } else {
                productDetailContainer.innerHTML = '<p>Товар не найден.</p>';
            }
        })
        .catch(error => console.error('Ошибка загрузки XML:', error));

    // Функция добавления товара в корзину
    function addToCart(event) {
        const button = event.target;
        const productId = button.getAttribute('data-id');
        const productName = button.getAttribute('data-name');
        const productPrice = button.getAttribute('data-price');
        const productImage = button.getAttribute('data-image');

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Проверяем, есть ли товар в корзине
        const productExists = cart.find(product => product.id === productId);
        if (productExists) {
            productExists.quantity += 1;
        } else {
            // Если товара нет в корзине, добавляем его
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
        }

        // Сохраняем корзину в LocalStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        alert(`${productName} добавлен в корзину!`);
    }
});
