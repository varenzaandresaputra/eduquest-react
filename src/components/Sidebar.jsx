export default function Sidebar({
  activeMenu,
  onSelectMenu,
  activeClass,
  history,
}) {
  const menus = [
    { id: "dashboard", label: "Beranda" },
    { id: "bank-soal", label: "Bank soal" },
    { id: "tambah-soal", label: "+ Tambah soal" },
    { id: "smartboard", label: "Smartboard" },
    { id: "territory-grid", label: "Perebutan Zona" },
    { id: "mobile", label: "Mobile" },
    { id: "kelas-siswa", label: "Kelas & siswa" },
    { id: "laporan", label: "Laporan" },
    { id: "pengaturan", label: "Pengaturan" },
  ];

  return (
    <aside className="sidebar" aria-label="Navigasi Panel Pengajar">
      <div className="brand">
        <span className="brand-logo" aria-hidden="true">
          EQ
        </span>
        <div>
          <strong>EduQuest</strong>
          <small>Studio · Panel Pengajar</small>
        </div>
      </div>

      <nav className="nav-list" aria-label="Menu utama">
        {menus.map((menu) => {
          const isActive = activeMenu === menu.id;
          return (
            <button
              key={menu.id}
              type="button"
              className={`nav-item ${isActive ? "active" : ""}`}
              aria-current={isActive ? "page" : undefined}
              onClick={() => onSelectMenu(menu.id)}
            >
              {menu.label}
            </button>
          );
        })}
      </nav>

      <div className="panel-soft">
        <span className="panel-label">Kelas aktif</span>
        <strong className="panel-title">{activeClass.name}</strong>
        <small className="panel-sub">{activeClass.students} siswa terdaftar</small>
        <button
          type="button"
          className="btn-outline"
          onClick={() => onSelectMenu("kelas-siswa")}
        >
          Ganti kelas
        </button>
      </div>

      <div className="panel-soft">
        <span className="panel-label">Riwayat sesi</span>
        <ul className="history-list">
          {history.map((item) => (
            <li key={item.id}>
              <span>{item.title}</span>
              <small>{item.time}</small>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}