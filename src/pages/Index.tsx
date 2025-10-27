import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Привет! Я KosmoStudio AI. Опиши мне идею сайта, и я создам его для тебя бесплатно! 🚀',
      isUser: false,
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: 'Отличная идея! Начинаю создание сайта... ✨',
        isUser: false,
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-black to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(220,38,38,0.15),transparent_50%)]" />
      
      <div className="relative z-10 flex flex-col h-screen">
        <header className="px-6 py-6 border-b border-border/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Sparkles" className="text-black" size={24} />
              </div>
              <h1 className="text-2xl font-bold text-gradient">KosmoStudio</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Zap" size={16} className="text-primary" />
                <span>Бесплатно навсегда</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.length === 1 && (
                <div className="text-center space-y-8 py-12 animate-fade-in">
                  <div className="space-y-4">
                    <h2 className="text-5xl font-bold">
                      Создай сайт за <span className="text-gradient animate-gradient">минуты</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                      Просто опиши идею на русском языке — ИИ сделает всё остальное
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mt-12">
                    <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all hover:scale-105">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                        <Icon name="Rocket" className="text-primary" size={24} />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">Быстро</h3>
                      <p className="text-sm text-muted-foreground">
                        От идеи до готового сайта за минуты
                      </p>
                    </Card>

                    <Card className="p-6 bg-card/50 backdrop-blur-sm border-secondary/20 hover:border-secondary/50 transition-all hover:scale-105">
                      <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                        <Icon name="Heart" className="text-secondary" size={24} />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">Бесплатно</h3>
                      <p className="text-sm text-muted-foreground">
                        Навсегда бесплатный доступ ко всем функциям
                      </p>
                    </Card>

                    <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all hover:scale-105">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                        <Icon name="Code" className="text-primary" size={24} />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">Просто</h3>
                      <p className="text-sm text-muted-foreground">
                        Без программирования и сложных настроек
                      </p>
                    </Card>
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 animate-fade-in ${
                    message.isUser ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.isUser
                        ? 'bg-gradient-to-br from-primary to-secondary'
                        : 'bg-gradient-to-br from-secondary to-primary'
                    }`}
                  >
                    {message.isUser ? (
                      <Icon name="User" className="text-black" size={20} />
                    ) : (
                      <Icon name="Sparkles" className="text-black" size={20} />
                    )}
                  </div>
                  <Card
                    className={`p-4 max-w-2xl ${
                      message.isUser
                        ? 'bg-gradient-to-br from-primary to-secondary text-black'
                        : 'bg-card/80 backdrop-blur-sm border-primary/20'
                    }`}
                  >
                    <p className="leading-relaxed">{message.text}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border/50 backdrop-blur-xl bg-background/80 px-6 py-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-3 items-end">
                <div className="flex-1 relative">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Опиши идею сайта... Например: 'Лендинг для кофейни с меню и формой заказа'"
                    className="pr-12 h-14 bg-input/50 backdrop-blur-sm border-primary/30 focus:border-primary text-base"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                    <kbd className="px-2 py-1 rounded bg-muted/50">Enter</kbd>
                  </div>
                </div>
                <Button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="h-14 px-8 bg-gradient-to-r from-primary via-secondary to-primary animate-gradient hover:scale-105 transition-transform font-semibold text-black"
                >
                  <Icon name="Send" size={20} />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                KosmoStudio AI создаст сайт на основе вашего описания
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
