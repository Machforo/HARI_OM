import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => {
  const whatsappNumber = "918960965151"; // Real support number
  const message = "Namaste Vandan Darshan, I would like to inquire about temple darshan services.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 h-14 w-14 rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center border-4 border-white animate-bounce-slow"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-8 w-8 fill-current" />
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
      </span>
    </a>
  );
};
