# 🔐 MFA-AUTH-APP

Aplicación web con autenticación multifactor (MFA) utilizando Google Authenticator o Microsoft Authenticator.  
Segura, sencilla y con diseño moderno. Ideal como ejemplo práctico de protección con doble factor de autenticación.

---

## 🚀 Características principales

- Registro y login de usuarios con correo electrónico y contraseña.
- Generación de código QR para configurar MFA con aplicaciones autenticadoras.
- Verificación de códigos TOTP generados por Google Authenticator o Microsoft Authenticator.
- Interfaz responsiva y amigable con Bootstrap.
- Base de datos local utilizando SQLite.
- Backend seguro con Express y manejo de contraseñas mediante Bcrypt.

---

## 🧰 Tecnologías utilizadas

| Categoría     | Herramientas                      |
|---------------|-----------------------------------|
| Lenguaje      | Node.js (JavaScript)              |
| Framework     | Express                           |
| Autenticación | `speakeasy`, `bcryptjs`           |
| Base de datos | SQLite (`sqlite3`)                |
| Frontend      | EJS + Bootstrap                   |
| Utilidades    | `qrcode`, `body-parser`, `path`   |

---

## 📦 Instalación y ejecución

1. Clona el repositorio:

```bash
git clone https://github.com/tuusuario/MFA-AUTH-APP.git
cd MFA-AUTH-APP

````

2. Instala las dependencias:

```bash
npm install
```

3. Ejecuta el servidor:

```bash
node server.js
```

---

## 🧪 ¿Cómo probar la aplicación?

1. Abre [http://localhost:3000/register](http://localhost:3000/register) en tu navegador.
2. Registra un nuevo usuario con correo electrónico y contraseña.
3. Escanea el código QR que aparece usando Google Authenticator o Microsoft Authenticator.
4. Ingresa el código TOTP generado por la app.
5. ¡Listo! Si el código es correcto, accederás al dashboard protegido.

---

## 📁 Estructura de carpetas

```
MFA-AUTH-APP/
├── node_modules/
├── public/
│   └── style.css
├── views/
│   ├── dashboard.ejs
│   ├── login.ejs
│   ├── register.ejs
│   └── verify.ejs
├── package.json
├── package-lock.json
└── server.js
```

---

## ✅ Requisitos

* Tener Node.js instalado
* (Opcional) SQLite para visualizar el archivo `.db`
* Navegador web actualizado
* Aplicación Google Authenticator o Microsoft Authenticator en tu celular

---

