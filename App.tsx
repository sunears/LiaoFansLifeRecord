import React, { useState, useEffect, useCallback } from 'react';
import { GamePhase, PlayerStats, CardData, Scenario, ResolutionResult, LogEntry } from './types';
import { DECK, INITIAL_STATS, MAX_TURNS } from './constants';
import { generateScenario, resolveAction } from './services/geminiService';
import Card from './components/Card';
import StatsPanel from './components/StatsPanel';
import ScenarioView from './components/ScenarioView';
import ResultModal from './components/ResultModal';
import HelpModal from './components/HelpModal';

const App: React.FC = () => {
  // State
  const [phase, setPhase] = useState<GamePhase>(GamePhase.INIT);
  const [stats, setStats] = useState<PlayerStats>(INITIAL_STATS);
  const [hand, setHand] = useState<CardData[]>([]);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [resolution, setResolution] = useState<ResolutionResult | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState(false);

  // Init Game
  const startGame = useCallback(() => {
    setStats(INITIAL_STATS);
    setLogs([]);
    setPhase(GamePhase.SCENARIO_LOADING);
    startTurn(1, INITIAL_STATS);
  }, []);

  const startTurn = async (turnNumber: number, currentStats: PlayerStats) => {
    if (turnNumber > MAX_TURNS) {
      setPhase(GamePhase.GAME_OVER);
      return;
    }

    // Draw 3 random cards
    const shuffled = [...DECK].sort(() => 0.5 - Math.random());
    setHand(shuffled.slice(0, 3));
    setSelectedCard(null);
    setResolution(null);
    setErrorMsg(null);

    try {
      const scenario = await generateScenario(turnNumber, currentStats);
      setCurrentScenario(scenario);
      setPhase(GamePhase.PLAYER_TURN);
    } catch (err) {
      setErrorMsg("无法推演未来。请检查网络连接。");
      setPhase(GamePhase.PLAYER_TURN); // Fallback state, ideally handle better
    }
  };

  const handleCardSelect = (card: CardData) => {
    if (phase !== GamePhase.PLAYER_TURN) return;
    setSelectedCard(card);
  };

  const handleConfirmAction = async () => {
    if (!selectedCard || !currentScenario) return;

    setPhase(GamePhase.RESOLVING);

    try {
      const result = await resolveAction(currentScenario, selectedCard);
      setResolution(result);
      
      // Update Stats
      const newStats = {
        ...stats,
        merit: stats.merit + result.meritChange,
        wisdom: stats.wisdom + result.wisdomChange,
        destiny: stats.destiny + result.destinyChange,
      };
      setStats(newStats);

      // Log
      setLogs(prev => [...prev, {
        turn: stats.turn,
        scenarioTitle: currentScenario.title,
        actionCard: selectedCard.name,
        outcome: result.narrative,
        statsDelta: { m: result.meritChange, w: result.wisdomChange, d: result.destinyChange }
      }]);

      setPhase(GamePhase.RESULT);
    } catch (err) {
      setErrorMsg("天意静默 (API Error)");
      setPhase(GamePhase.PLAYER_TURN);
    }
  };

  const handleNextTurn = () => {
    const nextTurn = stats.turn + 1;
    if (nextTurn > MAX_TURNS || stats.destiny <= 0) {
      setPhase(GamePhase.GAME_OVER);
    } else {
      setStats(prev => ({ ...prev, turn: nextTurn }));
      setPhase(GamePhase.SCENARIO_LOADING);
      startTurn(nextTurn, stats);
    }
  };

  // UI Components
  return (
    <div className="min-h-screen flex flex-col bg-paper-white text-ink-black font-serif relative overflow-x-hidden overflow-y-auto">
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-64 bg-gradient-to-b from-stone-200 to-transparent opacity-50 pointer-events-none z-0"></div>
      
      {/* Header */}
      <header className="relative z-20 pt-6 pb-2 text-center shrink-0">
        <div className="absolute right-4 top-4 md:right-8 md:top-6 z-50">
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowHelp(true);
            }}
            className="bg-white/80 hover:bg-white border border-stone-300 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-lg shadow-md transition-all active:scale-95 cursor-pointer"
            title="玩法说明"
            aria-label="Help"
          >
            ?
          </button>
        </div>
        <h1 className="font-calligraphy text-4xl md:text-6xl text-ink-black drop-shadow-sm">
          了凡命谱
        </h1>
        <p className="text-xs md:text-base text-stone-600 mt-2 uppercase tracking-widest">Liaofan's Destiny</p>
      </header>

      {/* Main Game Area */}
      <main className="flex-grow flex flex-col items-center justify-start px-4 pb-12 z-10 max-w-6xl mx-auto w-full">
        
        {phase === GamePhase.INIT ? (
          <div className="flex flex-col items-center justify-center mt-10 md:mt-20 space-y-8 max-w-lg text-center px-4">
            <div className="space-y-2">
              <p className="font-calligraphy text-3xl md:text-4xl leading-normal">
                “命由我作，福自己求。”
              </p>
            </div>
            <p className="text-stone-600 italic text-sm md:text-base">
              历经十轮因果试炼，积功累德，以智慧改写命运。
            </p>
            
            {!process.env.API_KEY && (
               <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded text-sm">
                  警告: API Key 缺失，游戏无法正常运行。
               </div>
            )}

            <button 
              onClick={startGame}
              className="px-12 py-4 bg-ink-black text-paper-white text-lg md:text-xl rounded shadow-lg hover:bg-stone-800 transition-all font-calligraphy tracking-widest transform hover:scale-105 active:scale-95"
            >
              开始修行
            </button>
          </div>
        ) : phase === GamePhase.GAME_OVER ? (
           <div className="flex flex-col items-center justify-center mt-8 md:mt-20 space-y-6 md:space-y-8 bg-white p-6 md:p-10 rounded-xl shadow-2xl border-double border-4 border-stone-300 max-w-2xl w-full">
             <h2 className="text-3xl md:text-4xl font-calligraphy mb-2">命运判词</h2>
             <div className="grid grid-cols-3 gap-4 md:gap-8 text-center w-full">
                <div className="flex flex-col items-center">
                  <div className="text-xs text-stone-500 uppercase mb-1">最终功德</div>
                  <div className="text-2xl md:text-3xl font-bold text-amber-600">{stats.merit}</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-xs text-stone-500 uppercase mb-1">最终智慧</div>
                  <div className="text-2xl md:text-3xl font-bold text-indigo-600">{stats.wisdom}</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-xs text-stone-500 uppercase mb-1">生命力</div>
                  <div className="text-2xl md:text-3xl font-bold text-stone-800">{stats.destiny}</div>
                </div>
             </div>
             
             <div className="text-center mt-4 text-base md:text-lg leading-relaxed">
               {stats.merit > 50 && stats.wisdom > 30 
                 ? "【圣贤之路】你不仅改变了自己的命运，更造福了他人。你的名字将流芳百世。"
                 : stats.merit > 20 
                 ? "【积善之家】你坦然面对困境，虽未成圣，却拥有了充满意义与平和的一生。"
                 : "【浮沉之命】业力浪潮汹涌。切记，每一个当下都是重新开始的机会。"}
             </div>

             <button 
              onClick={startGame}
              className="px-8 py-3 mt-4 border-2 border-ink-black hover:bg-ink-black hover:text-white transition-colors rounded text-sm md:text-base font-bold tracking-wider"
            >
              再入轮回 (重玩)
            </button>
           </div>
        ) : (
          <>
            <StatsPanel stats={stats} />

            {/* Scenario Display */}
            <div className="w-full mt-4 mb-6 md:mb-8">
              <ScenarioView 
                scenario={currentScenario} 
                loading={phase === GamePhase.SCENARIO_LOADING} 
              />
            </div>

            {/* Hand Area */}
            <div className="w-full flex flex-col items-center space-y-4 md:space-y-6 pb-safe">
              {phase === GamePhase.PLAYER_TURN || phase === GamePhase.RESOLVING ? (
                <>
                   <div className="text-center text-stone-500 text-xs md:text-sm italic opacity-80">
                     选择一张卡牌来应对当前境遇
                   </div>
                   
                   {/* Responsive Card Grid */}
                   <div className="flex flex-wrap justify-center gap-3 md:gap-8 w-full px-2">
                    {hand.map((card) => (
                      <Card 
                        key={card.id} 
                        data={card} 
                        onClick={() => handleCardSelect(card)}
                        selected={selectedCard?.id === card.id}
                        disabled={phase === GamePhase.RESOLVING}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleConfirmAction}
                    disabled={!selectedCard || phase === GamePhase.RESOLVING}
                    className={`
                      mt-4 md:mt-8 px-10 py-3 rounded-full font-bold tracking-wider transition-all transform
                      ${selectedCard && phase !== GamePhase.RESOLVING
                        ? 'bg-seal-red text-white shadow-lg hover:scale-105 hover:shadow-xl active:scale-95' 
                        : 'bg-stone-300 text-stone-500 cursor-not-allowed'}
                    `}
                  >
                    {phase === GamePhase.RESOLVING ? '冥想因果...' : '确认抉择'}
                  </button>
                </>
              ) : null}
            </div>
          </>
        )}
      </main>
      
      {/* Modals */}
      {phase === GamePhase.RESULT && resolution && (
        <ResultModal result={resolution} onClose={handleNextTurn} />
      )}

      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />

      {/* Error Toast */}
      {errorMsg && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg z-50 max-w-[90vw]">
          <strong className="font-bold">错误: </strong>
          <span className="block sm:inline">{errorMsg}</span>
        </div>
      )}
      
      {/* Footer */}
      <footer className="text-center py-4 text-stone-400 text-[10px] md:text-xs mt-auto">
         致敬 《了凡四训》 | Google Gemini 驱动
      </footer>
    </div>
  );
};

export default App;