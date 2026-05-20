import { motion } from "framer-motion";
import { useServiceFlow } from "@/context/ServiceFlowContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  onNext: () => void;
  onBack: () => void;
  serviceName: string;
}

export const ServiceForm: React.FC<Props> = ({ onNext, onBack, serviceName }) => {
  const { state, updateFormData } = useServiceFlow();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData({
      [name]: name === 'numberOfPeople' ? parseInt(value) || 1 : value,
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!state.formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!state.formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!state.formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(state.formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!state.formData.dateOfVisit.trim()) {
      newErrors.dateOfVisit = "Date of visit is required";
    }
    if (state.formData.numberOfPeople < 1) {
      newErrors.numberOfPeople = "Number of people must be at least 1";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-cream py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-secondary mb-3">
            Complete Your Details
          </h1>
          <p className="text-lg text-muted-foreground">
            Tell us more about your {serviceName} booking to proceed
          </p>
        </motion.div>

        {/* Service & Temple Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-8 mb-8 shadow-soft border border-gold/10"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">
                Selected Service
              </p>
              <p className="font-serif text-2xl font-bold text-secondary">{serviceName}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">
                Selected Temples
              </p>
              <p className="font-serif text-2xl font-bold text-secondary">
                {state.selectedTemples.length} temple{state.selectedTemples.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-8 shadow-soft border border-gold/10 space-y-6"
        >
          {/* Full Name */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-widest text-secondary mb-3">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={state.formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={cn(
                "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all",
                errors.fullName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gold/20 focus:border-transparent"
              )}
            />
            {errors.fullName && (
              <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                {errors.fullName}
              </div>
            )}
          </div>

          {/* Email & Phone Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest text-secondary mb-3">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={state.formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={cn(
                  "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all",
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gold/20 focus:border-transparent"
                )}
              />
              {errors.email && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {errors.email}
                </div>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest text-secondary mb-3">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={state.formData.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                className={cn(
                  "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all",
                  errors.phone
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gold/20 focus:border-transparent"
                )}
              />
              {errors.phone && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {errors.phone}
                </div>
              )}
            </div>
          </div>

          {/* Date & Number of People Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Date of Visit */}
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest text-secondary mb-3">
                Preferred Date of Visit *
              </label>
              <input
                type="date"
                name="dateOfVisit"
                value={state.formData.dateOfVisit}
                onChange={handleChange}
                className={cn(
                  "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all",
                  errors.dateOfVisit
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gold/20 focus:border-transparent"
                )}
              />
              {errors.dateOfVisit && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {errors.dateOfVisit}
                </div>
              )}
            </div>

            {/* Number of People */}
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest text-secondary mb-3">
                Number of Participants *
              </label>
              <input
                type="number"
                name="numberOfPeople"
                value={state.formData.numberOfPeople}
                onChange={handleChange}
                min="1"
                max="20"
                className={cn(
                  "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all",
                  errors.numberOfPeople
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gold/20 focus:border-transparent"
                )}
              />
              {errors.numberOfPeople && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {errors.numberOfPeople}
                </div>
              )}
            </div>
          </div>

          {/* Special Requirements */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-widest text-secondary mb-3">
              Special Requirements or Requests
            </label>
            <textarea
              name="specialRequirements"
              value={state.formData.specialRequirements}
              onChange={handleChange}
              placeholder="Any special requirements? (e.g., elderly assistance, dietary restrictions, accessibility needs)"
              rows={4}
              className="w-full px-4 py-3 border border-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Info Box */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 space-y-2">
            <p className="text-sm text-secondary font-medium">
              ℹ️ At every step of your journey, you can explore how darshan happens and learn more about the temples you've selected.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 px-6 py-3 border border-gold/30 rounded-lg font-bold uppercase tracking-widest text-secondary hover:bg-gold/10 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" /> Back
            </button>
            <Button
              type="submit"
              className="flex-1 px-6 py-3 text-lg font-bold"
            >
              Review & Submit →
            </Button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};
