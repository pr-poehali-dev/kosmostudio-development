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

type UserPlan = 'free' | 'premium' | 'profi';

interface UserData {
  energy: number;
  plan: UserPlan;
}

type Language = 'ru' | 'en';
type MenuView = 'chat' | 'settings' | 'privileges' | 'admin' | 'sites';

interface Translations {
  ru: Record<string, string>;
  en: Record<string, string>;
}

const translations: Translations = {
  ru: {
    greeting: 'Привет! Я KosmoStudio AI. Опиши мне идею сайта, и я создам его для тебя прямо здесь! 🚀',
    placeholder: 'Опиши идею сайта... Например: \'Лендинг для пиццерии с меню\'',
    creating: 'Создаю сайт на основе твоего описания... ✨',
    ready: 'Готово! Вот твой сайт',
    download: 'Скачать код (HTML + CSS + JS)',
    energy: 'энергии',
    perRequest: 'за запрос',
    settings: 'Настройки',
    privileges: 'Привилегии',
    admin: 'Админ панель',
    sites: 'Мои сайты',
    language: 'Язык',
    logout: 'Выйти',
    login: 'Войти',
  },
  en: {
    greeting: 'Hi! I\'m KosmoStudio AI. Describe your website idea and I\'ll create it right here! 🚀',
    placeholder: 'Describe website idea... Example: \'Landing page for pizzeria with menu\'',
    creating: 'Creating website based on your description... ✨',
    ready: 'Done! Here\'s your website',
    download: 'Download code (HTML + CSS + JS)',
    energy: 'energy',
    perRequest: 'per request',
    settings: 'Settings',
    privileges: 'Privileges',
    admin: 'Admin Panel',
    sites: 'My Sites',
    language: 'Language',
    logout: 'Logout',
    login: 'Login',
  },
};

const Index = () => {
  const [language, setLanguage] = useState<Language>('ru');
  const [menuView, setMenuView] = useState<MenuView>('chat');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [adminLogin, setAdminLogin] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  
  const t = translations[language];
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: t.greeting,
      isUser: false,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    energy: 1000,
    plan: 'free'
  });
  const [generatedSites, setGeneratedSites] = useState<Array<{id: number; title: string; html: string; date: string}>>([]);



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

  const handleSend = () => {
    if (!inputValue.trim() || isGenerating) return;

    if (userData.energy < 2) {
      toast.error('Недостаточно энергии! Купи Premium или Профи');
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    const userIdea = inputValue;
    setInputValue('');
    setIsGenerating(true);

    setUserData(prev => ({ ...prev, energy: prev.energy - 2 }));

    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: t.creating,
        isUser: false,
      };
      setMessages(prev => [...prev, aiMessage]);

      setTimeout(() => {
        const generatedHtml = generateSiteCode(userIdea);
        
        const siteData = {
          id: Date.now() + 2,
          title: userIdea,
          html: generatedHtml,
          date: new Date().toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US')
        };
        
        setGeneratedSites(prev => [siteData, ...prev]);
        
        const resultMessage: Message = {
          id: siteData.id,
          text: `${t.ready} "${userIdea}". 🎉`,
          isUser: false,
          sitePreview: generatedHtml,
        };
        
        setMessages(prev => [...prev, resultMessage]);
        setIsGenerating(false);
        toast.success('Сайт создан!');
      }, 2000);
    }, 1000);
  };

  const openSiteInNewTab = (html: string) => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const downloadCode = (html: string, filename: string) => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Код скачан!');
  };

  const getPlanBadge = (plan: UserPlan) => {
    switch (plan) {
      case 'premium':
        return '👑 Premium';
      case 'profi':
        return '💎 Профи';
      default:
        return '🆓 Free';
    }
  };

  const getPlanColor = (plan: UserPlan) => {
    switch (plan) {
      case 'premium':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      case 'profi':
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
      default:
        return 'bg-gray-500';
    }
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
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Icon name="Zap" size={16} className="text-yellow-500" />
                <span className="font-bold text-foreground">{userData.energy}</span>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getPlanColor(userData.plan)}`}>
                {getPlanBadge(userData.plan)}
              </div>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 flex flex-col items-center justify-center gap-1 hover:bg-primary/10 rounded-lg transition-colors"
              >
                <div className="w-5 h-0.5 bg-foreground rounded-full"></div>
                <div className="w-5 h-0.5 bg-foreground rounded-full"></div>
                <div className="w-5 h-0.5 bg-foreground rounded-full"></div>
              </button>
            </div>
          </div>
        </header>

        {isMenuOpen && (
          <div className="absolute right-4 top-20 w-64 bg-card/95 backdrop-blur-xl border border-border rounded-lg shadow-2xl z-50 overflow-hidden">
            <div className="p-2 space-y-1">
              <button
                onClick={() => { setMenuView('settings'); setIsMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary/10 rounded-lg transition-colors text-left"
              >
                <Icon name="Settings" size={20} />
                <span>{t.settings}</span>
              </button>
              <button
                onClick={() => { setMenuView('privileges'); setIsMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary/10 rounded-lg transition-colors text-left"
              >
                <Icon name="Crown" size={20} className="text-yellow-500" />
                <span>{t.privileges}</span>
              </button>
              <button
                onClick={() => { setMenuView('sites'); setIsMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary/10 rounded-lg transition-colors text-left"
              >
                <Icon name="Globe" size={20} />
                <span>{t.sites}</span>
              </button>
              <button
                onClick={() => { 
                  if (!isAdminAuth) {
                    setMenuView('admin');
                  } else {
                    setMenuView('admin');
                  }
                  setIsMenuOpen(false); 
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/10 rounded-lg transition-colors text-left"
              >
                <Icon name="Shield" size={20} className="text-secondary" />
                <span>{t.admin}</span>
              </button>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {menuView === 'settings' && (
              <Card className="p-8 animate-fade-in">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Icon name="Settings" size={24} />
                  {t.settings}
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-3">{t.language}</label>
                    <div className="flex gap-3">
                      <Button
                        onClick={() => setLanguage('ru')}
                        variant={language === 'ru' ? 'default' : 'outline'}
                        className={language === 'ru' ? 'bg-gradient-to-r from-primary to-secondary text-black' : ''}
                      >
                        🇷🇺 Русский
                      </Button>
                      <Button
                        onClick={() => setLanguage('en')}
                        variant={language === 'en' ? 'default' : 'outline'}
                        className={language === 'en' ? 'bg-gradient-to-r from-primary to-secondary text-black' : ''}
                      >
                        🇬🇧 English
                      </Button>
                    </div>
                  </div>
                  <Button onClick={() => setMenuView('chat')} className="w-full">
                    <Icon name="ArrowLeft" size={16} className="mr-2" />
                    {language === 'ru' ? 'Вернуться к чату' : 'Back to chat'}
                  </Button>
                </div>
              </Card>
            )}

            {menuView === 'privileges' && (
              <Card className="p-8 animate-fade-in">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Icon name="Crown" size={24} className="text-yellow-500" />
                  {t.privileges}
                </h2>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <Card className="p-6 border-2 border-yellow-500/50 bg-gradient-to-br from-yellow-500/10 to-orange-500/10">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">👑</div>
                      <h3 className="text-2xl font-bold">Premium</h3>
                      <p className="text-3xl font-bold text-yellow-500 mt-2">667 ₽</p>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={16} className="text-yellow-500" />
                        <span>{language === 'ru' ? '5000 энергии в месяц' : '5000 energy per month'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={16} className="text-yellow-500" />
                        <span>{language === 'ru' ? 'Приоритетная генерация' : 'Priority generation'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={16} className="text-yellow-500" />
                        <span>{language === 'ru' ? 'Без рекламы' : 'No ads'}</span>
                      </li>
                    </ul>
                    <Button 
                      className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold"
                      onClick={() => {
                        setUserData(prev => ({ ...prev, plan: 'premium', energy: prev.energy + 5000 }));
                        toast.success(language === 'ru' ? 'Premium активирован!' : 'Premium activated!');
                      }}
                    >
                      {language === 'ru' ? 'Купить Premium' : 'Buy Premium'}
                    </Button>
                  </Card>

                  <Card className="p-6 border-2 border-pink-500/50 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">💎</div>
                      <h3 className="text-2xl font-bold">Профи</h3>
                      <p className="text-3xl font-bold text-pink-500 mt-2">3455 ₽</p>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={16} className="text-pink-500" />
                        <span>{language === 'ru' ? 'Безлимитная энергия' : 'Unlimited energy'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={16} className="text-pink-500" />
                        <span>{language === 'ru' ? 'Мгновенная генерация' : 'Instant generation'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={16} className="text-pink-500" />
                        <span>{language === 'ru' ? 'Эксклюзивные шаблоны' : 'Exclusive templates'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={16} className="text-pink-500" />
                        <span>{language === 'ru' ? 'Приоритетная поддержка' : 'Priority support'}</span>
                      </li>
                    </ul>
                    <Button 
                      className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold"
                      onClick={() => {
                        setUserData(prev => ({ ...prev, plan: 'profi', energy: 999999 }));
                        toast.success(language === 'ru' ? 'Профи активирован!' : 'Profi activated!');
                      }}
                    >
                      {language === 'ru' ? 'Купить Профи' : 'Buy Profi'}
                    </Button>
                  </Card>
                </div>
                <Button onClick={() => setMenuView('chat')} className="w-full">
                  <Icon name="ArrowLeft" size={16} className="mr-2" />
                  {language === 'ru' ? 'Вернуться к чату' : 'Back to chat'}
                </Button>
              </Card>
            )}

            {menuView === 'admin' && !isAdminAuth && (
              <Card className="p-8 animate-fade-in max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Icon name="Shield" size={24} className="text-secondary" />
                  {t.admin}
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">{language === 'ru' ? 'Логин' : 'Login'}</label>
                    <Input
                      value={adminLogin}
                      onChange={(e) => setAdminLogin(e.target.value)}
                      placeholder="KosmoCat"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{language === 'ru' ? 'Пароль' : 'Password'}</label>
                    <Input
                      type="password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full"
                    />
                  </div>
                  <Button
                    onClick={() => {
                      if (adminLogin === 'KosmoCat' && adminPassword === 'KosmoCat') {
                        setIsAdminAuth(true);
                        toast.success(language === 'ru' ? 'Вход выполнен!' : 'Logged in!');
                      } else {
                        toast.error(language === 'ru' ? 'Неверный логин или пароль' : 'Invalid credentials');
                      }
                    }}
                    className="w-full bg-gradient-to-r from-secondary to-primary text-black font-bold"
                  >
                    {t.login}
                  </Button>
                  <Button onClick={() => setMenuView('chat')} variant="outline" className="w-full">
                    <Icon name="ArrowLeft" size={16} className="mr-2" />
                    {language === 'ru' ? 'Назад' : 'Back'}
                  </Button>
                </div>
              </Card>
            )}

            {menuView === 'admin' && isAdminAuth && (
              <Card className="p-8 animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Icon name="Shield" size={24} className="text-secondary" />
                    {t.admin}
                  </h2>
                  <Button
                    onClick={() => {
                      setIsAdminAuth(false);
                      setAdminLogin('');
                      setAdminPassword('');
                      toast.success(language === 'ru' ? 'Вы вышли из системы' : 'Logged out');
                    }}
                    variant="outline"
                    size="sm"
                  >
                    {t.logout}
                  </Button>
                </div>
                <div className="space-y-6">
                  <Card className="p-4 bg-secondary/10">
                    <h3 className="font-bold mb-4">{language === 'ru' ? 'Выдать энергию' : 'Grant Energy'}</h3>
                    <div className="flex gap-3">
                      <Input
                        type="number"
                        placeholder={language === 'ru' ? 'Количество' : 'Amount'}
                        id="energy-input"
                        className="flex-1"
                      />
                      <Button
                        onClick={() => {
                          const input = document.getElementById('energy-input') as HTMLInputElement;
                          const amount = parseInt(input.value);
                          if (amount > 0) {
                            setUserData(prev => ({ ...prev, energy: prev.energy + amount }));
                            toast.success(`+${amount} ${t.energy}`);
                            input.value = '';
                          }
                        }}
                        className="bg-gradient-to-r from-primary to-secondary text-black"
                      >
                        <Icon name="Plus" size={16} />
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-4 bg-primary/10">
                    <h3 className="font-bold mb-4">{language === 'ru' ? 'Управление планом' : 'Manage Plan'}</h3>
                    <div className="flex gap-3">
                      <Button
                        onClick={() => {
                          setUserData(prev => ({ ...prev, plan: 'free' }));
                          toast.success('Plan: Free');
                        }}
                        variant="outline"
                        className="flex-1"
                      >
                        🆓 Free
                      </Button>
                      <Button
                        onClick={() => {
                          setUserData(prev => ({ ...prev, plan: 'premium' }));
                          toast.success('Plan: Premium');
                        }}
                        className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-black"
                      >
                        👑 Premium
                      </Button>
                      <Button
                        onClick={() => {
                          setUserData(prev => ({ ...prev, plan: 'profi' }));
                          toast.success('Plan: Profi');
                        }}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      >
                        💎 Профи
                      </Button>
                    </div>
                  </Card>

                  <Button onClick={() => setMenuView('chat')} className="w-full">
                    <Icon name="ArrowLeft" size={16} className="mr-2" />
                    {language === 'ru' ? 'Вернуться к чату' : 'Back to chat'}
                  </Button>
                </div>
              </Card>
            )}

            {menuView === 'sites' && (
              <Card className="p-8 animate-fade-in">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Icon name="Globe" size={24} />
                  {t.sites}
                </h2>
                {generatedSites.length === 0 ? (
                  <p className="text-center text-muted-foreground py-12">
                    {language === 'ru' ? 'У вас пока нет созданных сайтов' : 'You have no sites yet'}
                  </p>
                ) : (
                  <div className="space-y-4 mb-6">
                    {generatedSites.map(site => (
                      <Card key={site.id} className="p-4 hover:border-primary/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-bold">{site.title}</h3>
                            <p className="text-sm text-muted-foreground">{site.date}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openSiteInNewTab(site.html)}
                            >
                              <Icon name="ExternalLink" size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => downloadCode(site.html, `${site.title}.html`)}
                            >
                              <Icon name="Download" size={16} />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
                <Button onClick={() => setMenuView('chat')} className="w-full">
                  <Icon name="ArrowLeft" size={16} className="mr-2" />
                  {language === 'ru' ? 'Вернуться к чату' : 'Back to chat'}
                </Button>
              </Card>
            )}

            {menuView === 'chat' && (
              <>
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
                      <Icon name="Zap" className="text-yellow-500" size={24} />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Энергия</h3>
                    <p className="text-sm text-muted-foreground">
                      1000 энергии в подарок, 2 энергии за запрос
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
                    <div className="space-y-2">
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
                      <Button
                        onClick={() => downloadCode(message.sitePreview, 'website.html')}
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-black font-semibold"
                      >
                        <Icon name="Download" size={16} className="mr-2" />
                        {t.download}
                      </Button>
                    </div>
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
                  placeholder={t.placeholder}
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
            {menuView === 'chat' && (
              <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                <span>{language === 'ru' ? `У тебя ${userData.energy} энергии • 2 энергии за запрос` : `You have ${userData.energy} energy • 2 energy per request`}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;