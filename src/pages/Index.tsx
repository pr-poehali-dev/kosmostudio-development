import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  sitePreview?: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Привет! Я KosmoStudio AI. Опиши мне идею сайта, и я создам его для тебя прямо здесь! 🚀',
      isUser: false,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSiteWithChatGPT = async (idea: string): Promise<string> => {
    try {
      const response = await fetch('https://functions.poehali.dev/39dac2b2-b23d-4e1a-8060-e3b3d25a1f55', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate site');
      }

      const data = await response.json();
      return data.html;
    } catch (error) {
      console.error('Error generating site:', error);
      throw error;
    }
  };

  const generateSiteCode = (idea: string) => {
    const randomId = Math.floor(Math.random() * 90000) + 10000;
    const html = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${idea}</title>
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
            <h2 style="color: #FFD700;">✨ ${idea}</h2>
        </div>
    </div>
    
    <div class="container">
        <div class="hero">
            <h1>Добро пожаловать!</h1>
            <p class="subtitle">Сайт создан автоматически с помощью искусственного интеллекта</p>
            <button class="cta-button" onclick="alert('Привет! Кнопка работает 🎉')">Начать</button>
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
        <p style="margin-top: 10px;">ID: ${randomId}</p>
    </div>
</body>
</html>`;

    return html;
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isGenerating) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    const userIdea = inputValue;
    setInputValue('');
    setIsGenerating(true);

    const aiMessage: Message = {
      id: Date.now() + 1,
      text: 'Создаю сайт с помощью ChatGPT... Это займёт 10-20 секунд ✨',
      isUser: false,
    };
    setMessages(prev => [...prev, aiMessage]);

    try {
      const generatedHtml = await generateSiteWithChatGPT(userIdea);
      
      const resultMessage: Message = {
        id: Date.now() + 2,
        text: `Готово! Вот твой сайт "${userIdea}". Нажми на него чтобы открыть в полном размере! 🎉`,
        isUser: false,
        sitePreview: generatedHtml,
      };
      
      setMessages(prev => [...prev, resultMessage]);
      toast.success('Сайт создан ChatGPT!');
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now() + 2,
        text: `Ошибка при генерации сайта. Проверь что API ключ OpenAI добавлен в настройках проекта. ❌`,
        isUser: false,
      };
      setMessages(prev => [...prev, errorMessage]);
      toast.error('Не удалось создать сайт');
    } finally {
      setIsGenerating(false);
    }
  };

  const openSiteInNewTab = (html: string) => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-black to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(220,38,38,0.15),transparent_50%)]" />
      
      <div className="relative z-10 flex flex-col h-screen">
        <header className="px-6 py-4 border-b border-border/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Sparkles" className="text-black" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">KosmoStudio</h1>
                <p className="text-xs text-muted-foreground">AI Website Generator</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Zap" size={16} className="text-primary" />
              <span>Бесплатно навсегда</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.length === 1 && (
              <div className="text-center space-y-8 py-12 animate-fade-in">
                <div className="space-y-4">
                  <h2 className="text-5xl font-bold">
                    Создай сайт за <span className="text-gradient animate-gradient">минуты</span>
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Просто опиши идею на русском языке — ИИ создаст сайт прямо в чате
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-12">
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all hover:scale-105">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                      <Icon name="Rocket" className="text-primary" size={24} />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Быстро</h3>
                    <p className="text-sm text-muted-foreground">
                      От идеи до готового сайта за секунды
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
                      <Icon name="MessageSquare" className="text-primary" size={24} />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Просто</h3>
                    <p className="text-sm text-muted-foreground">
                      Без программирования, всё в одном чате
                    </p>
                  </Card>
                </div>

                <div className="mt-12 p-6 bg-card/30 backdrop-blur-sm rounded-lg border border-primary/20">
                  <p className="text-sm text-muted-foreground mb-4">💡 Примеры запросов:</p>
                  <div className="space-y-2 text-sm">
                    <p className="text-left">• "Лендинг для кофейни с меню и контактами"</p>
                    <p className="text-left">• "Портфолио фотографа с галереей работ"</p>
                    <p className="text-left">• "Сайт для студии йоги с расписанием занятий"</p>
                  </div>
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
                <div className="flex-1 space-y-3">
                  <Card
                    className={`p-4 ${
                      message.isUser
                        ? 'bg-gradient-to-br from-primary to-secondary text-black'
                        : 'bg-card/80 backdrop-blur-sm border-primary/20'
                    }`}
                  >
                    <p className="leading-relaxed">{message.text}</p>
                  </Card>
                  
                  {message.sitePreview && (
                    <Card 
                      className="overflow-hidden border-primary/30 hover:border-primary/50 transition-all cursor-pointer group"
                      onClick={() => openSiteInNewTab(message.sitePreview)}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex items-center gap-2 text-white">
                            <Icon name="ExternalLink" size={20} />
                            <span className="font-semibold">Открыть в полном размере</span>
                          </div>
                        </div>
                        <iframe
                          srcDoc={message.sitePreview}
                          className="w-full h-[400px] border-0 pointer-events-none"
                          title="Site Preview"
                          sandbox="allow-scripts"
                        />
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            ))}

            {isGenerating && (
              <div className="flex gap-4 animate-fade-in">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-secondary to-primary">
                  <Icon name="Loader2" className="text-black animate-spin" size={20} />
                </div>
                <Card className="p-4 bg-card/80 backdrop-blur-sm border-primary/20">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-sm text-muted-foreground">Генерирую...</span>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-border/50 backdrop-blur-xl bg-background/80 px-6 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder="Опиши идею сайта... Например: 'Лендинг для пиццерии с меню'"
                  className="pr-12 h-14 bg-input/50 backdrop-blur-sm border-primary/30 focus:border-primary text-base"
                  disabled={isGenerating}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  <kbd className="px-2 py-1 rounded bg-muted/50">Enter</kbd>
                </div>
              </div>
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isGenerating}
                className="h-14 px-8 bg-gradient-to-r from-primary via-secondary to-primary animate-gradient hover:scale-105 transition-transform font-semibold text-black disabled:opacity-50"
              >
                {isGenerating ? (
                  <Icon name="Loader2" size={20} className="animate-spin" />
                ) : (
                  <Icon name="Send" size={20} />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              KosmoStudio AI создаст сайт и покажет его прямо в чате
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;