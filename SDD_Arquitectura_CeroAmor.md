# DOCUMENTO DE DISEÑO DE SOFTWARE (SDD)
**Proyecto:** Aplicación NICÓMACO - Cero Amor vs Amor Ágape
**Fase:** Producto Mínimo Viable (MVP)
**Pila Tecnológica (Tech Stack):** 
* **Frontend Web (Prototipo/Workspace):** React (Vite, TypeScript, Tailwind CSS v4, Motion)
* **Frontend Mobile (SDK):** Flutter (Google SDK, Dart)
* **Backend as a Service (BaaS):** Firebase (Auth, Firestore, Cloud Functions)
**Fecha:** Junio 2026

---

## 1. ARQUITECTURA DEL SISTEMA (ALTO NIVEL)
El prototipo web utiliza una arquitectura modular SPA en React para proporcionar dos componentes clave en una misma pantalla dividida:
1.  **Simulador Clínico:** Un simulador de dispositivo móvil que ejecuta la lógica y la interfaz de usuario fieles a la aplicación nativa de Flutter.
2.  **Consola de Desarrollo y Specs:** Pestañas interactivas que muestran las especificaciones del modelo, el código fuente autónomo en Dart/Flutter (`main.dart`) listo para compilar, y una consola de control de QA para simular caminos clínicos automáticamente.

---

## 2. ESQUEMA DE BASE DE DATOS (CLOUD FIRESTORE)
Dado que usaremos Firestore (NoSQL), la información se estructurará en Colecciones y Documentos.

### Colección: `users` (Usuarios)
Almacena el perfil básico y el estado general del paciente.
```json
{
  "uid": "string (Firebase Auth ID)",
  "email": "string",
  "name": "string",
  "created_at": "timestamp",
  "last_assessment_date": "timestamp",
  "current_risk_zone": "string (Verde | Amarilla | Roja | Crítica)",
  "agreed_to_terms": "boolean (true)",
  "scaled_score": "number (0 - 186)"
}
```

---

## 3. ARQUITECTURA DEL CLIENTE REACT
La aplicación web está estructurada como un cliente SPA autónomo estructurado en:
*   `src/main.tsx`: Punto de entrada de la aplicación.
*   `src/App.tsx`: Contiene toda la lógica de control, el estado local (`currentScreen`, `answers`, `isDarkMode`, `activeWorkspaceTab`), el renderizado condicional de pantallas (Splash, Onboarding, Consent, Survey, Results, SOS) y el visor de código de Flutter.
*   `src/data.ts`: Define las preguntas (`SURVEY_QUESTIONS`), zonas de riesgo (`SCORE_ZONES`) y ejercicios (`EMOTIONAL_EXERCISES`).
*   `src/flutter_code.ts`: Exporta la cadena del código fuente Dart independiente (`FLUTTER_CODE_PROTOTYPE`).

### 3.1. Algoritmo del Motor de Encuestas Adaptativas
El motor ajusta el flujo de preguntas dinámicamente según las respuestas acumuladas utilizando la siguiente fórmula lógica en `App.tsx`:

1.  Se define el subconjunto base del Dominio 1: $B = \{q \in \text{SURVEY\_QUESTIONS} \mid q.\text{dominio} = 1\}[0..9]$ (preguntas Q01 a Q10).
2.  Se monitorean las respuestas en tiempo real en un mapa de clave-valor $\text{answers} : \text{id} \to \text{puntaje}$.
3.  Una vez respondido todo el conjunto $B$:
    $$\text{baseScore} = \sum_{q \in B} \text{answers}[q.\text{id}]$$
    *   Si $\text{baseScore} < 3$: Se determina baja gravedad. Se saltan las preguntas Q11-Q22 de Dominio 1 y todo el Dominio 2 (Q23-Q42). Se retorna el conjunto dinámico de preguntas activas:
        $$\text{activeQuestions} = B \cup \{q \in \text{SURVEY\_QUESTIONS} \mid q.\text{dominio} = 3\}$$
    *   Si $\text{baseScore} \ge 3$: Se habilita el test completo para profundizar en conductas autoviolentas:
        $$\text{activeQuestions} = \text{SURVEY\_QUESTIONS}$$

### 3.2. Reglas del Protocolo SOS (Emergencias)
El sistema ejecuta una validación de seguridad en cada acción de respuesta:
*   **Regla de Reactivo Crítico:** Si el usuario selecciona una respuesta con valor $\ge 2$ ("Frecuentemente" o "Siempre") en cualquier reactivo que pertenezca al **Dominio 3** (ej. Q55, Q56, Q59, Q60, Q61, Q62):
    1.  Se activa el estado crítico.
    2.  Se detiene inmediatamente el cuestionario.
    3.  Se transiciona la pantalla al estado `sos` bloqueando cualquier otra navegación.
    4.  Se despliegan los contactos de emergencia oficiales (SAPTEL y Línea de la Vida).