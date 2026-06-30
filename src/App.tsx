import { useState, useMemo, useEffect } from 'react';
import { 
  Heart, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Phone, 
  ExternalLink, 
  Copy, 
  Check, 
  RotateCcw, 
  Info, 
  Layers, 
  Smartphone, 
  MessageSquare, 
  AlertTriangle,
  User,
  Activity,
  HeartHandshake,
  HeartOff,
  Stethoscope,
  Code,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SURVEY_QUESTIONS, SCORE_ZONES, EMOTIONAL_EXERCISES, Question, ScoreZone } from './data';
import { FLUTTER_CODE_PROTOTYPE } from './flutter_code';

// ADAPTIVE FLOW ENGINE helper to rebuild active question sequence dynamically based on answers
export function getActiveQuestionsForAnswers(currentAnswers: Record<string, number>): Question[] {
  // Base Phase: The first 10 questions of Domain 1 (Q01 - Q10)
  const baseQuestions = SURVEY_QUESTIONS.filter(q => q.dominio === 1).slice(0, 10);
  const allDom1 = SURVEY_QUESTIONS.filter(q => q.dominio === 1);
  const allDom2 = SURVEY_QUESTIONS.filter(q => q.dominio === 2);
  const allDom3 = SURVEY_QUESTIONS.filter(q => q.dominio === 3);

  // Check if the base questions of Domain 1 are all answered
  let finishedBase = true;
  let baseScore = 0;

  baseQuestions.forEach(q => {
    const val = currentAnswers[q.id];
    if (val === undefined) {
      finishedBase = false;
    } else {
      baseScore += val;
    }
  });

  if (finishedBase) {
    if (baseScore < 3) {
      // SDD RULE: "Si el puntaje del Dominio 1 base es < 3, saltar al Dominio 3 de forma rápida para descartar riesgo vital"
      // Skip rest of Domain 1 (Q11-Q22) and entire Domain 2
      return [...baseQuestions, ...allDom3];
    } else {
      // Include everything
      return [...allDom1, ...allDom2, ...allDom3];
    }
  }

  // Default flow while still answering the base questions
  return baseQuestions;
}

const getZoneBgClass = (zoneName: string, dark: boolean) => {
  if (dark) {
    const zone = SCORE_ZONES.find(z => z.name === zoneName);
    return zone ? zone.bgLight : 'bg-white/5 border-white/10';
  } else {
    switch(zoneName) {
      case 'Verde': return 'bg-emerald-50/50 border-emerald-200/80 shadow-xs';
      case 'Amarilla': return 'bg-amber-50/50 border-amber-200/80 shadow-xs';
      case 'Roja': return 'bg-rose-50/50 border-rose-200/80 shadow-xs';
      case 'Crítica': return 'bg-red-50/50 border-red-200/80 shadow-xs';
      default: return 'bg-zinc-50 border-zinc-200';
    }
  }
};

const getZoneTextClass = (zoneName: string, dark: boolean) => {
  if (dark) {
    const zone = SCORE_ZONES.find(z => z.name === zoneName);
    return zone ? zone.textColor : 'text-white';
  } else {
    switch(zoneName) {
      case 'Verde': return 'text-emerald-700 font-extrabold';
      case 'Amarilla': return 'text-amber-700 font-extrabold';
      case 'Roja': return 'text-rose-700 font-extrabold';
      case 'Crítica': return 'text-red-700 font-black animate-pulse';
      default: return 'text-zinc-800';
    }
  }
};

export default function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('nicomaco_theme');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Persist theme choice
  useEffect(() => {
    localStorage.setItem('nicomaco_theme', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Simulator Screens: 'splash' | 'onboarding' | 'auth' | 'survey' | 'results' | 'sos'
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'onboarding' | 'auth' | 'survey' | 'results' | 'sos'>('splash');
  
  // App Workspace State
  const [userEmail, setUserEmail] = useState('contacto@paciente.nicomaco.org');
  const [userName, setUserName] = useState('Paciente Demo');
  const [authAgreed, setAuthAgreed] = useState(false);
  const [hasCompletedAuth, setHasCompletedAuth] = useState(false);

  // Survey States
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [triggeringQuestion, setTriggeringQuestion] = useState<Question | null>(null);
  
  // Custom alerts/toasts
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedFlutter, setCopiedFlutter] = useState(false);

  // Active Workspace Tab: 'specs' | 'flutter' | 'simulators'
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'specs' | 'flutter' | 'simulators'>('specs');

  // Trigger temporary messages
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // ADAPTIVE FLOW ENGINE: Rebuild active question sequence dynamically
  const activeQuestions = useMemo(() => {
    return getActiveQuestionsForAnswers(answers);
  }, [answers]);

  const currentQuestion: Question | undefined = activeQuestions[currentQuestionIndex];

  // SCORING ENGINE
  const scoreResults = useMemo(() => {
    let earnedPoints = 0;
    let maxPossiblePoints = 0;

    Object.entries(answers).forEach(([_, score]) => {
      earnedPoints += score as number;
      maxPossiblePoints += 3;
    });

    const scaledScore = maxPossiblePoints > 0 
      ? Math.round((earnedPoints / maxPossiblePoints) * 186) 
      : 0;

    // Match calculated score to defined zones
    let matchedZone: ScoreZone = SCORE_ZONES[0];
    if (scaledScore <= 30) matchedZone = SCORE_ZONES[0];
    else if (scaledScore <= 75) matchedZone = SCORE_ZONES[1];
    else if (scaledScore <= 130) matchedZone = SCORE_ZONES[2];
    else matchedZone = SCORE_ZONES[3];

    return {
      earnedPoints,
      maxPossiblePoints,
      scaledScore,
      matchedZone
    };
  }, [answers]);

  // Option selection handler
  const handleSelectOption = (score: number) => {
    if (!currentQuestion) return;

    const newAnswers = { ...answers, [currentQuestion.id]: score };
    setAnswers(newAnswers);

    // CRITICAL QUESTION RULE:
    // "Si el usuario selecciona 2 o 3 en cualquier reactivo del Dominio 3, se detona el protocolo SOS de emergencia inminente."
    if (currentQuestion.dominio === 3 && score >= 2) {
      setTriggeringQuestion(currentQuestion);
      setCurrentScreen('sos');
      return;
    }

    // Determine what the active questions are based on the NEW answers
    const nextActiveQuestions = getActiveQuestionsForAnswers(newAnswers);

    // Move to next question or evaluate finish
    if (currentQuestionIndex < nextActiveQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Completed last question. Check for high composite score redirection to SOS
      const earned = (Object.values(newAnswers) as number[]).reduce((a: number, b: number) => a + b, 0);
      const maxPossible = Object.keys(newAnswers).length * 3;
      const scaled = Math.round((earned / maxPossible) * 186);

      if (scaled >= 131) {
        // High composite score (Zona Crítica) - find first critical question in Dom 3 answered >= 2 or default
        const firstCritQId = Object.entries(newAnswers).find(([id, val]) => {
          const q = SURVEY_QUESTIONS.find(sq => sq.id === id);
          return q && q.dominio === 3 && (val as number) >= 2;
        })?.[0];
        const firstCritQ = firstCritQId ? SURVEY_QUESTIONS.find(q => q.id === firstCritQId) : SURVEY_QUESTIONS.find(q => q.id === 'Q55');
        setTriggeringQuestion(firstCritQ || SURVEY_QUESTIONS.find(q => q.id === 'Q55') || null);
        setCurrentScreen('sos');
      } else {
        setCurrentScreen('results');
      }
    }
  };

  // Back navigation
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Fast Path Pre-set simulations for review
  const runPresetSimulation = (type: 'green' | 'yellow' | 'red' | 'sos-critical') => {
    if (type === 'green') {
      const greenAnswers: Record<string, number> = {};
      // 10 base questions are answered with 0 (Dominio 1 Score = 0)
      for (let i = 1; i <= 10; i++) {
        const id = `Q${String(i).padStart(2, '0')}`;
        greenAnswers[id] = 0;
      }
      // Remaining questions of Dominio 3 are also answered with 0
      for (let i = 43; i <= 62; i++) {
        const id = `Q${String(i).padStart(2, '0')}`;
        greenAnswers[id] = 0;
      }
      setAnswers(greenAnswers);
      setCurrentQuestionIndex(0);
      setCurrentScreen('results');
      showToast('Simulación de Zona Verde (AutoAmor Leve) activada.');
    } else if (type === 'yellow') {
      const yellowAnswers: Record<string, number> = {};
      // First 10 questions answered with 1 (Sum = 10, >= 3 triggers full questionnaire)
      for (let i = 1; i <= 10; i++) {
        const id = `Q${String(i).padStart(2, '0')}`;
        yellowAnswers[id] = 1;
      }
      // Dominio 1 (rest) and Dominio 2 answered with 1
      for (let i = 11; i <= 42; i++) {
        const id = `Q${String(i).padStart(2, '0')}`;
        yellowAnswers[id] = 1;
      }
      // Dominio 3 answered with 1 (Kept < 2 to avoid triggering direct SOS screen)
      for (let i = 43; i <= 62; i++) {
        const id = `Q${String(i).padStart(2, '0')}`;
        yellowAnswers[id] = 1;
      }
      setAnswers(yellowAnswers);
      setCurrentQuestionIndex(0);
      setCurrentScreen('results');
      showToast('Simulación de Zona Amarilla (Autoviolencia Moderada) activada.');
    } else if (type === 'red') {
      const redAnswers: Record<string, number> = {};
      // Set values to sum to ~104 (Zona Roja: 76 to 130)
      for (let i = 1; i <= 10; i++) {
        const id = `Q${String(i).padStart(2, '0')}`;
        redAnswers[id] = 2; // Sum = 20
      }
      for (let i = 11; i <= 42; i++) {
        const id = `Q${String(i).padStart(2, '0')}`;
        redAnswers[id] = 2; // Sum = 20 + 64 = 84
      }
      for (let i = 43; i <= 62; i++) {
        const id = `Q${String(i).padStart(2, '0')}`;
        redAnswers[id] = 1; // Sum = 84 + 20 = 104 (Kept < 2 to prevent direct SOS bypass)
      }
      setAnswers(redAnswers);
      setCurrentQuestionIndex(0);
      setCurrentScreen('results');
      showToast('Simulación de Zona Roja (Autoviolencia Severa) activada.');
    } else if (type === 'sos-critical') {
      const sosAnswers: Record<string, number> = {};
      for (let i = 1; i <= 10; i++) {
        const id = `Q${String(i).padStart(2, '0')}`;
        sosAnswers[id] = 1;
      }
      sosAnswers['Q55'] = 3; // Critical question in Dominio 3 gets Always (3) -> triggers immediate hijack
      setAnswers(sosAnswers);
      setCurrentQuestionIndex(0);
      setTriggeringQuestion(SURVEY_QUESTIONS.find(q => q.id === 'Q55') || null);
      setCurrentScreen('sos');
      showToast('Simulación SOS de Emergencia activada por Reactivo Crítico.');
    }
  };

  // Handle Flutter code copying
  const copyFlutterCodeToClipboard = () => {
    navigator.clipboard.writeText(FLUTTER_CODE_PROTOTYPE);
    setCopiedFlutter(true);
    showToast('Código Flutter copiado al portapapeles.');
    setTimeout(() => setCopiedFlutter(false), 2000);
  };

  // Restart Survey
  const restartSurvey = (goToAuth: boolean = false) => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setTriggeringQuestion(null);
    if (goToAuth) {
      setHasCompletedAuth(false);
      setAuthAgreed(false);
      setCurrentScreen('onboarding');
    } else if (hasCompletedAuth) {
      setCurrentScreen('survey');
    } else {
      setCurrentScreen('onboarding');
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-jet-black text-snow-white' : 'bg-[#F5F4F0] text-zinc-900'} font-sans antialiased overflow-x-hidden flex flex-col selection:bg-gold-accent/30 selection:text-gold-accent transition-colors duration-300`}>
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 ${isDarkMode ? 'bg-dark-zinc text-snow-white border-gold-accent/40' : 'bg-white text-zinc-800 border-[#9E7A44]/40 shadow-xl'} border px-6 py-3 rounded-full flex items-center gap-3 text-sm backdrop-blur-md`}
          >
            <Sparkles className="w-4 h-4 text-gold-accent animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
  
      {/* Main clinical application navbar */}
      <header className={`border-b ${isDarkMode ? 'border-white/[0.06] bg-jet-black/80 text-white' : 'border-zinc-200 bg-[#FAF9F6]/85 text-zinc-900'} backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between transition-colors duration-300`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-electric-indigo to-jade-green flex items-center justify-center shadow-lg shadow-electric-indigo/10">
            <Heart className="w-5 h-5 text-white fill-white/10" />
          </div>
          <div>
            <h1 className={`font-serif text-lg tracking-tight font-bold ${isDarkMode ? 'text-white' : 'text-zinc-900'} flex items-center gap-2`}>
              NICÓMACO <span className="text-xs font-sans tracking-widest uppercase text-jade-green font-normal px-2 py-0.5 rounded bg-jade-green/10 border border-jade-green/20">Clínica de Contacto®</span>
            </h1>
            <p className={`text-xs ${isDarkMode ? 'text-gold-accent' : 'text-[#9E7A44] font-semibold'} font-mono`}>Autoviolentómetro &middot; Amor Incondicional Ágape</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Theme Switcher Button */}
          <button
            onClick={() => {
              setIsDarkMode(!isDarkMode);
              showToast(`Modo ${!isDarkMode ? 'Oscuro' : 'Claro'} activado.`);
            }}
            className={`text-xs font-medium p-2 rounded-lg border transition-all flex items-center justify-center cursor-pointer ${
              isDarkMode 
                ? 'text-white/70 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.05]' 
                : 'text-zinc-700 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200/80 border-zinc-200 shadow-xs'
            }`}
            title={isDarkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400 fill-amber-400/10 animate-pulse" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 fill-indigo-600/10" />
            )}
          </button>

          <button 
            onClick={() => {
              restartSurvey(true);
              showToast('Prueba reiniciada con éxito.');
            }}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all flex items-center gap-2 cursor-pointer ${
              isDarkMode 
                ? 'text-white/70 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.05]' 
                : 'text-zinc-700 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200/80 border-zinc-200 shadow-xs'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar App</span>
          </button>
        </div>
      </header>

      {/* Main Responsive Grid Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: The Interactive Mobile Simulator (Col Span 5) */}
        <section className="lg:col-span-5 flex flex-col items-center">
          <div className={`w-full max-w-[400px] aspect-[9/19.5] rounded-[48px] p-3.5 border-4 relative overflow-hidden flex flex-col justify-between transition-all duration-300 ${
            isDarkMode 
              ? 'bg-dark-zinc border-white/[0.08] shadow-[0_0_80px_rgba(197,168,128,0.1)]' 
              : 'bg-white border-zinc-300 shadow-[0_10px_50px_rgba(158,122,68,0.08)]'
          }`}>
            {/* Phone speaker & notch details */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-40 bg-jet-black rounded-b-2xl z-30 flex items-center justify-center gap-1.5">
              <div className="w-12 h-1 bg-white/20 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-white/20 rounded-full"></div>
            </div>

            {/* Simulated status bar */}
            <div className={`pt-4 px-6 flex justify-between items-center text-[11px] font-mono z-20 ${isDarkMode ? 'text-white/40' : 'text-zinc-500'}`}>
              <span>08:05 AM</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-jade-green"></span>
                <span>SECURE MOCK DB</span>
              </div>
            </div>

            {/* SCREEN CONTAINER WITH ANIMATED TRANSITIONS */}
            <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col justify-between relative mt-2">
              <AnimatePresence mode="wait">
                
                {/* 1. SPLASH SCREEN */}
                {currentScreen === 'splash' && (
                  <motion.div
                    key="splash"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col items-center justify-center text-center p-4"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-gold-accent/20 to-electric-indigo/20 border border-gold-accent/40 flex items-center justify-center mb-6 animate-bounce">
                      <Heart className="w-10 h-10 text-gold-accent fill-gold-accent/20" />
                    </div>
                    <span className={`text-[10px] tracking-[4px] uppercase ${isDarkMode ? 'text-gold-accent' : 'text-[#9E7A44]'} font-bold`}>Clínica Nicómaco</span>
                    <h2 className={`font-serif text-3xl font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Cero Amor</h2>
                    <span className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-zinc-400'} italic block my-1`}>vs</span>
                    <h3 className={`font-serif text-3xl font-semibold ${isDarkMode ? 'text-gold-accent' : 'text-[#9E7A44]'}`}>Amor Ágape</h3>
                    <p className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-zinc-600'} mt-4 leading-relaxed max-w-[280px]`}>
                      Herramienta Psicométrica Adaptativa para la Prevención de la Autoviolencia Humana.
                    </p>
                    <button
                      onClick={() => setCurrentScreen('onboarding')}
                      className="mt-8 bg-gold-accent hover:bg-gold-accent/90 text-jet-black text-xs font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group cursor-pointer"
                    >
                      <span>Ingresar</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                )}

                {/* 2. ONBOARDING & ETHICAL AGREEMENT */}
                {currentScreen === 'onboarding' && (
                  <motion.div
                    key="onboarding"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="flex-1 flex flex-col justify-between"
                  >
                    <div className="text-center pt-4">
                      <span className={`text-[10px] tracking-[3px] uppercase ${isDarkMode ? 'text-gold-accent' : 'text-[#9E7A44]'} font-bold`}>Onboarding</span>
                      <h2 className={`font-serif text-2xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Consentimiento</h2>
                      <p className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-zinc-600'} mt-2`}>
                        Lee y acepta los términos clínicos para continuar al test seguro.
                      </p>
                    </div>

                    <div className={`my-6 rounded-2xl p-4 border text-left transition-colors ${
                      isDarkMode ? 'bg-card-zinc border-white/[0.05]' : 'bg-[#FAF9F5] border-zinc-200/80 shadow-xs'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Stethoscope className={`w-4 h-4 ${isDarkMode ? 'text-gold-accent' : 'text-[#9E7A44]'}`} />
                        <span className={`text-xs font-bold ${isDarkMode ? 'text-white/90' : 'text-zinc-800'}`}>Aviso Clínico de Responsabilidad</span>
                      </div>
                      <p className={`text-[11px] ${isDarkMode ? 'text-white/60' : 'text-zinc-600'} leading-relaxed`}>
                        Este instrumento psicométrico evalúa 31 niveles progresivos de autoviolencia y conductas lesivas. 
                        <strong> No sustituye terapia psiquiátrica</strong> ni atención médica especializada de urgencia. 
                        Toda información proporcionada es 100% confidencial y anónima.
                      </p>
                      
                      <div className={`mt-4 pt-3 border-t flex items-start gap-3 ${isDarkMode ? 'border-white/[0.06]' : 'border-zinc-200'}`}>
                        <input 
                          type="checkbox" 
                          id="agree-disclaimer"
                          checked={authAgreed}
                          onChange={(e) => setAuthAgreed(e.target.checked)}
                          className="mt-1 accent-gold-accent w-4 h-4 rounded"
                        />
                        <label htmlFor="agree-disclaimer" className={`text-[10.5px] leading-normal cursor-pointer ${isDarkMode ? 'text-white/80' : 'text-zinc-700'}`}>
                          Acepto de forma voluntaria realizar este tamizaje y comprendo sus límites clínicos preventivos.
                        </label>
                      </div>
                    </div>

                    <button
                      disabled={!authAgreed}
                      onClick={() => setCurrentScreen('auth')}
                      className={`w-full py-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        authAgreed 
                          ? 'bg-gold-accent hover:bg-gold-accent/90 text-jet-black shadow-lg' 
                          : isDarkMode ? 'bg-white/5 text-white/30 cursor-not-allowed' : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                      }`}
                    >
                      <span>Aceptar y Continuar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                )}

                {/* 3. SIMULATED CLINICAL REGISTRATION (PRD ÉPICA 1) */}
                {currentScreen === 'auth' && (
                  <motion.div
                    key="auth"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="flex-1 flex flex-col justify-between"
                  >
                    <div className="text-center pt-2">
                      <span className="text-[10px] tracking-[3px] uppercase text-jade-green font-bold">Identidad</span>
                      <h2 className={`font-serif text-2xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Registro Seguro</h2>
                      <p className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-zinc-600'} mt-1`}>
                        Tus datos nos permiten brindarte un informe adaptado personalizado.
                      </p>
                    </div>

                    <div className="my-4 space-y-4 text-left">
                      <div>
                        <label className={`block text-[11px] ${isDarkMode ? 'text-gold-accent' : 'text-[#9E7A44] font-semibold'} font-mono mb-1`}>CÓDIGO O SEUDÓNIMO (ANÓNIMO)</label>
                        <div className="relative">
                          <User className={`absolute left-3 top-2.5 w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-zinc-400'}`} />
                          <input 
                            type="text" 
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className={`w-full border rounded-xl py-2 px-9 text-xs focus:outline-none transition-all ${
                              isDarkMode 
                                ? 'bg-card-zinc border-white/[0.08] text-white focus:border-gold-accent' 
                                : 'bg-[#FAF9F5] border-zinc-200 text-zinc-800 focus:border-[#9E7A44]'
                            }`}
                            placeholder="Ej. Paciente Anónimo"
                          />
                        </div>
                      </div>

                      <div>
                        <label className={`block text-[11px] ${isDarkMode ? 'text-gold-accent' : 'text-[#9E7A44] font-semibold'} font-mono mb-1`}>CORREO ELECTRÓNICO ENCRIPTADO</label>
                        <div className="relative">
                          <Activity className={`absolute left-3 top-2.5 w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-zinc-400'}`} />
                          <input 
                            type="email" 
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            className={`w-full border rounded-xl py-2 px-9 text-xs focus:outline-none transition-all ${
                              isDarkMode 
                                ? 'bg-card-zinc border-white/[0.08] text-white focus:border-gold-accent' 
                                : 'bg-[#FAF9F5] border-zinc-200 text-zinc-800 focus:border-[#9E7A44]'
                            }`}
                            placeholder="correo@ejemplo.com"
                          />
                        </div>
                        <p className={`text-[9px] ${isDarkMode ? 'text-white/40' : 'text-zinc-500'} mt-1`}>
                          Encriptado con algoritmo local SHA-256 para demostración.
                        </p>
                      </div>

                      <div className={`p-3 rounded-xl flex gap-2 border transition-colors ${
                        isDarkMode ? 'bg-jade-green/5 border-jade-green/20 text-jade-green/95' : 'bg-emerald-50/70 border-emerald-100 text-emerald-800'
                      }`}>
                        <CheckCircle2 className="w-4 h-4 text-jade-green shrink-0 mt-0.5" />
                        <span className="text-[10px] leading-snug">
                          <strong>Base de datos local activa:</strong> No se enviarán credenciales a internet durante esta simulación de MVP.
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setHasCompletedAuth(true);
                        setCurrentScreen('survey');
                        showToast('Registro de paciente completado. Iniciando encuesta.');
                      }}
                      className="w-full bg-gold-accent hover:bg-gold-accent/90 text-jet-black py-3.5 rounded-xl text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Comenzar Evaluación</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                )}

                {/* 4. SURVEY EVALUATION SCREEN (DYNAMIC & ADAPTIVE) */}
                {currentScreen === 'survey' && currentQuestion && (
                  <motion.div
                    key="survey"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="flex-1 flex flex-col justify-between"
                  >
                    {/* Progress Indicator */}
                    <div>
                      <div className={`flex justify-between items-center text-[10px] font-mono mb-1 ${isDarkMode ? 'text-white/60' : 'text-zinc-500'}`}>
                        <span>Paso {currentQuestionIndex + 1} de {activeQuestions.length}</span>
                        <span className={`${isDarkMode ? 'text-gold-accent' : 'text-[#9E7A44]'} font-semibold`}>{Math.round(((currentQuestionIndex + 1) / activeQuestions.length) * 100)}%</span>
                      </div>
                      <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/[0.05]' : 'bg-zinc-200'}`}>
                        <div 
                          className="h-full bg-gradient-to-r from-electric-indigo to-jade-green transition-all duration-300"
                          style={{ width: `${((currentQuestionIndex + 1) / activeQuestions.length) * 100}%` }}
                        ></div>
                      </div>

                      {/* Domain Badge & Info */}
                      <div className="mt-4 flex flex-wrap gap-2 items-center justify-between">
                        <span className={`text-[9px] tracking-wider uppercase border px-2 py-0.5 rounded font-bold transition-colors ${
                          isDarkMode 
                            ? 'bg-electric-indigo/15 text-gold-accent border-gold-accent/30' 
                            : 'bg-indigo-50 text-[#9E7A44] border-[#9E7A44]/20'
                        }`}>
                          {currentQuestion.dominio === 1 && "Dom 1: Autoviolencia Psicológica"}
                          {currentQuestion.dominio === 2 && "Dom 2: Autoviolencia Física"}
                          {currentQuestion.dominio === 3 && "Dom 3: Alerta de Alto Riesgo"}
                        </span>
                        <span className={`text-[10px] italic font-mono ${isDarkMode ? 'text-white/40' : 'text-zinc-400'}`}>ID: {currentQuestion.id}</span>
                      </div>
                    </div>

                    {/* Question Card Box */}
                    <div className={`my-4 border rounded-2xl p-5 flex-1 flex flex-col justify-center text-center transition-all ${
                      isDarkMode ? 'bg-card-zinc border-white/[0.06]' : 'bg-[#FAF9F5] border-zinc-200/80 shadow-xs'
                    }`}>
                      <span className={`text-[10px] tracking-widest uppercase font-mono block mb-2 ${isDarkMode ? 'text-gold-accent' : 'text-[#9E7A44] font-semibold'}`}>
                        {currentQuestion.categoria} ({currentQuestion.tipo})
                      </span>
                      <h3 className={`font-serif text-lg leading-relaxed font-medium ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>
                        "{currentQuestion.pregunta}"
                      </h3>
                    </div>

                    {/* Likert Scale Selection */}
                    <div className="space-y-2.5">
                      {[
                        { label: 'Nunca', desc: 'No se presenta', points: 0 },
                        { label: 'Rara Vez', desc: '1 o 2 veces al mes', points: 1 },
                        { label: 'Frecuentemente', desc: '1 a 3 veces por semana', points: 2 },
                        { label: 'Siempre', desc: 'A diario / automatizado', points: 3 },
                      ].map((opt) => (
                        <button
                          key={opt.points}
                          onClick={() => handleSelectOption(opt.points)}
                          className={`w-full border p-3 rounded-xl transition-all text-left flex items-center justify-between group active:scale-[0.98] cursor-pointer ${
                            isDarkMode 
                              ? 'bg-dark-zinc/80 hover:bg-card-zinc border-white/[0.05] hover:border-gold-accent/50' 
                              : 'bg-white hover:bg-zinc-50 border-zinc-200/85 hover:border-[#9E7A44]/50 shadow-xs'
                          }`}
                        >
                          <div>
                            <span className={`text-xs font-bold block transition-colors ${isDarkMode ? 'text-white group-hover:text-gold-accent' : 'text-zinc-800 group-hover:text-[#9E7A44]'}`}>{opt.label}</span>
                            <span className={`text-[10px] ${isDarkMode ? 'text-white/50' : 'text-zinc-500'}`}>{opt.desc}</span>
                          </div>
                          <span className={`text-[11px] font-mono border px-2 py-1 rounded ${
                            isDarkMode ? 'text-gold-accent bg-black/30 border-white/5' : 'text-[#9E7A44] bg-zinc-100 border-zinc-200/60'
                          }`}>
                            +{opt.points} pts
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Survey Navigation Controls */}
                    <div className={`mt-4 pt-3 border-t flex justify-between items-center ${isDarkMode ? 'border-white/[0.05]' : 'border-zinc-200'}`}>
                      <button
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                        className={`text-xs py-2 px-3 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                          currentQuestionIndex === 0 
                            ? isDarkMode ? 'text-white/20 cursor-not-allowed' : 'text-zinc-300 cursor-not-allowed' 
                            : isDarkMode ? 'text-white/60 hover:text-white bg-white/5' : 'text-zinc-600 hover:text-zinc-900 bg-zinc-200/80'
                        }`}
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Atrás</span>
                      </button>
                      
                      <span className={`text-[10px] italic ${isDarkMode ? 'text-white/40' : 'text-zinc-400'}`}>
                        {currentQuestion.dominio === 3 && <span className="text-rose-400 font-semibold animate-pulse">Reactivo Crítico SOS</span>}
                        {currentQuestion.dominio === 1 && "Fase Inicial Diagnóstica"}
                        {currentQuestion.dominio === 2 && "Fase Física Expandida"}
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* 5. RESULTS SCREEN */}
                {currentScreen === 'results' && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex-1 flex flex-col justify-between text-left"
                  >
                    <div className="text-center pt-2">
                      <span className={`text-[10px] tracking-[3px] uppercase font-bold ${isDarkMode ? 'text-jade-green' : 'text-emerald-700'}`}>Evaluación</span>
                      <h2 className={`font-serif text-2xl font-bold mt-0.5 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Resultado Clínico</h2>
                    </div>

                    {/* Visual Ring Gauge */}
                    <div className={`my-4 border rounded-2xl p-4 flex flex-col items-center transition-all ${
                      isDarkMode ? 'bg-card-zinc border-white/[0.06]' : 'bg-[#FAF9F5] border-zinc-200/80 shadow-xs'
                    }`}>
                      
                      {/* Score Value Circle */}
                      <div className="relative w-28 h-28 flex items-center justify-center">
                        <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="42" stroke={isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"} strokeWidth="6" fill="transparent" />
                          <circle 
                            cx="50" cy="50" r="42" 
                            stroke={scoreResults.matchedZone.color} 
                            strokeWidth="6" 
                            fill="transparent" 
                            strokeDasharray={263.8}
                            strokeDashoffset={263.8 - (263.8 * scoreResults.scaledScore) / 186}
                            strokeLinecap="round"
                            className="transition-all duration-1000"
                          />
                        </svg>
                        <div className="text-center">
                          <span className={`text-2xl font-bold font-serif ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{scoreResults.scaledScore}</span>
                          <span className={`text-[9px] block border-t mt-0.5 pt-0.5 font-mono ${isDarkMode ? 'text-white/40 border-white/10' : 'text-zinc-500 border-zinc-200'}`}>de 186 pts</span>
                        </div>
                      </div>

                      {/* Diagnostic Zone Label */}
                      <span className={`text-sm tracking-wider mt-3 uppercase ${getZoneTextClass(scoreResults.matchedZone.name, isDarkMode)}`}>
                        Zona {scoreResults.matchedZone.name}
                      </span>
                      <p className={`text-[11px] leading-relaxed text-center mt-2 max-w-[280px] ${isDarkMode ? 'text-white/70' : 'text-zinc-600'}`}>
                        {scoreResults.matchedZone.description}
                      </p>
                    </div>

                    {/* Guidelines and Transition Path */}
                    <div className="space-y-2 mb-4">
                      <span className={`text-[10px] tracking-wider uppercase font-bold block mb-1 ${isDarkMode ? 'text-gold-accent' : 'text-[#9E7A44]'}`}>
                        Pautas del Plan Amor Ágape:
                      </span>
                      {scoreResults.matchedZone.guidelines.map((g, idx) => (
                        <div key={idx} className={`flex items-start gap-2 text-[10.5px] leading-normal p-2 rounded-lg border transition-all ${
                          isDarkMode ? 'text-white/80 bg-black/10 border-white/[0.03]' : 'text-zinc-700 bg-white border-zinc-200/60 shadow-xs'
                        }`}>
                          <CheckCircle2 className="w-3.5 h-3.5 text-jade-green shrink-0 mt-0.5" />
                          <span>{g}</span>
                        </div>
                      ))}
                    </div>

                    {/* Actions and WhatsApp Simulation */}
                    <div className="space-y-2">
                      <button
                        onClick={() => showToast('Abriendo enlace seguro para agendar cita con Clínica NICÓMACO...')}
                        className="w-full bg-jade-green hover:bg-jade-green/90 text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-jade-green/10 cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Agendar Sesión de Consulta</span>
                      </button>

                      <button
                        onClick={() => restartSurvey()}
                        className={`w-full text-xs py-2.5 rounded-xl border transition-all cursor-pointer ${
                          isDarkMode 
                            ? 'bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white border-white/[0.05]' 
                            : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-950 border-zinc-200'
                        }`}
                      >
                        Reiniciar Diagnóstico
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 6. CRITICAL SOS SCREEN (HIJACK MODE) */}
                {currentScreen === 'sos' && (
                  <motion.div
                    key="sos"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex-1 flex flex-col justify-between text-center py-2"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-red-950/50 border border-red-500/40 flex items-center justify-center mb-3 animate-pulse">
                        <ShieldAlert className="w-9 h-9 text-red-500" />
                      </div>
                      
                      {triggeringQuestion && (
                        <div className="mb-3 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-[10.5px] max-w-[95%] mx-auto font-mono flex flex-col gap-0.5 shadow-sm">
                          <span className="font-extrabold uppercase text-[9px] text-red-300 tracking-wider">Reactivo Detonante</span>
                          <span className={`font-sans text-xs font-semibold leading-snug ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>
                            Nivel {triggeringQuestion.nivel}: {triggeringQuestion.categoria}
                          </span>
                        </div>
                      )}

                      <span className="text-[10px] tracking-[4px] uppercase text-red-400 font-extrabold animate-pulse">
                        S.O.S - APOYO INMEDIATO
                      </span>
                      <h2 className={`font-serif text-2xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Tu vida vale oro</h2>
                      <p className={`text-[11px] leading-relaxed mt-2 ${isDarkMode ? 'text-white/70' : 'text-zinc-600'}`}>
                        Pausamos el cuestionario porque has seleccionado conductas críticas de alto riesgo o autolesión. 
                        <strong> No estás solo(a)</strong>. Mereces un trato lleno de compasión y contención inmediata.
                      </p>
                    </div>

                    <div className="my-4 space-y-2 text-left">
                      <span className="text-[10px] text-red-400 font-mono block">LÍNEAS DE CRISIS DE ATENCIÓN GRATUITA (MÉXICO & LATAM):</span>
                      
                      {/* Emergency Line 1 */}
                      <a 
                        href="tel:8009112000"
                        onClick={(e) => {
                          e.preventDefault();
                          showToast('Simulando marcado directo: 800 911 2000');
                        }}
                        className={`block border p-2.5 rounded-xl transition-all ${isDarkMode ? 'bg-[#1E121E] hover:bg-[#2D162D] border-red-950' : 'bg-rose-50/40 hover:bg-rose-50 border-rose-100'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-rose-500" />
                            <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Línea de la Vida</span>
                          </div>
                          <span className="text-[11px] font-mono text-rose-400 font-bold">800 911 2000</span>
                        </div>
                        <p className={`text-[9.5px] mt-1 leading-snug ${isDarkMode ? 'text-white/50' : 'text-zinc-500'}`}>
                          Servicio federal de contención psicológica confidencial, disponible las 24 horas del año.
                        </p>
                      </a>

                      {/* Emergency Line 2 */}
                      <a 
                        href="tel:5552598121"
                        onClick={(e) => {
                          e.preventDefault();
                          showToast('Simulando marcado directo: 55 5259 8121');
                        }}
                        className={`block border p-2.5 rounded-xl transition-all ${isDarkMode ? 'bg-[#121E1E] hover:bg-[#162D2D] border-emerald-950' : 'bg-emerald-50/40 hover:bg-emerald-50 border-emerald-100'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-emerald-400" />
                            <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>SAPTEL (Cruz Roja)</span>
                          </div>
                          <span className="text-[11px] font-mono text-emerald-400 font-bold">55 5259 8121</span>
                        </div>
                        <p className={`text-[9.5px] mt-1 leading-snug ${isDarkMode ? 'text-white/50' : 'text-zinc-500'}`}>
                          Atención especializada por la Cruz Roja Mexicana. Apoyo en crisis psicológica.
                        </p>
                      </a>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={() => showToast('Redirigiendo prioritariamente a terapeutas de NICÓMACO...')}
                        className="w-full bg-gold-accent hover:bg-gold-accent/90 text-jet-black text-xs font-bold py-3 rounded-xl transition-all cursor-pointer"
                      >
                        Llamar a Clínica NICÓMACO
                      </button>

                      <button
                        onClick={() => restartSurvey()}
                        className={`w-full text-[10px] py-1.5 rounded-lg transition-all cursor-pointer ${
                          isDarkMode ? 'bg-white/5 text-white/50 hover:text-white' : 'bg-zinc-100 text-zinc-500 hover:text-zinc-800'
                        }`}
                      >
                        Reiniciar Diagnóstico
                      </button>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Simulated home indicator */}
            <div className="pb-1 pt-2 flex justify-center">
              <div className={`w-32 h-1 rounded-full ${isDarkMode ? 'bg-white/20' : 'bg-zinc-300'}`}></div>
            </div>
          </div>
          
          <p className={`text-xs mt-3 font-mono ${isDarkMode ? 'text-white/40' : 'text-zinc-500'}`}>
            Interacción 100% fiel al diseño móvil Flutter
          </p>
        </section>


        {/* RIGHT COLUMN: Interactive Specs, Flutter Code & Path Simulator (Col Span 7) */}
        <section className="lg:col-span-7 space-y-6">
          
          {/* Workspace Tabs Navigator */}
          <div className={`rounded-2xl p-1.5 border flex gap-2 transition-all ${
            isDarkMode ? 'bg-dark-zinc border-white/[0.06]' : 'bg-[#FAF9F5] border-zinc-200 shadow-xs'
          }`}>
            {[
              { id: 'specs', label: 'Estructura & Psico-Método', icon: Layers },
              { id: 'flutter', label: 'Código Flutter (main.dart)', icon: Code },
              { id: 'simulators', label: 'Consola de Caminos (Pruebas)', icon: Activity },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveWorkspaceTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeWorkspaceTab === tab.id
                      ? 'bg-gold-accent text-jet-black shadow-md'
                      : isDarkMode 
                        ? 'text-white/60 hover:text-white hover:bg-white/[0.04]' 
                        : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* ACTIVE TAB CONTENT WINDOW */}
          <div className={`border rounded-3xl p-6 min-h-[500px] flex flex-col justify-between transition-all ${
            isDarkMode ? 'bg-dark-zinc border-white/[0.06]' : 'bg-white border-zinc-200/80 shadow-xs'
          }`}>
            
            {/* TAB 1: SPECS & METHODOLOGY */}
            {activeWorkspaceTab === 'specs' && (
              <div className="space-y-6 text-left">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className={`w-5 h-5 ${isDarkMode ? 'text-gold-accent' : 'text-[#9E7A44]'}`} />
                    <h3 className={`font-serif text-xl font-bold ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Modelo Teórico: Cero Amor vs Amor Ágape</h3>
                  </div>
                  <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-white/70' : 'text-zinc-600'}`}>
                    Diseñado clínicamente por <strong>Blanca Estela Angulo López</strong>, el Autoviolentómetro mide la conducta dañina autoinfligida en 31 niveles progresivos agrupados en tres grandes dimensiones. El MVP digitaliza de manera fidedigna los reactivos de muestra para comprobar el comportamiento algorítmico y la aceptación de consentimiento ético.
                  </p>
                </div>

                {/* Psychometric Thresholds Grid */}
                <div className="space-y-3">
                  <span className={`text-xs font-mono uppercase tracking-wider block ${isDarkMode ? 'text-gold-accent' : 'text-[#9E7A44] font-semibold'}`}>Matriz de Puntuaciones y Zonas Clínicas:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SCORE_ZONES.map((zone) => (
                      <div 
                        key={zone.name}
                        className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all ${getZoneBgClass(zone.name, isDarkMode)}`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-xs font-bold uppercase tracking-wider ${getZoneTextClass(zone.name, isDarkMode)}`}>
                            Zona {zone.name}
                          </span>
                          <span className={`text-[11px] font-mono border px-2 py-0.5 rounded ${
                            isDarkMode ? 'text-white/50 bg-black/20 border-white/5' : 'text-zinc-500 bg-zinc-100 border-zinc-200/60'
                          }`}>
                            {zone.minScore} - {zone.maxScore} pts
                          </span>
                        </div>
                        <p className={`text-[11.5px] leading-relaxed ${isDarkMode ? 'text-white/75' : 'text-zinc-650'}`}>
                          {zone.description.split(':')[1] || zone.description}
                        </p>
                        <span className={`text-[10px] font-mono mt-2 block border-t pt-1.5 ${
                          isDarkMode ? 'text-white/40 border-white/[0.05]' : 'text-zinc-400 border-zinc-200'
                        }`}>
                          {zone.clinicalFocus}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Adaptive logic and flow chart */}
                <div className={`p-4 rounded-xl border transition-colors ${
                  isDarkMode ? 'bg-black/40 border-white/[0.04]' : 'bg-[#FAF9F5] border-zinc-200/80 shadow-xs'
                }`}>
                  <h4 className={`text-xs font-bold mb-2 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>
                    <span className={`w-2 h-2 rounded-full animate-pulse ${isDarkMode ? 'bg-gold-accent' : 'bg-[#9E7A44]'}`}></span>
                    Demostración del Flujo Adaptativo (Fórmula SDD)
                  </h4>
                  <p className={`text-xs leading-relaxed mb-3 ${isDarkMode ? 'text-white/60' : 'text-zinc-600'}`}>
                    El sistema optimiza el tiempo y fatiga del paciente. Al iniciar las 8 preguntas del <strong>Dominio 1 (Autoviolencia Emocional)</strong>, si la suma de puntos es <strong>&lt; 3</strong> (baja gravedad inicial), el algoritmo **salta automáticamente** el Dominio 2 (físico) y pasa directamente al Dominio 3 de descarte vital.
                  </p>
                  <div className={`flex items-center justify-center flex-wrap gap-3 py-2 rounded-lg text-[10px] font-mono transition-colors ${
                    isDarkMode ? 'bg-black/40 text-white/80' : 'bg-zinc-100/80 text-zinc-700'
                  }`}>
                    <span className={`px-2 py-1 rounded ${isDarkMode ? 'bg-white/5' : 'bg-white border border-zinc-200 shadow-2xs'}`}>Dom 1 (Q01-Q08)</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                    <span className={`border px-2 py-1 rounded ${
                      isDarkMode ? 'bg-amber-950/40 text-amber-300 border-amber-800/40' : 'bg-amber-50 text-amber-800 border-amber-200 shadow-2xs'
                    }`}>¿Suma &lt; 3?</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                    <span className={`border px-2 py-1 rounded ${
                      isDarkMode ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40' : 'bg-emerald-50 text-emerald-800 border-emerald-200 shadow-2xs'
                    }`}>Sí: Salto a Dom 3</span>
                    <span className="opacity-20">|</span>
                    <span className={`border px-2 py-1 rounded ${
                      isDarkMode ? 'bg-rose-950/40 text-rose-300 border-rose-800/40' : 'bg-rose-50 text-rose-800 border-rose-200 shadow-2xs'
                    }`}>No: Muestra Dom 2</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: FLUTTER CODE VIEW & COPY */}
            {activeWorkspaceTab === 'flutter' && (
              <div className="space-y-4 text-left flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Code className={`w-5 h-5 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                      <h3 className={`font-serif text-lg font-bold ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Código Fuente para DartPad / Flutter</h3>
                    </div>
                    <button
                      onClick={copyFlutterCodeToClipboard}
                      className="bg-gold-accent hover:bg-gold-accent/90 text-jet-black text-xs font-bold py-2 px-4 rounded-xl flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      {copiedFlutter ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedFlutter ? '¡Copiado!' : 'Copiar Código'}</span>
                    </button>
                  </div>
                  <p className={`text-xs leading-relaxed mb-4 ${isDarkMode ? 'text-white/60' : 'text-zinc-600'}`}>
                    Este código Dart contiene la estructura exacta de widgets, el motor de navegación dinámica adaptativa y la lógica de contención SOS. Es un archivo de entrada 100% autónomo listo para correr de inmediato en <a href="https://dartpad.dev" target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'text-gold-accent' : 'text-[#9E7A44]'} underline font-semibold`}>DartPad (con soporte Flutter)</a>, FlutterFlow, o en un simulador local.
                  </p>
                </div>

                {/* Scrollable code viewer */}
                <div className={`rounded-2xl p-4 border overflow-y-auto max-h-[380px] font-mono text-xs select-text relative transition-colors ${
                  isDarkMode ? 'bg-[#050507] border-white/[0.06] text-white/80' : 'bg-zinc-900 border-zinc-200 text-zinc-100 shadow-inner'
                }`}>
                  <pre className="whitespace-pre">{FLUTTER_CODE_PROTOTYPE}</pre>
                </div>

                <div className={`border p-3.5 rounded-xl flex gap-3 mt-4 text-left transition-colors ${
                  isDarkMode ? 'bg-white/[0.02] border-white/[0.05]' : 'bg-[#FAF9F5] border-zinc-200/80 shadow-xs'
                }`}>
                  <Info className={`w-5 h-5 shrink-0 mt-0.5 ${isDarkMode ? 'text-gold-accent' : 'text-[#9E7A44]'}`} />
                  <div className="space-y-1">
                    <span className={`text-xs font-bold ${isDarkMode ? 'text-gold-accent' : 'text-[#9E7A44]'}`}>Instrucciones de Ejecución:</span>
                    <ol className={`list-decimal list-inside text-[11px] space-y-1 ${isDarkMode ? 'text-white/70' : 'text-zinc-650'}`}>
                      <li>Haz clic en el botón <strong>"Copiar Código"</strong> superior.</li>
                      <li>Abre <a href="https://dartpad.dev" target="_blank" rel="noopener noreferrer" className={`font-semibold underline ${isDarkMode ? 'text-gold-accent' : 'text-[#9E7A44]'}`}>DartPad.dev</a> en una pestaña de tu navegador.</li>
                      <li>Asegúrate de seleccionar el canal <strong>"Flutter"</strong> en lugar de Dart básico.</li>
                      <li>Reemplaza todo el código por el copiado y presiona <strong>"Run"</strong> para ver e interactuar con el MVP en Flutter.</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: PATH SIMULATORS AND QA AUDITING */}
            {activeWorkspaceTab === 'simulators' && (
              <div className="space-y-6 text-left">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    <h3 className={`font-serif text-xl font-bold ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Consola de Caminos Críticos (QA)</h3>
                  </div>
                  <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-white/70' : 'text-zinc-600'}`}>
                    Usa esta consola diseñada especialmente para el equipo clínico y de desarrollo. Te permite saltar instantáneamente a escenarios clave y verificar la validez psicométrica, el cálculo adaptativo y la visualización de recomendaciones sin necesidad de responder la encuesta manualmente.
                  </p>
                </div>

                {/* Simulated Path Triggers */}
                <div className="space-y-4">
                  <span className={`text-xs font-mono uppercase tracking-wider block ${isDarkMode ? 'text-gold-accent' : 'text-[#9E7A44]'}`}>Selecciona un Escenario de Prueba:</span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Scenario 1: Green Zone (Skip active) */}
                    <button
                      onClick={() => runPresetSimulation('green')}
                      className={`border p-4 rounded-2xl text-left transition-all group cursor-pointer ${
                        isDarkMode 
                          ? 'bg-card-zinc hover:bg-white/[0.02] border-white/[0.04]' 
                          : 'bg-[#FAF9F5] hover:bg-zinc-50 border-zinc-200/80 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <CheckCircle2 className="w-4.5 h-4.5 text-[#10B981]" />
                        <span className={`text-xs font-bold transition-colors ${isDarkMode ? 'text-white group-hover:text-gold-accent' : 'text-zinc-800 group-hover:text-[#9E7A44]'}`}>Zona Verde (Salto Adaptativo)</span>
                      </div>
                      <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-zinc-500'}`}>
                        Establece baja autoviolencia en Dominio 1 (Suma &lt; 3). El sistema se saltará el Dominio 2 y te llevará a un resultado Verde sano.
                      </p>
                    </button>

                    {/* Scenario 2: Yellow Zone */}
                    <button
                      onClick={() => runPresetSimulation('yellow')}
                      className={`border p-4 rounded-2xl text-left transition-all group cursor-pointer ${
                        isDarkMode 
                          ? 'bg-card-zinc hover:bg-white/[0.02] border-white/[0.04]' 
                          : 'bg-[#FAF9F5] hover:bg-zinc-50 border-zinc-200/80 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <AlertTriangle className="w-4.5 h-4.5 text-amber-500" />
                        <span className={`text-xs font-bold transition-colors ${isDarkMode ? 'text-white group-hover:text-gold-accent' : 'text-zinc-800 group-hover:text-[#9E7A44]'}`}>Zona Amarilla (Evaluación Completa)</span>
                      </div>
                      <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-zinc-500'}`}>
                        Suma puntaje en Dominio 1 (Suma &gt;= 3). Se habilita el Dominio 2 y el Dominio 3 completo, mostrando un resultado de alerta preventiva moderada.
                      </p>
                    </button>

                    {/* Scenario 3: Red Zone */}
                    <button
                      onClick={() => runPresetSimulation('red')}
                      className={`border p-4 rounded-2xl text-left transition-all group cursor-pointer ${
                        isDarkMode 
                          ? 'bg-card-zinc hover:bg-white/[0.02] border-white/[0.04]' 
                          : 'bg-[#FAF9F5] hover:bg-zinc-50 border-zinc-200/80 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <HeartOff className="w-4.5 h-4.5 text-rose-500" />
                        <span className={`text-xs font-bold transition-colors ${isDarkMode ? 'text-white group-hover:text-gold-accent' : 'text-zinc-800 group-hover:text-[#9E7A44]'}`}>Zona Roja (Autoviolencia Severa)</span>
                      </div>
                      <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-zinc-500'}`}>
                        Asigna conductas punitivas severas de forma global. El diagnóstico sugiere apoyo asistido firme en Clínica NICÓMACO.
                      </p>
                    </button>

                    {/* Scenario 4: SOS Redirection */}
                    <button
                      onClick={() => runPresetSimulation('sos-critical')}
                      className={`border p-4 rounded-2xl text-left transition-all group cursor-pointer ${
                        isDarkMode 
                          ? 'bg-card-zinc hover:bg-white/[0.02] border-white/[0.04]' 
                          : 'bg-[#FAF9F5] hover:bg-zinc-50 border-zinc-200/80 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <ShieldAlert className="w-4.5 h-4.5 text-red-500" />
                        <span className={`text-xs font-bold transition-colors ${isDarkMode ? 'text-white group-hover:text-gold-accent' : 'text-zinc-800 group-hover:text-[#9E7A44]'}`}>Secuestro de Pantalla SOS (reactivo Q55)</span>
                      </div>
                      <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-zinc-500'}`}>
                        Al responder "Siempre" o "Frecuentemente" en Q55/Q59, se detiene el test y se muestra de inmediato la pantalla de auxilio.
                      </p>
                    </button>

                  </div>
                </div>

                <div className={`border p-4 rounded-2xl text-xs leading-relaxed transition-all ${
                  isDarkMode ? 'bg-white/[0.02] border-white/[0.05] text-white/80' : 'bg-[#FAF9F5] border-zinc-200/80 text-zinc-650'
                }`}>
                  <strong>Paso 4 del SDD:</strong> El motor de reglas de este prototipo calcula y comprueba las mismas variables de estado local que se desplegarán en Firebase Cloud Functions más adelante.
                </div>
              </div>
            )}

            {/* Bottom Credit Area */}
            <div className={`mt-8 pt-4 border-t flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono gap-2 transition-all ${
              isDarkMode ? 'border-white/[0.04] text-white/30' : 'border-zinc-200 text-zinc-400'
            }`}>
              <span>PROTOTIPO MVP DE DEMOSTRACIÓN - VERSIÓN 1.0</span>
              <span>CLÍNICA NICÓMACO &copy; 2026</span>
            </div>

          </div>
        </section>

      </main>

      {/* Brand Values Info Banner */}
      <footer className={`mt-12 border-t py-8 px-6 text-center text-xs font-mono transition-colors ${
        isDarkMode ? 'border-white/[0.06] bg-jet-black text-white/40' : 'border-zinc-200 bg-[#FAF9F5] text-zinc-500'
      }`}>
        <div className="max-w-4xl mx-auto space-y-4">
          <div className={`flex justify-center flex-wrap gap-6 ${isDarkMode ? 'text-white/60' : 'text-zinc-600'}`}>
            <span>AESTHETIC: Clinical & Professional</span>
            <span>TONE OF VOICE: Empathetic & Warm</span>
            <span>PRINCIPLE: Transformative & Uplifting</span>
          </div>
          <p className="max-w-xl mx-auto leading-relaxed">
            "Transforma tu vida hacia el amor verdadero, sano y libre." Módulo desarrollado con apego estricto al Brandbook de la Clínica NICÓMACO.
          </p>
        </div>
      </footer>
    </div>
  );
}
