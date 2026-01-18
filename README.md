# 📸 CloudGallery

Aplicação **Fullstack** para gerenciamento de álbuns e fotos, desenvolvida como parte de um teste técnico, com foco em **arquitetura limpa, autenticação, upload de arquivos e experiência do usuário**.

---

## 🚀 Visão Geral

O **CloudGallery** permite que usuários autenticados:

- Criem álbuns
- Enviem fotos para cada álbum
- Visualizem fotos em **miniaturas ou tabela**
- Ampliem fotos em um dialog
- Excluam fotos com confirmação
- Gerenciem seus próprios conteúdos com segurança

A aplicação foi construída utilizando **React + Chakra UI (v3)** no frontend e **Node.js + Express + MySQL** no backend.

---

## 🧱 Tecnologias Utilizadas

### Frontend
- React
- Vite
- Chakra UI v3
- React Router DOM
- Axios
- Context API (AuthContext)

### Backend
- Node.js
- Express
- MySQL
- Multer (upload de arquivos)
- JWT (autenticação)
- Cors

---

## 🔐 Autenticação

- Login e registro de usuários
- Autenticação via **JWT**
- Token armazenado no `localStorage`
- Interceptor Axios para envio automático do token
- Rotas protegidas por middleware no backend

---

## 📂 Funcionalidades Implementadas

### 🗂 Álbuns
- Criar álbum
- Listar álbuns do usuário
- Editar álbum
- Excluir álbum

### 🖼 Fotos
- Upload de fotos por álbum
- Listagem de fotos do álbum
- Visualização em **Grid (miniaturas)**
- Visualização em **Tabela**
- Foto ampliada em dialog
- Exclusão de foto com confirmação

---

## 🖥 Telas da Aplicação

- Tela de Login
- Tela de Registro
- Lista de Álbuns
- Detalhes do Álbum
  - Miniaturas
  - Tabela
  - Upload de Foto
  - Foto Ampliada
  - Exclusão de Foto

---

## 📡 Estrutura de Rotas (Backend)

### Auth
- POST /auth/register
- POST /auth/login
- GET /auth/me


### Álbuns
- POST /albums
- GET /albums
- PUT /albums/:id
- DELETE /albums/:id

### Fotos
- GET /photos/:albumId
- POST /photos/:albumId
- DELETE /photos/:id

---

## 📁 Upload de Imagens

- Upload realizado via **Multer**
- Imagens armazenadas localmente
- Pasta `/uploads` exposta como recurso estático
- Apenas o **nome do arquivo** é utilizado para renderização no frontend

- Exemplo: http://localhost:3333/uploads/nome-da-imagem.jpg

---

## 🧩 Arquitetura

- Separação clara entre:
  - Controllers
  - Routes
  - Middlewares
  - Config
- Frontend desacoplado do backend
- Requisições centralizadas em `src/api/api.js`
- Contexto global para autenticação

---

## ▶️ Como Executar o Projeto

### Backend

- cd backend
- npm install
- npm run dev
- Servidor disponível em: http://localhost:3333

### Frontend
- cd frontend
- npm install
- npm run dev
- Aplicação disponível em: http://localhost:5173

### 🧪 Status do Projeto
- Funcional

- Estável

- Fluxos principais completos

- Melhorias de UI/UX planejadas

# 🎯 Próximos Passos

- Ajustes visuais (UI polish)
- Responsividade avançada
- Feedbacks visuais (toasts)
- Melhor organização de layout
- Permissões mais granulares

#👨‍💻 Autor
- Marcelino Albuquerque
- Desenvolvedor Fullstack
- Foco em Node.js, React e Cloud (AWS)



