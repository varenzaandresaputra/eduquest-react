import { useState } from "react";

const quizDeck = [
  {
    q: "Jika matriks A = [[2, 1], [0, 3]], determinannya adalah?",
    options: { A: "5", B: "6", C: "3", D: "2" },
    answer: "B",
    points: 120,
    exp: "det(A) = (2 × 3) - (1 × 0) = 6",
  },
  {
    q: "Jika h(x) = 3x - 2 dan k(x) = x + 5, nilai (h ∘ k)(2) adalah?",
    options: { A: "13", B: "19", C: "11", D: "15" },
    answer: "B",
    points: 120,
    exp: "k(2) = 7, lalu h(7) = 3(7) - 2 = 19",
  },
];

const colorMap = {
  A: "c-blue",
  B: "c-amber",
  C: "c-teal",
  D: "c-pink",
};

export default function MobilePreviewView() {
  const [step, setStep] = useState("join");
  const [playerName, setPlayerName] = useState("Nadia");
  const [roomCode, setRoomCode] = useState("519 842");
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(820);
  const [lastResult, setLastResult] = useState(null);

  const currentQ = quizDeck[qIndex % quizDeck.length];

  const handleAnswer = (optKey) => {
    const isRight = optKey === currentQ.answer;
    const earned = isRight ? currentQ.points : 0;
    setScore((prev) => prev + earned);
    setLastResult({
      optKey,
      isRight,
      earned,
      exp: currentQ.exp,
    });
  };

  const handleBackToSim = () => {
    setQIndex((prev) => prev + 1);
    setLastResult(null);
  };

  if (step === "join") {
    return (
      <section className="mobile-stage" aria-label="Masuk Room Mobile">
        <div className="phone-frame">
          <div className="phone-top">
            <span>EduQuest</span>
            <span>Mobile</span>
          </div>

          <div className="join-hero">
            <span className="join-logo">EQ</span>
            <h3>EduQuest</h3>
            <p>Masukkan kode yang tampil di smartboard kelas.</p>
          </div>

          <div className="field">
            <label htmlFor="m-room" className="dark-lbl">
              Kode room
            </label>
            <input
              id="m-room"
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="m-name" className="dark-lbl">
              Nama panggilan
            </label>
            <input
              id="m-name"
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="btn-orange full-w"
            onClick={() => setStep("play")}
          >
            Masuk arena
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mobile-stage" aria-label="Simulasi Game Mobile">
      <div className="phone-frame">
        <div className="phone-top">
          <span>
            Soal {(qIndex % quizDeck.length) + 1} / {quizDeck.length}
          </span>
          <span>
            {playerName || "Nadia"} · {score} poin
          </span>
        </div>

        <div className="phone-question-card">
          <p>{currentQ.q}</p>
          <small>Lihat juga di smartboard · sisa 12 detik</small>
        </div>

        <div className="phone-choices">
          {Object.entries(currentQ.options).map(([key, val]) => (
            <button
              key={key}
              type="button"
              className={`phone-choice-btn ${colorMap[key] || "c-blue"} ${
                lastResult?.optKey === key ? "picked" : ""
              }`}
              onClick={() => handleAnswer(key)}
            >
              <strong>{key}</strong>
              <span>{val}</span>
            </button>
          ))}
        </div>

        <p className="phone-hint">
          Ketuk satu jawaban. Jawaban tercepat yang benar dapat poin lebih besar.
        </p>
      </div>

      <div className="phone-frame result-phone">
        <div className="phone-top">
          <span>Kode room: {roomCode}</span>
          <span>Peringkat #2</span>
        </div>

        <div
          className={`result-banner ${
            lastResult && !lastResult.isRight ? "wrong-banner" : ""
          }`}
        >
          <strong>
            {!lastResult
              ? "Benar!"
              : lastResult.isRight
              ? "Benar!"
              : "Belum tepat"}
          </strong>
          <small>
            {!lastResult
              ? "+120 poin · menjawab dalam 6 detik"
              : lastResult.isRight
              ? `+${lastResult.earned} poin · menjawab dalam 6 detik`
              : `Kunci jawaban: ${currentQ.answer}`}
          </small>
        </div>

        <div className="result-stats-row">
          <div className="r-box">
            <small>Peringkat</small>
            <strong>#2</strong>
          </div>
          <div className="r-box">
            <small>Total poin</small>
            <strong>{score}</strong>
          </div>
        </div>

        <div className="result-exp-box">
          <small>Pembahasan</small>
          <p>{currentQ.exp}</p>
        </div>

        <button
          type="button"
          className="btn-dark-ghost full-w"
          onClick={handleBackToSim}
        >
          Kembali ke soal (simulasi)
        </button>
      </div>
    </section>
  );
}