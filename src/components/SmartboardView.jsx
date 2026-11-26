import { useState } from "react";

export default function SmartboardView({
  sessions,
  history,
  activeClass,
  onOpenGame,
}) {
  const [step, setStep] = useState("lobby");
  const [roomCode] = useState("M4K-82R");

  if (step === "login") {
    return (
      <section className="arena-dark-card" aria-label="Masuk Smartboard">
        <div className="arena-top-bar">
          <strong>EduQuest · Smartboard</strong>
          <span>Ruang {activeClass.name}</span>
        </div>

        <div className="smartboard-login-grid">
          <div className="qr-box">
            <div className="qr-placeholder" aria-hidden="true">
              QR
            </div>
            <h3>Pindai dari HP atau laptop</h3>
            <p>
              Buka dashboard guru, pilih Hubungkan smartboard, lalu pindai kode
              ini atau masukkan kode:
            </p>
            <strong className="room-code-highlight">{roomCode}</strong>
          </div>

          <div className="login-form-box">
            <h3>Masuk dengan akun</h3>
            <div className="field">
              <label htmlFor="sb-email">Email guru</label>
              <input
                id="sb-email"
                type="email"
                defaultValue="raka@sekolah.sch.id"
              />
            </div>
            <div className="field">
              <label htmlFor="sb-pass">Kata sandi</label>
              <input id="sb-pass" type="password" defaultValue="••••••••" />
            </div>
            <button
              type="button"
              className="btn-orange full-w"
              onClick={() => setStep("lobby")}
            >
              Masuk
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="arena-dark-card" aria-label="Lobby Smartboard">
      <div className="arena-top-bar">
        <div>
          <strong>EduQuest</strong>
          <span> · {activeClass.name}</span>
        </div>
        <button
          type="button"
          className="btn-dark-ghost"
          onClick={() => setStep("login")}
        >
          Keluar
        </button>
      </div>

      <h2 className="arena-heading">Selamat datang, siap main?</h2>
      <p className="arena-sub">
        Sesi yang dibuat di dashboard guru muncul di sini.
      </p>

      <div className="smartboard-main-grid">
        <div className="sb-session-stack">
          {sessions.map((session) => (
            <div className="sb-session-card" key={session.id}>
              <div className="sb-session-left">
                <span className="sb-badge">{session.badge}</span>
                <div>
                  <strong>{session.mode}</strong>
                  <p>
                    {session.topic} · {session.meta}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="btn-orange"
                onClick={onOpenGame}
              >
                Buka di layar
              </button>
            </div>
          ))}
        </div>

        <div className="sb-side-stack">
          <div className="sb-side-box">
            <small>Kelas aktif</small>
            <h3>{activeClass.name}</h3>
            <p>{activeClass.students} siswa terdaftar</p>
            <button
              type="button"
              className="btn-dark-ghost full-w"
              onClick={() => setStep("login")}
            >
              Ganti kelas
            </button>
          </div>

          <div className="sb-side-box">
            <small>Riwayat sesi</small>
            <ul className="sb-history">
              {history.map((item) => (
                <li key={item.id}>
                  <span>{item.title}</span>
                  <small>{item.time}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}