document.addEventListener("DOMContentLoaded", () => {
    // Загружаем sidebar
    fetch("./layouts/sidebar.html")
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
                            loadContent("./pages/dashboard.html");
                            break;
                        case "Клиенты":
                            loadContent("./pages/customers.html");
                            break;
                        case "Договоры":
                            loadContent("./pages/contracts.html");
                            break;
                        case "Товары":
                            loadContent("./pages/products.html");
                            break;
                        case "Платежи":
                            loadContent("./pages/payments.html");
                            break;
                        case "Отчёты":
                            loadContent("./pages/reports.html");
                            break;
                        case "Пользователи":
                            loadContent("./pages/users.html");
                            break;
                        case "Настройки":
                            loadContent("./pages/settings.html");
                            break;
                    }
                });
            });

            // при первой загрузке → показать Дашборд
            loadContent("./pages/dashboard.html");

            // сразу выделить Дашборд активным
            const dashboardLink = Array.from(document.querySelectorAll("#sidebar a"))
                .find(link => link.innerText.trim() === "Дашборд");
            if (dashboardLink) {
                dashboardLink.classList.add("active");
            }
        });

    // Загружаем header
    fetch("./layouts/header.html")
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
