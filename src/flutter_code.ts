export const FLUTTER_CODE_PROTOTYPE = `// ==========================================
// PROTOTIPO INTERACTIVO: CERO AMOR VS AMOR ÁGAPE
// CLÍNICA NICÓMACO - MVP FLUTTER (DART)
// Listo para compilar en DartPad, Flutter Web o Simulador
// ==========================================

import 'package:flutter/material.dart';

void main() {
  runApp(const NicomacoApp());
}

class NicomacoApp extends StatelessWidget {
  const NicomacoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'NICÓMACO - Cero Amor vs Amor Ágape',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF07070F), // Jet Black
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFF7C3AED), // Electric Indigo
          secondary: Color(0xFF059669), // Jade Green
          background: const Color(0xFF07070F),
          surface: Color(0xFF131326),
          onPrimary: Color(0xFFF8F8FF), // Snow White
        ),
        fontFamily: 'Inter',
        textTheme: const TextTheme(
          displayLarge: TextStyle(fontFamily: 'Playfair Display', fontSize: 32, fontWeight: FontWeight.bold, color: Color(0xFFF8F8FF)),
          headlineMedium: TextStyle(fontFamily: 'Playfair Display', fontSize: 24, fontWeight: FontWeight.w600, color: Color(0xFFF8F8FF)),
          titleLarge: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: Color(0xFFF8F8FF)),
          bodyLarge: TextStyle(fontSize: 16, color: Color(0xFFF8F8FF), height: 1.5),
          bodyMedium: TextStyle(fontSize: 14, color: Color(0xFFC4B5FD)), // Lavender Blue
        ),
      ),
      home: const OnboardingScreen(),
    );
  }
}

// Model for survey questions
class Question {
  final String id;
  final int dominio;
  final int nivel;
  final String categoria;
  final String tipo; // 'Directo' | 'Espejo'
  final String pregunta;

  const Question({
    required this.id,
    required this.dominio,
    required this.nivel,
    required this.categoria,
    required this.tipo,
    required this.pregunta,
  });
}

// Questionnaire Sample Dataset (from Matriz Psicométrica)
const List<Question> SURVEY_QUESTIONS = [
  // Dominio 1
  Question(
    id: 'Q01',
    dominio: 1,
    nivel: 0,
    categoria: 'Me hiero / me critico',
    tipo: 'Directo',
    pregunta: 'Cuando cometo un error, mi primer pensamiento es insultarme o llamarme tonto(a).',
  ),
  Question(
    id: 'Q02',
    dominio: 1,
    nivel: 0,
    categoria: 'Me hiero / me critico',
    tipo: 'Espejo',
    pregunta: 'Me resulta muy difícil perdonarme y ser compasivo(a) cuando las cosas no salen como esperaba.',
  ),
  Question(
    id: 'Q03',
    dominio: 1,
    nivel: 1,
    categoria: 'Me presiono / me coacciono',
    tipo: 'Directo',
    pregunta: 'Me exijo resultados perfectos incluso cuando estoy agotado(a) física o mentalmente.',
  ),
  Question(
    id: 'Q04',
    dominio: 1,
    nivel: 1,
    categoria: 'Me presiono / me coacciono',
    tipo: 'Espejo',
    pregunta: 'Siento culpa si dedico tiempo a descansar en lugar de estar siendo productivo(a).',
  ),
  Question(
    id: 'Q05',
    dominio: 1,
    nivel: 2,
    categoria: 'Me miento / me engaño',
    tipo: 'Directo',
    pregunta: 'Minimizo mis propios problemas convenciéndome de que \\'no es para tanto\\'.',
  ),
  Question(
    id: 'Q06',
    dominio: 1,
    nivel: 2,
    categoria: 'Me miento / me engaño',
    tipo: 'Espejo',
    pregunta: 'Frecuentemente digo que estoy bien, aunque por dentro me sienta triste o abrumado(a).',
  ),
  Question(
    id: 'Q07',
    dominio: 1,
    nivel: 3,
    categoria: 'Me ignoro / lo callo',
    tipo: 'Directo',
    pregunta: 'Reprimo mis emociones para no incomodar a las personas a mi alrededor.',
  ),
  Question(
    id: 'Q08',
    dominio: 1,
    nivel: 3,
    categoria: 'Me ignoro / lo callo',
    tipo: 'Espejo',
    pregunta: 'Pongo las necesidades de todos los demás por encima de mis propias necesidades vitales.',
  ),
  // Dominio 2
  Question(
    id: 'Q25',
    dominio: 2,
    nivel: 12,
    categoria: 'No respeto mi cuerpo',
    tipo: 'Directo',
    pregunta: 'Descuido intencionalmente mi alimentación, sueño o higiene por castigo o apatía.',
  ),
  Question(
    id: 'Q26',
    dominio: 2,
    nivel: 12,
    categoria: 'No respeto mi cuerpo',
    tipo: 'Espejo',
    pregunta: 'Ignoro las señales de dolor o enfermedad en mi cuerpo y evito buscar ayuda médica.',
  ),
  Question(
    id: 'Q29',
    dominio: 2,
    nivel: 14,
    categoria: 'Me golpeo "jugando"',
    tipo: 'Directo',
    pregunta: 'Suelo darme golpes a mí mismo(a) justificando que es \\'en broma\\' o \\'por accidente\\'.',
  ),
  Question(
    id: 'Q30',
    dominio: 2,
    nivel: 14,
    categoria: 'Me golpeo "jugando"',
    tipo: 'Espejo',
    pregunta: 'Permito que haya rudeza física contra mi cuerpo, minimizándola como si fuera un juego.',
  ),
  // Dominio 3
  Question(
    id: 'Q55',
    dominio: 3,
    nivel: 28,
    categoria: 'Me corto (Cutting) / Me mutilo',
    tipo: 'Directo',
    pregunta: 'He recurrido a hacerme heridas físicas (cortes, quemaduras) para aliviar mi dolor emocional.',
  ),
  Question(
    id: 'Q59',
    dominio: 3,
    nivel: 30,
    categoria: 'Intento de suicidio',
    tipo: 'Directo',
    pregunta: 'He tenido pensamientos concretos o he hecho planes para terminar con mi propia vida.',
  ),
];

// 1. ONBOARDING & ETHICAL AGREEMENT
class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  bool _agreed = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Color(0xFF131326), Color(0xFF07070F)],
          ),
        ),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const Spacer(flex: 1),
                // Logo placeholder / branding
                Center(
                  child: Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: const Color(0xFF7C3AED).withOpacity(0.15),
                      shape: BoxShape.circle,
                    ),
                    child: const Icon(
                      Icons.favorite_rounded,
                      size: 64,
                      color: Color(0xFF7C3AED), // Electric Indigo
                    ),
                  ),
                ),
                const SizedBox(height: 32),
                const Text(
                  'CLÍNICA NICÓMACO',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 14,
                    letterSpacing: 4,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFFC4B5FD),
                  ),
                ),
                const SizedBox(height: 12),
                const Text(
                  'Cero Amor\\nvs\\nAmor Ágape',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontFamily: 'Playfair Display',
                    fontSize: 32,
                    fontWeight: FontWeight.bold,
                    height: 1.2,
                  ),
                ),
                const SizedBox(height: 16),
                const Text(
                  'Evalúa el nivel de autoviolencia inconsciente que ejerces sobre ti mismo(a) y asume un camino compasivo de restauración.',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 15,
                    color: Colors.white70,
                    height: 1.4,
                  ),
                ),
                const Spacer(flex: 2),
                
                // Privacy / Clinical Disclaimer Card
                Card(
                  color: const Color(0xFF131326),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                    side: const BorderSide(color: Color(0xFF232346)),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      children: [
                        Row(
                          children: const [
                            Icon(Icons.gavel_rounded, color: Color(0xFF7C3AED)),
                            SizedBox(width: 12),
                            Text(
                              'Consentimiento Ético',
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 10),
                        const Text(
                          'Esta aplicación de tamizaje psicométrico no sustituye un diagnóstico psiquiátrico o terapia individual con un profesional. Tus datos están completamente seguros, privados y anónimos.',
                          style: TextStyle(fontSize: 12, color: Colors.white60, height: 1.4),
                        ),
                        const SizedBox(height: 12),
                        Row(
                          children: [
                            Checkbox(
                              value: _agreed,
                              activeColor: const Color(0xFF7C3AED),
                              onChanged: (val) {
                                setState(() {
                                  _agreed = val ?? false;
                                });
                              },
                            ),
                            const Expanded(
                              child: Text(
                                'Acepto el aviso de privacidad y el descargo clínico.',
                                style: TextStyle(fontSize: 12, color: Colors.white70),
                              ),
                            )
                          ],
                        )
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 24),
                ElevatedButton(
                  onPressed: _agreed
                      ? () {
                          Navigator.pushReplacement(
                            context,
                            MaterialPageRoute(
                              builder: (context) => const SurveyScreen(),
                            ),
                          );
                        }
                      : null,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF7C3AED),
                    disabledBackgroundColor: Colors.grey.withOpacity(0.1),
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  child: const Text(
                    'Iniciar Autoviolentómetro',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                ),
                const SizedBox(height: 20),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// 2. SURVEY SCREEN (ADAPTIVE LOGIC ENGINE)
class SurveyScreen extends StatefulWidget {
  const SurveyScreen({super.key});

  @override
  State<SurveyScreen> createState() => _SurveyScreenState();
}

class _SurveyScreenState extends State<SurveyScreen> {
  // Navigation & Answers State
  int _currentQuestionIndex = 0;
  final Map<String, int> _answers = {}; // Map of Question ID -> Selected Point (0, 1, 2, 3)
  
  // List of active questions in the current flow
  late List<Question> _activeQuestions;

  @override
  void initState() {
    super.initState();
    // Start with all questions, but logic will rebuild them dynamically
    _rebuildActiveQuestionSequence();
  }

  void _rebuildActiveQuestionSequence() {
    // Phase 1: Always include Domain 1 (Q01 - Q08)
    List<Question> list = SURVEY_QUESTIONS.where((q) => q.dominio == 1).toList();

    // Check if we need to evaluate Domain 2 skips.
    // If we haven't finished Domain 1 yet, we don't skip yet.
    bool finishedDomain1 = true;
    int domain1Score = 0;
    
    for (var q in list) {
      if (!_answers.containsKey(q.id)) {
        finishedDomain1 = false;
        break;
      } else {
        domain1Score += _answers[q.id]!;
      }
    }

    if (finishedDomain1) {
      if (domain1Score < 3) {
        // SDD RULE: "Si el puntaje del Dominio 1 es < 3, saltar al Dominio 3"
        // Skip Domain 2 (Q25, Q26, Q29, Q30)
        list.addAll(SURVEY_QUESTIONS.where((q) => q.dominio == 3).toList());
      } else {
        // Include Domain 2 and Domain 3
        list.addAll(SURVEY_QUESTIONS.where((q) => q.dominio == 2).toList());
        list.addAll(SURVEY_QUESTIONS.where((q) => q.dominio == 3).toList());
      }
    } else {
      // Keep other domains in queue placeholder until Domain 1 finishes
      list.addAll(SURVEY_QUESTIONS.where((q) => q.dominio == 2).toList());
      list.addAll(SURVEY_QUESTIONS.where((q) => q.dominio == 3).toList());
    }

    setState(() {
      _activeQuestions = list;
    });
  }

  void _handleOptionSelected(int score) {
    final currentQuestion = _activeQuestions[_currentQuestionIndex];
    
    // Save answer
    _answers[currentQuestion.id] = score;

    // CHECK FOR IMMEDIATE SOS RULE:
    // "Si el usuario selecciona 2 o 3 en las preguntas críticas (Q55 o Q59), debe saltar inmediatamente a la pantalla SOS."
    if ((currentQuestion.id == 'Q55' || currentQuestion.id == 'Q59') && score >= 2) {
      _navigateToSosScreen();
      return;
    }

    // Dynamic sequence check for adaptive jump:
    // Re-evaluate sequence after every answer to ensure correct skip
    _rebuildActiveQuestionSequence();

    if (_currentQuestionIndex < _activeQuestions.length - 1) {
      setState(() {
        _currentQuestionIndex++;
      });
    } else {
      // Completed last question
      _calculateResults();
    }
  }

  void _previousQuestion() {
    if (_currentQuestionIndex > 0) {
      setState(() {
        _currentQuestionIndex--;
      });
    }
  }

  void _navigateToSosScreen() {
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(
        builder: (context) => const SosScreen(reason: "Se detectó riesgo vital inminente a través del reactivo clínico."),
      ),
    );
  }

  void _calculateResults() {
    // Total earned points
    int earnedPoints = 0;
    int maxPossiblePoints = 0;

    _answers.forEach((id, score) {
      earnedPoints += score;
      maxPossiblePoints += 3;
    });

    // Scale to the 186-point reference system
    double scaledScore = 0;
    if (maxPossiblePoints > 0) {
      scaledScore = (earnedPoints / maxPossiblePoints) * 186;
    }

    // Direct redirection to SOS if overall score puts user in critical zone
    if (scaledScore >= 131) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => const SosScreen(reason: "Puntaje agregado en rango crítico."),
        ),
      );
    } else {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => ResultsScreen(
            rawPoints: earnedPoints,
            scaledScore: scaledScore.round(),
            answersMap: _answers,
          ),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_activeQuestions.isEmpty) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    final currentQuestion = _activeQuestions[_currentQuestionIndex];
    final progress = (_currentQuestionIndex + 1) / _activeQuestions.length;

    // Map Domain numbers to Human Labels
    String domainName = "";
    if (currentQuestion.dominio == 1) {
      domainName = "Dom. 1: Autoviolencia Psicológica";
    } else if (currentQuestion.dominio == 2) {
      domainName = "Dom. 2: Autoviolencia Física";
    } else {
      domainName = "Dom. 3: Autoviolencia de Alto Riesgo";
    }

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: _currentQuestionIndex > 0
            ? IconButton(
                icon: const Icon(Icons.arrow_back_ios_new_rounded, color: Colors.white),
                onPressed: _previousQuestion,
              )
            : null,
        title: const Text(
          'Autoviolentómetro NICÓMACO',
          style: TextStyle(fontFamily: 'Playfair Display', fontSize: 18),
        ),
        centerTitle: true,
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Progress Section
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Pregunta \${_currentQuestionIndex + 1} de \${_activeQuestions.length}',
                    style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                  ),
                  Text(
                    '\${(progress * 100).round()}%',
                    style: const TextStyle(color: Color(0xFFC4B5FD), fontSize: 14),
                  ),
                ],
              ),
              const SizedBox(height: 10),
              LinearProgressIndicator(
                value: progress,
                backgroundColor: const Color(0xFF131326),
                color: const Color(0xFF7C3AED),
                borderRadius: BorderRadius.circular(4),
              ),
              const SizedBox(height: 32),

              // Domain Badge & Category
              Align(
                alignment: Alignment.centerLeft,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: const Color(0xFF7C3AED).withOpacity(0.1),
                    borderRadius: BorderRadius.circular(8),
                    border: Border.solid(width: 1, color: const Color(0xFF7C3AED).withOpacity(0.3)),
                  ),
                  child: Text(
                    domainName.toUpperCase(),
                    style: const TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 1.2,
                      color: Color(0xFFC4B5FD),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 12),
              Text(
                'Categoría: \${currentQuestion.categoria}',
                style: const TextStyle(fontSize: 14, fontStyle: FontStyle.italic, color: Colors.white60),
              ),
              const SizedBox(height: 24),

              // Question Statement Box
              Expanded(
                child: Container(
                  padding: const EdgeInsets.all(24),
                  decoration: BoxDecoration(
                    color: const Color(0xFF131326),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: const Color(0xFF232346)),
                  ),
                  alignment: Alignment.center,
                  child: Text(
                    currentQuestion.pregunta,
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      fontFamily: 'Playfair Display',
                      fontSize: 22,
                      fontWeight: FontWeight.w500,
                      height: 1.4,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 32),

              // Likert Option Buttons
              Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  _buildOptionButton('Nunca', 0),
                  const SizedBox(height: 12),
                  _buildOptionButton('Rara Vez (1-2 veces al mes)', 1),
                  const SizedBox(height: 12),
                  _buildOptionButton('Frecuentemente (1-3 veces/semana)', 2),
                  const SizedBox(height: 12),
                  _buildOptionButton('Siempre (Diario/Automatizado)', 3),
                ],
              ),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildOptionButton(String text, int value) {
    return ElevatedButton(
      onPressed: () => _handleOptionSelected(value),
      style: ElevatedButton.styleFrom(
        backgroundColor: const Color(0xFF131326),
        foregroundColor: const Color(0xFFF8F8FF),
        elevation: 0,
        alignment: Alignment.centerLeft,
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 18),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
          side: const BorderSide(color: Color(0xFF232346), width: 1.5),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Expanded(
            child: Text(
              text,
              style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w500),
            ),
          ),
          Container(
            width: 28,
            height: 28,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: Colors.black26,
              border: Border.all(color: const Color(0xFF7C3AED)),
            ),
            child: Center(
              child: Text(
                '+\$value',
                style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFFC4B5FD)),
              ),
            ),
          )
        ],
      ),
    );
  }
}

// 3. RESULTS SCREEN (DIAGNOSTIC VISUALIZATION)
class ResultsScreen extends StatelessWidget {
  final int rawPoints;
  final int scaledScore;
  final Map<String, int> answersMap;

  const ResultsScreen({
    super.key,
    required this.rawPoints,
    required this.scaledScore,
    required this.answersMap,
  });

  @override
  Widget build(BuildContext context) {
    // Determine Zone matching the scored points
    String zoneName = "Verde";
    Color zoneColor = const Color(0xFF059669);
    String zoneDescription = "";
    List<String> zoneGuidelines = [];
    String clinicalFocus = "";

    if (scaledScore <= 30) {
      zoneName = "Verde";
      zoneColor = const Color(0xFF059669);
      zoneDescription = "Autoviolencia Leve: Posees una base sólida de respeto. Requiere un enfoque de consolidación y nutrición de tu Amor Ágape.";
      zoneGuidelines = [
        "Práctica diaria de gratitud y autoafirmaciones positivas.",
        "Mantenimiento de límites personales saludables.",
        "Prácticas de meditación de bondad amorosa (Metta)."
      ];
      clinicalFocus = "Enfoque Clínico: Consolidación del amor propio incondicional y prevención primaria.";
    } else if (scaledScore <= 75) {
      zoneName = "Amarilla";
      zoneColor = const Color(0xFFD97706);
      zoneDescription = "Autoviolencia Moderada: Alerta preventiva. Hay presencia de conductas de descuido emocional y rigidez cognitiva autopunitiva.";
      zoneGuidelines = [
        "Iniciar el 'Diálogo Interno Consciente' para reescribir la crítica destructiva.",
        "Establecer recordatorios obligatorios de descanso activo y recreación.",
        "Identificación y desactivación de Comandos Tóxicos cotidianos."
      ];
      clinicalFocus = "Enfoque Clínico: Intervención temprana cognitivo-conductual y psicoeducación de autocompasión.";
    } else {
      zoneName = "Roja";
      zoneColor = const Color(0xFFDC2626);
      zoneDescription = "Autoviolencia Severa: Riesgo a tu integridad psicofísica. Ejerces niveles elevados de castigo y coacción interna.";
      zoneGuidelines = [
        "Se sugiere firmemente iniciar terapia asistida personalizada en la Clínica NICÓMACO.",
        "Activar tu red de apoyo de absoluta confianza (familia o amigos íntimos).",
        "Ejercicios diarios guiados de regulación emocional y de compasión somática."
      ];
      clinicalFocus = "Enfoque Clínico: Reestructuración cognitiva profunda, terapia de aceptación y compromiso (ACT), acompañamiento psicoterapéutico.";
    }

    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 16),
              const Center(
                child: Text(
                  'Diagnóstico Clínico',
                  style: TextStyle(
                    fontFamily: 'Playfair Display',
                    fontSize: 28,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              const SizedBox(height: 8),
              const Center(
                child: Text(
                  'CERO AMOR VS AMOR ÁGAPE',
                  style: TextStyle(
                    fontSize: 11,
                    letterSpacing: 2.0,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFFC4B5FD),
                  ),
                ),
              ),
              const SizedBox(height: 32),

              // Visual Gauge Card
              Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: const Color(0xFF131326),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: zoneColor.withOpacity(0.4), width: 1.5),
                ),
                child: Column(
                  children: [
                    Text(
                      'ZONA \$zoneName',
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: zoneColor,
                        letterSpacing: 1.5,
                      ),
                    ),
                    const SizedBox(height: 16),
                    Stack(
                      alignment: Alignment.center,
                      children: [
                        SizedBox(
                          width: 140,
                          height: 140,
                          child: CircularProgressIndicator(
                            value: scaledScore / 186,
                            strokeWidth: 10,
                            backgroundColor: Colors.white12,
                            color: zoneColor,
                          ),
                        ),
                        Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(
                              '\$scaledScore',
                              style: const TextStyle(
                                fontSize: 44,
                                fontWeight: FontWeight.bold,
                                fontFamily: 'Playfair Display',
                              ),
                            ),
                            const Text(
                              'PUNTOS ESCALADOS',
                              style: TextStyle(fontSize: 8, color: Colors.white54),
                            ),
                          ],
                        ),
                      ],
                    ),
                    const SizedBox(height: 24),
                    Text(
                      zoneDescription,
                      textAlign: TextAlign.center,
                      style: const TextStyle(fontSize: 14, height: 1.4, color: Colors.white),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      clinicalFocus,
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: 12, fontStyle: FontStyle.italic, color: Color(0xFFC4B5FD)),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Guidelines Title
              const Text(
                'Plan de Transición Amor Ágape',
                style: TextStyle(
                  fontFamily: 'Playfair Display',
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 12),

              // Staggered Guidelines list
              ...zoneGuidelines.map((guideline) => Padding(
                    padding: const EdgeInsets.only(bottom: 12),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Icon(Icons.check_circle_outline, color: zoneColor, size: 20),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Text(
                            guideline,
                            style: const TextStyle(fontSize: 14, color: Colors.white90),
                          ),
                        ),
                      ],
                    ),
                  )),

              const SizedBox(height: 32),

              // Contact & Actions Card
              Card(
                color: const Color(0xFF131326),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                  side: const BorderSide(color: Color(0xFF232346)),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      const Text(
                        'Acompañamiento Profesional',
                        style: TextStyle(
                          fontFamily: 'Playfair Display',
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 8),
                      const Text(
                        '¿Quieres profundizar en tus resultados? Agenda una cita con un terapeuta de la Clínica NICÓMACO.',
                        style: TextStyle(fontSize: 13, color: Colors.white70, height: 1.4),
                      ),
                      const SizedBox(height: 20),
                      ElevatedButton.icon(
                        onPressed: () {
                          // Action to open WhatsApp mock
                        },
                        icon: const Icon(Icons.chat_bubble_outline_rounded),
                        label: const Text('Contactar por WhatsApp'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF059669), // Jade Green
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(vertical: 14),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 24),

              // Reset test button
              OutlinedButton(
                onPressed: () {
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const OnboardingScreen(),
                    ),
                  );
                },
                style: OutlinedButton.styleFrom(
                  foregroundColor: Colors.white,
                  side: const BorderSide(color: Color(0xFF232346)),
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                child: const Text('Reiniciar Prueba'),
              ),
              const SizedBox(height: 40),
            ],
          ),
        ),
      ),
    );
  }
}

// 4. PROTOCOLO SOS CRÍTICO
class SosScreen extends StatelessWidget {
  final String reason;

  const SosScreen({
    super.key,
    required this.reason,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF07070F),
      body: SafeArea(
        child: Container(
          padding: const EdgeInsets.all(28.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Spacer(),
              // Warning Shield Icon
              Center(
                child: Container(
                  padding: const EdgeInsets.all(24),
                  decoration: BoxDecoration(
                    color: const Color(0xFF991B1B).withOpacity(0.15),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(
                    Icons.gpp_maybe_rounded,
                    size: 80,
                    color: Color(0xFFEF4444), // Critical Red
                  ),
                ),
              ),
              const SizedBox(height: 32),
              const Text(
                'S.O.S - APOYO INMEDIATO',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 12,
                  letterSpacing: 3.0,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFFEF4444),
                ),
              ),
              const SizedBox(height: 12),
              const Text(
                'Tu vida y tu paz valen oro',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontFamily: 'Playfair Display',
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 16),
              const Text(
                'Hemos pausado el cuestionario porque identificamos respuestas que sugieren que estás pasando por un momento de dolor o agobio extremo. No estás solo(a), mereces un trato compasivo y ayuda profesional inmediata.',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 14, color: Colors.white70, height: 1.5),
              ),
              const SizedBox(height: 12),
              Text(
                'Motivo: \$reason',
                textAlign: TextAlign.center,
                style: const TextStyle(fontSize: 11, fontStyle: FontStyle.italic, color: Colors.white38),
              ),
              const Spacer(flex: 2),

              // Emergency Numbers Cards
              const Text(
                'Líneas de Crisis Gratuitas y 24/7:',
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white90),
              ),
              const SizedBox(height: 12),

              _buildCallCard(
                title: 'Línea de la Vida',
                number: '800 911 2000',
                description: 'Atención especializada en crisis emocional en México.',
                icon: Icons.phone_in_talk_rounded,
                color: const Color(0xFF7C3AED),
              ),
              const SizedBox(height: 12),
              _buildCallCard(
                title: 'SAPTEL',
                number: '55 5259 8121',
                description: 'Servicio de salud mental de Cruz Roja Mexicana.',
                icon: Icons.support_agent_rounded,
                color: const Color(0xFF059669),
              ),

              const SizedBox(height: 24),
              
              ElevatedButton(
                onPressed: () {
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const OnboardingScreen(),
                    ),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF131326),
                  side: const BorderSide(color: Color(0xFF232346)),
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                child: const Text('Volver al Inicio', style: TextStyle(color: Colors.white)),
              ),
              const Spacer(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildCallCard({
    required String title,
    required String number,
    required String description,
    required IconData icon,
    required Color color,
  }) {
    return Card(
      color: const Color(0xFF131326),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: BorderSide(color: color.withOpacity(0.3)),
      ),
      child: ListTile(
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        leading: Icon(icon, color: color, size: 32),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(number, style: TextStyle(color: color, fontWeight: FontWeight.bold, fontSize: 15)),
            Text(description, style: const TextStyle(fontSize: 11, color: Colors.white54)),
          ],
        ),
        trailing: CircleAvatar(
          backgroundColor: color.withOpacity(0.15),
          child: Icon(Icons.call, color: color, size: 20),
        ),
        onTap: () {
          // Action to call number
        },
      ),
    );
  }
}
`;
