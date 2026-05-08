import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Calendar, ImageIcon, Users, Plus, Trash2, Edit2,
  Check, X, LogOut, Eye, EyeOff, ChevronDown, ChevronUp,
  Star, StarOff,
} from "lucide-react";
import {
  getEvents, saveEvent, updateEvent, deleteEvent,
  getGallery, saveSunday, updateSunday, deleteSunday, addPhoto, deletePhoto,
  getSubmissions, deleteSubmission,
  CATEGORY_COLORS,
  type Event, type GallerySunday, type Submission,
} from "@/lib/store";

// ── Simple password gate ──────────────────────────────────────────────────────
const ADMIN_PASSWORD = "icgcadmin2025"; // ✏️ Change this

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

// ── Reusable input style ──────────────────────────────────────────────────────
const inp = "w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";
const btn = "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all";

// ── Login screen ──────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { onLogin(); }
    else { setErr(true); setTimeout(() => setErr(false), 2000); }
  };

  return (
    <div className="min-h-screen bg-primary-deep flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-background rounded-2xl shadow-elegant p-8 border border-border">
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-4">
            <Users size={26} className="text-primary" />
          </div>
          <h1 className="font-display text-2xl font-semibold">Admin Panel</h1>
          <p className="text-muted-foreground text-sm mt-1">ICGC Greater Grace Temple</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Password"
              className={`${inp} pr-10 ${err ? "border-destructive ring-2 ring-destructive/20" : ""}`}
              autoFocus
            />
            <button type="button" onClick={() => setShow((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {err && <p className="text-destructive text-xs">Incorrect password.</p>}
          <button type="submit"
            className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium hover:bg-primary-glow transition-all">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Tab button ────────────────────────────────────────────────────────────────
function Tab({ label, icon: Icon, active, onClick, badge }: {
  label: string; icon: React.ElementType; active: boolean;
  onClick: () => void; badge?: number;
}) {
  return (
    <button onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
        active ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}>
      <Icon size={16} />
      {label}
      {badge !== undefined && badge > 0 && (
        <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full font-semibold ${
          active ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
        }`}>{badge}</span>
      )}
    </button>
  );
}

// ── Events tab ────────────────────────────────────────────────────────────────
function EventsTab() {
  const [events, setEvents] = useState<Event[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const blank = { title: "", date: "", time: "", location: "", category: "Worship", description: "", featured: false, color: CATEGORY_COLORS["Worship"] };
  const [form, setForm] = useState(blank);

  useEffect(() => { setEvents(getEvents()); }, []);

  const refresh = () => setEvents(getEvents());

  const set = (k: string, v: string | boolean) => {
    setForm((f) => {
      const next = { ...f, [k]: v };
      if (k === "category") next.color = CATEGORY_COLORS[v as string] ?? CATEGORY_COLORS["Worship"];
      return next;
    });
  };

  const submit = () => {
    if (!form.title || !form.date) return;
    if (editing) { updateEvent(editing, form); setEditing(null); }
    else { saveEvent(form); }
    setForm(blank); setShowForm(false); refresh();
  };

  const startEdit = (ev: Event) => {
    setForm({ title: ev.title, date: ev.date, time: ev.time, location: ev.location, category: ev.category, description: ev.description, featured: ev.featured, color: ev.color });
    setEditing(ev.id); setShowForm(true);
  };

  const categories = Object.keys(CATEGORY_COLORS);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold">Upcoming Events</h2>
        <button onClick={() => { setShowForm((v) => !v); setEditing(null); setForm(blank); }}
          className={`${btn} bg-primary text-primary-foreground hover:bg-primary-glow`}>
          <Plus size={15} /> Add Event
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-muted/40 border border-border rounded-2xl p-5 space-y-4">
          <h3 className="font-semibold text-sm">{editing ? "Edit Event" : "New Event"}</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="text-xs text-muted-foreground mb-1 block">Title *</label>
              <input className={inp} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Event title" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Date *</label>
              <input className={inp} value={form.date} onChange={(e) => set("date", e.target.value)} placeholder="Sunday, 18 May 2025" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Time</label>
              <input className={inp} value={form.time} onChange={(e) => set("time", e.target.value)} placeholder="7:00 AM – 9:00 AM" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Location</label>
              <input className={inp} value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="Main Sanctuary" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Category</label>
              <select className={inp} value={form.category} onChange={(e) => set("category", e.target.value)}>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-muted-foreground mb-1 block">Description</label>
              <textarea className={`${inp} min-h-[80px] resize-y`} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Short description…" />
            </div>
            <div className="sm:col-span-2 flex items-center gap-2">
              <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} className="rounded" />
              <label htmlFor="featured" className="text-sm">Featured event (shown prominently)</label>
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <button onClick={submit} className={`${btn} bg-primary text-primary-foreground hover:bg-primary-glow`}>
              <Check size={14} /> {editing ? "Save Changes" : "Create Event"}
            </button>
            <button onClick={() => { setShowForm(false); setEditing(null); setForm(blank); }}
              className={`${btn} bg-muted text-muted-foreground hover:bg-muted/80`}>
              <X size={14} /> Cancel
            </button>
          </div>
        </div>
      )}

      {/* Event list */}
      {events.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Calendar size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">No events yet. Add your first event above.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((ev) => (
            <div key={ev.id} className="flex items-start gap-4 bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-all">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full border ${ev.color}`}>{ev.category}</span>
                  {ev.featured && <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full bg-gold/10 text-gold-foreground border border-gold/20">Featured</span>}
                </div>
                <p className="font-semibold mt-1.5 truncate">{ev.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{ev.date} · {ev.time} · {ev.location}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{ev.description}</p>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button onClick={() => { updateEvent(ev.id, { featured: !ev.featured }); refresh(); }}
                  title={ev.featured ? "Unfeature" : "Feature"}
                  className={`${btn} ${ev.featured ? "bg-gold/10 text-gold-foreground hover:bg-gold/20" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                  {ev.featured ? <Star size={14} /> : <StarOff size={14} />}
                </button>
                <button onClick={() => startEdit(ev)} className={`${btn} bg-muted text-muted-foreground hover:bg-muted/80`}>
                  <Edit2 size={14} />
                </button>
                <button onClick={() => { deleteEvent(ev.id); refresh(); }} className={`${btn} bg-destructive/10 text-destructive hover:bg-destructive/20`}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Gallery tab ───────────────────────────────────────────────────────────────
function GalleryTab() {
  const [gallery, setGallery] = useState<GallerySunday[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showSundayForm, setShowSundayForm] = useState(false);
  const [sundayForm, setSundayForm] = useState({ date: "", theme: "", verse: "" });
  const [editingSunday, setEditingSunday] = useState<string | null>(null);
  const [photoForms, setPhotoForms] = useState<Record<string, { url: string; alt: string; span: "normal" | "wide" | "tall" }>>({});

  useEffect(() => { setGallery(getGallery()); }, []);
  const refresh = () => setGallery(getGallery());

  const submitSunday = () => {
    if (!sundayForm.date || !sundayForm.theme) return;
    if (editingSunday) { updateSunday(editingSunday, sundayForm); setEditingSunday(null); }
    else { const s = saveSunday(sundayForm); setExpanded(s.id); }
    setSundayForm({ date: "", theme: "", verse: "" }); setShowSundayForm(false); refresh();
  };

  const startEditSunday = (s: GallerySunday) => {
    setSundayForm({ date: s.date, theme: s.theme, verse: s.verse });
    setEditingSunday(s.id); setShowSundayForm(true);
  };

  const getPhotoForm = (id: string) => photoForms[id] ?? { url: "", alt: "", span: "normal" as const };
  const setPhotoForm = (id: string, k: string, v: string) =>
    setPhotoForms((f) => ({ ...f, [id]: { ...getPhotoForm(id), [k]: v } }));

  const submitPhoto = (sundayId: string) => {
    const pf = getPhotoForm(sundayId);
    if (!pf.url) return;
    addPhoto(sundayId, { url: pf.url, alt: pf.alt, span: pf.span });
    setPhotoForms((f) => ({ ...f, [sundayId]: { url: "", alt: "", span: "normal" } }));
    refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold">Sunday Gallery</h2>
        <button onClick={() => { setShowSundayForm((v) => !v); setEditingSunday(null); setSundayForm({ date: "", theme: "", verse: "" }); }}
          className={`${btn} bg-primary text-primary-foreground hover:bg-primary-glow`}>
          <Plus size={15} /> Add Sunday
        </button>
      </div>

      {/* Sunday form */}
      {showSundayForm && (
        <div className="bg-muted/40 border border-border rounded-2xl p-5 space-y-3">
          <h3 className="font-semibold text-sm">{editingSunday ? "Edit Sunday" : "New Sunday Section"}</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Date *</label>
              <input className={inp} value={sundayForm.date} onChange={(e) => setSundayForm((f) => ({ ...f, date: e.target.value }))} placeholder="Sunday, 18 May 2025" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Sermon Theme *</label>
              <input className={inp} value={sundayForm.theme} onChange={(e) => setSundayForm((f) => ({ ...f, theme: e.target.value }))} placeholder="The Power of His Grace" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-muted-foreground mb-1 block">Scripture Verse</label>
              <input className={inp} value={sundayForm.verse} onChange={(e) => setSundayForm((f) => ({ ...f, verse: e.target.value }))} placeholder="My grace is sufficient for you. — 2 Cor 12:9" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={submitSunday} className={`${btn} bg-primary text-primary-foreground hover:bg-primary-glow`}>
              <Check size={14} /> {editingSunday ? "Save" : "Create Section"}
            </button>
            <button onClick={() => { setShowSundayForm(false); setEditingSunday(null); }}
              className={`${btn} bg-muted text-muted-foreground hover:bg-muted/80`}>
              <X size={14} /> Cancel
            </button>
          </div>
        </div>
      )}

      {/* Sunday list */}
      {gallery.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <ImageIcon size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">No Sunday sections yet. Create your first one above.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {gallery.map((sunday) => (
            <div key={sunday.id} className="border border-border rounded-2xl overflow-hidden">
              {/* Sunday header */}
              <div className="flex items-center gap-3 p-4 bg-card">
                <button onClick={() => setExpanded(expanded === sunday.id ? null : sunday.id)}
                  className="flex-1 flex items-center gap-3 text-left min-w-0">
                  {expanded === sunday.id ? <ChevronUp size={16} className="text-muted-foreground shrink-0" /> : <ChevronDown size={16} className="text-muted-foreground shrink-0" />}
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{sunday.theme}</p>
                    <p className="text-xs text-muted-foreground">{sunday.date} · {sunday.photos.length} photo{sunday.photos.length !== 1 ? "s" : ""}</p>
                  </div>
                </button>
                <div className="flex gap-1.5 shrink-0">
                  <button onClick={() => startEditSunday(sunday)} className={`${btn} bg-muted text-muted-foreground hover:bg-muted/80`}><Edit2 size={14} /></button>
                  <button onClick={() => { deleteSunday(sunday.id); refresh(); }} className={`${btn} bg-destructive/10 text-destructive hover:bg-destructive/20`}><Trash2 size={14} /></button>
                </div>
              </div>

              {/* Expanded: photos */}
              {expanded === sunday.id && (
                <div className="p-4 border-t border-border space-y-4 bg-muted/20">
                  {/* Add photo form */}
                  <div className="bg-background border border-border rounded-xl p-4 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Add Photo</p>
                    <div className="grid sm:grid-cols-3 gap-2">
                      <div className="sm:col-span-2">
                        <label className="text-xs text-muted-foreground mb-1 block">Image URL *</label>
                        <input className={inp} value={getPhotoForm(sunday.id).url}
                          onChange={(e) => setPhotoForm(sunday.id, "url", e.target.value)}
                          placeholder="https://… or paste a direct image link" />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Layout</label>
                        <select className={inp} value={getPhotoForm(sunday.id).span}
                          onChange={(e) => setPhotoForm(sunday.id, "span", e.target.value)}>
                          <option value="normal">Normal</option>
                          <option value="wide">Wide (2 cols)</option>
                          <option value="tall">Tall (2 rows)</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-xs text-muted-foreground mb-1 block">Caption (optional)</label>
                        <input className={inp} value={getPhotoForm(sunday.id).alt}
                          onChange={(e) => setPhotoForm(sunday.id, "alt", e.target.value)}
                          placeholder="Congregation in worship" />
                      </div>
                      <div className="flex items-end">
                        <button onClick={() => submitPhoto(sunday.id)}
                          className={`${btn} w-full justify-center bg-primary text-primary-foreground hover:bg-primary-glow`}>
                          <Plus size={14} /> Add
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Photo grid preview */}
                  {sunday.photos.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {sunday.photos.map((photo) => (
                        <div key={photo.id} className="relative group aspect-square rounded-lg overflow-hidden bg-muted">
                          <img src={photo.url} alt={photo.alt} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button onClick={() => { deletePhoto(sunday.id, photo.id); refresh(); }}
                              className="p-1.5 bg-destructive rounded-lg text-white">
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-1.5 py-0.5">
                            <p className="text-white text-[9px] truncate">{photo.span}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground text-center py-4">No photos yet — add one above.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Submissions tab ───────────────────────────────────────────────────────────
function SubmissionsTab() {
  const [subs, setSubs] = useState<Submission[]>([]);
  useEffect(() => { setSubs(getSubmissions()); }, []);
  const refresh = () => setSubs(getSubmissions());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold">Form Submissions</h2>
        <span className="text-xs text-muted-foreground">{subs.length} total</span>
      </div>

      {subs.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Users size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">No submissions yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {subs.map((sub) => (
            <div key={sub.id} className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-all">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold">{sub.full_name}</p>
                    <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {sub.interest}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-muted-foreground">
                    <span>{sub.email}</span>
                    <span>{sub.phone}</span>
                    <span>{new Date(sub.submittedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                  {sub.message && (
                    <p className="mt-2 text-sm text-muted-foreground bg-muted/50 rounded-lg px-3 py-2 italic">
                      "{sub.message}"
                    </p>
                  )}
                </div>
                <button onClick={() => { deleteSubmission(sub.id); refresh(); }}
                  className={`${btn} bg-destructive/10 text-destructive hover:bg-destructive/20 shrink-0`}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main admin page ───────────────────────────────────────────────────────────
function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("icgc_admin") === "1");
  const [tab, setTab] = useState<"events" | "gallery" | "submissions">("events");

  const login = () => { sessionStorage.setItem("icgc_admin", "1"); setAuthed(true); };
  const logout = () => { sessionStorage.removeItem("icgc_admin"); setAuthed(false); };

  // Live submission count badge
  const [subCount, setSubCount] = useState(0);
  useEffect(() => { setSubCount(getSubmissions().length); }, [tab]);

  if (!authed) return <LoginScreen onLogin={login} />;

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-bold">A</span>
            </div>
            <span className="font-display font-semibold text-sm">Admin Panel</span>
            <span className="text-muted-foreground text-xs hidden sm:block">· ICGC Greater Grace Temple</span>
          </div>
          <button onClick={logout} className={`${btn} text-muted-foreground hover:text-foreground hover:bg-muted`}>
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          <Tab label="Events" icon={Calendar} active={tab === "events"} onClick={() => setTab("events")} />
          <Tab label="Gallery" icon={ImageIcon} active={tab === "gallery"} onClick={() => setTab("gallery")} />
          <Tab label="Submissions" icon={Users} active={tab === "submissions"} onClick={() => setTab("submissions")} badge={subCount} />
        </div>

        {/* Content */}
        {tab === "events"      && <EventsTab />}
        {tab === "gallery"     && <GalleryTab />}
        {tab === "submissions" && <SubmissionsTab />}
      </div>
    </div>
  );
}
