document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById('product-list');
    
    // Загружаем XML файл с товарами
    fetch('data/products.xml')
        .then(response => response.text())
        .then(xmlText => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "application/xml");

            const products = xmlDoc.getElementsByTagName('product');
            Array.from(products).forEach(product => {
                const id = product.getElementsByTagName('id')[0].textContent;
                const name = product.getElementsByTagName('name')[0].textContent;
                const description = product.getElementsByTagName('description')[0].textContent;
                const price = product.getElementsByTagName('price')[0].textContent;
                const image = product.getElementsByTagName('image')[0].textContent;

                // Создаем HTML для карточки товара
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                <a href="product.html?id=${id}">
                    <img src="${image}" alt="${name}">
                    <h3>${name}</h3>
                    <p>${description}</p>
                    <p>Цена: ${price} руб.</p>
                </a>
                <button class="add-to-cart" data-id="${id}" data-name="${name}" data-price="${price}" data-image="${image}">Купить</button>
            `;
            
                productList.appendChild(productCard);
            });

            // Добавление товара в корзину при клике
            const addToCartButtons = document.querySelectorAll('.add-to-cart');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', addToCart);
            });
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

        // Проверка, есть ли уже товар в корзине
        const productExists = cart.find(product => product.id === productId);
        if (productExists) {
            productExists.quantity += 1;
        } else {
            // Если товар не найден в корзине, добавляем его
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

