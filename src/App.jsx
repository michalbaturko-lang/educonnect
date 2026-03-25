import { useState } from "react";
import {
  LayoutDashboard, MessageSquare, BookOpen, CalendarCheck,
  GraduationCap, Clock, Bell, ChevronRight, ArrowLeft,
  Send, Paperclip, Check, CheckCheck, X, AlertCircle,
  TrendingUp, TrendingDown, Minus, Star, Users, FileText,
  Menu, Home, Settings, LogOut, Search, Filter, Plus,
  Calendar, ChevronDown, ChevronUp, Eye, Download
} from "lucide-react";

// ============================================================
// MOCK DATA
// ============================================================
const STUDENT = { name: "Aneta Novakova", class: "III.A", photo: null };

const GRADES = [
  { subject: "Matematika", abbr: "M", grades: [
    { value: 1, date: "22.3.", label: "Nasobeni", weight: 1 },
    { value: 2, date: "15.3.", label: "Scitani do 100", weight: 2 },
    { value: 1, date: "8.3.", label: "Geometrie", weight: 1 },
    { value: 3, date: "1.3.", label: "Slovni ulohy", weight: 2 },
  ], avg: 1.71 },
  { subject: "Cesky jazyk", abbr: "CJ", grades: [
    { value: 2, date: "20.3.", label: "Diktovat", weight: 2 },
    { value: 1, date: "12.3.", label: "Cteni", weight: 1 },
    { value: 2, date: "5.3.", label: "Mluvnice", weight: 2 },
  ], avg: 1.80 },
  { subject: "Anglicky jazyk", abbr: "AJ", grades: [
    { value: 1, date: "21.3.", label: "Unit 4 test", weight: 2 },
    { value: 1, date: "14.3.", label: "Slovicka", weight: 1 },
  ], avg: 1.00 },
  { subject: "Prirodoveda", abbr: "PRV", grades: [
    { value: 2, date: "18.3.", label: "Rostliny", weight: 1 },
  ], avg: 2.00 },
  { subject: "Vlastiveda", abbr: "VL", grades: [
    { value: 1, date: "19.3.", label: "Moje mesto", weight: 1 },
  ], avg: 1.00 },
];

const HOMEWORK = [
  { id: 1, subject: "Matematika", title: "PS str. 33, cv. 4 a 5", due: "26.3.", done: false, teacher: "Mgr. Kralova" },
  { id: 2, subject: "Cesky jazyk", title: "Pisanka - dopsat str. 39", due: "26.3.", done: false, teacher: "Mgr. Kralova" },
  { id: 3, subject: "Anglicky jazyk", title: "Workbook p. 27-28", due: "28.3.", done: false, teacher: "Mr. George" },
  { id: 4, subject: "Matematika", title: "Procvicovani nasobilky 2-5", due: "25.3.", done: true, teacher: "Mgr. Kralova" },
  { id: 5, subject: "Cesky jazyk", title: "Cteni str. 58-64", due: "24.3.", done: true, teacher: "Mgr. Kralova" },
];

const MESSAGES = [
  { id: 1, from: "Mgr. Kralova", role: "Tridni ucitelka", time: "dnes 7:30", subject: "Akce na brezen", preview: "Dobry den, posilam prehled akci na brezen...", unread: true, avatar: "KR" },
  { id: 2, from: "Vedeni skoly", role: "Reditelstvi", time: "vcera", subject: "Platba skoly v prirode", preview: "Prosime o uhrazeni platby do konce dubna...", unread: true, avatar: "VS" },
  { id: 3, from: "Mr. George", role: "Ucitel AJ", time: "po 22.3.", subject: "Unit 4 - vysledky testu", preview: "Aneta napsala test na jednicku, gratuluji...", unread: false, avatar: "GE" },
  { id: 4, from: "Mgr. Kralova", role: "Tridni ucitelka", time: "pa 20.3.", subject: "Foceni trid", preview: "V utery 25.3. probehne foceni trid...", unread: false, avatar: "KR" },
];

const ATTENDANCE = [
  { date: "25.3.", day: "Ut", status: "present", hours: "1.-5.", note: null },
  { date: "24.3.", day: "Po", status: "present", hours: "1.-5.", note: null },
  { date: "21.3.", day: "Pa", status: "present", hours: "1.-5.", note: null },
  { date: "20.3.", day: "Ct", status: "late", hours: "1.-5.", note: "Pozdni prichod 8:12" },
  { date: "19.3.", day: "St", status: "absent", hours: "1.-5.", note: "Nemoc - omluveno" },
  { date: "18.3.", day: "Ut", status: "absent", hours: "1.-5.", note: "Nemoc - omluveno" },
  { date: "17.3.", day: "Po", status: "absent", hours: "1.-5.", note: "Nemoc - omluveno" },
  { date: "14.3.", day: "Pa", status: "present", hours: "1.-5.", note: null },
];

const SCHEDULE = {
  "Po": [
    { hour: 1, time: "8:00-8:45", subject: "Cesky jazyk", teacher: "Kralova", room: "III.A" },
    { hour: 2, time: "8:55-9:40", subject: "Matematika", teacher: "Kralova", room: "III.A" },
    { hour: 3, time: "10:00-10:45", subject: "Anglicky jazyk", teacher: "George", room: "JAZ1" },
    { hour: 4, time: "10:55-11:40", subject: "Prirodoveda", teacher: "Kralova", room: "III.A" },
    { hour: 5, time: "11:50-12:35", subject: "Telesna vychova", teacher: "Novak", room: "TV" },
  ],
  "Ut": [
    { hour: 1, time: "8:00-8:45", subject: "Matematika", teacher: "Kralova", room: "III.A" },
    { hour: 2, time: "8:55-9:40", subject: "Cesky jazyk", teacher: "Kralova", room: "III.A" },
    { hour: 3, time: "10:00-10:45", subject: "Vlastiveda", teacher: "Kralova", room: "III.A" },
    { hour: 4, time: "10:55-11:40", subject: "Hudebni vychova", teacher: "Kralova", room: "HV" },
    { hour: 5, time: "11:50-12:35", subject: "Vytv. vychova", teacher: "Kralova", room: "VV" },
  ],
  "St": [
    { hour: 1, time: "8:00-8:45", subject: "Cesky jazyk", teacher: "Kralova", room: "III.A" },
    { hour: 2, time: "8:55-9:40", subject: "Matematika", teacher: "Kralova", room: "III.A" },
    { hour: 3, time: "10:00-10:45", subject: "Anglicky jazyk", teacher: "George", room: "JAZ1" },
    { hour: 4, time: "10:55-11:40", subject: "Informatika", teacher: "Horak", room: "PC1" },
    { hour: 5, time: "11:50-12:35", subject: "Pracovni cin.", teacher: "Kralova", room: "III.A" },
  ],
  "Ct": [
    { hour: 1, time: "8:00-8:45", subject: "Matematika", teacher: "Kralova", room: "III.A" },
    { hour: 2, time: "8:55-9:40", subject: "Cesky jazyk", teacher: "Kralova", room: "III.A" },
    { hour: 3, time: "10:00-10:45", subject: "Prirodoveda", teacher: "Kralova", room: "III.A" },
    { hour: 4, time: "10:55-11:40", subject: "Telesna vychova", teacher: "Novak", room: "TV" },
    { hour: 5, time: "11:50-12:35", subject: "Cesky jazyk", teacher: "Kralova", room: "III.A" },
  ],
  "Pa": [
    { hour: 1, time: "8:00-8:45", subject: "Cesky jazyk", teacher: "Kralova", room: "III.A" },
    { hour: 2, time: "8:55-9:40", subject: "Matematika", teacher: "Kralova", room: "III.A" },
    { hour: 3, time: "10:00-10:45", subject: "Anglicky jazyk", teacher: "George", room: "JAZ1" },
    { hour: 4, time: "10:55-11:40", subject: "Vlastiveda", teacher: "Kralova", room: "III.A" },
  ],
};

const SUBJECT_COLORS = {
  "Matematika": "bg-blue-100 text-blue-800",
  "Cesky jazyk": "bg-red-100 text-red-800",
  "Anglicky jazyk": "bg-purple-100 text-purple-800",
  "Prirodoveda": "bg-green-100 text-green-800",
  "Vlastiveda": "bg-yellow-100 text-yellow-800",
  "Telesna vychova": "bg-orange-100 text-orange-800",
  "Hudebni vychova": "bg-pink-100 text-pink-800",
  "Vytv. vychova": "bg-indigo-100 text-indigo-800",
  "Informatika": "bg-cyan-100 text-cyan-800",
  "Pracovni cin.": "bg-amber-100 text-amber-800",
};

// ============================================================
// HELPER COMPONENTS
// ============================================================
const Badge = ({ children, color = "bg-gray-100 text-gray-700" }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
    {children}
  </span>
);

const GradeBadge = ({ value }) => {
  const colors = {
    1: "bg-green-500", 2: "bg-green-400", 3: "bg-yellow-400", 4: "bg-orange-400", 5: "bg-red-500"
  };
  return (
    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm ${colors[value] || "bg-gray-400"}`}>
      {value}
    </span>
  );
};

const Card = ({ children, className = "", onClick }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""} ${className}`} onClick={onClick}>
    {children}
  </div>
);

const StatCard = ({ icon: Icon, label, value, trend, trendLabel, color = "text-blue-600" }) => (
  <Card className="p-4">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg bg-opacity-10 ${color === "text-blue-600" ? "bg-blue-100" : color === "text-green-600" ? "bg-green-100" : color === "text-orange-600" ? "bg-orange-100" : "bg-purple-100"}`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 truncate">{label}</p>
        <p className="text-lg font-bold text-gray-900">{value}</p>
      </div>
      {trend && (
        <div className={`flex items-center gap-0.5 text-xs ${trend === "up" ? "text-green-600" : trend === "down" ? "text-red-500" : "text-gray-400"}`}>
          {trend === "up" ? <TrendingUp className="w-3 h-3" /> : trend === "down" ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
          <span>{trendLabel}</span>
        </div>
      )}
    </div>
  </Card>
);

const PageHeader = ({ title, subtitle, action }) => (
  <div className="flex items-center justify-between mb-6">
    <div>
      <h1 className="text-xl font-bold text-gray-900">{title}</h1>
      {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
    {action}
  </div>
);

// ============================================================
// MODULE: DASHBOARD
// ============================================================
const DashboardPage = ({ setPage }) => {
  const unreadMsgs = MESSAGES.filter(m => m.unread).length;
  const pendingHw = HOMEWORK.filter(h => !h.done).length;
  const todayAbsent = ATTENDANCE[0].status;
  const avgGrade = (GRADES.reduce((s, g) => s + g.avg, 0) / GRADES.length).toFixed(2);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Dobry den!</h1>
        <p className="text-sm text-gray-500 mt-1">Prehled pro {STUDENT.name} &middot; {STUDENT.class}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <StatCard icon={GraduationCap} label="Prumer znamek" value={avgGrade} trend="up" trendLabel="+0.1" color="text-blue-600" />
        <StatCard icon={CalendarCheck} label="Dochazka" value="95%" trend="up" trendLabel="+2%" color="text-green-600" />
        <StatCard icon={BookOpen} label="Nesplnene ukoly" value={pendingHw} color="text-orange-600" />
        <StatCard icon={MessageSquare} label="Nove zpravy" value={unreadMsgs} color="text-purple-600" />
      </div>

      <Card className="p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900 text-sm">Dnesni rozvrh</h2>
          <button onClick={() => setPage("schedule")} className="text-xs text-blue-600 font-medium">Cely rozvrh</button>
        </div>
        {SCHEDULE["Ut"].slice(0, 3).map((item, i) => (
          <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
            <span className="text-xs text-gray-400 w-12">{item.time.split("-")[0]}</span>
            <Badge color={SUBJECT_COLORS[item.subject] || "bg-gray-100 text-gray-700"}>{item.subject}</Badge>
            <span className="text-xs text-gray-400 ml-auto">{item.room}</span>
          </div>
        ))}
        <div className="text-center mt-2">
          <span className="text-xs text-gray-400">+ dalsi {SCHEDULE["Ut"].length - 3} hodiny</span>
        </div>
      </Card>

      <Card className="p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900 text-sm">Posledni znamky</h2>
          <button onClick={() => setPage("grades")} className="text-xs text-blue-600 font-medium">Vsechny</button>
        </div>
        {GRADES.slice(0, 3).map((g, i) => (
          <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
            <GradeBadge value={g.grades[0].value} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{g.subject}</p>
              <p className="text-xs text-gray-400">{g.grades[0].label} &middot; {g.grades[0].date}</p>
            </div>
            <span className="text-xs text-gray-400">prumer {g.avg.toFixed(1)}</span>
          </div>
        ))}
      </Card>

      <Card className="p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900 text-sm">Ukoly k odevzdani</h2>
          <button onClick={() => setPage("homework")} className="text-xs text-blue-600 font-medium">Vsechny</button>
        </div>
        {HOMEWORK.filter(h => !h.done).slice(0, 3).map((h, i) => (
          <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
            <div className="w-5 h-5 rounded border-2 border-gray-300 flex items-center justify-center">
              {h.done && <Check className="w-3 h-3 text-green-600" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{h.title}</p>
              <p className="text-xs text-gray-400">{h.subject}</p>
            </div>
            <Badge color="bg-orange-100 text-orange-700">do {h.due}</Badge>
          </div>
        ))}
      </Card>
    </div>
  );
};

// ============================================================
// MODULE: MESSAGES
// ============================================================
const MessagesPage = () => {
  const [selected, setSelected] = useState(null);
  const [composing, setComposing] = useState(false);

  if (composing) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setComposing(false)} className="p-1"><ArrowLeft className="w-5 h-5 text-gray-600" /></button>
          <h1 className="text-lg font-bold text-gray-900">Nova zprava</h1>
        </div>
        <Card className="p-4">
          <div className="mb-3">
            <label className="text-xs text-gray-500 block mb-1">Komu</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
              <option>Mgr. Kralova - Tridni ucitelka</option>
              <option>Mr. George - Ucitel AJ</option>
              <option>Vedeni skoly</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="text-xs text-gray-500 block mb-1">Predmet</label>
            <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="Zadejte predmet zpravy..." />
          </div>
          <div className="mb-3">
            <label className="text-xs text-gray-500 block mb-1">Zprava</label>
            <textarea className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm h-32 resize-none" placeholder="Napiste zpravu..." />
          </div>
          <div className="flex items-center justify-between">
            <button className="flex items-center gap-2 text-gray-400 text-sm"><Paperclip className="w-4 h-4" /> Priloha</button>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"><Send className="w-4 h-4" /> Odeslat</button>
          </div>
        </Card>
      </div>
    );
  }

  if (selected !== null) {
    const msg = MESSAGES[selected];
    return (
      <div>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setSelected(null)} className="p-1"><ArrowLeft className="w-5 h-5 text-gray-600" /></button>
          <h1 className="text-lg font-bold text-gray-900 truncate">{msg.subject}</h1>
        </div>
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">{msg.avatar}</div>
            <div>
              <p className="font-medium text-gray-900 text-sm">{msg.from}</p>
              <p className="text-xs text-gray-400">{msg.role} &middot; {msg.time}</p>
            </div>
          </div>
          <div className="text-sm text-gray-700 leading-relaxed">
            <p>Dobry den, vazeni rodice,</p>
            <br />
            <p>posilam vam prehled akci na brezen. Prosim, zkontrolujte, zda vase dite ma vsechny potrebne veci.</p>
            <br />
            <p><b>Akce na brezen:</b></p>
            <p>&bull; 25.3. - Foceni trid (ve skole)</p>
            <p>&bull; 27.3. - Skolni vychazka do parku</p>
            <p>&bull; 31.3. - Filharmonie Brno, odchod 9:00</p>
            <br />
            <p>S pozdravem,</p>
            <p>Mgr. Kralova</p>
          </div>
        </Card>
        <div className="mt-4">
          <Card className="p-4">
            <textarea className="w-full border-0 text-sm resize-none h-16 focus:outline-none" placeholder="Napiste odpoved..." />
            <div className="flex justify-end">
              <button className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium"><Send className="w-3 h-3" /> Odpovedet</button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Zpravy"
        subtitle={`${MESSAGES.filter(m => m.unread).length} neprectenych`}
        action={<button onClick={() => setComposing(true)} className="flex items-center gap-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-medium"><Plus className="w-3 h-3" /> Nova</button>}
      />
      <div className="space-y-2">
        {MESSAGES.map((msg, i) => (
          <Card key={msg.id} className={`p-4 ${msg.unread ? "border-l-4 border-l-blue-500" : ""}`} onClick={() => setSelected(i)}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">{msg.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className={`text-sm ${msg.unread ? "font-bold text-gray-900" : "font-medium text-gray-700"}`}>{msg.from}</p>
                  <span className="text-xs text-gray-400 flex-shrink-0">{msg.time}</span>
                </div>
                <p className={`text-sm ${msg.unread ? "font-semibold text-gray-800" : "text-gray-600"}`}>{msg.subject}</p>
                <p className="text-xs text-gray-400 truncate mt-0.5">{msg.preview}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// MODULE: HOMEWORK
// ============================================================
const HomeworkPage = () => {
  const [hw, setHw] = useState(HOMEWORK);
  const [filter, setFilter] = useState("pending");

  const toggleDone = (id) => setHw(hw.map(h => h.id === id ? { ...h, done: !h.done } : h));
  const filtered = filter === "pending" ? hw.filter(h => !h.done) : filter === "done" ? hw.filter(h => h.done) : hw;

  return (
    <div>
      <PageHeader title="Ukoly a vyukove plany" subtitle="Domaci ukoly a priprava" />
      <div className="flex gap-2 mb-4">
        {[["pending", "Nesplnene"], ["done", "Splnene"], ["all", "Vsechny"]].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filter === key ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {filtered.map(h => (
          <Card key={h.id} className="p-4">
            <div className="flex items-start gap-3">
              <button onClick={() => toggleDone(h.id)} className={`w-6 h-6 mt-0.5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${h.done ? "bg-green-500 border-green-500" : "border-gray-300 hover:border-blue-400"}`}>
                {h.done && <Check className="w-4 h-4 text-white" />}
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge color={SUBJECT_COLORS[h.subject] || "bg-gray-100 text-gray-700"}>{h.subject}</Badge>
                  {!h.done && <Badge color="bg-orange-100 text-orange-700">do {h.due}</Badge>}
                  {h.done && <Badge color="bg-green-100 text-green-700">Splneno</Badge>}
                </div>
                <p className={`text-sm ${h.done ? "text-gray-400 line-through" : "font-medium text-gray-900"}`}>{h.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{h.teacher}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// MODULE: ATTENDANCE
// ============================================================
const AttendancePage = () => {
  const [showForm, setShowForm] = useState(false);
  const statusMap = {
    present: { label: "Pritomen/a", color: "bg-green-100 text-green-700", icon: Check },
    absent: { label: "Nepritomen/a", color: "bg-red-100 text-red-700", icon: X },
    late: { label: "Pozde", color: "bg-yellow-100 text-yellow-700", icon: AlertCircle },
  };
  const totalDays = ATTENDANCE.length;
  const presentDays = ATTENDANCE.filter(a => a.status === "present").length;
  const absentDays = ATTENDANCE.filter(a => a.status === "absent").length;

  return (
    <div>
      <PageHeader
        title="Dochazka"
        subtitle="Brezen 2026"
        action={<button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-medium"><Plus className="w-3 h-3" /> Omluvit</button>}
      />

      <div className="grid grid-cols-3 gap-3 mb-4">
        <Card className="p-3 text-center">
          <p className="text-xl font-bold text-green-600">{presentDays}</p>
          <p className="text-xs text-gray-500">Pritomen/a</p>
        </Card>
        <Card className="p-3 text-center">
          <p className="text-xl font-bold text-red-500">{absentDays}</p>
          <p className="text-xs text-gray-500">Nepritomen/a</p>
        </Card>
        <Card className="p-3 text-center">
          <p className="text-xl font-bold text-blue-600">{Math.round(presentDays / totalDays * 100)}%</p>
          <p className="text-xs text-gray-500">Dochazka</p>
        </Card>
      </div>

      {showForm && (
        <Card className="p-4 mb-4 border-blue-200 bg-blue-50">
          <h3 className="font-semibold text-sm text-gray-900 mb-3">Omluvit absenci</h3>
          <div className="space-y-2">
            <div className="flex gap-2">
              <input type="date" className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <input type="date" className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
              <option>Nemoc</option>
              <option>Rodinne duvody</option>
              <option>Lekar</option>
              <option>Jiny duvod</option>
            </select>
            <textarea className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm h-16 resize-none" placeholder="Poznamka (nepovinne)..." />
            <div className="flex gap-2">
              <button onClick={() => setShowForm(false)} className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg text-sm font-medium">Zrusit</button>
              <button onClick={() => setShowForm(false)} className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium">Odeslat omluvenku</button>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-2">
        {ATTENDANCE.map((a, i) => {
          const s = statusMap[a.status];
          const Icon = s.icon;
          return (
            <Card key={i} className="p-3">
              <div className="flex items-center gap-3">
                <div className="text-center w-10">
                  <p className="text-xs text-gray-400">{a.day}</p>
                  <p className="font-bold text-sm text-gray-900">{a.date.split(".")[0]}</p>
                </div>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center ${s.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{s.label}</p>
                  {a.note && <p className="text-xs text-gray-400">{a.note}</p>}
                </div>
                <span className="text-xs text-gray-400">{a.hours}</span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================
// MODULE: GRADES
// ============================================================
const GradesPage = () => {
  const [expanded, setExpanded] = useState(null);

  return (
    <div>
      <PageHeader title="Hodnoceni" subtitle="Skolni rok 2025/2026" />
      <div className="space-y-3">
        {GRADES.map((g, i) => (
          <Card key={i} className="overflow-hidden">
            <button onClick={() => setExpanded(expanded === i ? null : i)} className="w-full p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">{g.abbr}</div>
              <div className="flex-1 text-left min-w-0">
                <p className="font-medium text-gray-900 text-sm">{g.subject}</p>
                <p className="text-xs text-gray-400">{g.grades.length} znamek</p>
              </div>
              <div className="text-right mr-2">
                <p className={`text-lg font-bold ${g.avg <= 1.5 ? "text-green-600" : g.avg <= 2.5 ? "text-green-500" : g.avg <= 3.5 ? "text-yellow-500" : "text-red-500"}`}>{g.avg.toFixed(1)}</p>
                <p className="text-xs text-gray-400">prumer</p>
              </div>
              {expanded === i ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>
            {expanded === i && (
              <div className="px-4 pb-4 border-t border-gray-50">
                <div className="flex gap-1 mt-3 mb-3">
                  {g.grades.map((gr, j) => (
                    <div key={j} className="flex-1 bg-gray-50 rounded-lg p-2 text-center">
                      <GradeBadge value={gr.value} />
                      <p className="text-xs text-gray-500 mt-1">{gr.label}</p>
                      <p className="text-xs text-gray-300">{gr.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// MODULE: SCHEDULE
// ============================================================
const SchedulePage = () => {
  const days = ["Po", "Ut", "St", "Ct", "Pa"];
  const [activeDay, setActiveDay] = useState("Ut");

  return (
    <div>
      <PageHeader title="Rozvrh hodin" subtitle={`${STUDENT.class} - ${STUDENT.name}`} />
      <div className="flex gap-1 mb-4 bg-gray-100 rounded-xl p-1">
        {days.map(d => (
          <button
            key={d}
            onClick={() => setActiveDay(d)}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors ${activeDay === d ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            {d}
            {d === "Ut" && <span className="block text-xs font-normal text-blue-400">dnes</span>}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {(SCHEDULE[activeDay] || []).map((item, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center gap-4">
              <div className="text-center w-12">
                <p className="text-lg font-bold text-gray-900">{item.hour}.</p>
                <p className="text-xs text-gray-400">{item.time.split("-")[0]}</p>
              </div>
              <div className={`w-1 h-10 rounded-full ${i % 2 === 0 ? "bg-blue-400" : "bg-purple-400"}`} />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm">{item.subject}</p>
                <p className="text-xs text-gray-400">{item.teacher} &middot; ucem. {item.room}</p>
              </div>
              <span className="text-xs text-gray-300">{item.time.split("-")[1]}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// MAIN APP
// ============================================================
const NAV_ITEMS = [
  { id: "dashboard", label: "Prehled", icon: Home },
  { id: "messages", label: "Zpravy", icon: MessageSquare, badge: 2 },
  { id: "homework", label: "Ukoly", icon: BookOpen },
  { id: "attendance", label: "Dochazka", icon: CalendarCheck },
  { id: "grades", label: "Znamky", icon: GraduationCap },
  { id: "schedule", label: "Rozvrh", icon: Clock },
];

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

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
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ maxWidth: 480, margin: "0 auto", position: "relative" }}>
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900" style={{ letterSpacing: "-0.02em" }}>EduConnect</h1>
            <p className="text-xs text-gray-400">{STUDENT.class} &middot; {STUDENT.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="relative p-2 text-gray-400 hover:text-gray-600">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-4 pb-24 overflow-y-auto">
        {renderPage()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-30" style={{ maxWidth: 480, margin: "0 auto" }}>
        <div className="flex items-center justify-around py-1">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const active = page === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`flex flex-col items-center gap-0.5 py-2 px-3 rounded-lg transition-colors relative ${active ? "text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
                {item.badge && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{item.badge}</span>
                )}
                {active && <span className="absolute -bottom-1 w-6 h-0.5 bg-blue-600 rounded-full" />}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
