# DOCUMENTO DE REQUERIMIENTOS DE PRODUCTO (PRD)
**Proyecto:** Aplicación NICÓMACO - Cero Amor vs Amor Ágape
**Fase:** Producto Mínimo Viable (MVP)
**Fecha:** Junio 2026

---

## 1. PERFILES DE USUARIO (USER PERSONAS)
Para el MVP, la aplicación está diseñada para atender a dos perfiles principales:

1.  **Usuario Preventivo (Zona Verde / Amarilla):** Persona que busca mejorar su amor propio. Experimenta dudas o estrés, pero no está en riesgo. Busca herramientas como el "Diálogo Interno Consciente" o ejercicios del modelo Amor Ágape.
2.  **Usuario en Crisis (Zona Roja / Crítica):** Persona que ejerce altos niveles de autoviolencia (física o emocional severa). Necesita que la aplicación sea extremadamente fácil de usar, no lo abrume con preguntas y le ofrezca ayuda inmediata y contención (Protocolo SOS).

---

## 2. HISTORIAS DE USUARIO Y CASOS DE USO (CORE)

A continuación, se detallan las funcionalidades que **deben** construirse, redactadas desde la perspectiva del usuario.

### Épica 1: Onboarding y Consentimiento Ético
* **Historia de Usuario (HU-1.1):** *Como* nuevo usuario, *quiero* crear una cuenta segura usando mi correo electrónico (Firebase Auth) *para* guardar mi progreso de forma privada.
* **Historia de Usuario (HU-1.2):** *Como* usuario, *quiero* leer y aceptar un aviso de privacidad y un descargo de responsabilidad clínico antes de empezar, *para* entender que la app no sustituye la terapia profesional.

### Épica 2: Evaluación Diagnóstica (El Autoviolentómetro)
* **Historia de Usuario (HU-2.1 - Flujo Adaptativo):** *Como* nuevo usuario, *quiero* responder el cuestionario en bloques pequeños y dinámicos, *para* no abrumarme si son demasiadas preguntas (Implementación de la Matriz del Paso 3).
    * **Criterio de Aceptación:** *Dado que* el usuario obtiene un puntaje < 3 en la suma de las preguntas base del Dominio 1 (Q01-Q10), *cuando* presiona "Siguiente" en Q10, *entonces* el sistema debe saltar el resto del Dominio 1 (Q11-Q22) y todo el Dominio 2 (Q23-Q42), pasando directamente al Dominio 3 de descarte de riesgo vital.
* **Historia de Usuario (HU-2.2 - Interfaz de Preguntas):** *Como* usuario, *quiero* ver una pregunta a la vez con opciones claras (Nunca, Rara vez, Frecuentemente, Siempre) y una barra de progreso, *para* saber cuánto me falta.

### Épica 3: Resultados y Retroalimentación (Transición al Amor Ágape)
* **Historia de Usuario (HU-3.1 - Motor de Scoring):** *Como* usuario, *quiero* recibir un diagnóstico claro (Verde, Amarillo, Rojo, Crítico) basado en mis respuestas, *para* entender mi nivel exacto de "Cero Amor".
    * **Criterio de Aceptación:** El diagnóstico calcula el puntaje final escalado en un rango máximo de 186 puntos (62 preguntas con puntuación de 0 a 3).
* **Historia de Usuario (HU-3.2 - Sugerencias Clínicas):** *Como* usuario en Zona Amarilla, *quiero* recibir sugerencias y ejercicios basados en las 6 herramientas de autocuidado del modelo (Diario de Autoobservación, Minutos de Compasión, Diálogo Interno Consciente, Red de Apoyo, Autocuidado Físico y Límites Saludables), *para* comenzar a trabajar en mi amor propio.
* **Historia de Usuario (HU-3.3 - Canalización NICÓMACO):** *Como* usuario en Zona Roja, *quiero* ver un botón directo de WhatsApp o formulario *para* agendar una cita con un terapeuta especializado de la Clínica NICÓMACO.

### Épica 4: Manejo de Emergencias (Protocolo Crítico)
* **Historia de Usuario (HU-4.1 - Alerta SOS):** *Como* usuario en riesgo vital (selecciona "Frecuentemente" [2] o "Siempre" [3] en cualquier reactivo crítico del Dominio 3 como Q55, Q59 o Q61), *quiero* que la aplicación detenga la encuesta y me muestre inmediatamente botones de llamada a SAPTEL y Línea de la Vida, *para* recibir contención en tiempo real.
    * **Criterio de Aceptación:** *Dado que* la variable `is_critical_risk = true`, *cuando* se actualiza el estado, *entonces* la pantalla se bloquea en modo SOS (Fondo de alto contraste, tipografía grande, botones de marcado rápido para SAPTEL: 55 5259 8121 y Línea de la Vida: 800 911 2000).

---

## 3. REQUERIMIENTOS DE INTERFAZ Y EXPERIENCIA DE USUARIO (UI/UX)
La aplicación debe adherirse estrictamente al **Brandbook de la Clínica NICÓMACO**.

* **Tipografía:** `Playfair Display` para títulos (brinda elegancia y profesionalismo clínico) e `Inter` para cuerpos de texto e instrucciones (brinda legibilidad moderna).
* **Paleta de Colores (Mapeo Funcional):**
    * *Fondo Principal y Textos:* `Snow White` (#F8F8FF) y `Jet Black` (#07070F).
    * *Botones Primarios y Zonas de Transición (Amor Ágape):* `Electric Indigo` (#7C3AED) y `Lavender Blue` (#C4B5FD).
    * *Resultados Positivos (Zona Verde):* `Jade Green` (#059669).
    * *Resultados de Alerta (Zona Roja/SOS):* Tono Carmesí / Coral oscuro de alto contraste y animaciones pulsantes.
* **Tono de Voz:** Empático, clínico, cálido, no sentencioso. (Ejemplo: En lugar de "Estás muy mal", usar "Hemos detectado niveles altos de autoviolencia; mereces un trato mejor, permítenos ayudarte").

---

## 4. REQUERIMIENTOS NO FUNCIONALES
* **Privacidad (Compliance):** Ningún dato de la evaluación debe guardarse localmente en el teléfono sin encriptar. Todos los datos sensibles deben viajar mediante HTTPS hacia Firestore.
* **Rendimiento:** Las transiciones entre preguntas del Autoviolentómetro deben ocurrir en menos de 500ms para mantener la fluidez y evitar la frustración del paciente.
* **Disponibilidad Offline:** El test debe poder descargarse temporalmente en caché para que, si el usuario pierde conexión a internet a mitad de la prueba, no pierda su progreso.