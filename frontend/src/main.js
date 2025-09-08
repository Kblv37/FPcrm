document.addEventListener("DOMContentLoaded", () => {
    // Загружаем sidebar
    fetch("src/layouts/sidebar.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("sidebar").innerHTML = data;

            // Навешиваем обработчики кликов на пункты меню
            document.querySelectorAll("#sidebar a").forEach(link => {
                link.addEventListener("click", function (e) {
                    e.preventDefault();

                    // убираем старый active
                    document.querySelectorAll("#sidebar a").forEach(l => l.classList.remove("active"));
                    this.classList.add("active");

                    const sectionName = this.innerText.trim();

                    // Загружаем контент по разделу
                    switch (sectionName) {
                        case "Дашборд":
                            loadContent("src/pages/dashboard.html");
                            break;
                        case "Клиенты":
                            loadContent("src/pages/customers.html");
                            break;
                        case "Договоры":
                            loadContent("src/pages/contracts.html");
                            break;
                        case "Товары":
                            loadContent("src/pages/products.html");
                            break;
                        case "Платежи":
                            loadContent("src/pages/payments.html");
                            break;
                        case "Отчёты":
                            loadContent("src/pages/reports.html");
                            break;
                        case "Пользователи":
                            loadContent("src/pages/users.html");
                            break;
                        case "Настройки":
                            loadContent("src/pages/settings.html");
                            break;
                    }
                });
            });

            // при первой загрузке → показать Дашборд
            loadContent("src/pages/dashboard.html");

            // сразу выделить Дашборд активным
            const dashboardLink = Array.from(document.querySelectorAll("#sidebar a"))
                .find(link => link.innerText.trim() === "Дашборд");
            if (dashboardLink) {
                dashboardLink.classList.add("active");
            }
        });

    // Загружаем header
    fetch("src/layouts/header.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;
        });

    // Функция подгрузки разделов
    function loadContent(path) {
        fetch(path)
            .then(res => {
                if (!res.ok) throw new Error(`Ошибка загрузки: ${path}`);
                return res.text();
            })
            .then(html => {
                document.getElementById("maincont").innerHTML = html;
            })
            .catch(err => {
                document.getElementById("maincont").innerHTML =
                    `<p style="color:red;">${err.message}</p>`;
            });
    }
});
