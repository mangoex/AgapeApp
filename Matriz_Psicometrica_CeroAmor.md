# DOCUMENTO DE DISEÑO CLÍNICO: Matriz Psicométrica "Cero Amor"
**Proyecto:** Aplicación NICÓMACO - Cero Amor vs Amor Ágape
**Versión:** 1.0
**Metodología Tecnológica:** React SPA (Vite + TS) / Flutter SDK / Firebase
**Base Teórica:** Autoviolentómetro Cero Amor (Blanca Estela Angulo López - Reg. No. 03-2025-101713061400-01)

---

## 1. OBJETIVO DEL INSTRUMENTO
El objetivo de esta encuesta psicométrica es identificar, diagnosticar y cuantificar el nivel de autoviolencia (Cero Amor) que ejerce un usuario sobre sí mismo, operacionalizado a través de 31 niveles de gravedad progresiva (Niveles 0 a 30) organizados en tres grandes dominios. Los resultados alimentan un motor adaptativo local y en la nube que clasifica al usuario en una zona de riesgo y detona ejercicios y herramientas específicas para transitar hacia el Amor Ágape.

## 2. JUSTIFICACIÓN Y VALIDEZ ESTADÍSTICA
El instrumento se rige bajo la **Teoría Clásica de los Test (TCT)**:
*   **Confiabilidad (Consistencia Interna):** Cada nivel o categoría del Autoviolentómetro cuenta con 2 reactivos (ítems): uno de enunciación directa y uno de validación cruzada o "espejo", con el fin de obtener un Alfa de Cronbach esperado de $\ge 0.85$.
*   **Validez de Constructo:** Los ítems están directamente correlacionados con la taxonomía clínica de los 31 niveles de autoviolencia.

## 3. ESCALA DE MEDICIÓN Y PESOS
El cuestionario utiliza una **Escala Likert de 4 puntos** enfocada en la frecuencia de la conducta o pensamiento:

| Respuesta | Valor Estadístico (Peso) | Descripción Clínica |
| :--- | :---: | :--- |
| **Nunca** | 0 puntos | Ausencia del síntoma/conducta autoviolenta. |
| **Rara vez** | 1 punto | Ocurrencia aislada (1-2 veces al mes). |
| **Frecuentemente**| 2 puntos | Ocurrencia regular (1-3 veces por semana). |
| **Siempre** | 3 puntos | Ocurrencia crónica (Diaria o automatizada). |

---

## 4. SISTEMA DE CALIFICACIÓN (SCORING) Y DIAGNÓSTICO
El puntaje máximo teórico para el test completo (62 preguntas x 3 puntos) es de **186 puntos**. El motor de reglas clasifica el puntaje escalado final en las siguientes zonas de riesgo:

*   🟢 **ZONA VERDE (0 - 30 pts) - Autoviolencia Leve:** Requiere un enfoque de consolidación del amor propio y prevención primaria.
*   🟡 **ZONA AMARILLA (31 - 75 pts) - Autoviolencia Moderada:** Alerta preventiva. Se detonan ejercicios de "Diálogo Interno Consciente" e "Identificación de Comandos Tóxicos".
*   🔴 **ZONA ROJA (76 - 130 pts) - Autoviolencia Severa:** Riesgo a la integridad psicofísica. Sugiere acompañamiento psicoterapéutico en la Clínica NICÓMACO y activación de red de apoyo.
*   ⚫ **ZONA CRÍTICA (131 - 186 pts o detonación de reactivo crítico) - Riesgo Vital:** Se detona protocolo SOS inmediato. La aplicación bloquea la interfaz y redirige prioritariamente a líneas de crisis (SAPTEL: 55 5259 8121 y Línea de la Vida: 800 911 2000).

---

## 5. MATRIZ DE ÍTEMS DEL AUTOVIOLENTÓMETRO (Estructura de Preguntas Completa)

Cada nivel del Autoviolentómetro cuenta con 2 preguntas en el archivo de datos del proyecto (`src/data.ts`). A continuación se describe la distribución y mapeo de los 62 reactivos:

### DOMINIO 1: AUTOVIOLENCIA PSICOLÓGICA Y EMOCIONAL
*(Dimensión: Distorsión y Castigo Cognitivo / Niveles 0 a 10 - Q01 a Q22)*

| ID | Nivel | Categoría del Autoviolentómetro | Tipo | Reactivo (Pregunta) |
| :--- | :---: | :--- | :--- | :--- |
| **Q01** | 0 | Me hiero / me critico | Directo | "Cuando cometo un error, mi primer pensamiento es insultarme o llamarme tonto(a)." |
| **Q02** | 0 | Me hiero / me critico | Espejo | "Me resulta muy difícil perdonarme y ser compasivo(a) cuando las cosas no salen como esperaba." |
| **Q03** | 1 | Me presiono / me coacciono | Directo | "Me exijo resultados perfectos incluso cuando estoy agotado(a) física o mentalmente." |
| **Q04** | 1 | Me presiono / me coacciono | Espejo | "Siento culpa si dedico tiempo a descansar en lugar de estar siendo productivo(a)." |
| **Q05** | 2 | Me miento / me engaño | Directo | "Minimizo mis propios problemas convenciéndome de que 'no es para tanto'." |
| **Q06** | 2 | Me miento / me engaño | Espejo | "Frecuentemente digo que estoy bien, aunque por dentro me sienta triste o abrumado(a)." |
| **Q07** | 3 | Me ignoro / lo callo | Directo | "Reprimo mis emociones para no incomodar a las personas a mi alrededor." |
| **Q08** | 3 | Me ignoro / lo callo | Espejo | "Pongo las necesidades de todos los demás por encima de mis propias necesidades vitales." |
| **Q09** | 4 | Me culpo / me victimizo | Directo | "Asumo la responsabilidad de los conflictos o la infelicidad de los demás, sintiendo que es mi culpa." |
| **Q10** | 4 | Me culpo / me victimizo | Espejo | "Creo firmemente que merezco las cosas malas que me suceden debido a mis imperfecciones." |
| **Q11** | 5 | Me prohíbo disfrutar / gozar | Directo | "Cancelo planes divertidos o placenteros como una forma de autocastigo inconsciente." |
| **Q12** | 5 | Me prohíbo disfrutar / gozar | Espejo | "Me siento incómodo(a) o indigno(a) cuando experimento momentos de alegría genuina." |
| **Q13** | 6 | Me avergüenzo de mí mismo(a) | Directo | "Suelo sentir una profunda vergüenza de quién soy cuando me comparo con los demás." |
| **Q14** | 6 | Me avergüenzo de mí mismo(a) | Espejo | "Escondo mis opiniones, gustos o forma de ser por miedo a que los demás descubran mi 'verdadero' yo." |
| **Q15** | 7 | Me aíslo / me encierro | Directo | "Me retiro de mis amigos y redes de apoyo cuando me siento emocionalmente vulnerable." |
| **Q16** | 7 | Me aíslo / me encierro | Espejo | "Evito pedir ayuda a pesar de saber que no puedo resolver un problema por mí mismo(a)." |
| **Q17** | 8 | Descalifico mis logros / éxitos | Directo | "Atribuyo mis éxitos únicamente a la suerte, la coincidencia o el esfuerzo de otros." |
| **Q18** | 8 | Descalifico mis logros / éxitos | Espejo | "Siento que soy un fraude y que en cualquier momento los demás se darán cuenta de mi incapacidad." |
| **Q19** | 9 | Tolero maltratos externos | Directo | "Permito que las personas me hablen de forma despectiva o invalidante sin defenderme." |
| **Q20** | 9 | Tolero maltratos externos | Espejo | "Suelo justificar las actitudes hirientes de otros hacia mí, pensando que yo las provoqué." |
| **Q21** | 10 | Postergo mis sueños / metas | Directo | "Abandono mis proyectos personales importantes por temor al fracaso o a no ser suficiente." |
| **Q22** | 10 | Postergo mis sueños / metas | Espejo | "Invierto mi energía en construir el futuro de otros, dejando mi propio crecimiento en el olvido." |

### DOMINIO 2: AUTOVIOLENCIA FÍSICA Y DE DESCUIDO
*(Dimensión: Agresión Somática Indirecta y Desatención / Niveles 11 a 20 - Q23 a Q42)*

| ID | Nivel | Categoría del Autoviolentómetro | Tipo | Reactivo (Pregunta) |
| :--- | :---: | :--- | :--- | :--- |
| **Q23** | 11 | Descuido mi descanso y sueño | Directo | "Reduzco deliberadamente mis horas de descanso para trabajar o resolver pendientes, descuidando mi bienestar." |
| **Q24** | 11 | Descuido mi descanso y sueño | Espejo | "Suelo pasar noches enteras despierto(a) debido a la rumiación excesiva de mis problemas cotidianos." |
| **Q25** | 12 | No respeto mi cuerpo | Directo | "Descuido intencionalmente mi alimentación, sueño o higiene por castigo o apatía." |
| **Q26** | 12 | No respeto mi cuerpo | Espejo | "Ignoro las señales de dolor o enfermedad en mi cuerpo y evito buscar ayuda médica." |
| **Q27** | 13 | Privación de necesidades somáticas | Directo | "He pasado horas sin comer o beber agua simplemente porque no considero prioritario atenderme." |
| **Q28** | 13 | Privación de necesidades somáticas | Espejo | "Aguanto la necesidad de ir al baño o estirarme, obligando a mi cuerpo a soportar incomodidad física." |
| **Q29** | 14 | Me golpeo "jugando" | Directo | "Suelo darme golpes a mí mismo(a) justificando que es 'en broma' o 'por accidente'." |
| **Q30** | 14 | Me golpeo "jugando" | Espejo | "Permito que haya rudeza física contra mi cuerpo, minimizándola como si fuera un juego." |
| **Q31** | 15 | Imprudencia o peligro innecesario | Directo | "Cruzo avenidas de manera imprudente o conduzco a altas velocidades sin importar las consecuencias." |
| **Q32** | 15 | Imprudencia o peligro innecesario | Espejo | "Suelo exponerme a situaciones de riesgo físico elevado sin tomar ninguna precaución básica." |
| **Q33** | 16 | Agotamiento físico extremo | Directo | "Realizo ejercicio físico o labores pesadas hasta el punto de sentir náuseas, mareos o dolor agudo." |
| **Q34** | 16 | Agotamiento físico extremo | Espejo | "Ignoro el cansancio muscular extremo y sigo forzándome a realizar actividades de alta demanda." |
| **Q35** | 17 | Consumo de sustancias nocivas | Directo | "Consumo alcohol, tabaco u otras sustancias en exceso con el propósito de anestesiar mis emociones." |
| **Q36** | 17 | Consumo de sustancias nocivas | Espejo | "Tengo dificultades para detener el consumo de sustancias nocivas aun sabiendo el daño que causan a mi salud." |
| **Q37** | 18 | Sabotaje de redes de apoyo | Directo | "Alejo deliberadamente a las personas que me demuestran amor, contención y cuidado incondicional." |
| **Q38** | 18 | Sabotaje de redes de apoyo | Espejo | "Busco inconscientemente generar conflictos con seres queridos para aislarme de su ayuda." |
| **Q39** | 19 | Automedicación sin supervisión | Directo | "Ingiero analgésicos o ansiolíticos sin prescripción médica para acallar el malestar físico o emocional." |
| **Q40** | 19 | Automedicación sin supervisión | Espejo | "Suelo ignorar las dosis recomendadas de medicamentos, tomándolos según mi propio criterio de urgencia." |
| **Q41** | 20 | Descuido de espacio vital | Directo | "Permito que mi habitación o espacio de trabajo se inunde de desorden y suciedad extrema de forma persistente." |
| **Q42** | 20 | Descuido de espacio vital | Espejo | "Considero que vivir en un entorno deteriorado o descuidado es el castigo que merezco." |

### DOMINIO 3: AUTOVIOLENCIA DE ALTO RIESGO Y SEXUAL (ZONA DE ALERTA SOS)
*(Dimensión: Agresión Directa e Integridad Física y Relacional / Niveles 21 a 30 - Q43 a Q62)*

*Regla Algorítmica: Responder 'Frecuentemente' (2) o 'Siempre' (3) en cualquiera de estos ítems suspende el test y activa el Protocolo SOS.*

| ID | Nivel | Categoría del Autoviolentómetro | Tipo | Reactivo (Pregunta) |
| :--- | :---: | :--- | :--- | :--- |
| **Q43** | 21 | Permisión de maltrato físico | Directo | "He tolerado agresiones físicas directas (empujones, sacudidas, bofetadas) de personas cercanas." |
| **Q44** | 21 | Permisión de maltrato físico | Espejo | "Permanezco de manera voluntaria en entornos donde mi integridad física es amenazada constantemente." |
| **Q45** | 22 | Coacción sexual tolerada | Directo | "He accedido a tener relaciones íntimas sin mi pleno consentimiento para evitar enojos o abandono." |
| **Q46** | 22 | Coacción sexual tolerada | Espejo | "Siento que no tengo derecho a decir que 'no' a las peticiones íntimas de mi pareja." |
| **Q47** | 23 | Modificaciones corporales de riesgo | Directo | "Me he sometido a tratamientos estéticos invasivos de dudosa procedencia sin medir el peligro de muerte." |
| **Q48** | 23 | Modificaciones corporales de riesgo | Espejo | "Considero alterar mi fisonomía de forma dolorosa o peligrosa solo para intentar encajar en expectativas ajenas." |
| **Q49** | 24 | Privación extrema de libertad | Directo | "Permito que otras personas controlen por completo mi vestimenta, amistades, horarios o finanzas." |
| **Q50** | 24 | Privación extrema de libertad | Espejo | "Siento un miedo paralizante a tomar decisiones personales sencillas sin la aprobación absoluta de alguien más." |
| **Q51** | 25 | Relaciones abusivas persistentes | Directo | "Mantengo relaciones sentimentales con personas que me humillan, celan de forma enfermiza o manipulan constantemente." |
| **Q52** | 25 | Relaciones abusivas persistentes | Espejo | "Me siento incapaz de romper un vínculo dañino a pesar de reconocer que está destruyendo mi salud mental." |
| **Q53** | 26 | Desprecio y castigo íntimo | Directo | "Asocio mi sexualidad con la culpa extrema y suelo infligirme castigos o privaciones en mi intimidad." |
| **Q54** | 26 | Desprecio y castigo íntimo | Espejo | "Siento que mi cuerpo y mis necesidades biológicas son impuras y merecen ser despreciadas." |
| **Q55** | 27 | Me corto (Cutting) / Me mutilo | Directo | "He recurrido a hacerme heridas físicas (cortes, quemaduras) para aliviar mi dolor emocional." |
| **Q56** | 27 | Me corto (Cutting) / Me mutilo | Espejo | "Tengo cicatrices o marcas físicas autoinfligidas que intento ocultar sistemáticamente de los demás." |
| **Q57** | 28 | Acciones deliberadas de alto riesgo | Directo | "Me coloco deliberadamente en situaciones de peligro de muerte (bordes de precipicios, vías rápidas)." |
| **Q58** | 28 | Acciones deliberadas de alto riesgo | Espejo | "Siento una atracción o impulso inconsciente hacia escenarios donde mi supervivencia física corre peligro." |
| **Q59** | 29 | Ideación suicida activa | Directo | "He tenido pensamientos concretos o he hecho planes para terminar con mi propia vida." |
| **Q60** | 29 | Ideación suicida activa | Espejo | "Fantaseo frecuentemente con la idea de desaparecer por completo, no despertar o dejar de existir." |
| **Q61** | 30 | Preparación o intento autolítico | Directo | "He llevado a cabo acciones concretas para preparar mi despedida o ensayar un intento de suicidio." |
| **Q62** | 30 | Preparación o intento autolítico | Espejo | "Conserve objetos, sustancias o notas con el propósito explícito de atentar contra mi propia existencia." |