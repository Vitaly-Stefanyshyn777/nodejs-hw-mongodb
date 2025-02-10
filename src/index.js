// import { setupServer } from "./server.js";
// import { initMongoConnection } from "./db/initMongoConnection.js";

// const bootstrap = async () => {
//   await initMongoConnection();
//   setupServer();
// };

// bootstrap();
import { setupServer } from "./server.js";
import { initMongoConnection } from "./db/initMongoConnection.js";

const bootstrap = async () => {
  try {
    console.log("⏳ Ініціалізація підключення до MongoDB...");
    await initMongoConnection();
    console.log("✅ Підключення до MongoDB встановлено!");

    console.log("⏳ Запуск сервера...");
    const app = setupServer();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`✅ Сервер успішно запущено на порту ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Помилка при запуску сервера:", error);
    process.exit(1); // Завершує процес з кодом помилки
  }
};

bootstrap();
