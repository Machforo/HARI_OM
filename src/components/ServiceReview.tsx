import { motion } from "framer-motion";
import { useServiceFlow } from "@/context/ServiceFlowContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Edit2, Send } from "lucide-react";
import { allTemplesFullList } from "@/data/temples";

interface Props {
  onBack: () => void;
  onSubmit: () => void;
  serviceName: string;
  isSubmitting?: boolean;
}

export const ServiceReview: React.FC<Props> = ({
  onBack,
  onSubmit,
  serviceName,
  isSubmitting = false,
}) => {
  const { state } = useServiceFlow();

  const selectedTemples = allTemplesFullList.filter(t =>
    state.selectedTemples.includes(t.slug)
  );

  const handleSubmit = async () => {
    // Here you would send the data to your backend
    console.log("Submitting service inquiry:", {
      service: serviceName,
      temples: selectedTemples,
      details: state.formData,
    });

    // For now, just call the onSubmit callback
    onSubmit();
  };

  return (
    <div className="min-h-screen bg-gradient-cream py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-gold mb-6 border border-gold/30">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-secondary mb-3">
            Review Your Inquiry
          </h1>
          <p className="text-lg text-muted-foreground">
            Please review all details before submitting your service inquiry
          </p>
        </motion.div>

        {/* Service Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-8 mb-6 shadow-soft border border-gold/10 space-y-8"
        >
          {/* Service Information */}
          <div className="border-b border-gold/10 pb-8">
            <h2 className="font-serif text-2xl font-bold text-secondary mb-6 flex items-center gap-3">
              <span className="text-primary">1</span> Service Details
            </h2>
            <div className="bg-primary/5 rounded-lg p-6">
              <p className="text-sm font-bold uppercase tracking-widest text-gold mb-2">
                Selected Service
              </p>
              <p className="font-serif text-3xl font-bold text-secondary">{serviceName}</p>
            </div>
          </div>

          {/* Selected Temples */}
          <div className="border-b border-gold/10 pb-8">
            <h2 className="font-serif text-2xl font-bold text-secondary mb-6 flex items-center gap-3">
              <span className="text-primary">2</span> Selected Temples
            </h2>
            <div className="space-y-4">
              {selectedTemples.length > 0 ? (
                selectedTemples.map((temple, idx) => (
                  <motion.div
                    key={temple.slug}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-4 p-4 border border-gold/20 rounded-lg hover:bg-gold/5 transition-colors"
                  >
                    <img
                      src={temple.image}
                      alt={temple.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-bold text-secondary">{temple.name}</p>
                      <p className="text-sm text-muted-foreground">{temple.state}</p>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1.5 rounded">
                      Selected
                    </span>
                  </motion.div>
                ))
              ) : (
                <p className="text-muted-foreground">No temples selected</p>
              )}
            </div>
          </div>

          {/* Personal Details */}
          <div className="border-b border-gold/10 pb-8">
            <h2 className="font-serif text-2xl font-bold text-secondary mb-6 flex items-center gap-3">
              <span className="text-primary">3</span> Your Details
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-gold">Full Name</p>
                <p className="font-serif text-lg font-bold text-secondary">
                  {state.formData.fullName || "Not provided"}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-gold">Email</p>
                <p className="font-serif text-lg font-bold text-secondary">
                  {state.formData.email || "Not provided"}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-gold">Phone</p>
                <p className="font-serif text-lg font-bold text-secondary">
                  {state.formData.phone || "Not provided"}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-gold">Date of Visit</p>
                <p className="font-serif text-lg font-bold text-secondary">
                  {state.formData.dateOfVisit
                    ? new Date(state.formData.dateOfVisit).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                    : "Not provided"}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-gold">Number of Participants</p>
                <p className="font-serif text-lg font-bold text-secondary">
                  {state.formData.numberOfPeople || "Not provided"}
                </p>
              </div>
            </div>

            {state.formData.specialRequirements && (
              <div className="mt-6 p-4 bg-gold/5 rounded-lg border border-gold/20">
                <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Special Requirements</p>
                <p className="text-secondary text-sm">{state.formData.specialRequirements}</p>
              </div>
            )}
          </div>

          {/* Next Steps */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-secondary mb-4 flex items-center gap-3">
              <span className="text-primary">✓</span> What Happens Next
            </h2>
            <div className="space-y-3">
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-secondary">Instant Confirmation</p>
                  <p className="text-sm text-muted-foreground">You'll receive a confirmation email with all details</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-secondary">Expert Guidance</p>
                  <p className="text-sm text-muted-foreground">Our spiritual team will contact you within 24 hours with personalized guidance</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-secondary">Seamless Experience</p>
                  <p className="text-sm text-muted-foreground">We'll arrange everything for your divine experience</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-4"
        >
          <button
            onClick={onBack}
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 border border-gold/30 rounded-lg font-bold uppercase tracking-widest text-secondary hover:bg-gold/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" /> Back to Edit
          </button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 text-lg font-bold flex items-center justify-center gap-2"
          >
            <Send className="h-5 w-5" />
            {isSubmitting ? "Submitting..." : "Submit Inquiry"}
          </Button>
        </motion.div>

        {/* Privacy Notice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-muted-foreground mt-8 leading-relaxed"
        >
          By submitting, you agree to our privacy policy and terms of service.
          Your information will be used only for processing your spiritual service inquiry.
        </motion.p>
      </div>
    </div>
  );
};
