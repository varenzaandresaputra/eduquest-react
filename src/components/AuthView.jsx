import { useEffect, useState } from "react";

const ACCOUNTS_KEY = "gameedu_accounts_v1";

const DEFAULT_ACCOUNTS = [
  {
    name: "Varenza Andre Saputra",
    email: "tutor@gameedu.id",
    password: "123",
    role: "Pendidik / Tutor",
    className: "XII MIPA 1",
  },
  {
    name: "Ilham Alfiando",
    email: "siswa@gameedu.id",
    password: "123",
    role: "Peserta Didik",
    className: "XII MIPA 1",
  },
];

export default function AuthView({ defaultClassName = "XII MIPA 1", onLoginSuccess }) {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [accounts, setAccounts] = useState(() => {
    try {
      const saved = localStorage.getItem(ACCOUNTS_KEY);
      if (!saved) return DEFAULT_ACCOUNTS;
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_ACCOUNTS;
    } catch {
      return DEFAULT_ACCOUNTS;
    }
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Pendidik / Tutor");
  const [className, setClassName] = useState(defaultClassName);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberSession, setRememberSession] = useState(true);
  const [agreePolicy, setAgreePolicy] = useState(true);

  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    } catch {
      // Abaikan jika penyimpanan browser dibatasi
    }
  }, [accounts]);

  const clearAlerts = () => {
    setErrorMsg("");
    setInfoMsg("");
  };

  const handleResetForm = () => {
    setName("");
    setEmail("");
    setRole("Pendidik / Tutor");
    setClassName(defaultClassName);
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    clearAlerts();
  };

  const handleSwitchTab = (nextMode) => {
    setMode(nextMode);
    clearAlerts();
  };

  const handleQuickFill = (type) => {
    clearAlerts();
    setMode("login");
    if (type === "tutor") {
      setEmail("tutor@gameedu.id");
      setPassword("123");
      setInfoMsg("Akun demo Pendidik / Tutor terisi. Klik Masuk untuk melanjutkan.");
    } else {
      setEmail("siswa@gameedu.id");
      setPassword("123");
      setInfoMsg("Akun demo Peserta Didik terisi. Klik Masuk untuk melanjutkan.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearAlerts();

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password.trim()) {
      setErrorMsg("Alamat email dan kata sandi wajib diisi.");
      return;
    }

    if (mode === "register") {
      if (!name.trim()) {
        setErrorMsg("Nama lengkap wajib diisi saat registrasi.");
        return;
      }
      if (!className.trim()) {
        setErrorMsg("Nama kelas / rombel wajib diisi.");
        return;
      }
      if (password.length < 3) {
        setErrorMsg("Kata sandi minimal 3 karakter.");
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg("Konfirmasi kata sandi tidak sama dengan kata sandi.");
        return;
      }
      if (!agreePolicy) {
        setErrorMsg("Centang persetujuan penggunaan sebelum mendaftar.");
        return;
      }

      const exists = accounts.some(
        (acc) => acc.email.toLowerCase() === cleanEmail
      );
      if (exists) {
        setErrorMsg("Email sudah terdaftar. Silakan masuk atau gunakan email lain.");
        return;
      }

      const created = {
        name: name.trim(),
        email: cleanEmail,
        password,
        role,
        className: className.trim(),
      };

      setAccounts((prev) => [created, ...prev]);
      onLoginSuccess({
        name: created.name,
        email: created.email,
        role: created.role,
        className: created.className,
        rememberSession,
      });
      return;
    }

    const found = accounts.find(
      (acc) =>
        acc.email.toLowerCase() === cleanEmail && acc.password === password
    );

    if (found) {
      onLoginSuccess({
        name: found.name,
        email: found.email,
        role: found.role,
        className: found.className || defaultClassName,
        rememberSession,
      });
      return;
    }

    const derivedName =
      name.trim() ||
      cleanEmail
        .split("@")[0]
        .replace(/[._-]+/g, " ")
        .replace(/\b\w/g, (ch) => ch.toUpperCase()) ||
      "Pengguna GameEdu";

    onLoginSuccess({
      name: derivedName,
      email: cleanEmail,
      role,
      className: className.trim() || defaultClassName,
      rememberSession,
    });
  };

  return (
    <div className="auth-page-wrap">
      <section className="card auth-card-box" aria-label="Form Login dan Registrasi">
        <div className="auth-top-brand">
          <span className="auth-logo-chip">GE</span>
          <div>
            <strong>GameEdu · EduQuest</strong>
            <small>Platform Pembelajaran & Game Edukasi Interaktif</small>
          </div>
        </div>

        <div className="auth-tab-bar" role="tablist" aria-label="Mode Form Autentikasi">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "login"}
            className={mode === "login" ? "auth-tab-btn is-active" : "auth-tab-btn"}
            onClick={() => handleSwitchTab("login")}
          >
            Login
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "register"}
            className={mode === "register" ? "auth-tab-btn is-active" : "auth-tab-btn"}
            onClick={() => handleSwitchTab("register")}
          >
            Registrasi
          </button>
        </div>

        <div className="auth-quick-actions">
          <button
            type="button"
            className="auth-chip-btn"
            onClick={() => handleQuickFill("tutor")}
          >
            Isi Demo Tutor
          </button>
          <button
            type="button"
            className="auth-chip-btn"
            onClick={() => handleQuickFill("siswa")}
          >
            Isi Demo Siswa
          </button>
          <button
            type="button"
            className="auth-chip-btn neutral"
            onClick={handleResetForm}
          >
            Reset Form
          </button>
        </div>

        {errorMsg && (
          <div className="alert error" role="alert">
            {errorMsg}
          </div>
        )}

        {infoMsg && (
          <div className="alert success" role="status">
            {infoMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form-grid" noValidate>
          {mode === "register" && (
            <>
              <div className="auth-field">
                <label htmlFor="reg-name">Nama Lengkap</label>
                <input
                  id="reg-name"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="auth-two-col">
                <div className="auth-field">
                  <label htmlFor="reg-role">Peran</label>
                  <select
                    id="reg-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="Pendidik / Tutor">Pendidik / Tutor</option>
                    <option value="Peserta Didik">Peserta Didik</option>
                  </select>
                </div>

                <div className="auth-field">
                  <label htmlFor="reg-class">Kelas / Rombel</label>
                  <input
                    id="reg-class"
                    type="text"
                    placeholder="Contoh: XII MIPA 1"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          <div className="auth-field">
            <label htmlFor="auth-email">Email</label>
            <input
              id="auth-email"
              type="email"
              placeholder="nama@gameedu.id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <div className="auth-label-flex">
              <label htmlFor="auth-password">Kata Sandi</label>
              <button
                type="button"
                className="auth-link-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Sembunyikan" : "Lihat Sandi"}
              </button>
            </div>
            <input
              id="auth-password"
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan kata sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {mode === "register" && (
            <div className="auth-field">
              <label htmlFor="auth-confirm-password">Konfirmasi Kata Sandi</label>
              <input
                id="auth-confirm-password"
                type={showPassword ? "text" : "password"}
                placeholder="Ulangi kata sandi"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}

          <div className="auth-checkbox-group">
            <label className="auth-check">
              <input
                type="checkbox"
                checked={rememberSession}
                onChange={(e) => setRememberSession(e.target.checked)}
              />
              <span>Ingat sesi login di browser ini</span>
            </label>

            {mode === "register" && (
              <label className="auth-check">
                <input
                  type="checkbox"
                  checked={agreePolicy}
                  onChange={(e) => setAgreePolicy(e.target.checked)}
                />
                <span>Saya setuju menggunakan akun untuk aktivitas belajar GameEdu</span>
              </label>
            )}
          </div>

          <div className="auth-btn-stack">
            <button type="submit" className="btn-blue auth-full-btn">
              {mode === "login" ? "Masuk ke Aplikasi" : "Daftar & Masuk"}
            </button>
            <button
              type="button"
              className="auth-secondary-btn"
              onClick={() =>
                handleSwitchTab(mode === "login" ? "register" : "login")
              }
            >
              {mode === "login"
                ? "Belum punya akun? Daftar di sini"
                : "Sudah punya akun? Kembali ke Login"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}