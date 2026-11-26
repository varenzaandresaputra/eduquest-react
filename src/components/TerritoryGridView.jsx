import { useEffect, useState } from "react";

const initialCells = [
  { id: 1, row: 0, col: 0, owner: "A", pts: 100, sprout: false, lumbung: false },
  { id: 2, row: 0, col: 1, owner: "A", pts: 100, sprout: false, lumbung: false },
  { id: 3, row: 0, col: 2, owner: null, pts: 200, sprout: true, lumbung: false },
  { id: 4, row: 0, col: 3, owner: "B", pts: 100, sprout: false, lumbung: false },
  { id: 5, row: 0, col: 4, owner: "B", pts: 100, sprout: false, lumbung: false },

  { id: 6, row: 1, col: 0, owner: "A", pts: 100, sprout: false, lumbung: false },
  { id: 7, row: 1, col: 1, owner: null, pts: 300, sprout: true, lumbung: false },
  { id: 8, row: 1, col: 2, owner: null, pts: 300, sprout: false, lumbung: false },
  { id: 9, row: 1, col: 3, owner: null, pts: 300, sprout: false, lumbung: false },
  { id: 10, row: 1, col: 4, owner: "B", pts: 100, sprout: false, lumbung: false },

  { id: 11, row: 2, col: 0, owner: null, pts: 200, sprout: true, lumbung: false },
  { id: 12, row: 2, col: 1, owner: null, pts: 300, sprout: false, lumbung: false },
  { id: 13, row: 2, col: 2, owner: null, pts: 500, sprout: true, lumbung: true },
  { id: 14, row: 2, col: 3, owner: null, pts: 300, sprout: false, lumbung: false },
  { id: 15, row: 2, col: 4, owner: null, pts: 200, sprout: false, lumbung: false },

  { id: 16, row: 3, col: 0, owner: "C", pts: 100, sprout: false, lumbung: false },
  { id: 17, row: 3, col: 1, owner: null, pts: 300, sprout: false, lumbung: false },
  { id: 18, row: 3, col: 2, owner: null, pts: 300, sprout: false, lumbung: false },
  { id: 19, row: 3, col: 3, owner: null, pts: 300, sprout: false, lumbung: false },
  { id: 20, row: 3, col: 4, owner: "D", pts: 100, sprout: false, lumbung: false },

  { id: 21, row: 4, col: 0, owner: "C", pts: 100, sprout: false, lumbung: false },
  { id: 22, row: 4, col: 1, owner: null, pts: 100, sprout: false, lumbung: false },
  { id: 23, row: 4, col: 2, owner: null, pts: 200, sprout: false, lumbung: false },
  { id: 24, row: 4, col: 3, owner: "D", pts: 100, sprout: false, lumbung: false },
  { id: 25, row: 4, col: 4, owner: "D", pts: 100, sprout: false, lumbung: false },
];

const teamMeta = [
  { code: "A", name: "Tim Garuda" },
  { code: "B", name: "Tim Rajawali" },
  { code: "D", name: "Tim Merpati" },
  { code: "C", name: "Tim Elang" },
];

const arenaQuestions = [
  {
    q: "Jika h(x) = 3x - 2 dan k(x) = x + 5, berapakah (h ∘ k)(2)?",
    options: { A: "13", B: "19", C: "11", D: "15" },
    answer: "B",
    exp: "k(2) = 2 + 5 = 7, lalu h(7) = 3(7) - 2 = 19.",
  },
  {
    q: "Jika determinan matriks [[2, 1], [0, 3]] adalah?",
    options: { A: "5", B: "6", C: "3", D: "2" },
    answer: "B",
    exp: "det = (2 × 3) - (1 × 0) = 6.",
  },
];

function isAdjacentToTeam(cell, teamCode, allCells) {
  return allCells.some(
    (other) =>
      other.owner === teamCode &&
      Math.abs(other.row - cell.row) + Math.abs(other.col - cell.col) === 1
  );
}

export default function TerritoryGridView({ questions = [] }) {
  const questionPool =
    questions.length > 0
      ? questions.map((item) => ({
          q: item.question,
          options: item.options,
          answer: item.answer,
          exp: item.explanation || "Periksa kembali langkah penyelesaian soal.",
        }))
      : arenaQuestions;

  const [cells, setCells] = useState(initialCells);
  const [turnIndex, setTurnIndex] = useState(0);
  const [season, setSeason] = useState(4);
  const [selectedCellId, setSelectedCellId] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [pickedOption, setPickedOption] = useState("");
  const [timer, setTimer] = useState(38);
  const [feedback, setFeedback] = useState(
    "Kapten memilih petak bertanda tunas, yang bersebelahan dengan sawah tim."
  );

  const currentTeam = teamMeta[turnIndex % teamMeta.length];

  useEffect(() => {
    if (!activeQuestion) return;
    if (timer <= 0) {
      setFeedback("Waktu habis! Giliran berpindah ke tim berikutnya.");
      setActiveQuestion(null);
      setSelectedCellId(null);
      setPickedOption("");
      setTurnIndex((prev) => prev + 1);
      setSeason((prev) => (prev < 12 ? prev + 1 : 1));
      setTimer(38);
      return;
    }

    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [activeQuestion, timer]);

  const handleSelectCell = (cell) => {
    if (activeQuestion) return;

    if (cell.owner) {
      setFeedback(`Petak #${cell.id} sudah dikuasai Tim ${cell.owner}.`);
      return;
    }

    const adjacent = isAdjacentToTeam(cell, currentTeam.code, cells);
    if (!adjacent) {
      setFeedback(
        `Petak #${cell.id} belum bersebelahan dengan sawah ${currentTeam.name}. Pilih petak bertunas yang menempel dengan sawah tim.`
      );
      return;
    }

    const qItem = questionPool[(season + cell.id) % questionPool.length];
    setSelectedCellId(cell.id);
    setActiveQuestion(qItem);
    setPickedOption("");
    setTimer(38);
    setFeedback(
      `${currentTeam.name} membuka soal di petak #${cell.id} (${cell.pts} poin).`
    );
  };

  const handleSubmitAnswer = () => {
    if (!activeQuestion || !pickedOption || selectedCellId === null) return;

    const targetCell = cells.find((c) => c.id === selectedCellId);
    const isCorrect = pickedOption === activeQuestion.answer;

    if (isCorrect && targetCell) {
      const updated = cells.map((c) => {
        if (c.id === selectedCellId) {
          return { ...c, owner: currentTeam.code, sprout: false };
        }
        const touchesNew =
          Math.abs(c.row - targetCell.row) + Math.abs(c.col - targetCell.col) ===
          1;
        if (!c.owner && touchesNew) {
          return { ...c, sprout: true };
        }
        return c;
      });
      setCells(updated);
      setFeedback(
        `Benar! ${currentTeam.name} merebut petak #${selectedCellId} (+${targetCell.pts} poin).`
      );
    } else {
      setFeedback(
        `Jawaban kurang tepat (kunci: ${activeQuestion.answer}). ${activeQuestion.exp}`
      );
    }

    setActiveQuestion(null);
    setSelectedCellId(null);
    setPickedOption("");
    setTurnIndex((prev) => prev + 1);
    setSeason((prev) => (prev < 12 ? prev + 1 : 1));
    setTimer(38);
  };

  const handleResetGame = () => {
    setCells(initialCells);
    setTurnIndex(0);
    setSeason(4);
    setSelectedCellId(null);
    setActiveQuestion(null);
    setPickedOption("");
    setTimer(38);
    setFeedback(
      "Kapten memilih petak bertanda tunas, yang bersebelahan dengan sawah tim."
    );
  };

  const teamStats = teamMeta.map((team) => {
    const owned = cells.filter((c) => c.owner === team.code);
    const score = owned.reduce((acc, item) => acc + item.pts, 0);
    return { ...team, tiles: owned.length, score };
  });

  return (
    <section className="grid-arena-wrap" aria-label="Perebutan Zona Rebut Sawah">
      <div className="grid-arena-header">
        <div>
          <span className="arena-pill">Rebut Sawah</span>
          <strong>
            Perebutan Zona · Matematika · Bab 2 Fungsi · mode Arena
          </strong>
        </div>
        <div className="grid-meta-right">
          <span>Musim tanam {season} / 12</span>
          <span className="room-badge">Kode room 724 318</span>
          <button
            type="button"
            className="btn-dark-ghost"
            onClick={handleResetGame}
          >
            Reset papan
          </button>
        </div>
      </div>

      <div className="grid-arena-body">
        <div className="sawah-board" role="grid" aria-label="Papan petak sawah">
          {cells.map((cell) => {
            const canPick =
              !cell.owner && isAdjacentToTeam(cell, currentTeam.code, cells);
            const ownerClass = cell.owner
              ? `cell-owner-${cell.owner.toLowerCase()}`
              : cell.lumbung
              ? "cell-lumbung"
              : canPick
              ? "cell-sprout-ready"
              : "cell-empty";

            return (
              <button
                key={cell.id}
                type="button"
                className={`sawah-cell ${ownerClass} ${
                  selectedCellId === cell.id ? "selected" : ""
                }`}
                onClick={() => handleSelectCell(cell)}
              >
                <span className="cell-main">
                  {cell.owner
                    ? cell.owner
                    : cell.lumbung
                    ? "🌾 Lumbung"
                    : cell.sprout || canPick
                    ? "🌱"
                    : ""}
                </span>
                <span className="cell-pts">{cell.pts}</span>
              </button>
            );
          })}
        </div>

        <div className="grid-side-info">
          <div className="turn-banner">
            <small>Giliran menanam</small>
            <h3>{currentTeam.name}</h3>
            <p>{feedback}</p>
          </div>

          {activeQuestion ? (
            <div className="question-modal-box">
              <div className="q-modal-top">
                <strong>Soal Petak #{selectedCellId}</strong>
                <span className="timer-chip">{timer} dtk</span>
              </div>
              <p className="q-modal-text">{activeQuestion.q}</p>

              <div className="q-modal-opts">
                {Object.entries(activeQuestion.options).map(([optKey, val]) => (
                  <button
                    key={optKey}
                    type="button"
                    className={`q-opt-btn ${
                      pickedOption === optKey ? "active-opt" : ""
                    }`}
                    onClick={() => setPickedOption(optKey)}
                  >
                    <strong>{optKey}</strong> {val}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="btn-orange full-w"
                disabled={!pickedOption}
                onClick={handleSubmitAnswer}
              >
                Kirim jawaban tim (kapten)
              </button>
            </div>
          ) : (
            <div className="rule-box-green">
              Ketuk petak bertanda tunas untuk membuka soal. Petak tengah adalah{" "}
              <strong>lumbung padi (500)</strong>: soal tersulit, panen
              terbesar.
            </div>
          )}

          <div className="harvest-box">
            <h4>Hasil panen sementara</h4>
            {teamStats.map((t) => (
              <div className="harvest-row" key={t.code}>
                <span className={`team-dot team-${t.code.toLowerCase()}`}>
                  {t.code}
                </span>
                <span className="harvest-name">{t.name}</span>
                <span className="harvest-tiles">{t.tiles} petak</span>
                <strong>{t.score}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}