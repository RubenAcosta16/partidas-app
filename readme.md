# Sistema de Generación de Reportes de Avance de Obra — EPNET

Aplicación web diseñada para automatizar y optimizar la elaboración de reportes de avance de obra con evidencia fotográfica para la empresa **EPNET**.

---

## ¿Por qué existe este proyecto?

El proceso manual para generar partidas y reportes de avance fotográfico tomaba aproximadamente **30 minutos por reporte**. 

Con esta herramienta, el tiempo de elaboración se reduce a **2 minutos o menos**, automatizando la consolidación de detalles del proyecto y el procesamiento de imágenes para generar documentos listos para su presentación.


### Estado Actual

solo es una version funcional para ahorrar tiempo, aunque no se le dio desarrollo por pausa de la empresa

---

## Tecnologías y Arquitectura

El proyecto se compone de un cliente web y un servidor de API REST:

- **Frontend:** Construido con **React** para la interfaz de usuario.
- **Backend:** Desarrollado con **Node.js** y **Express.js**.
- **Gestor de paquetes:** `pnpm` en monorepo / subcarpetas.

---

## Configuración y Ejecución
---

### Puesta en Marcha

Se deben ejecutar ambos proyectos simultáneamente. Abre **dos terminales** independientes:

#### Terminal 1: Backend
```bash
cd backend
pnpm install
pnpm run dev
```

#### Terminal 2: Frontend
```bash
cd frontend
pnpm install
pnpm run dev
```