import { CardData, PlayerStats } from './types';

export const INITIAL_STATS: PlayerStats = {
  merit: 0,
  wisdom: 0,
  destiny: 50,
  turn: 1,
};

export const MAX_TURNS = 10;

export const DECK: CardData[] = [
  // Reform (改过)
  {
    id: 'c1',
    name: '知耻',
    type: 'Reform',
    description: '耻之于人大矣。以圣贤之行自责，生大羞耻心。',
    quote: '耻之于人大矣... 耻则圣贤，无耻则禽兽矣。'
  },
  {
    id: 'c2',
    name: '畏心',
    type: 'Reform',
    description: '举头三尺有神明，虽在暗室，不敢堕落。',
    quote: '天地在上，鬼神难欺。'
  },
  {
    id: 'c3',
    name: '勇心',
    type: 'Reform',
    description: '决断如流，由于过错，当机立断，不存犹豫。',
    quote: '须是奋发振作，不用迟疑，不烦等待。'
  },
  // Accumulate Goodness (积善)
  {
    id: 'c4',
    name: '布施',
    type: 'Accumulate',
    description: '舍财作福，解囊相助，内舍六根，外舍六尘。',
    quote: '施恩不求报，与人不追悔。'
  },
  {
    id: 'c5',
    name: '护法',
    type: 'Accumulate',
    description: '见人有善，即佐成之；维护正法，不使断绝。',
    quote: '见人有善，即佐成之。'
  },
  {
    id: 'c6',
    name: '爱敬',
    type: 'Accumulate',
    description: '君子所异于人者，以其存心也。爱人敬人，即敬圣贤。',
    quote: '爱敬存心... 敬众人即是敬圣贤。'
  },
  {
    id: 'c7',
    name: '救人',
    type: 'Accumulate',
    description: '救人一命，胜造七级浮屠。解人急难，功德无量。',
    quote: '救人一命，胜造七级浮屠。'
  },
  // Humility (谦德)
  {
    id: 'c8',
    name: '谦虚',
    type: 'Humility',
    description: '满招损，谦受益。虚怀若谷，鬼神相佑。',
    quote: '满招损，谦受益。'
  },
  {
    id: 'c9',
    name: '反省',
    type: 'Humility',
    description: '行有不得，皆反求诸己。常思己过。',
    quote: '行有不得，皆反求诸己。'
  },
  // Wisdom (立命)
  {
    id: 'c10',
    name: '立命',
    type: 'Wisdom',
    description: '命由我作，福自己求。信命者，不怨天，不尤人。',
    quote: '命由我作，福自己求。'
  },
  {
    id: 'c11',
    name: '静心',
    type: 'Wisdom',
    description: '正念现前，邪念自然污染不上。清净心即是福。',
    quote: '正念现前，邪念自然污染不上。'
  },
  {
    id: 'c12',
    name: '祖德',
    type: 'Wisdom',
    description: '积善之家，必有余庆。承祖宗之德，行仁义之事。',
    quote: '积善之家，必有余庆。'
  }
];