import React, { useState } from "react";
import { BookOpen, MessageSquare, ClipboardList, Calendar, BarChart3, Clock, ChevronRight, Check, AlertCircle, User, Bell, Menu, X, Home, GraduationCap } from "lucide-react";

const STUDENT = { name: "Tomáš Novák", class: "7.A", school: "ZŠ Gajdošova", avatar: "TN" };

const GRADES = [
  { subject: "Matematika", grade: 1, date: "18.3.", type: "Písemná práce", weight: 2 },
  { subject: "Český jazyk", grade: 2, date: "15.3.", type: "Diktát", weight: 1 },
  { subject: "Angličtina", grade: 1, date: "14.3.", type: "Slovíčka", weight: 1 },
  { subject: "Dějepis", grade: 3, date: "12.3.", type: "Ústní zkoušení", weight: 1 },
  { subject: "Fyzika", grade: 2, date: "10.3.", type: "Laboratorní práce", weight: 1 },
  { subject: "Přírodopis", grade: 1, date: "8.3.", type: "Projekt", weight: 2 },
];

const HOMEWORK = [
  { id: 1, subject: "Matematika", title: "Rovnice – cvičení str. 45", due: "Zítra", done: false },
  { id: 2, subject: "Český jazyk", title: "Slohová práce – popis osoby", due: "Čt 21.3.", done: false },
  { id: 3, subject: "Angličtina", title: "Workbook str. 32-33", due: "Pá 22.3.", done: true },
  { id: 4, subject: "Fyzika", title: "Příklady na sílu a tlak", due: "Po 25.3.", done: false },
  { id: 5, subject: "Dějepis", title: "Referát – průmyslová revoluce", due: "Út 26.3.", done: false },
];

const MESSAGES = [
  { id: 1, from: "Mgr. Petra Svobodová", subject: "Třídní schůzky 28.3.", preview: "Vážení rodiče, zveme vás na třídní schůzky...", time: "Dnes 8:30", unread: true, body: "Vážení rodiče, zveme vás na třídní schůzky, které se konají dne 28.3.2026 od 16:00 v budově školy. Prosím o potvrzení účasti. S pozdravem, Mgr. Petra Svobodová" },
  { id: 2, from: "Mgr. Jan Dvořák", subject: "Výsledky písemné práce z matematiky", preview: "Dobrý den, zasílám výsledky písemky...", time: "Včera", unread: true, body: "Dobrý den, zasílám výsledky písemné práce z matematiky. Tomáš dosáhl výborného výsledku 48/50 bodů. Gratulujeme! S pozdravem, Mgr. Jan Dvořák" },
  { id: 3, from: "Systém EduConnect", subject: "Nová známka z angličtiny", preview: "Byla zadána nová známka: Angličtina – 1...", time: "14.3.", unread: false, body: "Byla zadána nová známka: Angličtina – 1 (Slovíčka). Vyučující: Mgr. Lucie Malá." },
  { id: 4, from: "Mgr. Lucie Malá", subject: "Školní výlet – informace", preview: "Milí rodiče, ráda bych vás informovala o chystaném výletu...", time: "12.3.", unread: false, body: "Milí rodiče, ráda bych vás informovala o chystaném školním výletu do Brna, který se uskuteční 5.4.2026. Cena je 350 Kč. Prosím o potvrzení účasti do 25.3." },
];

const ATTENDANCE = {
  summary: { present: 156, absent: 8, excused: 7, late: 3 },
  recent: [
    { date: "18.3.", status: "present", note: "" },
    { date: "17.3.", status: "present", note: "" },
    { date: "15.3.", status: "late", note: "Pozdní příchod 5 min" },
    { date: "14.3.", status: "present", note: "" },
    { date: "13.3.", status: "absent", note: "Omluveno – lékař" },
    { date: "12.3.", status: "present", note: "" },
    { date: "11.3.", status: "present", note: "" },
    { date: "10.3.", status: "absent", note: "Omluveno – nemoc" },
  ],
};

const SCHEDULE = [
  { time: "8:00", subject: "Matematika", teacher: "Mgr. Dvořák", room: "201" },
  { time: "8:55", subject: "Český jazyk", teacher: "Mgr. Svobodová", room: "201" },
  { time: "9:50", subject: "Angličtina", teacher: "Mgr. Malá", room: "305" },
  { time: "10:55", subject: "Fyzika", teacher: "Ing. Horák", room: "Lab 1" },
  { time: "11:50", subject: "Dějepis", teacher: "Mgr. Černý", room: "102" },
  { time: "12:45", subject: "Tělesná výchova", teacher: "Mgr. Kolář", room: "Tělocvična" },
];

const SUBJECT_COLORS = {
  Matematika: "bg-blue-100 text-blue-700 border-blue-200",
  "Český jazyk": "bg-purple-100 text-purple-700 border-purple-200",
  Angličtina: "bg-green-100 text-green-700 border-green-200",
  Fyzika: "bg-orange-100 text-orange-700 border-orange-200",
  Dějepis: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Přírodopis: "bg-teal-100 text-teal-700 border-teal-200",
  "Tělesná výchova": "bg-red-100 text-red-700 border-red-200",
};

const Badge = ({ children, color }) => (
  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${color}`}>{children}</span>
);

const GradeBadge = ({ grade }) => {
  const colors = { 1: "bg-green-100 text-green-700 border-green-300", 2: "bg-lime-100 text-lime-700 border-lime-300", 3: "bg-yellow-100 text-yellow-700 border-yellow-300", 4: "bg-orange-100 text-orange-700 border-orange-300", 5: "bg-red-100 text-red-700 border-red-300" };
  return <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold border ${colors[grade] || "bg-gray-100 text-gray-700"}`}>{grade}</span>;
};

const Card = ({ children, className = "", onClick }) => (
  <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""} ${className}`} onClick={onClick}>{children}</div>
);

const StatCard = ({ icon: Icon, label, value, color }) => (
  <Card className="p-4">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}><Icon className="w-5 h-5" /></div>
      <div><p className="text-2xl font-bold text-gray-900">{value}</p><p className="text-xs text-gray-500">{label}</p></div>
    </div>
  </Card>
);

const PageHeader = ({ title, subtitle }) => (
  <div className="mb-6">
    <h1 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h1>
    {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
  </div>
);

/* ==================== PAGES ==================== */

const DashboardPage = ({ setPage }) => (
  <div className="space-y-6">
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-gray-900">Dobrý den! 👋</h1>
      <p className="text-sm text-gray-500 mt-1">{STUDENT.name} · {STUDENT.class} · {STUDENT.school}</p>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <StatCard icon={BarChart3} label="Průměr" value="1.67" color="bg-blue-50 text-blue-600" />
      <StatCard icon={ClipboardList} label="Úkoly" value="3" color="bg-orange-50 text-orange-600" />
      <StatCard icon={MessageSquare} label="Nové zprávy" value="2" color="bg-purple-50 text-purple-600" />
      <StatCard icon={Clock} label="Docházka" value="95%" color="bg-green-50 text-green-600" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900 text-sm">Dnešní rozvrh</h2>
          <button onClick={() => setPage("schedule")} className="text-xs text-blue-600 font-medium">Celý rozvrh</button>
        </div>
        <div className="space-y-2">
          {SCHEDULE.slice(0, 4).map((s, i) => (
            <div key={i} className="flex items-center gap-3 py-1.5">
              <span className="text-xs text-gray-400 w-10 flex-shrink-0">{s.time}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${SUBJECT_COLORS[s.subject] || "bg-gray-100 text-gray-600"}`}>{s.subject}</span>
              <span className="text-xs text-gray-400 ml-auto hidden sm:inline">{s.room}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900 text-sm">Poslední známky</h2>
          <button onClick={() => setPage("grades")} className="text-xs text-blue-600 font-medium">Všechny</button>
        </div>
        <div className="space-y-2">
          {GRADES.slice(0, 4).map((g, i) => (
            <div key={i} className="flex items-center justify-between py-1.5">
              <div>
                <p className="text-sm font-medium text-gray-900">{g.subject}</p>
                <p className="text-xs text-gray-400">{g.type}</p>
              </div>
              <GradeBadge grade={g.grade} />
            </div>
          ))}
        </div>
      </Card>
    </div>
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-gray-900 text-sm">Úkoly k odevzdání</h2>
        <button onClick={() => setPage("homework")} className="text-xs text-blue-600 font-medium">Všechny</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {HOMEWORK.filter(h => !h.done).slice(0, 3).map((h, i) => (
          <div key={i} className="flex items-center gap-3 py-2 px-3 bg-gray-50 rounded-lg">
            <div className="w-5 h-5 rounded border-2 border-gray-300 flex items-center justify-center flex-shrink-0">
              {h.done && <Check className="w-3 h-3 text-green-600" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{h.title}</p>
              <p className="text-xs text-gray-400">{h.subject}</p>
            </div>
            <Badge color="bg-orange-100 text-orange-700">do {h.due}</Badge>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

const MessagesPage = () => {
  const [selected, setSelected] = useState(null);
  const selectedMsg = MESSAGES.find(m => m.id === selected);
  return (
    <div>
      <PageHeader title="Zprávy" subtitle={`${MESSAGES.filter(m => m.unread).length} nepřečtené`} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className={`space-y-2 ${selected ? "hidden lg:block" : ""} lg:col-span-1`}>
          {MESSAGES.map(m => (
            <Card key={m.id} className={`p-4 ${m.unread ? "border-l-4 border-l-blue-500" : ""} ${selected === m.id ? "ring-2 ring-blue-500" : ""}`} onClick={() => setSelected(m.id)}>
              <div className="flex items-start justify-between mb-1">
                <p className={`text-sm ${m.unread ? "font-semibold text-gray-900" : "text-gray-700"}`}>{m.from}</p>
                <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{m.time}</span>
              </div>
              <p className="text-sm font-medium text-gray-800">{m.subject}</p>
              <p className="text-xs text-gray-400 mt-1 truncate">{m.preview}</p>
            </Card>
          ))}
        </div>
        <div className={`${selected ? "block" : "hidden lg:block"} lg:col-span-2`}>
          {selectedMsg ? (
            <Card className="p-6">
              <button onClick={() => setSelected(null)} className="text-sm text-blue-600 mb-4 lg:hidden">← Zpět na zprávy</button>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">{selectedMsg.subject}</h2>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">{selectedMsg.from[0]}</div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{selectedMsg.from}</p>
                  <p className="text-xs text-gray-400">{selectedMsg.time}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{selectedMsg.body}</p>
            </Card>
          ) : (
            <Card className="p-12 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Vyberte zprávu pro zobrazení</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

const HomeworkPage = () => (
  <div>
    <PageHeader title="Úkoly" subtitle={`${HOMEWORK.filter(h => !h.done).length} nesplněné`} />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {HOMEWORK.map(h => (
        <Card key={h.id} className={`p-4 ${h.done ? "opacity-60" : ""}`}>
          <div className="flex items-start gap-3">
            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${h.done ? "border-green-500 bg-green-50" : "border-gray-300"}`}>
              {h.done && <Check className="w-4 h-4 text-green-600" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className={`text-sm font-medium ${h.done ? "line-through text-gray-400" : "text-gray-900"}`}>{h.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{h.subject}</p>
                </div>
                <Badge color={h.done ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}>{h.done ? "Hotovo" : `do ${h.due}`}</Badge>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

const AttendancePage = () => {
  const { summary, recent } = ATTENDANCE;
  const statusMap = { present: { label: "Přítomen", color: "bg-green-100 text-green-700", dot: "bg-green-500" }, absent: { label: "Nepřítomen", color: "bg-red-100 text-red-700", dot: "bg-red-500" }, late: { label: "Pozdě", color: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-500" } };
  return (
    <div>
      <PageHeader title="Docházka" subtitle="Přehled docházky" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Card className="p-4 text-center"><p className="text-2xl font-bold text-green-600">{summary.present}</p><p className="text-xs text-gray-500">Přítomen</p></Card>
        <Card className="p-4 text-center"><p className="text-2xl font-bold text-red-600">{summary.absent}</p><p className="text-xs text-gray-500">Absence</p></Card>
        <Card className="p-4 text-center"><p className="text-2xl font-bold text-blue-600">{summary.excused}</p><p className="text-xs text-gray-500">Omluveno</p></Card>
        <Card className="p-4 text-center"><p className="text-2xl font-bold text-yellow-600">{summary.late}</p><p className="text-xs text-gray-500">Pozdě</p></Card>
      </div>
      <Card>
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900 text-sm">Poslední záznamy</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {recent.map((r, i) => {
            const s = statusMap[r.status];
            return (
              <div key={i} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${s.dot}`}></div>
                  <span className="text-sm text-gray-700 w-14">{r.date}</span>
                  <Badge color={s.color}>{s.label}</Badge>
                </div>
                {r.note && <span className="text-xs text-gray-400 hidden sm:inline">{r.note}</span>}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

const GradesPage = () => {
  const subjects = [...new Set(GRADES.map(g => g.subject))];
  const avg = (GRADES.reduce((a, g) => a + g.grade * g.weight, 0) / GRADES.reduce((a, g) => a + g.weight, 0)).toFixed(2);
  return (
    <div>
      <PageHeader title="Známky" subtitle={`Celkový průměr: ${avg}`} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {subjects.map(sub => {
          const subGrades = GRADES.filter(g => g.subject === sub);
          const subAvg = (subGrades.reduce((a, g) => a + g.grade * g.weight, 0) / subGrades.reduce((a, g) => a + g.weight, 0)).toFixed(2);
          return (
            <Card key={sub} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs px-2 py-0.5 rounded-full border ${SUBJECT_COLORS[sub] || "bg-gray-100"}`}>{sub}</span>
                <span className="text-lg font-bold text-gray-900">{subAvg}</span>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {subGrades.map((g, i) => <GradeBadge key={i} grade={g.grade} />)}
              </div>
            </Card>
          );
        })}
      </div>
      <Card>
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900 text-sm">Všechny známky</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {GRADES.map((g, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <GradeBadge grade={g.grade} />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900">{g.subject}</p>
                  <p className="text-xs text-gray-400">{g.type} · Váha {g.weight}</p>
                </div>
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0">{g.date}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const SchedulePage = () => (
  <div>
    <PageHeader title="Rozvrh" subtitle="Pondělí 18. března" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {SCHEDULE.map((s, i) => (
        <Card key={i} className="p-4">
          <div className="flex items-center gap-4">
            <div className="text-center flex-shrink-0 w-14">
              <p className="text-lg font-bold text-gray-900">{s.time}</p>
              <p className="text-xs text-gray-400">{i + 1}. hod</p>
            </div>
            <div className="w-px h-10 bg-gray-200"></div>
            <div className="flex-1">
              <p className={`text-sm font-medium px-2 py-0.5 rounded-full inline-block border ${SUBJECT_COLORS[s.subject] || "bg-gray-100"}`}>{s.subject}</p>
              <p className="text-xs text-gray-400 mt-1">{s.teacher} · {s.room}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

/* ==================== MAIN APP ==================== */

const NAV_ITEMS = [
  { id: "dashboard", label: "Přehled", icon: Home },
  { id: "messages", label: "Zprávy", icon: MessageSquare },
  { id: "homework", label: "Úkoly", icon: ClipboardList },
  { id: "attendance", label: "Docházka", icon: Calendar },
  { id: "grades", label: "Známky", icon: BarChart3 },
  { id: "schedule", label: "Rozvrh", icon: Clock },
];

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const unread = MESSAGES.filter(m => m.unread).length;

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <DashboardPage setPage={setPage} />;
      case "messages": return <MessagesPage />;
      case "homework": return <HomeworkPage />;
      case "attendance": return <AttendancePage />;
      case "grades": return <GradesPage />;
      case "schedule": return <SchedulePage />;
      default: return <DashboardPage setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 lg:w-72 flex-col bg-white border-r border-gray-200 fixed inset-y-0 left-0 z-30">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">EduConnect</h1>
              <p className="text-xs text-gray-400">Školní informační systém</p>
            </div>
          </div>
        </div>
        <div className="p-3 border-b border-gray-100">
          <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-bold">{STUDENT.avatar}</div>
            <div>
              <p className="text-sm font-medium text-gray-900">{STUDENT.name}</p>
              <p className="text-xs text-gray-400">{STUDENT.class} · {STUDENT.school}</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => setPage(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${page === item.id ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}>
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
              {item.id === "messages" && unread > 0 && <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{unread}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)}></div>
          <aside className="absolute inset-y-0 left-0 w-72 bg-white shadow-xl">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-lg font-bold text-gray-900">EduConnect</h1>
              </div>
              <button onClick={() => setSidebarOpen(false)}><X className="w-6 h-6 text-gray-400" /></button>
            </div>
            <nav className="p-3 space-y-1">
              {NAV_ITEMS.map(item => (
                <button key={item.id} onClick={() => { setPage(item.id); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${page === item.id ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {item.id === "messages" && unread > 0 && <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{unread}</span>}
                </button>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 md:ml-64 lg:ml-72">
        {/* Top Header */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3 md:px-6">
            <div className="flex items-center gap-3">
              <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <div className="md:hidden flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-gray-900">EduConnect</span>
              </div>
              <h2 className="hidden md:block text-lg font-semibold text-gray-900">{NAV_ITEMS.find(n => n.id === page)?.label || "Přehled"}</h2>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setPage("messages")}>
                <Bell className="w-5 h-5 text-gray-500" />
                {unread > 0 && <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{unread}</span>}
              </button>
              <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-gray-200">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">{STUDENT.avatar}</div>
                <span className="text-sm font-medium text-gray-700">{STUDENT.name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          {renderPage()}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 md:hidden">
        <div className="flex justify-around py-2">
          {NAV_ITEMS.slice(0, 5).map(item => (
            <button key={item.id} onClick={() => setPage(item.id)} className={`flex flex-col items-center gap-0.5 px-2 py-1 min-w-0 ${page === item.id ? "text-blue-600" : "text-gray-400"}`}>
              <div className="relative">
                <item.icon className="w-5 h-5" />
                {item.id === "messages" && unread > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-3.5 h-3.5 flex items-center justify-center" style={{ fontSize: 9 }}>{unread}</span>}
              </div>
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
