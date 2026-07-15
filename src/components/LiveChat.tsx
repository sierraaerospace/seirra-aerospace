import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

const LiveChat = () => {
  const handleWhatsAppClick = () => {
    const message = "Hi, I'd like to inquire about your products and services.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/919663353121?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent text-accent-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-accent/90 transition-colors duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title="Chat with us on WhatsApp"
    >
      <MessageCircle size={24} />
    </motion.button>
  );
};

export default LiveChat;
