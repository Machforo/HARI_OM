import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLeads } from "@/context/AuthContext";
import { useAuth } from "@/context/AuthContext";
import { Lead, LeadStatus } from "@/types/crm";
import { ArrowLeft, Save } from "lucide-react";

export default function LeadDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { leads, updateLead } = useLeads();
  const { hasPermission } = useAuth();
  const [lead, setLead] = useState<Lead | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedLead, setEditedLead] = useState<Lead | null>(null);

  useEffect(() => {
    const foundLead = leads.find((l) => l.id === id);
    if (foundLead) {
      setLead(foundLead);
      setEditedLead(foundLead);
    } else {
      navigate("/crm/leads");
    }
  }, [id, leads, navigate]);

  const handleSave = () => {
    if (editedLead) {
      updateLead(editedLead.id, editedLead);
      setLead(editedLead);
      setIsEditing(false);
    }
  };

  const getStatusColor = (status: LeadStatus) => {
    const colors: Record<LeadStatus, string> = {
      new: "bg-blue-50 text-blue-700 border-blue-200",
      contacted: "bg-yellow-50 text-yellow-700 border-yellow-200",
      qualified: "bg-green-50 text-green-700 border-green-200",
      converted: "bg-emerald-50 text-emerald-700 border-emerald-200",
      lost: "bg-red-50 text-red-700 border-red-200",
      on_hold: "bg-gray-50 text-gray-700 border-gray-200",
    };
    return colors[status];
  };

  if (!lead) {
    return (
      <div className="p-6">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate("/crm/leads")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Leads
        </Button>
        {hasPermission("edit_lead") && !isEditing && (
          <Button onClick={() => setIsEditing(true)}>Edit Lead</Button>
        )}
        {isEditing && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* Lead Details */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{lead.name}</CardTitle>
              <CardDescription>Lead ID: {lead.id}</CardDescription>
            </div>
            <Badge className={`${getStatusColor(lead.status)} border`}>
              {lead.status.replace("_", " ")}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Phone Number
                </label>
                {isEditing && editedLead ? (
                  <Input
                    value={editedLead.phone}
                    onChange={(e) =>
                      setEditedLead({ ...editedLead, phone: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-gray-900">{lead.phone}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Email
                </label>
                {isEditing && editedLead ? (
                  <Input
                    type="email"
                    value={editedLead.email}
                    onChange={(e) =>
                      setEditedLead({ ...editedLead, email: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-gray-900">{lead.email}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Service
                </label>
                {isEditing && editedLead ? (
                  <Input
                    value={editedLead.service}
                    onChange={(e) =>
                      setEditedLead({ ...editedLead, service: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-gray-900">{lead.service}</p>
                )}
              </div>
            </div>

            {/* Booking Details */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Temple
                </label>
                {isEditing && editedLead ? (
                  <Input
                    value={editedLead.temple}
                    onChange={(e) =>
                      setEditedLead({ ...editedLead, temple: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-gray-900">{lead.temple}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Booking Date
                </label>
                {isEditing && editedLead ? (
                  <Input
                    type="date"
                    value={editedLead.date}
                    onChange={(e) =>
                      setEditedLead({ ...editedLead, date: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-gray-900">{lead.date}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Number of Devotees
                </label>
                {isEditing && editedLead ? (
                  <Input
                    type="number"
                    value={editedLead.devotees}
                    onChange={(e) =>
                      setEditedLead({ ...editedLead, devotees: parseInt(e.target.value) })
                    }
                  />
                ) : (
                  <p className="text-gray-900">{lead.devotees}</p>
                )}
              </div>
            </div>
          </div>

          {/* Status and Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Status</label>
              {isEditing && editedLead ? (
                <Select
                  value={editedLead.status}
                  onValueChange={(value) =>
                    setEditedLead({ ...editedLead, status: value as LeadStatus })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                    <SelectItem value="on_hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge className={`${getStatusColor(lead.status)} border`}>
                  {lead.status.replace("_", " ")}
                </Badge>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Created Date
              </label>
              <p className="text-gray-900">{new Date(lead.createdAt).toLocaleString()}</p>
            </div>
          </div>

          {/* Notes */}
          <div className="pt-4 border-t">
            <label className="text-sm font-semibold text-gray-700 block mb-2">Notes</label>
            {isEditing && editedLead ? (
              <Textarea
                value={editedLead.notes}
                onChange={(e) => setEditedLead({ ...editedLead, notes: e.target.value })}
                placeholder="Any additional notes..."
                rows={3}
              />
            ) : (
              <p className="text-gray-900">{lead.notes || "No notes"}</p>
            )}
          </div>

          {/* Comments */}
          <div className="pt-4 border-t">
            <label className="text-sm font-semibold text-gray-700 block mb-2">Comments</label>
            {isEditing && editedLead ? (
              <Textarea
                value={editedLead.comments}
                onChange={(e) => setEditedLead({ ...editedLead, comments: e.target.value })}
                placeholder="Internal comments..."
                rows={3}
              />
            ) : (
              <p className="text-gray-900">{lead.comments || "No comments"}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
