import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLeads, useAuth } from "@/context/AuthContext";
import { Lead, LeadStatus } from "@/types/crm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  User,
  Clock,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Users,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ClipboardList,
  Building2,
  Trash2,
  MessageCircle,
} from "lucide-react";

interface TimelineComment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  type?: "user" | "system";
}

export default function AllLeads() {
  const { leads, updateLead, deleteLead } = useLeads();
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();

  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusTab, setStatusTab] = useState<"all" | "new" | "in_progress" | "closed">("all");
  const [assignmentFilter, setAssignmentFilter] = useState<"all" | "mine" | "unassigned">("all");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [newNote, setNewNote] = useState("");
  const timelineEndRef = useRef<HTMLDivElement>(null);

  // Filter and Sort leads
  const filteredLeads = useMemo(() => {
    let result = [...leads];

    // Apply Search
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      result = result.filter(
        (lead) =>
          lead.name.toLowerCase().includes(query) ||
          lead.phone.includes(query) ||
          lead.email.toLowerCase().includes(query) ||
          lead.service.toLowerCase().includes(query) ||
          lead.temple.toLowerCase().includes(query)
      );
    }

    // Apply Status Tabs
    if (statusTab === "new") {
      result = result.filter((lead) => lead.status === "new");
    } else if (statusTab === "in_progress") {
      result = result.filter((lead) =>
        ["contacted", "qualified", "on_hold"].includes(lead.status)
      );
    } else if (statusTab === "closed") {
      result = result.filter((lead) => ["converted", "lost"].includes(lead.status));
    }

    // Apply Assignment Filter
    if (assignmentFilter === "mine" && user) {
      result = result.filter((lead) => lead.assignedTo === user.name);
    } else if (assignmentFilter === "unassigned") {
      result = result.filter((lead) => !lead.assignedTo);
    }

    // Sort by creation date
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [leads, searchTerm, statusTab, assignmentFilter, sortOrder, user]);

  // Synchronize selection
  useEffect(() => {
    if (filteredLeads.length > 0) {
      if (!selectedLeadId || !filteredLeads.some((l) => l.id === selectedLeadId)) {
        setSelectedLeadId(filteredLeads[0].id);
      }
    } else {
      setSelectedLeadId(null);
    }
  }, [filteredLeads, selectedLeadId]);

  const selectedLead = useMemo(() => {
    return leads.find((l) => l.id === selectedLeadId) || null;
  }, [leads, selectedLeadId]);

  // Scroll timeline to bottom when selected lead changes
  useEffect(() => {
    timelineEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedLeadId, selectedLead?.comments]);

  const getStatusColor = (status: LeadStatus) => {
    const colors: Record<LeadStatus, string> = {
      new: "bg-blue-500/10 text-blue-600 border border-blue-500/20",
      contacted: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
      qualified: "bg-purple-500/10 text-purple-600 border border-purple-500/20",
      converted: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
      lost: "bg-rose-500/10 text-rose-600 border border-rose-500/20",
      on_hold: "bg-slate-500/10 text-slate-600 border border-slate-500/20",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getServiceColorBadge = (service: string) => {
    const s = service.toLowerCase();
    if (s.includes("darshan")) return "bg-orange-50 text-orange-700 border border-orange-200/50";
    if (s.includes("puja")) return "bg-blue-50 text-blue-700 border border-blue-200/50";
    if (s.includes("prasad")) return "bg-amber-50 text-amber-700 border border-amber-200/50";
    return "bg-pink-50 text-pink-700 border border-pink-200/50";
  };

  const parseComments = (commentsStr: string): TimelineComment[] => {
    if (!commentsStr) return [];
    try {
      const parsed = JSON.parse(commentsStr);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (e) {
      // Return single fallback comment if not JSON array
    }
    return [
      {
        id: "legacy",
        author: "System Log",
        text: commentsStr,
        timestamp: selectedLead ? selectedLead.updatedAt : new Date().toISOString(),
        type: "system",
      },
    ];
  };

  const handleStatusChange = (newStatus: LeadStatus) => {
    if (!selectedLead || !user) return;

    const timeline = parseComments(selectedLead.comments);
    const logComment: TimelineComment = {
      id: `sys_${Date.now()}`,
      author: "System Log",
      text: `🔄 Status updated to ${newStatus.replace("_", " ").toUpperCase()} by ${user.name}.`,
      timestamp: new Date().toISOString(),
      type: "system",
    };

    updateLead(selectedLead.id, {
      status: newStatus,
      comments: JSON.stringify([...timeline, logComment]),
    });
  };

  const handleTakeLead = () => {
    if (!selectedLead || !user) return;

    const timeline = parseComments(selectedLead.comments);
    const claimSystemComment: TimelineComment = {
      id: `sys_${Date.now()}`,
      author: "System Log",
      text: `⚡ Lead claimed by ${user.name}. Status updated to Contacted.`,
      timestamp: new Date().toISOString(),
      type: "system",
    };

    updateLead(selectedLead.id, {
      assignedTo: user.name,
      status: "contacted",
      comments: JSON.stringify([...timeline, claimSystemComment]),
    });
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedLead || !user) return;

    const timeline = parseComments(selectedLead.comments);
    const addedComment: TimelineComment = {
      id: `comment_${Date.now()}`,
      author: user.name,
      text: newNote.trim(),
      timestamp: new Date().toISOString(),
      type: "user",
    };

    updateLead(selectedLead.id, {
      comments: JSON.stringify([...timeline, addedComment]),
    });
    setNewNote("");
  };

  const handleDeleteLead = (id: string) => {
    if (window.confirm("Are you sure you want to permanently delete this lead?")) {
      deleteLead(id);
      setSelectedLeadId(null);
    }
  };

  const parsedTimeline = useMemo(() => {
    if (!selectedLead) return [];
    return parseComments(selectedLead.comments);
  }, [selectedLead]);

  return (
    <div className="h-auto md:h-[calc(100vh-6.5rem)] flex flex-col gap-4">
      {/* Header and Controls Row */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-gold" /> Divine Leads Desk
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-0.5">
            Real-time pilgrim inquiries, booking status, and follow-up activities.
          </p>
        </div>

        {/* Global Stats bar */}
        <div className="flex items-center gap-3">
          <Badge className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 font-bold">
            New: {leads.filter((l) => l.status === "new").length}
          </Badge>
          <Badge className="bg-amber-50 text-amber-700 border border-amber-100 px-3 py-1 font-bold">
            In Progress: {leads.filter((l) => ["contacted", "qualified", "on_hold"].includes(l.status)).length}
          </Badge>
          <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 font-bold">
            Converted: {leads.filter((l) => l.status === "converted").length}
          </Badge>
        </div>
      </div>

      {/* Dual Pane Layout Container */}
      <div className="flex-1 flex flex-col md:flex-row gap-4 min-h-0">
        
        {/* LEFT PANE: MASTER LIST */}
        <div className="w-full md:w-[380px] lg:w-[420px] shrink-0 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden h-[450px] md:h-auto">
          
          {/* List Controls */}
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search pilgrim, phone, temple..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-10 border-slate-200 focus-visible:ring-gold bg-white"
              />
            </div>

            {/* Status Segmented Tabs */}
            <div className="flex p-0.5 bg-slate-100 rounded-lg">
              {(["all", "new", "in_progress", "closed"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setStatusTab(tab)}
                  className={`flex-1 text-center py-1.5 text-xs font-bold capitalize rounded-md transition-all ${
                    statusTab === tab
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {tab === "in_progress" ? "Active" : tab}
                </button>
              ))}
            </div>

            {/* Assignment & Sorting Buttons */}
            <div className="flex gap-2 justify-between items-center">
              <div className="flex gap-1 bg-slate-100 p-0.5 rounded-md">
                {(["all", "mine", "unassigned"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setAssignmentFilter(mode)}
                    className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-extrabold rounded transition-all ${
                      assignmentFilter === mode
                        ? "bg-slate-700 text-white shadow-sm"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {mode === "mine" ? "My Leads" : mode}
                  </button>
                ))}
              </div>

              {/* Sort selector */}
              <Select
                value={sortOrder}
                onValueChange={(val) => setSortOrder(val as "desc" | "asc")}
              >
                <SelectTrigger className="w-28 h-7 text-[10px] font-bold border-slate-200 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Newest First</SelectItem>
                  <SelectItem value="asc">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* List Cards Scrollable area */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2 space-y-1">
            {filteredLeads.length === 0 ? (
              <div className="py-12 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
                <AlertCircle className="h-8 w-8 text-slate-300" />
                <p className="font-semibold text-sm">No inquiries match filters</p>
                <p className="text-xs text-slate-400">Try clearing search keywords</p>
              </div>
            ) : (
              filteredLeads.map((lead) => {
                const isSelected = lead.id === selectedLeadId;
                const initials = lead.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2);

                return (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLeadId(lead.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 group border flex gap-3 relative ${
                      isSelected
                        ? "bg-amber-50/40 border-gold/40 shadow-sm"
                        : "border-transparent hover:bg-slate-50 hover:border-slate-100"
                    }`}
                  >
                    {/* Visual left colored ribbon */}
                    {isSelected && (
                      <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-gold" />
                    )}

                    {/* Avatar Initials */}
                    <div className="h-10 w-10 shrink-0 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">
                      {initials || <User className="h-4 w-4" />}
                    </div>

                    {/* Content Body */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-slate-800 text-sm truncate group-hover:text-gold transition-colors">
                          {lead.name}
                        </h3>
                        <span className="text-[10px] text-slate-400 font-medium shrink-0">
                          {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>

                      {/* Detail row */}
                      <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                        📍 {lead.temple}
                      </p>

                      {/* Badges footer */}
                      <div className="flex flex-wrap gap-1.5 mt-2 items-center justify-between">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${getServiceColorBadge(lead.service)}`}>
                          {lead.service}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {lead.assignedTo ? (
                            <span
                              title={`Assigned to ${lead.assignedTo}`}
                              className="text-[9px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200/50"
                            >
                              👤 {lead.assignedTo.split(" ")[0]}
                            </span>
                          ) : (
                            <span className="text-[8px] font-extrabold tracking-wider text-amber-600/80 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/30 uppercase">
                              Claimable
                            </span>
                          )}

                          <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${getStatusColor(lead.status)}`}>
                            {lead.status.replace("_", " ")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="p-3 border-t border-slate-100 bg-slate-50 text-center text-xs font-semibold text-slate-500">
            Inquiries: {filteredLeads.length} selected of {leads.length} total
          </div>
        </div>

        {/* RIGHT PANE: DETAIL CONSOLE */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden min-w-0 h-[600px] md:h-auto">
          {selectedLead ? (
            <div className="flex-1 flex flex-col min-h-0 divide-y divide-slate-100">
              
              {/* Card Header area */}
              <div className="p-5 flex justify-between items-start bg-gradient-to-r from-slate-50 to-white">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-serif text-2xl font-bold text-slate-800">{selectedLead.name}</h2>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${getServiceColorBadge(selectedLead.service)}`}>
                      {selectedLead.service}
                    </span>
                    <Badge className={`${getStatusColor(selectedLead.status)} uppercase font-bold text-[10px] tracking-widest`}>
                      {selectedLead.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    📅 Inquired on {new Date(selectedLead.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Quick actions (Claim or Delete) */}
                <div className="flex items-center gap-2">
                  {!selectedLead.assignedTo && (
                    <Button
                      onClick={handleTakeLead}
                      className="bg-gold hover:bg-gold-light text-slate-950 font-extrabold text-xs px-4 h-9 shadow-sm"
                    >
                      ⚡ Take the Lead
                    </Button>
                  )}
                  {hasPermission("delete_lead") && (
                    <Button
                      onClick={() => handleDeleteLead(selectedLead.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 h-9 w-9 p-0"
                      title="Delete Lead"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Main Detail Fields Pane */}
              <div className="p-6 overflow-y-auto space-y-6">
                
                {/* 2 Column Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 border-b border-slate-100 pb-6">
                  
                  {/* Lead Information Card */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" /> Pilgrim Contact Details
                    </h3>
                    
                    <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      {/* Phone Contact */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 font-medium flex items-center gap-2">
                          <Phone className="h-4 w-4 text-slate-400" /> Phone
                        </span>
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${selectedLead.phone}`}
                            className="font-bold text-slate-800 hover:text-gold transition-colors hover:underline"
                          >
                            {selectedLead.phone}
                          </a>
                          
                          {/* WhatsApp Direct */}
                          <a
                            href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-6 w-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all border border-emerald-200"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </div>

                      {/* Email Contact */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 font-medium flex items-center gap-2">
                          <Mail className="h-4 w-4 text-slate-400" /> Email
                        </span>
                        {selectedLead.email ? (
                          <a
                            href={`mailto:${selectedLead.email}`}
                            className="font-semibold text-slate-700 hover:text-gold transition-colors hover:underline"
                          >
                            {selectedLead.email}
                          </a>
                        ) : (
                          <span className="text-slate-400 italic">Not Provided</span>
                        )}
                      </div>

                      {/* Devotees count */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 font-medium flex items-center gap-2">
                          <Users className="h-4 w-4 text-slate-400" /> Total Devotees
                        </span>
                        <span className="font-bold text-slate-800">{selectedLead.devotees || 1} Person(s)</span>
                      </div>

                      {/* Date of visit */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 font-medium flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-slate-400" /> Pilgrimage Date
                        </span>
                        <span className="font-bold text-slate-800">
                          {selectedLead.date
                            ? new Date(selectedLead.date).toLocaleDateString("en-IN", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : "Flexible / Not set"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Sacred Service Intent Card */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5" /> Destination & Intent
                    </h3>

                    <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      {/* Destination Temples */}
                      <div>
                        <span className="text-slate-500 font-medium text-xs flex items-center gap-2 mb-1.5">
                          <MapPin className="h-3.5 w-3.5 text-slate-400" /> Sacred Destination Shrines
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedLead.temple.split(", ").map((t, idx) => (
                            <span
                              key={idx}
                              className="text-xs font-bold text-slate-800 bg-white border border-slate-200 px-2.5 py-1 rounded shadow-sm flex items-center gap-1"
                            >
                              🕌 {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Lead Owner / Assigned Agent */}
                      <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-200/65">
                        <span className="text-slate-500 font-medium flex items-center gap-2">
                          <Users className="h-4 w-4 text-slate-400" /> Lead Owner
                        </span>
                        {selectedLead.assignedTo ? (
                          <span className="font-bold text-gold bg-slate-900 px-3 py-1 rounded text-xs flex items-center gap-1">
                            👤 {selectedLead.assignedTo}
                          </span>
                        ) : (
                          <span className="text-amber-600 font-bold bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded text-xs">
                            Unassigned
                          </span>
                        )}
                      </div>

                      {/* Dropdown status update */}
                      <div className="flex items-center justify-between text-sm pt-2">
                        <span className="text-slate-500 font-medium flex items-center gap-2">
                          <Clock className="h-4 w-4 text-slate-400" /> Update Lead Status
                        </span>
                        <Select value={selectedLead.status} onValueChange={handleStatusChange}>
                          <SelectTrigger className="w-36 h-9 font-bold bg-white border-slate-200 focus-visible:ring-gold text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">🆕 New</SelectItem>
                            <SelectItem value="contacted">📞 Contacted</SelectItem>
                            <SelectItem value="qualified">💎 Qualified</SelectItem>
                            <SelectItem value="converted">🎉 Converted</SelectItem>
                            <SelectItem value="lost">❌ Lost</SelectItem>
                            <SelectItem value="on_hold">⏸️ On Hold</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Devotee Special Requests (Pre-filled notes) */}
                <div className="space-y-3 pb-6 border-b border-slate-100">
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    📝 Special Requests / Personal Notes
                  </h3>
                  <div className="bg-amber-50/20 border border-gold/15 rounded-xl p-4 text-sm text-slate-700 leading-relaxed font-serif">
                    {selectedLead.notes || "No special requests or specifications logged by devotee."}
                  </div>
                </div>

                {/* Timeline activity flow */}
                <div className="space-y-4">
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <MessageSquare className="h-3.5 w-3.5" /> Lead History & Activities
                  </h3>

                  {/* Scrollable Feed */}
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-2 border border-slate-100 rounded-xl p-4 bg-slate-50/50">
                    {parsedTimeline.length === 0 ? (
                      <p className="text-xs text-slate-400 italic text-center py-4">
                        No internal logs or journal notes posted. Add a note below to start the timeline.
                      </p>
                    ) : (
                      parsedTimeline.map((item) => {
                        const isSystem = item.type === "system";
                        return (
                          <div
                            key={item.id}
                            className={`flex gap-3 text-xs leading-relaxed ${
                              isSystem
                                ? "bg-slate-100/80 border border-slate-200/50 rounded-lg p-2.5 items-center justify-center text-center font-medium text-slate-500"
                                : "bg-white border border-slate-150 rounded-xl p-3.5 text-slate-700 shadow-sm"
                            }`}
                          >
                            {!isSystem && (
                              <div className="h-7 w-7 rounded-full bg-gold/10 text-gold flex items-center justify-center font-bold text-[10px] shrink-0 border border-gold/20">
                                {item.author.slice(0, 2).toUpperCase()}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              {!isSystem && (
                                <div className="flex justify-between items-center mb-1">
                                  <span className="font-bold text-slate-800">{item.author}</span>
                                  <span className="text-[9px] text-slate-400 font-medium">
                                    {new Date(item.timestamp).toLocaleString("en-IN")}
                                  </span>
                                </div>
                              )}
                              <p className={isSystem ? "italic text-xs text-slate-600 font-serif" : "text-slate-600"}>
                                {item.text}
                              </p>
                              {isSystem && (
                                <span className="text-[8px] text-slate-400 font-semibold block mt-1">
                                  {new Date(item.timestamp).toLocaleString("en-IN")}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                    <div ref={timelineEndRef} />
                  </div>
                </div>

                {/* Add timeline note input box */}
                <form onSubmit={handleAddNote} className="space-y-2.5">
                  <Textarea
                    placeholder="Type an internal follow-up note (e.g. 'Customer called. Confirmed travel dates. Sent payment link...')"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="min-h-[80px] text-xs border-slate-200 focus-visible:ring-gold bg-white"
                  />
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={!newNote.trim()}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs h-9 flex items-center gap-1.5 px-4 shadow-sm"
                    >
                      <Send className="h-3 w-3" /> Post Activity Note
                    </Button>
                  </div>
                </form>

              </div>
            </div>
          ) : (
            /* Blank state if no lead is in array */
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-slate-50/50">
              <ClipboardList className="h-16 w-16 text-slate-300 animate-pulse mb-4" />
              <h2 className="font-serif text-xl font-bold text-slate-800 mb-2">No Active Inquiry Selected</h2>
              <p className="text-sm text-slate-400 max-w-sm">
                Select an inquiry from the left panel to review pilgrimage parameters, contact details, or claim/assign the lead.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
