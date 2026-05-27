import type { DocumentStatus, Marker, MedicalDocument } from "./types";

export const profile = {
  name: "Анна Соколова",
  initials: "АС",
  meta: "32 г · Москва"
};

export const pregnancy = {
  startDate: "17 января 2026",
  dueDate: "24 октября 2026",
  currentWeek: 18,
  trimester: 2,
  nextScreening: "10 июня 2026"
};

export const historyDates = ["Май 2024", "Авг 2024", "Ноя 2024", "Фев 2025", "Май 2025", "Сен 2025"];

const baseMarkers = [
  { code: "HGB", name: "Гемоглобин", group: "Гематология", unit: "г/л", range: [120, 150], history: [128, 125, 122, 119, 121, 124], status: "mint" },
  { code: "RBC", name: "Эритроциты", group: "Гематология", unit: "×10¹²/л", range: [3.9, 4.7], history: [4.2, 4.1, 4.05, 3.95, 4, 4.15], status: "mint" },
  { code: "WBC", name: "Лейкоциты", group: "Гематология", unit: "×10⁹/л", range: [4, 9], history: [5.4, 6.1, 5.8, 6.4, 6.2, 6], status: "mint" },
  { code: "PLT", name: "Тромбоциты", group: "Гематология", unit: "×10⁹/л", range: [180, 320], history: [240, 235, 228, 244, 252, 248], status: "mint" },
  { code: "FER", name: "Ферритин", group: "Микроэлементы", unit: "нг/мл", range: [30, 150], history: [42, 38, 31, 24, 18, 22], status: "amber" },
  { code: "FE", name: "Железо сывороточное", group: "Микроэлементы", unit: "мкмоль/л", range: [9, 30], history: [16, 14, 11, 9.2, 8.4, 9.6], status: "amber" },
  { code: "VITD", name: "Витамин D, 25-OH", group: "Витамины", unit: "нг/мл", range: [30, 100], history: [22, 19, 17, 24, 31, 36], status: "mint" },
  { code: "TSH", name: "ТТГ", group: "Гормоны", unit: "мЕд/л", range: [0.4, 4], history: [2.1, 2.4, 2.8, 3.2, 3.6, 4.2], status: "amber" },
  { code: "LDL", name: "ЛПНП", group: "Биохимия", unit: "ммоль/л", range: [1, 3], history: [2.4, 2.5, 2.7, 2.9, 3, 3.1], status: "amber" },
  { code: "GLU", name: "Глюкоза", group: "Биохимия", unit: "ммоль/л", range: [3.9, 5.6], history: [4.8, 4.9, 5, 5.1, 5, 4.95], status: "mint" }
] satisfies Marker[];

export const markers: Marker[] = baseMarkers.map((marker) => ({
  ...marker,
  value: marker.history.at(-1) ?? 0
}));

export const documentStatusMeta: Record<DocumentStatus, { label: string; badge: string }> = {
  uploaded: { label: "загружен", badge: "badge-ghost" },
  processing: { label: "обработка", badge: "badge-sky" },
  requires_review: { label: "нужна проверка", badge: "badge-amber" },
  completed: { label: "готово", badge: "badge-mint" },
  error: { label: "ошибка", badge: "badge-coral" }
};

export const documents: MedicalDocument[] = [
  { id: 1, name: "Развёрнутый анализ крови", lab: "Инвитро · Москва", date: "12 сентября 2025", type: "pdf", size: "1.2 МБ", markers: 24, status: "completed", documentType: "Анализ крови" },
  { id: 2, name: "Биохимия + липидный профиль", lab: "Гемотест", date: "12 сентября 2025", type: "pdf", size: "0.8 МБ", markers: 14, status: "completed", documentType: "Биохимия" },
  { id: 3, name: "Гормоны щитовидной железы", lab: "KDL", date: "12 сентября 2025", type: "pdf", size: "0.6 МБ", markers: 4, status: "requires_review", documentType: "Гормоны" },
  { id: 4, name: "УЗИ щитовидной железы", lab: "МЕДСИ", date: "05 сентября 2025", type: "pdf", size: "2.4 МБ", markers: 0, status: "completed", documentType: "УЗИ" },
  { id: 5, name: "Заключение эндокринолога", lab: "Чайка", date: "20 сентября 2025", type: "docx", size: "0.3 МБ", markers: 0, status: "uploaded", documentType: "Заключение" },
  { id: 6, name: "IMG_3421.heic", lab: "фото из приложения", date: "24 сентября 2025", type: "img", size: "3.1 МБ", markers: 0, status: "processing", documentType: "Фото анализа" },
  { id: 7, name: "ocr_error_scan.png", lab: "ручная загрузка", date: "25 сентября 2025", type: "img", size: "2.8 МБ", markers: 0, status: "error", documentType: "Скан" }
];

export const markerDictionary = [
  { canonical: "Гемоглобин", aliases: ["Hb", "HGB", "Hemoglobin"], category: "Гематология", unit: "г/л" },
  { canonical: "Лейкоциты", aliases: ["WBC", "White blood cells"], category: "Гематология", unit: "×10⁹/л" },
  { canonical: "Ферритин", aliases: ["Ferritin", "FER"], category: "Микроэлементы", unit: "нг/мл" },
  { canonical: "ТТГ", aliases: ["TSH", "Thyroid-stimulating hormone"], category: "Гормоны", unit: "мЕд/л" }
];
