import { useState, useRef, useEffect } from "react";
import { FaComments, FaTimes, FaPaperPlane, FaRobot } from "react-icons/fa";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi there! I'm your GO REALTORS AI assistant. Looking for a luxury villa, commercial space, or need help with home loans? Ask me anything!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scrolls to the bottom of the chat whenever a new message is added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // A simple rule-based local answer engine for instant testing.
  // In production, replace this with a real fetch request to your server/LLM API.
  const getAIResponse = async (userQuery) => {
    setIsTyping(true);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const query = userQuery.toLowerCase();
    let reply = "I'm not sure about that, but I can connect you with one of our human property experts! Could you please share your city?";

    if (query.includes("hello") || query.includes("hi")) {
      reply = "Hello! Hope you are having a wonderful day. How can I help you navigate Indian real estate today?";
    } else if (query.includes("villa") || query.includes("delhi") || query.includes("vasant kunj")) {
      reply = "We have an amazing 5 BHK Luxury Villa listed in Vasant Kunj, New Delhi for ₹3.20 Cr. It features a private swimming pool, gym, and garden. Would you like me to book a site visit?";
    } else if (query.includes("apartment") || query.includes("gurgaon") || query.includes("budget")) {
      reply = "Our Skyline Apartment in Gurgaon (Sector 65) is a fantastic 3 BHK deal priced at ₹1.18 Cr. Ready to move in and perfect for families!";
    } else if (query.includes("mumbai") || query.includes("penthouse") || query.includes("bandra")) {
      reply = "Ah, the Bandra penthouse! That's a premium 4 BHK Luxury Penthouse at ₹5.50 Cr with an infinity pool and a private sky lounge.";
    } else if (query.includes("office") || query.includes("commercial") || query.includes("noida")) {
      reply = "For business, we have a prime 4000 Sq.ft Commercial Office space in Sector 62, Noida priced at ₹1.89 Cr, offering high parking capacity (6 slots) and fully-equipped conference rooms.";
    } else if (query.includes("contact") || query.includes("agent") || query.includes("call")) {
      reply = "You can instantly get in touch with our relationship managers by clicking 'Contact' on any property, or call us directly at our toll-free support line.";
    }

    setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    setIsTyping(false);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");

    getAIResponse(userMessage);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[9999] font-sans">
      {/* ================= CHAT TRIGGER BUTTON ================= */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-charcoal px-5 py-4 rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.4)] font-bold transition transform hover:scale-105 active:scale-95"
        >
          <FaComments className="text-xl" />
          <span>Ask AI Expert</span>
        </button>
      )}

      {/* ================= CHAT WINDOW ================= */}
      {isOpen && (
        <div className="w-100 md:w-96 h-500px bg-charcoal border border-gold-800/40 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-espresso to-charcoal px-6 py-4 border-b border-gold-800/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/30">
                <FaRobot className="text-emerald-400 text-lg animate-pulse" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">GO AI Assistant</h4>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block animate-ping"></span>
                  Online & ready
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition p-1"
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-emerald-500 text-black font-medium rounded-tr-none"
                      : "bg-espresso text-gray-200 border border-gold-800/30 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* AI Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-espresso text-gray-400 border border-gold-800/30 rounded-2xl rounded-tl-none p-4 text-xs flex items-center gap-1">
                  <span>AI is thinking</span>
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce delay-100">.</span>
                  <span className="animate-bounce delay-200">.</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-gold-800/40 bg-charcoal flex gap-2"
          >
            <input
              type="text"
              placeholder="Ask about prices, locations, amenities..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-espresso border border-gold-800/40 focus:border-gold-500 text-white rounded-xl px-4 py-3 text-sm outline-none transition"
            />
            <button
              type="submit"
              className="bg-gold-500 hover:bg-gold-400 text-charcoal p-3 rounded-xl transition flex items-center justify-center active:scale-95"
            >
              <FaPaperPlane size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}