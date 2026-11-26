export default function DashboardView({
  questions,
  questionsCount,
  hotsPercent,
  onGoBankSoal,
  onGoTambahSoal,
  onOpenMode,
}) {
  const latestQuestions = questions.slice(0, 3);

  const members = [
    {
      id: 1,
      initials: "VA",
      avatarClass: "avatar-sm",
      name: "Varenza Andre Saputra",
      nim: "2455202073",
    },
    {
      id: 2,
      initials: "IA",
      avatarClass: "avatar-sm alt",
      name: "Ilham Alfiando",
      nim: "2455202032",
    },
    {
      id: 3,
      initials: "DP",
      avatarClass: "avatar-sm",
      name: "Dendi Perdiansah",
      nim: "2455202020",
    },
    {
      id: 4,
      initials: "AY",
      avatarClass: "avatar-sm alt",
      name: "Apri Yansyah",
      nim: "2455202010",
    },
  ];

  return (
    <div className="guru-grid">
      <div className="guru-main-col">
        <section className="hero-arena" aria-label="Banner arena kelas">
          <div className="hero-copy">
            <h2>Ubah bab jadi arena kelas</h2>
            <p>
              Buat sesi game interaktif langsung dari bank soal bab aktif untuk
              ditampilkan di smartboard dan perangkat siswa.
            </p>
            <button
              type="button"
              className="btn-blue"
              onClick={() => onOpenMode("territory-grid")}
            >
              Buat sesi game →
            </button>
          </div>
          <div className="hero-tiles" aria-hidden="true">
            <span className="tile tile-blue">A</span>
            <span className="tile tile-amber">B</span>
            <span className="tile tile-teal">C</span>
            <span className="tile tile-rose">D</span>
          </div>
        </section>

        <section className="mini-stats" aria-label="Ringkasan soal">
          <div className="mini-card">
            <span className="mini-label">Total soal</span>
            <strong>{questionsCount} soal</strong>
            <small>Bab 4 · Matriks dan Transformasi</small>
          </div>
          <div className="mini-card">
            <span className="mini-label">Sudah direview</span>
            <strong>{Math.max(questionsCount, 18)} dari 24</strong>
            <small>Siap dipakai di game</small>
          </div>
          <div className="mini-card">
            <span className="mini-label">Soal HOTS</span>
            <strong>{hotsPercent}%</strong>
            <small>Level C4–C6</small>
          </div>
        </section>

        <div className="bottom-split">
          <section className="card" aria-label="Mode permainan">
            <div className="card-head-row">
              <h3>Mode permainan</h3>
              <button
                type="button"
                className="link-btn"
                onClick={onGoBankSoal}
              >
                Lihat semua
              </button>
            </div>

            <div className="mode-row">
              <span className="mode-badge sc">SK</span>
              <div className="mode-info">
                <strong>Sprint Kuis</strong>
                <p>Adu cepat menjawab soal pemanasan &amp; latihan.</p>
              </div>
              <button
                type="button"
                className="btn-soft"
                onClick={() => onOpenMode("mobile")}
              >
                Pakai
              </button>
            </div>

            <div className="mode-row">
              <span className="mode-badge tg">PZ</span>
              <div className="mode-info">
                <strong>Perebutan Zona</strong>
                <p>Tim merebut petak; petak sulit bernilai tinggi.</p>
              </div>
              <button
                type="button"
                className="btn-soft"
                onClick={() => onOpenMode("territory-grid")}
              >
                Pakai
              </button>
            </div>
          </section>

          <section className="card" aria-label="Soal terbaru">
            <div className="card-head-row">
              <h3>Soal terbaru · Bab 4</h3>
              <button
                type="button"
                className="link-btn"
                onClick={onGoTambahSoal}
              >
                + Tambah soal
              </button>
            </div>

            {latestQuestions.map((item) => (
              <div className="latest-item" key={item.id}>
                <span className="tag-code">{item.bloom}</span>
                <div>
                  <strong>{item.question}</strong>
                  <small>
                    {item.type} · {item.duration} dtk
                  </small>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>

      <aside className="guru-side-col" aria-label="Panel samping dashboard">
        <section className="card side-panel">
          <h3>Notifikasi</h3>
          <ul className="side-list">
            <li>
              <span className="dot green" aria-hidden="true" />
              <div>
                <strong>Sesi selesai</strong>
                <small>Sprint Kuis · XII MIPA 1</small>
              </div>
            </li>
            <li>
              <span className="dot amber" aria-hidden="true" />
              <div>
                <strong>6 soal perlu review</strong>
                <small>Tim Garuda, Rajawali, Elang, Merpati</small>
              </div>
            </li>
            <li>
              <span className="dot blue" aria-hidden="true" />
              <div>
                <strong>Smartboard terhubung</strong>
                <small>Ruang XII MIPA 1</small>
              </div>
            </li>
          </ul>
        </section>

        <section className="card side-panel">
          <h3>Tips hari ini</h3>
          <div className="tip-box">
            <strong>Campur level Bloom</strong>
            <p>
              Sisipkan 1 soal C4 tiap 3 soal C1–C2 supaya siswa tidak hanya adu
              cepat.
            </p>
          </div>
        </section>

        <section className="card side-panel">
          <h3>Tim pengembang / anggota</h3>
          {members.map((member) => (
            <div className="share-item" key={member.id}>
              <span className={member.avatarClass}>{member.initials}</span>
              <div>
                <strong>{member.name}</strong>
                <small>{member.nim}</small>
              </div>
            </div>
          ))}
        </section>
      </aside>
    </div>
  );
}