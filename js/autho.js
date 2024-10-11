// Переключение между формами регистрации и авторизации
document.getElementById('showLogin').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelectorAll('.form-box')[0].classList.add('hidden');
    document.querySelectorAll('.form-box')[1].classList.remove('hidden');
});

document.getElementById('showRegister').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelectorAll('.form-box')[1].classList.add('hidden');
    document.querySelectorAll('.form-box')[0].classList.remove('hidden');
});

// Обработка формы регистрации
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    // Здесь можно добавить логику для регистрации пользователя (например, отправка данных на сервер)
    console.log('Регистрация:', email, password);
    alert('Регистрация успешна!');
});

// Обработка формы авторизации
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Здесь можно добавить логику для авторизации пользователя (например, проверка данных на сервере)
    console.log('Авторизация:', email, password);
    alert('Авторизация успешна!');
});
