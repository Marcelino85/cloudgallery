1️⃣ Inicialização do projeto
    📌 Comandos iniciais

        mkdir cloudgallery-backend
        cd cloudgallery-backend
        npm init -y

    📦 Instalar dependências

        npm install express cors dotenv jsonwebtoken bcrypt pg multer
        npm install nodemon --save-dev

2️⃣ package.json (scripts)

    "scripts": {
        "dev": "nodemon src/server.js",
        "start": "node src/server.js"
    }
