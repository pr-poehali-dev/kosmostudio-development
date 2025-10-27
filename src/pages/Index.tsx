import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
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
  const [activeTab, setActiveTab] = useState('core');
  const [generatedSite, setGeneratedSite] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const generateSiteCode = (idea: string) => {
    const randomId = Math.floor(Math.random() * 90000) + 10000;
    const html = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Сайт создан в KosmoStudio</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
            color: #f5f5f5;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        .header {
            background: rgba(255, 215, 0, 0.1);
            backdrop-filter: blur(10px);
            padding: 20px;
            border-bottom: 1px solid rgba(255, 215, 0, 0.2);
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
            flex: 1;
        }
        .hero {
            text-align: center;
            padding: 80px 20px;
        }
        h1 {
            font-size: 48px;
            font-weight: 800;
            background: linear-gradient(135deg, #FFD700, #DC2626);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 20px;
        }
        .subtitle {
            font-size: 20px;
            color: #999;
            margin-bottom: 40px;
        }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 60px;
        }
        .feature-card {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 215, 0, 0.2);
            border-radius: 12px;
            padding: 30px;
            transition: all 0.3s ease;
        }
        .feature-card:hover {
            transform: translateY(-5px);
            border-color: rgba(255, 215, 0, 0.5);
            box-shadow: 0 10px 30px rgba(255, 215, 0, 0.2);
        }
        .feature-icon {
            font-size: 40px;
            margin-bottom: 15px;
        }
        .cta-button {
            background: linear-gradient(135deg, #FFD700, #DC2626);
            color: #000;
            padding: 16px 40px;
            border: none;
            border-radius: 8px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 30px;
        }
        .cta-button:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
        }
        .footer {
            text-align: center;
            padding: 30px;
            border-top: 1px solid rgba(255, 215, 0, 0.2);
            color: #666;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="container">
            <h2 style="color: #FFD700;">✨ Создано в KosmoStudio</h2>
        </div>
    </div>
    
    <div class="container">
        <div class="hero">
            <h1>Ваша идея: ${idea}</h1>
            <p class="subtitle">Сайт создан автоматически с помощью искусственного интеллекта</p>
            <button class="cta-button" onclick="alert('Кнопка работает!')">Начать</button>
        </div>
        
        <div class="features">
            <div class="feature-card">
                <div class="feature-icon">🚀</div>
                <h3 style="margin-bottom: 10px;">Быстрая разработка</h3>
                <p style="color: #999;">От идеи до готового сайта за минуты</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">💎</div>
                <h3 style="margin-bottom: 10px;">Премиум качество</h3>
                <p style="color: #999;">Профессиональный дизайн и код</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🎨</div>
                <h3 style="margin-bottom: 10px;">Уникальный стиль</h3>
                <p style="color: #999;">Адаптивный дизайн под ваш бренд</p>
            </div>
        </div>
    </div>
    
    <div class="footer">
        <p>Создано с помощью KosmoStudio AI • ${new Date().getFullYear()}</p>
        <p style="margin-top: 10px;">Ваш уникальный ID: ${randomId}</p>
    </div>
</body>
</html>`;
    return { html, id: randomId };
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
    };

    setMessages([...messages, userMessage]);
    const userIdea = inputValue;
    setInputValue('');

    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: 'Отлично! Создаю сайт на основе твоей идеи... ✨',
        isUser: false,
      };
      setMessages((prev) => [...prev, aiMessage]);

      setTimeout(() => {
        const { html, id } = generateSiteCode(userIdea);
        setGeneratedSite(html);
        
        const successMessage: Message = {
          id: Date.now() + 2,
          text: `Готово! Сайт создан. Переходи во вкладку "Сайт" чтобы посмотреть результат. Можешь опубликовать его одной кнопкой! 🎉`,
          isUser: false,
        };
        setMessages((prev) => [...prev, successMessage]);
        setActiveTab('site');
        toast.success('Сайт успешно создан!');
      }, 2000);
    }, 1000);
  };

  const handlePublish = () => {
    const randomId = Math.floor(Math.random() * 90000) + 10000;
    const url = `https://${randomId}.kosmostudio.net`;
    setSiteUrl(url);
    setIsPublished(true);
    toast.success('Сайт опубликован!');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(siteUrl);
    toast.success('Ссылка скопирована в буфер обмена!');
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <div className="border-b border-border/50 backdrop-blur-sm px-6">
            <div className="max-w-7xl mx-auto">
              <TabsList className="bg-transparent border-0 h-12">
                <TabsTrigger 
                  value="core" 
                  className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                >
                  <Icon name="MessageSquare" size={18} className="mr-2" />
                  Ядро
                </TabsTrigger>
                <TabsTrigger 
                  value="site"
                  className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary"
                  disabled={!generatedSite}
                >
                  <Icon name="Globe" size={18} className="mr-2" />
                  Сайт
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="core" className="flex-1 flex flex-col mt-0">
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
          </TabsContent>

          <TabsContent value="site" className="flex-1 flex flex-col mt-0 overflow-hidden">
            <div className="flex-1 flex flex-col">
              <div className="border-b border-border/50 backdrop-blur-sm px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isPublished && (
                      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/50 backdrop-blur-sm border border-primary/30">
                        <Icon name="Globe" size={16} className="text-primary" />
                        <span className="text-sm font-mono">{siteUrl}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {!isPublished ? (
                      <Button
                        onClick={handlePublish}
                        className="bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:scale-105 transition-transform"
                      >
                        <Icon name="Upload" size={18} className="mr-2" />
                        Опубликовать
                      </Button>
                    ) : (
                      <Button
                        onClick={handleCopyLink}
                        variant="outline"
                        className="border-primary/30 hover:border-primary/50"
                      >
                        <Icon name="Copy" size={18} className="mr-2" />
                        Скопировать ссылку
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-hidden">
                {generatedSite ? (
                  <iframe
                    srcDoc={generatedSite}
                    className="w-full h-full border-0"
                    title="Generated Site Preview"
                    sandbox="allow-scripts"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center space-y-4">
                      <Icon name="Globe" size={64} className="text-muted-foreground mx-auto" />
                      <p className="text-muted-foreground">Сайт ещё не создан. Перейди во вкладку "Ядро" и опиши свою идею.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
