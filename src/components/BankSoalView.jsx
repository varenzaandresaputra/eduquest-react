import { useState } from "react";

export default function BankSoalView({
  questions,
  onGoTambahSoal,
  onDeleteQuestion,
  onResetDefault,
}) {
  const [search, setSearch] = useState("");
  const [bloomFilter, setBloomFilter] = useState("ALL");

  const filteredQuestions = questions.filter((q) => {
    const matchText =
      q.question.toLowerCase().includes(search.toLowerCase()) ||
      q.chapter.toLowerCase().includes(search.toLowerCase()) ||
      q.subject.toLowerCase().includes(search.toLowerCase());
    const matchBloom = bloomFilter === "ALL" || q.bloom === bloomFilter;
    return matchText && matchBloom;
  });

  return (
    <section className="card" aria-labelledby="bank-soal-heading">
      <div className="section-header">
        <div>
          <h2 id="bank-soal-heading">Bank soal ({filteredQuestions.length})</h2>
          <p>Kelola soal per bab, level Bloom, durasi, dan kunci jawaban.</p>
        </div>
        <div className="toolbar-actions">
          <button type="button" className="btn-ghost" onClick={onResetDefault}>
            Reset contoh
          </button>
          <button
            type="button"
            className="btn-blue"
            onClick={onGoTambahSoal}
          >
            + Tambah soal
          </button>
        </div>
      </div>

      <div className="filter-bar">
        <div className="field">
          <label htmlFor="cari-soal">Cari soal / bab</label>
          <input
            id="cari-soal"
            type="text"
            placeholder="Ketik kata kunci soal atau bab..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="filter-bloom">Level Bloom</label>
          <select
            id="filter-bloom"
            value={bloomFilter}
            onChange={(e) => setBloomFilter(e.target.value)}
          >
            <option value="ALL">Semua level</option>
            <option value="C1">C1 - Mengingat</option>
            <option value="C2">C2 - Memahami</option>
            <option value="C3">C3 - Menerapkan</option>
            <option value="C4">C4 - Menganalisis</option>
          </select>
        </div>
      </div>

      {filteredQuestions.length === 0 ? (
        <p className="empty-state">
          Belum ada soal yang cocok dengan pencarian atau filter.
        </p>
      ) : (
        <div className="question-list">
          {filteredQuestions.map((q, idx) => (
            <article className="question-item" key={q.id}>
              <div className="q-top">
                <div className="q-meta">
                  <span>#{idx + 1}</span>
                  <span>{q.subject}</span>
                  <span>{q.chapter}</span>
                  <span>{q.type}</span>
                  <span>{q.bloom}</span>
                  <span>{q.difficulty}</span>
                  <span>{q.duration} dtk</span>
                  <span>Kunci: {q.answer}</span>
                </div>
                <button
                  type="button"
                  className="btn-danger-sm"
                  onClick={() => onDeleteQuestion(q.id)}
                  aria-label={`Hapus soal ${q.question}`}
                >
                  Hapus
                </button>
              </div>

              <h3>{q.question}</h3>

              <div className="q-options">
                {Object.entries(q.options).map(([optKey, optVal]) => (
                  <span
                    key={optKey}
                    className={q.answer === optKey ? "opt correct" : "opt"}
                  >
                    <strong>{optKey}.</strong> {optVal}
                  </span>
                ))}
              </div>

              {q.explanation && (
                <p className="q-exp">
                  <strong>Pembahasan (tampil setelah jawaban dibuka):</strong>{" "}
                  {q.explanation}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}