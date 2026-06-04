# Portfolio — Orlando Arambulo Diaz

Portfolio personal desarrollado con React, TypeScript y Tailwind CSS, con temática galaxia oscura y animaciones de asteroides.

## 🚀 Tecnologías

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- EmailJS (formulario de contacto)
- i18next (multi-idioma: ES / EN / DE)

## 🌟 Características

- **Fondo galaxia** interactivo con estrellas que responden al cursor y scroll
- **Animación de asteroides** 3D que vuelan por skills y explotan al impactar en sus tarjetas
- **Proyectos sincronizados** con GitHub API en tiempo real
- **Selector de idioma** con traducción completa (español, inglés, alemán)
- **Selector de CV** por idioma
- **Formulario de contacto** funcional con EmailJS
- Tema oscuro con acento rojo (`#ff4d4d`) y tipografía JetBrains Mono

## 📦 Instalación

```bash
npm install
npm run dev
```

## 🌐 Variables de entorno

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## 🏗️ Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run preview` | Previsualiza el build |

## 🌍 Despliegue

Autodeploy con Vercel desde GitHub. Cada push a `main` se despliega automáticamente en:
`https://orlaa24addev.vercel.app`
