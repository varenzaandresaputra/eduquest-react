import { useState } from "react";

const emptyForm = {
  subject: "Matematika",
  chapter: "Bab 4 Matriks dan Transformasi",
  type: "Pilihan ganda",
  bloom: "C3 - Menerapkan",
  difficulty: "Sedang",
  duration: 30,
  question: "",
  A: "",
  B: "",
  C: "",
  D: "",
  answer: "B",
  explanation: "",
};

export default function TambahSoalForm({ onAddQuestion, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [aiNote, setAiNote] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.question.trim()) {
      setError("Teks soal wajib diisi.");
      return;
    }

    if (!form.A.trim() || !form.B.trim() || !form.C.trim() || !form.D.trim()) {
      setError("Opsi jawaban A, B, C, dan D wajib diisi semua.");
      return;
    }

    const bloomShort = form.bloom.split(" ")[0] || "C3";

    const newQuestion = {
      id: Date.now(),
      subject: form.subject.trim() || "Matematika",
      chapter: form.chapter.trim() || "Bab 4 Matriks dan Transformasi",
      type: form.type,
      bloom: bloomShort,
      difficulty: form.difficulty,
      duration: Math.max(10, Number(form.duration) || 30),
      question: form.question.trim(),
      options: {
        A: form.A.trim(),
        B: form.B.trim(),
        C: form.C.trim(),
        D: form.D.trim(),
      },
      answer: form.answer,
      explanation: form.explanation.trim(),
    };

    onAddQuestion(newQuestion);
    setForm(emptyForm);
  };

  return (
    <section className="card form-page" aria-labelledby="form-tambah-heading">
      <button type="button" className="back-link" onClick={onCancel}>
        ← Kembali ke bank soal
      </button>

      <div className="form-title-row">
        <h2 id="form-tambah-heading">Tambah soal</h2>
        <button
          type="button"
          className="btn-ai"
          onClick={() => setAiNote((prev) => !prev)}
        >
          Generator AI · semester depan
        </button>
      </div>

      {aiNote && (
        <div className="alert info" role="status">
          Fitur Generator AI dijadwalkan hadir pada tahap pengembangan berikutnya.
        </div>
      )}

      {error && (
        <div className="alert error" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="soal-form-stack" noValidate>
        <div className="sub-card">
          <h3>Identitas soal</h3>
          <div className="form-grid-3">
            <div className="field">
              <label htmlFor="mapel">Mapel</label>
              <select
                id="mapel"
                name="subject"
                value={form.subject}
                onChange={handleChange}
              >
                <option value="Matematika">Matematika</option>
                <option value="Fisika">Fisika</option>
                <option value="Informatika">Informatika</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="bab">Bab</label>
              <input
                id="bab"
                name="chapter"
                type="text"
                value={form.chapter}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label htmlFor="tipe-soal">Tipe soal</label>
              <select
                id="tipe-soal"
                name="type"
                value={form.type}
                onChange={handleChange}
              >
                <option value="Pilihan ganda">Pilihan ganda</option>
                <option value="Isian singkat">Isian singkat</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="level-bloom">Level Bloom</label>
              <select
                id="level-bloom"
                name="bloom"
                value={form.bloom}
                onChange={handleChange}
              >
                <option value="C1 - Mengingat">C1 - Mengingat</option>
                <option value="C2 - Memahami">C2 - Memahami</option>
                <option value="C3 - Menerapkan">C3 - Menerapkan</option>
                <option value="C4 - Menganalisis">C4 - Menganalisis</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="kesulitan">Kesulitan</label>
              <select
                id="kesulitan"
                name="difficulty"
                value={form.difficulty}
                onChange={handleChange}
              >
                <option value="Mudah">Mudah</option>
                <option value="Sedang">Sedang</option>
                <option value="Sulit">Sulit</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="durasi">Durasi (detik)</label>
              <input
                id="durasi"
                type="number"
                min="10"
                max="300"
                name="duration"
                value={form.duration}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="sub-card">
          <h3>Isi soal</h3>

          <div className="field">
            <label htmlFor="teks-soal">Teks soal</label>
            <textarea
              id="teks-soal"
              rows="3"
              name="question"
              placeholder="Tuliskan teks soal untuk sesi kuis..."
              value={form.question}
              onChange={handleChange}
            />
          </div>

          <div className="options-block">
            <span className="block-label">
              Opsi jawaban — pilih satu sebagai kunci benar
            </span>

            {["A", "B", "C", "D"].map((key) => {
              const isSelected = form.answer === key;
              return (
                <div className="option-row" key={key}>
                  <input
                    id={`kunci-${key}`}
                    type="radio"
                    name="answer"
                    value={key}
                    checked={isSelected}
                    onChange={handleChange}
                    aria-label={`Pilih ${key} sebagai kunci jawaban benar`}
                  />
                  <span className="opt-badge">{key}</span>
                  <input
                    id={`opsi-${key}`}
                    name={key}
                    type="text"
                    placeholder={`Isi opsi ${key}`}
                    value={form[key]}
                    onChange={handleChange}
                    aria-label={`Teks opsi ${key}`}
                  />
                </div>
              );
            })}
          </div>

          <div className="field">
            <label htmlFor="pembahasan">
              Pembahasan (tampil setelah jawaban dibuka)
            </label>
            <textarea
              id="pembahasan"
              rows="2"
              name="explanation"
              placeholder="Tuliskan pembahasan singkat..."
              value={form.explanation}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Batal
          </button>
          <button type="submit" className="btn-blue">
            Simpan soal
          </button>
        </div>
      </form>
    </section>
  );
}