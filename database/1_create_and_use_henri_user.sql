SET GLOBAL validate_password_policy=LOW;

GRANT ALL PRIVILEGES ON *.* TO 'henri'@'localhost' IDENTIFIED BY 'password';

FLUSH PRIVILEGES;

SYSTEM mysql -u henri -p;

