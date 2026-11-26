export const initialSessions = [
  {
    id: 1,
    mode: "Sprint Kuis",
    badge: "SK",
    topic: "Bab 4 · Matriks dan Transformasi",
    meta: "10 soal · mode Latihan",
    roomCode: "519 842",
    actionLabel: "Buka di layar",
  },
  {
    id: 2,
    mode: "Perebutan Zona",
    badge: "PZ",
    topic: "Bab 2 · Fungsi dan Komposisi",
    meta: "12 soal · mode Arena (tim)",
    roomCode: "724 318",
    actionLabel: "Buka di layar",
  },
  {
    id: 3,
    mode: "Sprint Kuis",
    badge: "SK",
    topic: "Bab 4 · Latihan Penguatan",
    meta: "8 soal · mode Latihan",
    roomCode: "904 115",
    actionLabel: "Buka di layar",
  },
];

export const sessionHistory = [
  { id: 1, title: "Sprint Kuis · Bab 3", time: "Kemarin" },
  { id: 2, title: "Sprint Kuis · Bab 1", time: "Senin" },
  { id: 3, title: "Perebutan Zona · Bab 2", time: "Minggu lalu" },
];

export const initialQuestions = [
  {
    id: 1,
    subject: "Matematika",
    chapter: "Bab 4 Matriks dan Transformasi",
    type: "Pilihan ganda",
    bloom: "C2",
    difficulty: "Mudah",
    duration: 20,
    question: "Jika matriks A = [[2, 1], [0, 3]], determinan matriks A adalah?",
    options: { A: "5", B: "6", C: "3", D: "2" },
    answer: "B",
    explanation: "det(A) = (2 × 3) - (1 × 0) = 6.",
  },
  {
    id: 2,
    subject: "Matematika",
    chapter: "Bab 4 Matriks dan Transformasi",
    type: "Pilihan ganda",
    bloom: "C3",
    difficulty: "Sedang",
    duration: 30,
    question:
      "Hasil penjumlahan matriks [[4, -2], [1, 5]] + [[2, 6], [3, -1]] adalah?",
    options: {
      A: "[[6, 4], [4, 4]]",
      B: "[[6, 8], [4, 6]]",
      C: "[[2, 4], [-2, 4]]",
      D: "[[8, 4], [2, 4]]",
    },
    answer: "A",
    explanation: "Jumlahkan elemen seletak: 4+2=6, -2+6=4, 1+3=4, 5+(-1)=4.",
  },
  {
    id: 3,
    subject: "Matematika",
    chapter: "Bab 2 Fungsi dan Komposisi",
    type: "Pilihan ganda",
    bloom: "C4",
    difficulty: "Sulit",
    duration: 45,
    question:
      "Jika h(x) = 3x - 2 dan k(x) = x + 5, berapakah nilai (h ∘ k)(2)?",
    options: { A: "13", B: "19", C: "11", D: "15" },
    answer: "B",
    explanation: "k(2) = 2 + 5 = 7, lalu h(7) = 3(7) - 2 = 19.",
  },
];