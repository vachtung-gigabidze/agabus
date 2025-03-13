// config/database.js
module.exports = {
    dialect: 'mssql', // Указываем, что используем MSSQL
    host: 'localhost', // Хост базы данных
    port: 1433, // Порт по умолчанию для MSSQL
    username: 'your_username', // Имя пользователя
    password: 'your_password', // Пароль
    database: 'your_database_name', // Название базы данных
    dialectOptions: {
      options: {
        encrypt: true, // Использовать шифрование (например, для Azure)
      },
    },
  };