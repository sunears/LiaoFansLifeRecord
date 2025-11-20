import React from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-paper-white w-full max-w-2xl rounded-xl shadow-2xl border-2 border-stone-400 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-ink-black text-paper-white p-4 flex justify-between items-center">
          <h3 className="font-calligraphy text-2xl tracking-widest">玩法说明</h3>
          <button onClick={onClose} className="text-stone-400 hover:text-white text-2xl">&times;</button>
        </div>
        
        <div className="p-6 overflow-y-auto font-serif space-y-6 text-ink-black scrollbar-hide">
          <section>
            <h4 className="font-bold text-lg border-b border-stone-300 pb-2 mb-2 text-seal-red">游戏目标</h4>
            <p>
              游戏共 <strong>10 回合</strong>。你需要扮演一位修行者，在人生际遇中做出选择。
              目标是积累 <strong>功德</strong> 与 <strong>智慧</strong>，同时保持 <strong>命运 (生命力)</strong> 不枯竭。
            </p>
          </section>

          <section>
            <h4 className="font-bold text-lg border-b border-stone-300 pb-2 mb-2 text-seal-red">核心数值</h4>
            <ul className="list-disc list-inside space-y-1 text-stone-700">
              <li><span className="font-bold text-amber-600">功德 (Merit)</span>: 善行的积累，影响最终评价。</li>
              <li><span className="font-bold text-indigo-600">智慧 (Wisdom)</span>: 对道理的彻悟，助你看清因果。</li>
              <li><span className="font-bold text-stone-800">命运 (Destiny)</span>: 你的福报与生命力。若归零，则游戏结束。</li>
            </ul>
          </section>

          <section>
            <h4 className="font-bold text-lg border-b border-stone-300 pb-2 mb-2 text-seal-red">四训卡牌</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-2 bg-red-50 border border-red-100 rounded">
                <strong className="text-red-800 block">改过之法</strong>
                针对过错，发耻心、畏心、勇心。
              </div>
              <div className="p-2 bg-amber-50 border border-amber-100 rounded">
                <strong className="text-amber-800 block">积善之方</strong>
                广修善行，布施、护法、爱敬。
              </div>
              <div className="p-2 bg-green-50 border border-green-100 rounded">
                <strong className="text-green-800 block">谦德之效</strong>
                虚怀若谷，谦虚、反省。
              </div>
              <div className="p-2 bg-indigo-50 border border-indigo-100 rounded">
                <strong className="text-indigo-800 block">立命之学</strong>
                信命修身，静心、守祖德。
              </div>
            </div>
          </section>

          <section>
            <h4 className="font-bold text-lg border-b border-stone-300 pb-2 mb-2 text-seal-red">游戏流程</h4>
            <ol className="list-decimal list-inside space-y-2 text-stone-700">
              <li><strong>际遇生成</strong>: 每一回合，AI "天道" 会生成一个人生境遇。</li>
              <li><strong>抉择</strong>: 从手牌中选择一张最契合的卡牌来应对。</li>
              <li><strong>因果</strong>: AI 判官会根据你的选择判定结果，增减属性。</li>
            </ol>
          </section>
        </div>

        <div className="p-4 border-t border-stone-200 bg-stone-50 text-center">
          <button 
            onClick={onClose}
            className="px-8 py-2 bg-ink-black text-paper-white rounded hover:bg-stone-800 transition-colors font-bold"
          >
            明白了
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;