# 🚧 Projeto em desenvolvimento

Este repositório está sendo construído como parte de um processo seletivo.  
A documentação será atualizada conforme a evolução do projeto.

---

## 📄 Especificação do Projeto (YAML)

```yaml
project:
  name: "CloudGallery"

objective: >
  Desenvolver uma aplicação web fullstack para gerenciamento de álbuns de fotos,
  permitindo que usuários se cadastrem, autentiquem-se e organizem suas imagens
  em álbuns, com upload, visualização e gerenciamento de fotos, seguindo boas
  práticas de arquitetura, segurança e organização de código.

stack:
  backend:
    - Node.js
    - Express
    - MySQL
    - JWT
    - Bcrypt
    - Multer
    - dotenv
    - CORS
  tools:
    - Nodemon
    - Git
    - GitHub

status: "🛠 Em desenvolvimento"

run_local:
  backend:
    steps:
      - name: "Inicialização do projeto"
        commands:
          - mkdir cloudgallery-backend
          - cd cloudgallery-backend
          - npm init -y

      - name: "Instalação das dependências"
        commands:
          - npm install express cors dotenv jsonwebtoken bcrypt mysql2 multer
          - npm install nodemon --save-dev

      - name: "Scripts do package.json"
        scripts:
          dev: "nodemon src/server.js"
          start: "node src/server.js"

      - name: "Executar aplicação"
        commands:
          - npm run dev

    notes: >
      É necessário configurar o arquivo .env com as variáveis de ambiente
      do banco de dados MySQL e JWT.

folder_structure:
  cloudgallery-backend:
    src:
      config:
        - database.js
        - auth.js
      controllers:
        - authController.js
        - albumController.js
        - photoController.js
      middlewares:
        - authMiddleware.js
      routes:
        - auth.routes.js
        - album.routes.js
        - photo.routes.js
      uploads: []
      files:
        - app.js
        - server.js
    root:
      - .env
      - .gitignore
      - package.json
      - README.md

roadmap:
  - "[x] Inicialização do projeto backend"
  - "[x] Estrutura base de pastas"
  - "[x] Configuração do banco de dados MySQL"
  - "[x] Autenticação de usuários"
  - "[x] CRUD de álbuns"
  - "[ ] Upload e gerenciamento de fotos"
  - "[ ] Visualização das fotos"
  - "[ ] Integração com frontend (React)"
  - "[ ] Melhorias de segurança"
  - "[ ] Deploy em cloud"

author:
  github: https://github.com/Marcelino85
  linkedin: https://www.linkedin.com/in/marcelino-albuquerque-developer


