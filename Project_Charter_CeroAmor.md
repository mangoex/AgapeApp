# DOCUMENTO DE CONSTITUCIÓN DEL PROYECTO (PROJECT CHARTER)
**Proyecto:** Aplicación NICÓMACO - Cero Amor vs Amor Ágape (CERO AMOR Autoviolentómetro ® Reg. No. 03-2025-101713061400-01, AMORÁGAPE Reg. No. 03-2025-032611401300-01)
**Fase de Desarrollo:** MVP (Producto Mínimo Viable)
**Autor del Modelo Clínico:** Blanca Estela Angulo López
**Fecha:** Junio 2026

---

## 1. PROPÓSITO DEL PROYECTO
Desarrollar una aplicación móvil y web profesional basada en el modelo "Cero Amor vs Amor Ágape" de Blanca Estela Angulo López, diseñada para evaluar, concientizar y guiar a los usuarios en la transición de conductas de autoviolencia hacia prácticas de amor propio incondicional (Amor Ágape). La aplicación digitalizará el Autoviolentómetro mediante una encuesta psicométrica adaptativa y proveerá retroalimentación clínica estructurada.

## 2. OBJETIVOS Y MÉTRICAS DE ÉXITO (KPIs)

### Objetivos de Negocio y Clínicos:
* **Accesibilidad:** Llevar la herramienta del Autoviolentómetro a un público masivo mediante una plataforma digital intuitiva.
* **Diagnóstico Preciso:** Automatizar la calificación de la escala de autoviolencia (0-30) con un margen de error mínimo, utilizando flujos adaptativos.
* **Canalización:** Aumentar el índice de pacientes en "Zona Roja" que solicitan ayuda profesional en la Clínica NICÓMACO.

### KPIs (Indicadores Clave de Rendimiento) para el MVP:
* **Tasa de Finalización (Completion Rate):** > 80% de los usuarios que inician la encuesta la terminan (validando que el flujo adaptativo evita la fatiga).
* **Tasa de Conversión (Conversion Rate):** > 15% de usuarios diagnosticados en zonas de riesgo solicitan contacto o información sobre los programas de la clínica.
* **Engagement (Retención):** Número de usuarios que regresan a la app para utilizar los módulos de "Amor Ágape" tras recibir su diagnóstico.

---

## 3. ALCANCE DEL PROYECTO (SCOPE)

### 3.1. Lo que la aplicación SÍ HARÁ (In-Scope):
1.  **Registro y Perfil de Usuario:** Autenticación segura (vía Firebase) respetando la privacidad de los datos de salud mental.
2.  **Evaluación Adaptativa:** Motor de encuestas inteligente que aplica el Autoviolentómetro ajustando la cantidad de preguntas según las respuestas previas (Dominios y Dimensiones).
3.  **Motor de Resultados y Scoring:** Cálculo automático que posiciona al usuario en uno de los 31 niveles y lo clasifica en una Zona de Riesgo (Verde, Amarilla, Roja, Crítica) en base al score final (0-186 pts).
4.  **Retroalimentación Clínica y Terapéutica:** Entrega de sugerencias y ejercicios basados en el modelo Amor Ágape, incluyendo las 6 herramientas oficiales: Diario de Autoobservación, Minutos de Compasión, Diálogo Interno Consciente, Red de Apoyo, Autocuidado Físico y Límites Saludables.
5.  **Protocolo de Emergencia (SOS):** Interfaz de acceso rápido a líneas de ayuda (SAPTEL, Línea de la Vida) si el algoritmo detecta riesgo vital (respuestas de riesgo en Dominio 3).
6.  **Identidad Visual:** Implementación estricta del Brandbook de NICÓMACO (colores Jet Black #07070F, Electric Indigo #7C3AED, Jade Green #059669, Snow White #F8F8FF, y Lavender Blue #C4B5FD; tipografías Playfair Display e Inter).

### 3.2. Lo que la aplicación NO HARÁ (Out-of-Scope / Límites Éticos):
1.  **NO es Terapia Psicológica Sustitutiva:** La app es una herramienta de *psicoeducación y tamizaje*, no sustituye el tratamiento profesional ni la terapia cara a cara.
2.  **NO es un Servicio de Intervención en Crisis en Tiempo Real:** La app no contará con un chat humano 24/7 para emergencias (se limitará a proveer los números oficiales de contacto de emergencia).
3.  **NO incluye Diagnósticos Psiquiátricos:** El Autoviolentómetro mide conductas de "Cero Amor", no emite diagnósticos del DSM-5 (como Depresión Mayor o Trastorno Límite de la Personalidad).
4.  **NO receta ni sugiere medicación.**

---

## 4. REQUERIMIENTOS TÉCNICOS DE ALTO NIVEL
* **Tecnología:** Cliente Web en React (Vite, TypeScript, Tailwind CSS v4, Motion) con simulador del prototipo móvil en Flutter (Dart). Backend as a Service (BaaS) con Firebase (Auth, Firestore, Cloud Functions).
* **Arquitectura de Documentación:** Sistema SDD (Software Design Document) versionado a través de GitHub Spec para trazabilidad de cambios en los algoritmos clínicos.
* **Cumplimiento Normativo:** Estructura de base de datos diseñada para anonimización de datos sensibles y cumplimiento de normativas de privacidad (ej. aviso de privacidad clínico explícito antes de iniciar el test).

## 5. RIESGOS PRINCIPALES Y MITIGACIÓN
| Riesgo | Impacto | Estrategia de Mitigación |
| :--- | :---: | :--- |
| **Abandono de la encuesta** (Usuario se fatiga antes de terminar). | Alto | Implementar el *Flujo Adaptativo* (aprobado en el Paso 3) para saltar bloques de preguntas innecesarias. Mostrar barra de progreso visual. |
| **Falsos Negativos** (Usuario oculta intencionalmente riesgo suicida). | Alto | Uso de reactivos en "espejo" (validación cruzada) y mensajes de advertencia empáticos sobre la importancia de la honestidad. |
| **Responsabilidad Legal** (Usuario se lesiona usando la app). | Crítico | Mostrar un descargo de responsabilidad claro al inicio. Activación inmediata de pantalla "SOS" bloqueante al detectar ítems críticos (ej. Q59 - Nivel 30). |