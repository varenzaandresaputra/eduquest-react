import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import DashboardView from "./components/DashboardView";
import BankSoalView from "./components/BankSoalView";
import TambahSoalForm from "./components/TambahSoalForm";
import SmartboardView from "./components/SmartboardView";
import TerritoryGridView from "./components/TerritoryGridView";
import MobilePreviewView from "./components/MobilePreviewView";
import {
  initialQuestions,
  initialSessions,
  sessionHistory,
} from "./data/initialData";
import "./index.css";

const STORAGE_KEY = "eduquest_gameedu_v1";

export default function App() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [sessions] = useState(initialSessions);
  const [questions, setQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialQuestions;
    } catch {
      return initialQuestions;
    }
  });
  const [notice, setNotice] = useState("");

  const activeClass = {
    name: "XII MIPA 1",
    students: 30,
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
    } catch {
      // Abaikan jika penyimpanan browser diblokir
    }
  }, [questions]);

  const showNotice = (msg) => {
    setNotice(msg);
    setTimeout(() => {
      setNotice((prev) => (prev === msg ? "" : prev));
    }, 3000);
  };

  const handleAddQuestion = (newQuestion) => {
    setQuestions((prev) => [newQuestion, ...prev]);
    setActiveMenu("bank-soal");
    showNotice("Soal baru berhasil ditambahkan ke Bank soal.");
  };

  const handleDeleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((item) => item.id !== id));
    showNotice("Soal dihapus dari Bank soal.");
  };

  const handleResetDefault = () => {
    setQuestions(initialQuestions);
    showNotice("Contoh soal dikembalikan ke bawaan.");
  };

  const hotsCount = questions.filter((q) =>
    ["C4", "C5", "C6"].includes(q.bloom)
  ).length;
  const hotsPercent =
    questions.length > 0 ? Math.round((hotsCount / questions.length) * 100) : 0;

  return (
    <div className="layout">
      <Sidebar
        activeMenu={activeMenu}
        onSelectMenu={setActiveMenu}
        activeClass={activeClass}
        history={sessionHistory}
      />

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>EduQuest · Dashboard Guru</h1>
            <p>
              Mengelola soal, sesi game, kelas dan siswa, dan laporan · Ruang{" "}
              {activeClass.name}
            </p>
          </div>
          <button
            type="button"
            className="btn-blue"
            onClick={() => setActiveMenu("tambah-soal")}
          >
            + Tambah soal
          </button>
        </header>

        {notice && (
          <div className="alert success" role="status">
            {notice}
          </div>
        )}

        {activeMenu === "dashboard" && (
          <DashboardView
            questions={questions}
            questionsCount={questions.length}
            hotsPercent={hotsPercent}
            onGoBankSoal={() => setActiveMenu("bank-soal")}
            onGoTambahSoal={() => setActiveMenu("tambah-soal")}
            onOpenMode={(modeMenu) => setActiveMenu(modeMenu)}
          />
        )}

        {activeMenu === "bank-soal" && (
          <BankSoalView
            questions={questions}
            onGoTambahSoal={() => setActiveMenu("tambah-soal")}
            onDeleteQuestion={handleDeleteQuestion}
            onResetDefault={handleResetDefault}
          />
        )}

        {activeMenu === "tambah-soal" && (
          <TambahSoalForm
            onAddQuestion={handleAddQuestion}
            onCancel={() => setActiveMenu("bank-soal")}
          />
        )}

        {activeMenu === "smartboard" && (
          <SmartboardView
            sessions={sessions}
            history={sessionHistory}
            activeClass={activeClass}
            onOpenGame={() => setActiveMenu("territory-grid")}
          />
        )}

        {activeMenu === "territory-grid" && (
          <TerritoryGridView questions={questions} />
        )}

        {activeMenu === "mobile" && <MobilePreviewView />}

        {(activeMenu === "kelas-siswa" ||
          activeMenu === "laporan" ||
          activeMenu === "pengaturan") && (
          <section className="card">
            <h2>
              {activeMenu === "kelas-siswa" &&
                `Kelas & siswa (${activeClass.name})`}
              {activeMenu === "laporan" && "Laporan hasil belajar"}
              {activeMenu === "pengaturan" && "Pengaturan EduQuest"}
            </h2>
            <p>
              Peserta didik terdaftar di rombel <strong>{activeClass.name}</strong>:
              Raka, Nadia, Bima, dan Sinta (terbagi dalam Tim Garuda, Rajawali,
              Elang, dan Merpati).
            </p>
          </section>
        )}
      </main>
    </div>
  );
}