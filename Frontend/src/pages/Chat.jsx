import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCurrentUser, getConversations, getMessagesByConversation, addMessage } from "@/lib/mockStorage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, MessageSquare } from "lucide-react";
const Chat = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const user = getCurrentUser();
    const [conversations, setConversations] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const messagesEndRef = useRef(null);
    const scrollContainerRef = useRef(null);

    const scrollToBottom = (smooth = true) => {
      const c = scrollContainerRef.current;
      if (!c)
        return;
      try {
        c.scrollTo({ top: c.scrollHeight, behavior: smooth ? 'smooth' : 'auto' });
      }
      catch (err) {
        c.scrollTop = c.scrollHeight;
      }
    };
    useEffect(() => {
        if (!user) {
            navigate("/auth");
            return;
        }
        const loadConversations = async () => {
            const convs = await getConversations(user.id);
            setConversations(convs);
            const urlConv = searchParams.get("conversation");
            const first = convs.find((conversation) => String(conversation.id) === String(urlConv))?.id || (convs[0]?.id || null);
            if (first) {
                setSelectedId(first);
                const msgs = await getMessagesByConversation(first);
                setMessages(Array.isArray(msgs) ? msgs : []);
            }
        };
        loadConversations();
    }, []);
    useEffect(() => { scrollToBottom(true); }, [messages]);
    const selectConv = async (id) => {
        setSelectedId(id);
        const msgs = await getMessagesByConversation(id);
        setMessages(Array.isArray(msgs) ? msgs : []);
    };
    const handleSend = async () => {
        if (!message.trim() || !selectedId || !user)
            return;
        const msg = await addMessage({ conversation_id: selectedId, sender_id: user.id, content: message.trim() });
        setMessages(prev => [...prev, msg]);
        setMessage("");
    };
    const initials = (name) => (name || "U").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    const selectedConv = conversations.find(c => String(c.id) === String(selectedId));
    if (!user)
        return null;
    return (<div className="min-h-screen flex flex-col"><Navbar />
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 h-[calc(100vh-200px)]">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
            {/* Conversations list */}
            <aside className="lg:col-span-1">
              <Card className="h-full"><CardContent className="p-4">
                <h2 className="font-bold text-lg mb-4">Conversations</h2>
                {conversations.length === 0 ? (<div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground"/>
                    <p className="text-muted-foreground text-sm">No conversations yet</p>
                    <p className="text-xs text-muted-foreground mt-1">Start from a property listing</p>
                  </div>) : (<div className="space-y-2">
                    {conversations.map(c => (<div key={c.id} onClick={() => selectConv(c.id)} className={`p-3 rounded-lg cursor-pointer transition-colors ${String(selectedId) === String(c.id) ? "bg-accent/10 border border-accent/20" : "hover:bg-secondary"}`}>
                        <div className="flex items-center gap-3">
                          <Avatar><AvatarFallback>{initials(c.other_user_name)}</AvatarFallback></Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">{c.other_user_name}</p>
                            <p className="text-sm text-muted-foreground truncate">{c.property_title}</p>
                          </div>
                        </div>
                      </div>))}
                  </div>)}
              </CardContent></Card>
            </aside>

            {/* Chat area */}
            <div className="lg:col-span-3">
              <Card className="h-full flex flex-col">
                {selectedConv ? (<>
                    <div className="p-4 border-b flex items-center gap-3">
                      <Avatar><AvatarFallback>{initials(selectedConv.other_user_name)}</AvatarFallback></Avatar>
                      <div>
                        <p className="font-semibold">{selectedConv.other_user_name}</p>
                        <p className="text-sm text-muted-foreground">{selectedConv.property_title}</p>
                      </div>
                    </div>
                    <CardContent ref={scrollContainerRef} className="flex-1 overflow-y-auto p-6">
                      <div className="space-y-4">
                        {messages.map(m => (<div key={m.id} onClick={() => scrollToBottom(true)} className={`flex ${m.sender_id === user.id ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${m.sender_id === user.id ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"}`}>
                              <p>{m.content}</p>
                              <p className="text-xs opacity-70 mt-1">{new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                            </div>
                          </div>))}
                        <div ref={messagesEndRef}/>
                      </div>
                    </CardContent>
                    <div className="p-4 border-t">
                        <div className="flex gap-2">
                        <Input placeholder="Type your message..." value={message} onChange={e => { setMessage(e.target.value); scrollToBottom(false); }} onFocus={() => scrollToBottom(true)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())} className="flex-1"/>
                        <Button onClick={handleSend} disabled={!message.trim()} className="bg-gradient-to-r from-accent to-accent/90"><Send className="w-5 h-5"/></Button>
                      </div>
                    </div>
                  </>) : (<div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground"/>
                      <p className="text-lg text-muted-foreground">Select a conversation to start chatting</p>
                    </div>
                  </div>)}
              </Card>
            </div>
          </div>
        </div>
      </main><Footer />
    </div>);
};
export default Chat;
