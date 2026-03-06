function Menu() {
    const burgerIcon = document.querySelector('.burger-icon');
    const menuPanel = document.querySelector('.menu-panel');

    // Переключение класса "active" для отображения/скрытия меню
    menuPanel.classList.toggle('active');
    burgerIcon.classList.toggle('active');
}

const files = [
    { name: "главная.html", displayName: "Главная страница" },
    { name: "English.html", displayName: "Англиский язык" },
    { name: "gamma.txt", displayName: "Документ Gamma" },
    { name: "delta.txt", displayName: "Документ Delta" },
    { name: "epsilon.txt", displayName: "Документ Epsilon" },
    { name: "о_нас.txt", displayName: "О нас" },
    { name: "контакты.doc", displayName: "Контакты" },
    { name: "Ма́лый бараба́н.html", displayName: "Малый барабан" },
    { name: "Малый Том.html", displayName: "Малый Том" },
    { name: "Грегор А. Грегориус.html", displayName: "Грегор А. Грегориус" },
];

function searchFiles(event) {
    const query = document.getElementById('search').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('search-results');

    // Если поле ввода пустое, очищаем результаты и выходим
    if (query === "") {
        resultsContainer.innerHTML = ""; // Очищаем контейнер
        return;
    }

    // Фильтруем файлы по введенному тексту
    const results = files
        .filter(file => file.displayName.toLowerCase().includes(query)) // Проверяем, содержит ли имя файла введенный текст
        .sort((a, b) => a.displayName.localeCompare(b.displayName)); // Сортируем результаты по алфавиту

    displayResults(results);
}

function displayResults(results) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; // Очищаем предыдущие результаты

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>Ничего не найдено</p>';
        return;
    }

    const ul = document.createElement('ul');
    results.forEach(file => {
        const li = document.createElement('li');
        const link = document.createElement('a');

        // Проверяем, является ли файл внешней ссылкой (например, YouTube)
        if (file.name.startsWith("http")) {
            link.href = file.name; // Устанавливаем внешний URL
            link.target = "_blank"; // Открываем в новой вкладке
        } else if (file.name) {
            link.href = `./${file.name}`; // Устанавливаем относительный путь к файлу
        } else {
            link.href = "#"; // Если имя файла пустое, ссылка неактивна
        }

        link.textContent = file.displayName; // Отображаем пользовательское имя
        li.appendChild(link);
        ul.appendChild(li);
    });

    resultsContainer.appendChild(ul);
}

// Добавляем обработчик ввода текста в поле поиска
document.getElementById('search').addEventListener('input', searchFiles);

// Добавляем обработчик ввода текста в поле поиска
document.getElementById('search').addEventListener('input', searchFiles);

// Первоначально отображаем все файлы
let currentArticle = null; // Хранит текущую статью для редактирования

function createArticle() {
    const articleName = prompt("Введите название новой статьи:");
    if (articleName) {
        currentArticle = { name: articleName, content: "" }; // Создаем новую статью
        openModal("Создание статьи", ""); // Открываем модальное окно для ввода текста
    }
}

function editArticle() {
    const articleName = prompt("Введите название статьи для редактирования:");
    if (articleName) {
        // Здесь можно добавить проверку, существует ли статья
        currentArticle = { name: articleName, content: "Текущий текст статьи..." }; // Загружаем статью
        openModal(`Редактирование статьи: ${articleName}`, currentArticle.content);
    }
}

function openModal(title, content) {
    document.getElementById("modal-title").textContent = title;
    document.getElementById("article-content").value = content;
    document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("modal").classList.add("hidden");
}

function saveArticle() {
    const content = document.getElementById("article-content").value;
    currentArticle.content = content; // Сохраняем текст статьи
    alert(`Статья "${currentArticle.name}" сохранена!`);
    closeModal();
}