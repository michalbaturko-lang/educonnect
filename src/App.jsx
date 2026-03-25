import React, { useState } from "react";
import { MessageSquare, ClipboardList, Calendar, BarChart3, Clock, Check, Bell, Menu, X, Home, GraduationCap, Users, BookOpen, FileText, ChevronDown, Award, AlertTriangle, PenLine, Send, ArrowLeft, Plus, Minus, Save } from "lucide-react";

/* ============================================================
   MOCK DATA
   ============================================================ */

// Parent view data
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

const PARENT_MESSAGES = [
  { id: 1, from: "Mgr. Petra Svobodová", subject: "Třídní schůzky 28.3.", preview: "Vážení rodiče, zveme vás na třídní schůzky...", time: "Dnes 8:30", unread: true, body: "Vážení rodiče, zveme vás na třídní schůzky, které se konají dne 28.3.2026 od 16:00 v budově školy. Prosím o potvrzení účasti." },
  { id: 2, from: "Mgr. Jan Dvořák", subject: "Výsledky písemné práce", preview: "Dobrý den, zasílám výsledky písemky...", time: "Včera", unread: true, body: "Dobrý den, zasílám výsledky písemné práce z matematiky. Tomáš dosáhl výborného výsledku 48/50 bodů." },
  { id: 3, from: "Systém EduConnect", subject: "Nová známka z angličtiny", preview: "Byla zadána nová známka: Angličtina – 1...", time: "14.3.", unread: false, body: "Byla zadána nová známka: Angličtina – 1 (Slovíčka). Vyučující: Mgr. Lucie Malá." },
];

const ATTENDANCE = {
  summary: { present: 156, absent: 8, excused: 7, late: 3 },
  recent: [
    { date: "18.3.", status: "present", note: "" },
    { date: "17.3.", status: "present", note: "" },
    { date: "15.3.", status: "late", note: "Pozdní příchod 5 min" },
    { date: "14.3.", status: "present", note: "" },
    { date: "13.3.", status: "absent", note: "Omluveno – lékař" },
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

// Teacher view data
const TEACHER = { name: "Mgr. Jan Dvořák", initials: "JD", subject: "Matematika" };

const CLASSES = [
  { id: "7A", name: "7.A", students: 28, avg: 1.82 },
  { id: "7B", name: "7.B", students: 26, avg: 2.15 },
  { id: "8A", name: "8.A", students: 30, avg: 1.95 },
  { id: "9A", name: "9.A", students: 27, avg: 2.31 },
];

const STUDENTS_7A = [
  { id: 1, name: "Bártová Anna", avg: 1.4, absent: 2 },
  { id: 2, name: "Černý David", avg: 2.8, absent: 12 },
  { id: 3, name: "Dvořáková Eva", avg: 1.2, absent: 0 },
  { id: 4, name: "Fiala Jakub", avg: 2.1, absent: 5 },
  { id: 5, name: "Horák Martin", avg: 1.8, absent: 3 },
  { id: 6, name: "Jelínková Klára", avg: 1.0, absent: 1 },
  { id: 7, name: "Král Lukáš", avg: 3.2, absent: 8 },
  { id: 8, name: "Malá Lucie", avg: 1.6, absent: 2 },
  { id: 9, name: "Novák Tomáš", avg: 1.5, absent: 4 },
  { id: 10, name: "Pokorná Petra", avg: 2.0, absent: 1 },
  { id: 11, name: "Říha Ondřej", avg: 2.5, absent: 6 },
  { id: 12, name: "Šimková Tereza", avg: 1.3, absent: 0 },
];

const TEACHER_SCHEDULE = [
  { time: "8:00", class: "7.A", subject: "Matematika", room: "201", topic: "Lineární rovnice" },
  { time: "8:55", class: "8.A", subject: "Matematika", room: "203", topic: "Pythagorova věta" },
  { time: "9:50", class: null, subject: null, room: null, topic: null },
  { time: "10:55", class: "7.B", subject: "Matematika", room: "201", topic: "Zlomky – opakování" },
  { time: "11:50", class: "9.A", subject: "Matematika", room: "204", topic: "Kvadratické rovnice" },
  { time: "12:45", class: null, subject: null, room: null, topic: null },
];

const CLASS_BOOK_ENTRIES = [
  { date: "25.3.", period: 1, class: "7.A", topic: "Lineární rovnice – úvod", homework: "Str. 45/cv. 1-5", note: "" },
  { date: "25.3.", period: 2, class: "8.A", topic: "Pythagorova věta – aplikace", homework: "", note: "" },
  { date: "24.3.", period: 1, class: "7.A", topic: "Procenta – opakování", homework: "Pracovní list", note: "" },
  { date: "24.3.", period: 3, class: "7.B", topic: "Zlomky – sčítání a odčítání", homework: "Str. 38/cv. 3-8", note: "" },
  { date: "24.3.", period: 5, class: "9.A", topic: "Kvadratické rovnice – diskriminant", homework: "", note: "Test příští týden!" },
];

const TEACHER_MESSAGES = [
  { id: 1, from: "Rodiče – Černý David (7.A)", subject: "Omluvenka – nemoc", time: "Dnes 7:45", unread: true, body: "Dobrý den, David je nemocný, omlouvám ho z výuky do pátku. Děkuji, Černá." },
  { id: 2, from: "Mgr. Svobodová (třídní 7.A)", subject: "Třídní schůzky – program", time: "Včera", unread: true, body: "Kolego, posílám program třídních schůzek 28.3. Připravte si prosím souhrn hodnocení za 7.A." },
  { id: 3, from: "Ředitelství", subject: "Suplování 26.3.", time: "24.3.", unread: false, body: "Mgr. Dvořák – suplování 3. hodinu za Mgr. Malou v 6.B (Angličtina). Děkujeme." },
  { id: 4, from: "Rodiče – Král Lukáš (7.A)", subject: "Konzultace hodnocení", time: "22.3.", unread: false, body: "Dobrý den, rádi bychom se domluvili na konzultaci ohledně Lukášova prospěchu v matematice. Je to možné?" },
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

/* ============================================================
   SHARED COMPONENTS
   ============================================================ */

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

const StatCard = ({ icon: Icon, label, value, color, sub }) => (
  <Card className="p-4">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}><Icon className="w-5 h-5" /></div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  </Card>
);

const PageHeader = ({ title, subtitle, action }) => (
  <div className="mb-6 flex items-start justify-between">
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h1>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
    {action}
  </div>
);

/* ============================================================
   PARENT VIEW PAGES
   ============================================================ */

const ParentDashboard = ({ setPage }) => (
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
              <div><p className="text-sm font-medium text-gray-900">{g.subject}</p><p className="text-xs text-gray-400">{g.type}</p></div>
              <GradeBadge grade={g.grade} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

const ParentMessages = () => {
  const [selected, setSelected] = useState(null);
  const msg = PARENT_MESSAGES.find(m => m.id === selected);
  return (
    <div>
      <PageHeader title="Zprávy" subtitle={`${PARENT_MESSAGES.filter(m => m.unread).length} nepřečtené`} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className={`space-y-2 ${selected ? "hidden lg:block" : ""} lg:col-span-1`}>
          {PARENT_MESSAGES.map(m => (
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
          {msg ? (
            <Card className="p-6">
              <button onClick={() => setSelected(null)} className="text-sm text-blue-600 mb-4 lg:hidden">&larr; Zpět</button>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">{msg.subject}</h2>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">{msg.from[0]}</div>
                <div><p className="text-sm font-medium">{msg.from}</p><p className="text-xs text-gray-400">{msg.time}</p></div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{msg.body}</p>
            </Card>
          ) : (
            <Card className="p-12 flex items-center justify-center"><div className="text-center text-gray-400"><MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" /><p className="text-sm">Vyberte zprávu</p></div></Card>
          )}
        </div>
      </div>
    </div>
  );
};

const ParentHomework = () => (
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
              <p className={`text-sm font-medium ${h.done ? "line-through text-gray-400" : "text-gray-900"}`}>{h.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{h.subject}</p>
            </div>
            <Badge color={h.done ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}>{h.done ? "Hotovo" : `do ${h.due}`}</Badge>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

const ParentAttendance = () => {
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
        <div className="p-4 border-b border-gray-100"><h2 className="font-semibold text-gray-900 text-sm">Poslední záznamy</h2></div>
        <div className="divide-y divide-gray-50">
          {recent.map((r, i) => { const s = statusMap[r.status]; return (
            <div key={i} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3"><div className={`w-2.5 h-2.5 rounded-full ${s.dot}`}></div><span className="text-sm text-gray-700 w-14">{r.date}</span><Badge color={s.color}>{s.label}</Badge></div>
              {r.note && <span className="text-xs text-gray-400 hidden sm:inline">{r.note}</span>}
            </div>
          ); })}
        </div>
      </Card>
    </div>
  );
};

const ParentGrades = () => {
  const subjects = [...new Set(GRADES.map(g => g.subject))];
  const avg = (GRADES.reduce((a, g) => a + g.grade * g.weight, 0) / GRADES.reduce((a, g) => a + g.weight, 0)).toFixed(2);
  return (
    <div>
      <PageHeader title="Známky" subtitle={`Celkový průměr: ${avg}`} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {subjects.map(sub => {
          const sg = GRADES.filter(g => g.subject === sub);
          const sa = (sg.reduce((a, g) => a + g.grade * g.weight, 0) / sg.reduce((a, g) => a + g.weight, 0)).toFixed(2);
          return (<Card key={sub} className="p-4"><div className="flex items-center justify-between mb-2"><span className={`text-xs px-2 py-0.5 rounded-full border ${SUBJECT_COLORS[sub] || "bg-gray-100"}`}>{sub}</span><span className="text-lg font-bold text-gray-900">{sa}</span></div><div className="flex gap-1.5 flex-wrap">{sg.map((g, i) => <GradeBadge key={i} grade={g.grade} />)}</div></Card>);
        })}
      </div>
      <Card>
        <div className="p-4 border-b border-gray-100"><h2 className="font-semibold text-gray-900 text-sm">Všechny známky</h2></div>
        <div className="divide-y divide-gray-50">
          {GRADES.map((g, i) => (<div key={i} className="flex items-center justify-between px-4 py-3"><div className="flex items-center gap-3 flex-1 min-w-0"><GradeBadge grade={g.grade} /><div className="min-w-0"><p className="text-sm font-medium text-gray-900">{g.subject}</p><p className="text-xs text-gray-400">{g.type} · Váha {g.weight}</p></div></div><span className="text-xs text-gray-400 flex-shrink-0">{g.date}</span></div>))}
        </div>
      </Card>
    </div>
  );
};

const ParentSchedule = () => (
  <div>
    <PageHeader title="Rozvrh" subtitle="Pondělí 18. března" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {SCHEDULE.map((s, i) => (
        <Card key={i} className="p-4"><div className="flex items-center gap-4"><div className="text-center flex-shrink-0 w-14"><p className="text-lg font-bold text-gray-900">{s.time}</p><p className="text-xs text-gray-400">{i + 1}. hod</p></div><div className="w-px h-10 bg-gray-200"></div><div className="flex-1"><p className={`text-sm font-medium px-2 py-0.5 rounded-full inline-block border ${SUBJECT_COLORS[s.subject] || "bg-gray-100"}`}>{s.subject}</p><p className="text-xs text-gray-400 mt-1">{s.teacher} · {s.room}</p></div></div></Card>
      ))}
    </div>
  </div>
);

/* ============================================================
   TEACHER VIEW PAGES
   ============================================================ */

const TeacherDashboard = ({ setPage, selectedClass }) => {
  const cls = CLASSES.find(c => c.id === selectedClass) || CLASSES[0];
  const todayLessons = TEACHER_SCHEDULE.filter(s => s.class);
  const pendingGrades = 4;
  const unreadMsg = TEACHER_MESSAGES.filter(m => m.unread).length;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Dobrý den, {TEACHER.name.split(" ").pop()}! 👋</h1>
        <p className="text-sm text-gray-500 mt-1">Úterý 25. března 2026 · {TEACHER.subject}</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={BookOpen} label="Dnešní hodiny" value={todayLessons.length} color="bg-blue-50 text-blue-600" />
        <StatCard icon={PenLine} label="Ke známkování" value={pendingGrades} color="bg-orange-50 text-orange-600" />
        <StatCard icon={MessageSquare} label="Nové zprávy" value={unreadMsg} color="bg-purple-50 text-purple-600" />
        <StatCard icon={Users} label="Žáků v třídách" value={CLASSES.reduce((a, c) => a + c.students, 0)} color="bg-green-50 text-green-600" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-900 text-sm">Dnešní rozvrh</h2>
            <button onClick={() => setPage("t-schedule")} className="text-xs text-blue-600 font-medium">Celý rozvrh</button>
          </div>
          <div className="space-y-2">
            {TEACHER_SCHEDULE.map((s, i) => (
              <div key={i} className={`flex items-center gap-3 py-2 px-3 rounded-lg ${s.class ? "bg-gray-50" : "bg-gray-50/50"}`}>
                <span className="text-xs text-gray-400 w-10 flex-shrink-0 font-mono">{s.time}</span>
                {s.class ? (
                  <>
                    <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">{s.class}</span>
                    <span className="text-sm text-gray-700 flex-1">{s.topic}</span>
                    <span className="text-xs text-gray-400 hidden sm:inline">{s.room}</span>
                  </>
                ) : (
                  <span className="text-xs text-gray-400 italic">Volná hodina</span>
                )}
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-900 text-sm">Moje třídy</h2>
          </div>
          <div className="space-y-2">
            {CLASSES.map(c => (
              <div key={c.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded w-10 text-center">{c.name}</span>
                  <span className="text-sm text-gray-600">{c.students} žáků</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-gray-900">{c.avg.toFixed(2)}</span>
                  <span className="text-xs text-gray-400 ml-1">průměr</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900 text-sm">Poslední zprávy</h2>
          <button onClick={() => setPage("t-messages")} className="text-xs text-blue-600 font-medium">Všechny</button>
        </div>
        <div className="space-y-2">
          {TEACHER_MESSAGES.slice(0, 3).map(m => (
            <div key={m.id} className={`flex items-center gap-3 py-2 px-3 rounded-lg ${m.unread ? "bg-blue-50" : "bg-gray-50"}`}>
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${m.unread ? "bg-blue-500" : "bg-transparent"}`}></div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm truncate ${m.unread ? "font-semibold text-gray-900" : "text-gray-600"}`}>{m.from}</p>
                <p className="text-xs text-gray-400 truncate">{m.subject}</p>
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0">{m.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const TeacherClassBook = ({ selectedClass }) => {
  const cls = CLASSES.find(c => c.id === selectedClass) || CLASSES[0];
  const entries = CLASS_BOOK_ENTRIES.filter(e => e.class === cls.name);
  return (
    <div>
      <PageHeader title="E-třídnice" subtitle={`Třída ${cls.name} · Matematika`} action={
        <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-2"><Plus className="w-4 h-4" /> Nový zápis</button>
      } />
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-4 py-3 font-medium text-gray-600">Datum</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Hod.</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Téma hodiny</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Domácí úkol</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">Poznámka</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {entries.map((e, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-700 font-mono">{e.date}</td>
                  <td className="px-4 py-3"><span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded">{e.period}.</span></td>
                  <td className="px-4 py-3 text-gray-900 font-medium">{e.topic}</td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{e.homework || "—"}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">{e.note ? <span className="text-orange-600 text-xs font-medium">{e.note}</span> : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const TeacherGrading = ({ selectedClass }) => {
  const cls = CLASSES.find(c => c.id === selectedClass) || CLASSES[0];
  const students = STUDENTS_7A;
  const [showAdd, setShowAdd] = useState(false);
  return (
    <div>
      <PageHeader title="Hodnocení" subtitle={`Třída ${cls.name} · Matematika · Průměr třídy: ${cls.avg.toFixed(2)}`} action={
        <button onClick={() => setShowAdd(!showAdd)} className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-2"><PenLine className="w-4 h-4" /> Nová známka</button>
      } />
      {showAdd && (
        <Card className="p-4 mb-4 border-blue-200 bg-blue-50/50">
          <h3 className="font-semibold text-gray-900 text-sm mb-3">Zadat novou známku pro celou třídu</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
            <div><label className="text-xs text-gray-500 block mb-1">Typ zkoušení</label><select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"><option>Písemná práce</option><option>Ústní zkoušení</option><option>Domácí úkol</option><option>Projekt</option></select></div>
            <div><label className="text-xs text-gray-500 block mb-1">Datum</label><input type="date" defaultValue="2026-03-25" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
            <div><label className="text-xs text-gray-500 block mb-1">Váha</label><select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"><option>1</option><option>2</option><option>3</option></select></div>
            <div><label className="text-xs text-gray-500 block mb-1">Popis</label><input type="text" placeholder="Např. Lineární rovnice" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-3">
            {students.map(s => (
              <div key={s.id} className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-3 py-2">
                <span className="text-xs text-gray-700 flex-1 truncate">{s.name.split(" ").pop()}</span>
                <select className="border border-gray-300 rounded px-1 py-0.5 text-sm w-12">
                  <option value="">—</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option>
                </select>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-2"><Save className="w-4 h-4" /> Uložit</button>
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300">Zrušit</button>
          </div>
        </Card>
      )}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-4 py-3 font-medium text-gray-600">#</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Jméno</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600">Průměr</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Absence</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Poslední známky</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map((s, i) => (
                <tr key={s.id} className={`hover:bg-gray-50 ${s.avg >= 3.0 ? "bg-red-50/50" : ""}`}>
                  <td className="px-4 py-3 text-gray-400 text-xs">{i + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{s.name}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center justify-center w-10 h-7 rounded text-sm font-bold ${s.avg <= 1.5 ? "bg-green-100 text-green-700" : s.avg <= 2.5 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{s.avg.toFixed(1)}</span>
                  </td>
                  <td className="px-4 py-3 text-center hidden md:table-cell">
                    <span className={`text-sm ${s.absent > 5 ? "text-red-600 font-semibold" : "text-gray-600"}`}>{s.absent}h</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {[1, 2, 1].map((g, j) => <GradeBadge key={j} grade={g} />)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const TeacherAttendance = ({ selectedClass }) => {
  const cls = CLASSES.find(c => c.id === selectedClass) || CLASSES[0];
  const students = STUDENTS_7A;
  const [period, setPeriod] = useState(1);
  return (
    <div>
      <PageHeader title="Docházka" subtitle={`Třída ${cls.name} · Dnes 25.3.2026`} />
      <div className="flex gap-2 mb-4 flex-wrap">
        {[1,2,3,4,5,6].map(p => (
          <button key={p} onClick={() => setPeriod(p)} className={`px-4 py-2 rounded-lg text-sm font-medium ${period === p ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{p}. hodina</button>
        ))}
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-4 py-3 font-medium text-gray-600">#</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Jméno</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600">Přítomen</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600">Pozdě</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600">Nepřítomen</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Poznámka</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map((s, i) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-400 text-xs">{i + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{s.name}</td>
                  <td className="px-4 py-3 text-center"><input type="radio" name={`att-${s.id}`} defaultChecked className="w-4 h-4 text-green-600" /></td>
                  <td className="px-4 py-3 text-center"><input type="radio" name={`att-${s.id}`} className="w-4 h-4 text-yellow-600" /></td>
                  <td className="px-4 py-3 text-center"><input type="radio" name={`att-${s.id}`} className="w-4 h-4 text-red-600" /></td>
                  <td className="px-4 py-3 hidden md:table-cell"><input type="text" placeholder="..." className="border border-gray-200 rounded px-2 py-1 text-xs w-full" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 flex justify-end">
          <button className="px-6 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-2"><Save className="w-4 h-4" /> Uložit docházku</button>
        </div>
      </Card>
    </div>
  );
};

const TeacherMessages = () => {
  const [selected, setSelected] = useState(null);
  const msg = TEACHER_MESSAGES.find(m => m.id === selected);
  return (
    <div>
      <PageHeader title="Zprávy" subtitle={`${TEACHER_MESSAGES.filter(m => m.unread).length} nepřečtené`} action={
        <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-2"><Send className="w-4 h-4" /> Nová zpráva</button>
      } />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className={`space-y-2 ${selected ? "hidden lg:block" : ""} lg:col-span-1`}>
          {TEACHER_MESSAGES.map(m => (
            <Card key={m.id} className={`p-4 ${m.unread ? "border-l-4 border-l-blue-500" : ""} ${selected === m.id ? "ring-2 ring-blue-500" : ""}`} onClick={() => setSelected(m.id)}>
              <div className="flex items-start justify-between mb-1">
                <p className={`text-sm ${m.unread ? "font-semibold text-gray-900" : "text-gray-700"}`}>{m.from}</p>
                <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{m.time}</span>
              </div>
              <p className="text-sm font-medium text-gray-800">{m.subject}</p>
            </Card>
          ))}
        </div>
        <div className={`${selected ? "block" : "hidden lg:block"} lg:col-span-2`}>
          {msg ? (
            <Card className="p-6">
              <button onClick={() => setSelected(null)} className="text-sm text-blue-600 mb-4 lg:hidden">&larr; Zpět</button>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">{msg.subject}</h2>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs font-bold">{msg.from[0]}</div>
                <div><p className="text-sm font-medium">{msg.from}</p><p className="text-xs text-gray-400">{msg.time}</p></div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">{msg.body}</p>
              <div className="border-t border-gray-100 pt-4">
                <textarea placeholder="Napište odpověď..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none h-20 mb-2"></textarea>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-2"><Send className="w-4 h-4" /> Odeslat</button>
              </div>
            </Card>
          ) : (
            <Card className="p-12 flex items-center justify-center"><div className="text-center text-gray-400"><MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" /><p className="text-sm">Vyberte zprávu</p></div></Card>
          )}
        </div>
      </div>
    </div>
  );
};

const TeacherSchedule = () => (
  <div>
    <PageHeader title="Můj rozvrh" subtitle="Úterý 25. března 2026" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {TEACHER_SCHEDULE.map((s, i) => (
        <Card key={i} className={`p-4 ${!s.class ? "opacity-50" : ""}`}>
          <div className="flex items-center gap-4">
            <div className="text-center flex-shrink-0 w-14">
              <p className="text-lg font-bold text-gray-900">{s.time}</p>
              <p className="text-xs text-gray-400">{i + 1}. hod</p>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            {s.class ? (
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">{s.class}</span>
                  <span className="text-sm font-medium text-gray-900">{s.subject}</span>
                  <span className="text-xs text-gray-400 ml-auto">{s.room}</span>
                </div>
                <p className="text-xs text-gray-500">{s.topic}</p>
              </div>
            ) : (
              <span className="text-sm text-gray-400 italic">Volná hodina</span>
            )}
          </div>
        </Card>
      ))}
    </div>
  </div>
);

/* ============================================================
   MAIN APP WITH ROLE SWITCHING
   ============================================================ */

const PARENT_NAV = [
  { id: "dashboard", label: "Přehled", icon: Home },
  { id: "messages", label: "Zprávy", icon: MessageSquare },
  { id: "homework", label: "Úkoly", icon: ClipboardList },
  { id: "attendance", label: "Docházka", icon: Calendar },
  { id: "grades", label: "Známky", icon: BarChart3 },
  { id: "schedule", label: "Rozvrh", icon: Clock },
];

const TEACHER_NAV = [
  { id: "t-dashboard", label: "Přehled", icon: Home },
  { id: "t-classbook", label: "E-třídnice", icon: BookOpen },
  { id: "t-grading", label: "Hodnocení", icon: PenLine },
  { id: "t-attendance", label: "Docházka", icon: Calendar },
  { id: "t-messages", label: "Zprávy", icon: MessageSquare },
  { id: "t-schedule", label: "Rozvrh", icon: Clock },
];

export default function App() {
  const [role, setRole] = useState("parent");
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("7A");
  const [classDropdown, setClassDropdown] = useState(false);

  const navItems = role === "teacher" ? TEACHER_NAV : PARENT_NAV;
  const unread = role === "teacher" ? TEACHER_MESSAGES.filter(m => m.unread).length : PARENT_MESSAGES.filter(m => m.unread).length;
  const user = role === "teacher" ? TEACHER : STUDENT;
  const cls = CLASSES.find(c => c.id === selectedClass);

  const switchRole = (r) => {
    setRole(r);
    setPage(r === "teacher" ? "t-dashboard" : "dashboard");
    setSidebarOpen(false);
  };

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <ParentDashboard setPage={setPage} />;
      case "messages": return <ParentMessages />;
      case "homework": return <ParentHomework />;
      case "attendance": return <ParentAttendance />;
      case "grades": return <ParentGrades />;
      case "schedule": return <ParentSchedule />;
      case "t-dashboard": return <TeacherDashboard setPage={setPage} selectedClass={selectedClass} />;
      case "t-classbook": return <TeacherClassBook selectedClass={selectedClass} />;
      case "t-grading": return <TeacherGrading selectedClass={selectedClass} />;
      case "t-attendance": return <TeacherAttendance selectedClass={selectedClass} />;
      case "t-messages": return <TeacherMessages />;
      case "t-schedule": return <TeacherSchedule />;
      default: return <ParentDashboard setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 lg:w-72 flex-col bg-white border-r border-gray-200 fixed inset-y-0 left-0 z-30">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${role === "teacher" ? "bg-green-600" : "bg-blue-600"}`}>
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">EduConnect</h1>
              <p className="text-xs text-gray-400">Školní informační systém</p>
            </div>
          </div>
          {/* Role switcher */}
          <div className="flex rounded-lg bg-gray-100 p-0.5">
            <button onClick={() => switchRole("parent")} className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${role === "parent" ? "bg-white text-blue-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>Rodič</button>
            <button onClick={() => switchRole("teacher")} className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${role === "teacher" ? "bg-white text-green-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>Učitel</button>
          </div>
        </div>
        <div className="p-3 border-b border-gray-100">
          <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${role === "teacher" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}>{role === "teacher" ? TEACHER.initials : STUDENT.avatar}</div>
            <div>
              <p className="text-sm font-medium text-gray-900">{role === "teacher" ? TEACHER.name : STUDENT.name}</p>
              <p className="text-xs text-gray-400">{role === "teacher" ? TEACHER.subject : `${STUDENT.class} · ${STUDENT.school}`}</p>
            </div>
          </div>
        </div>
        {/* Class switcher for teacher */}
        {role === "teacher" && (
          <div className="px-3 py-2 border-b border-gray-100">
            <div className="relative">
              <button onClick={() => setClassDropdown(!classDropdown)} className="w-full flex items-center justify-between px-3 py-2 bg-green-50 rounded-lg text-sm font-medium text-green-700 hover:bg-green-100">
                <span>Třída: {cls?.name}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${classDropdown ? "rotate-180" : ""}`} />
              </button>
              {classDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {CLASSES.map(c => (
                    <button key={c.id} onClick={() => { setSelectedClass(c.id); setClassDropdown(false); }} className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 ${c.id === selectedClass ? "bg-green-50 text-green-700" : "text-gray-700"}`}>
                      <span className="font-medium">{c.name}</span>
                      <span className="text-xs text-gray-400">{c.students} žáků</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setPage(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${page === item.id ? (role === "teacher" ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700") : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}>
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
              {(item.id === "messages" || item.id === "t-messages") && unread > 0 && <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{unread}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)}></div>
          <aside className="absolute inset-y-0 left-0 w-72 bg-white shadow-xl overflow-y-auto">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${role === "teacher" ? "bg-green-600" : "bg-blue-600"}`}><GraduationCap className="w-6 h-6 text-white" /></div>
                <h1 className="text-lg font-bold text-gray-900">EduConnect</h1>
              </div>
              <button onClick={() => setSidebarOpen(false)}><X className="w-6 h-6 text-gray-400" /></button>
            </div>
            <div className="p-3 border-b border-gray-100">
              <div className="flex rounded-lg bg-gray-100 p-0.5">
                <button onClick={() => switchRole("parent")} className={`flex-1 py-1.5 text-xs font-medium rounded-md ${role === "parent" ? "bg-white text-blue-700 shadow-sm" : "text-gray-500"}`}>Rodič</button>
                <button onClick={() => switchRole("teacher")} className={`flex-1 py-1.5 text-xs font-medium rounded-md ${role === "teacher" ? "bg-white text-green-700 shadow-sm" : "text-gray-500"}`}>Učitel</button>
              </div>
            </div>
            {role === "teacher" && (
              <div className="px-3 py-2 border-b border-gray-100">
                {CLASSES.map(c => (
                  <button key={c.id} onClick={() => { setSelectedClass(c.id); }} className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg ${c.id === selectedClass ? "bg-green-50 text-green-700 font-medium" : "text-gray-600"}`}>
                    <span>{c.name}</span><span className="text-xs text-gray-400">{c.students} žáků</span>
                  </button>
                ))}
              </div>
            )}
            <nav className="p-3 space-y-1">
              {navItems.map(item => (
                <button key={item.id} onClick={() => { setPage(item.id); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${page === item.id ? (role === "teacher" ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700") : "text-gray-600 hover:bg-gray-50"}`}>
                  <item.icon className="w-5 h-5" /><span>{item.label}</span>
                  {(item.id === "messages" || item.id === "t-messages") && unread > 0 && <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{unread}</span>}
                </button>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 md:ml-64 lg:ml-72">
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3 md:px-6">
            <div className="flex items-center gap-3">
              <button className="md:hidden" onClick={() => setSidebarOpen(true)}><Menu className="w-6 h-6 text-gray-600" /></button>
              <div className="md:hidden flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${role === "teacher" ? "bg-green-600" : "bg-blue-600"}`}><GraduationCap className="w-5 h-5 text-white" /></div>
                <span className="font-bold text-gray-900">EduConnect</span>
              </div>
              <h2 className="hidden md:block text-lg font-semibold text-gray-900">{navItems.find(n => n.id === page)?.label || "Přehled"}</h2>
              {role === "teacher" && <span className="hidden md:inline text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Učitel</span>}
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setPage(role === "teacher" ? "t-messages" : "messages")}>
                <Bell className="w-5 h-5 text-gray-500" />
                {unread > 0 && <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{unread}</span>}
              </button>
              <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-gray-200">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${role === "teacher" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}>{role === "teacher" ? TEACHER.initials : STUDENT.avatar}</div>
                <span className="text-sm font-medium text-gray-700">{role === "teacher" ? TEACHER.name : STUDENT.name}</span>
              </div>
            </div>
          </div>
        </header>
        <main className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto pb-24 md:pb-8">
          {renderPage()}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 md:hidden">
        <div className="flex justify-around py-2">
          {navItems.slice(0, 5).map(item => (
            <button key={item.id} onClick={() => setPage(item.id)} className={`flex flex-col items-center gap-0.5 px-2 py-1 min-w-0 ${page === item.id ? (role === "teacher" ? "text-green-600" : "text-blue-600") : "text-gray-400"}`}>
              <div className="relative">
                <item.icon className="w-5 h-5" />
                {(item.id === "messages" || item.id === "t-messages") && unread > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-3.5 h-3.5 flex items-center justify-center" style={{ fontSize: 9 }}>{unread}</span>}
              </div>
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
