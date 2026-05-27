/* global window */
// Mock data for Анна Соколова, 32 г, Москва — 15+ blood markers + history

const PROFILE = {
  name: 'Анна Соколова',
  initials: 'АС',
  age: 32,
  city: 'Москва',
  sex: 'ж',
  birth: '14 апреля 1994',
};

const PROFILES = [
  { id: 'anna', name: 'Анна Соколова', type: 'Основной профиль', meta: '32 г · Москва', active: true },
  { id: 'pregnancy', name: 'Беременность', type: 'Специальный режим', meta: '18 неделя · ПДР 24.10.2026', active: false },
  { id: 'child', name: 'Миша', type: 'Ребёнок', meta: '4 года', active: false },
];

const PREGNANCY = {
  status: 'active',
  startDate: '17 января 2026',
  dueDate: '24 октября 2026',
  currentWeek: 18,
  trimester: 2,
  nextScreening: '10 июня 2026',
  markersToWatch: ['Гемоглобин', 'Ферритин', 'ТТГ', 'Глюкоза'],
};

// Each marker: name, code, value (latest), unit, range[low, high], history [oldest..latest], dates
const MARKERS = [
  { code: 'HGB',   name: 'Гемоглобин',          group: 'Гематология', unit: 'г/л',    range: [120, 150], history: [128, 125, 122, 119, 121, 124], status: 'mint' },
  { code: 'RBC',   name: 'Эритроциты',          group: 'Гематология', unit: '×10¹²/л', range: [3.9, 4.7], history: [4.2, 4.1, 4.05, 3.95, 4.0, 4.15], status: 'mint' },
  { code: 'WBC',   name: 'Лейкоциты',           group: 'Гематология', unit: '×10⁹/л',  range: [4.0, 9.0], history: [5.4, 6.1, 5.8, 6.4, 6.2, 6.0], status: 'mint' },
  { code: 'PLT',   name: 'Тромбоциты',          group: 'Гематология', unit: '×10⁹/л',  range: [180, 320], history: [240, 235, 228, 244, 252, 248], status: 'mint' },
  { code: 'MCV',   name: 'Средний объём эритр.',group: 'Гематология', unit: 'фл',     range: [80, 100],  history: [88, 87, 86, 84, 85, 86], status: 'mint' },
  { code: 'FER',   name: 'Ферритин',            group: 'Микроэлементы', unit: 'нг/мл',  range: [30, 150],  history: [42, 38, 31, 24, 18, 22], status: 'amber' },
  { code: 'FE',    name: 'Железо сывороточное',  group: 'Микроэлементы', unit: 'мкмоль/л', range: [9, 30], history: [16, 14, 11, 9.2, 8.4, 9.6], status: 'amber' },
  { code: 'B12',   name: 'Витамин B12',          group: 'Витамины', unit: 'пг/мл',  range: [200, 900], history: [410, 380, 350, 330, 380, 420], status: 'mint' },
  { code: 'VITD',  name: 'Витамин D, 25-OH',     group: 'Витамины', unit: 'нг/мл',  range: [30, 100], history: [22, 19, 17, 24, 31, 36], status: 'mint' },
  { code: 'FOL',   name: 'Фолиевая кислота',     group: 'Витамины', unit: 'нг/мл',  range: [3.1, 17],  history: [8.2, 7.8, 7.4, 8.1, 9.0, 9.4], status: 'mint' },
  { code: 'TSH',   name: 'ТТГ',                  group: 'Гормоны', unit: 'мЕд/л',  range: [0.4, 4.0], history: [2.1, 2.4, 2.8, 3.2, 3.6, 4.2], status: 'amber' },
  { code: 'T4',    name: 'Т4 свободный',         group: 'Гормоны', unit: 'пмоль/л', range: [9, 19],   history: [14, 13.5, 13, 12.6, 12.2, 11.8], status: 'mint' },
  { code: 'CHOL',  name: 'Холестерин общий',     group: 'Биохимия', unit: 'ммоль/л',range: [3.5, 5.2], history: [4.6, 4.7, 4.8, 5.0, 5.1, 5.3], status: 'amber' },
  { code: 'LDL',   name: 'ЛПНП',                 group: 'Биохимия', unit: 'ммоль/л',range: [1.0, 3.0], history: [2.4, 2.5, 2.7, 2.9, 3.0, 3.1], status: 'amber' },
  { code: 'HDL',   name: 'ЛПВП',                 group: 'Биохимия', unit: 'ммоль/л',range: [1.2, 2.5], history: [1.6, 1.55, 1.5, 1.48, 1.52, 1.58], status: 'mint' },
  { code: 'GLU',   name: 'Глюкоза',              group: 'Биохимия', unit: 'ммоль/л',range: [3.9, 5.6], history: [4.8, 4.9, 5.0, 5.1, 5.0, 4.95], status: 'mint' },
  { code: 'HBA1C', name: 'Гликированный гемогл.',group: 'Биохимия', unit: '%',     range: [4.0, 5.6], history: [5.0, 5.1, 5.2, 5.2, 5.3, 5.4], status: 'mint' },
  { code: 'ALT',   name: 'АЛТ',                  group: 'Биохимия', unit: 'Ед/л',   range: [0, 33],    history: [18, 20, 22, 24, 22, 19], status: 'mint' },
  { code: 'AST',   name: 'АСТ',                  group: 'Биохимия', unit: 'Ед/л',   range: [0, 32],    history: [21, 22, 24, 23, 22, 20], status: 'mint' },
  { code: 'CRP',   name: 'С-реактивный белок',   group: 'Воспаление', unit: 'мг/л',  range: [0, 5],     history: [0.8, 1.1, 1.4, 2.2, 1.8, 1.2], status: 'mint' },
  { code: 'CREAT', name: 'Креатинин',            group: 'Почки',    unit: 'мкмоль/л', range: [53, 97], history: [72, 70, 71, 69, 70, 71], status: 'mint' },
];

const HISTORY_DATES = ['Май 2024', 'Авг 2024', 'Ноя 2024', 'Фев 2025', 'Май 2025', 'Сен 2025'];

// "value" derived
MARKERS.forEach(m => { m.value = m.history[m.history.length - 1]; });

// Documents
const DOCUMENT_STATUS = {
  uploaded: { label: 'загружен', badge: 'badge-ghost' },
  processing: { label: 'обработка', badge: 'badge-sky' },
  requires_review: { label: 'нужна проверка', badge: 'badge-amber' },
  completed: { label: 'готово', badge: 'badge-mint' },
  error: { label: 'ошибка', badge: 'badge-coral' },
};

const DOCUMENTS = [
  { id: 1, name: 'Развёрнутый анализ крови', lab: 'Инвитро · Москва', date: '12 сентября 2025', type: 'pdf', size: '1.2 МБ', markers: 24, status: 'completed', documentType: 'Анализ крови' },
  { id: 2, name: 'Биохимия + липидный профиль', lab: 'Гемотест', date: '12 сентября 2025', type: 'pdf', size: '0.8 МБ', markers: 14, status: 'completed', documentType: 'Биохимия' },
  { id: 3, name: 'Гормоны щитовидной железы', lab: 'KDL', date: '12 сентября 2025', type: 'pdf', size: '0.6 МБ', markers: 4, status: 'requires_review', documentType: 'Гормоны' },
  { id: 4, name: 'УЗИ щитовидной железы', lab: 'МЕДСИ', date: '05 сентября 2025', type: 'pdf', size: '2.4 МБ', markers: 0, status: 'completed', documentType: 'УЗИ' },
  { id: 5, name: 'Заключение эндокринолога', lab: 'Чайка', date: '20 сентября 2025', type: 'docx', size: '0.3 МБ', markers: 0, status: 'uploaded', documentType: 'Заключение' },
  { id: 6, name: 'IMG_3421.heic', lab: 'фото из приложения', date: '24 сентября 2025', type: 'img', size: '3.1 МБ', markers: 0, status: 'processing', documentType: 'Фото анализа' },
  { id: 7, name: 'ocr_error_scan.png', lab: 'ручная загрузка', date: '25 сентября 2025', type: 'img', size: '2.8 МБ', markers: 0, status: 'error', documentType: 'Скан' },
];

const ULTRASOUNDS = [
  { id: 1, name: 'УЗИ щитовидной железы', date: '05.09.2025', clinic: 'МЕДСИ Грохольский', doctor: 'Иванова Е. С.',
    findings: 'Объём правой доли 6.2 мл, левой 5.8 мл. Контуры ровные, эхогенность не изменена. Узловые образования не визуализируются.',
    verdict: 'УЗ-картина без особенностей', status: 'mint' },
  { id: 2, name: 'УЗИ органов брюшной полости', date: '14.06.2025', clinic: 'Чайка Лужники', doctor: 'Петров А. М.',
    findings: 'Печень не увеличена, паренхима однородная. Желчный пузырь без конкрементов. Поджелудочная железа без особенностей.',
    verdict: 'Норма', status: 'mint' },
  { id: 3, name: 'УЗИ малого таза', date: '02.03.2025', clinic: 'МЕДСИ', doctor: 'Кравченко Л. И.',
    findings: 'Матка 47×35×42 мм, эндометрий 8.2 мм. Яичники типичной структуры. Свободной жидкости нет.',
    verdict: 'УЗ-картина без особенностей', status: 'mint' },
  { id: 4, name: 'УЗИ молочных желёз', date: '18.11.2024', clinic: 'Хадасса', doctor: 'Соколова М. В.',
    findings: 'Структура сохранена. Незначительная фиброзно-кистозная мастопатия. Регионарные л/у не увеличены.',
    verdict: 'BI-RADS 2', status: 'mint' },
];

const MARKER_DICTIONARY = [
  { canonical: 'Гемоглобин', aliases: ['Hb', 'HGB', 'Hemoglobin'], category: 'Гематология', unit: 'г/л' },
  { canonical: 'Лейкоциты', aliases: ['WBC', 'White blood cells'], category: 'Гематология', unit: '×10⁹/л' },
  { canonical: 'Тромбоциты', aliases: ['PLT', 'Platelets'], category: 'Гематология', unit: '×10⁹/л' },
  { canonical: 'Ферритин', aliases: ['Ferritin', 'FER'], category: 'Микроэлементы', unit: 'нг/мл' },
  { canonical: 'ТТГ', aliases: ['TSH', 'Thyroid-stimulating hormone'], category: 'Гормоны', unit: 'мЕд/л' },
];

Object.assign(window, { PROFILE, PROFILES, PREGNANCY, MARKERS, HISTORY_DATES, DOCUMENT_STATUS, DOCUMENTS, ULTRASOUNDS, MARKER_DICTIONARY });
