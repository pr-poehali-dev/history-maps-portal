import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

interface HistoricalPeriod {
  id: string;
  name: string;
  years: string;
  color: string;
  description: string;
  mapImage: string;
}

interface GradeLevel {
  grade: number;
  title: string;
  periods: string[];
  icon: string;
}

interface MapEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  coordinates: { x: number; y: number };
  period: string;
  mapImage?: string;
}

const historicalPeriods: HistoricalPeriod[] = [
  {
    id: 'ancient',
    name: 'Древний мир',
    years: 'до V в. н.э.',
    color: 'bg-primary',
    description: 'От первобытности до падения Римской империи',
    mapImage: 'https://cdn.poehali.dev/projects/67453f57-e8e6-4849-8048-bc424cd2c1cc/files/09e74302-3746-436e-aa17-ffeffa3be68b.jpg'
  },
  {
    id: 'medieval',
    name: 'Средневековье',
    years: 'V-XV вв.',
    color: 'bg-secondary',
    description: 'Эпоха рыцарей, замков и крестовых походов',
    mapImage: 'https://cdn.poehali.dev/projects/67453f57-e8e6-4849-8048-bc424cd2c1cc/files/db148adb-a790-4ab2-a593-3bf1463b4c04.jpg'
  },
  {
    id: 'modern',
    name: 'Новое время',
    years: 'XVI-XIX вв.',
    color: 'bg-accent',
    description: 'Великие географические открытия и промышленная революция',
    mapImage: 'https://cdn.poehali.dev/projects/67453f57-e8e6-4849-8048-bc424cd2c1cc/files/381de725-ad40-4ba3-a9b0-25d84b151a5e.jpg'
  },
  {
    id: 'contemporary',
    name: 'Новейшая история',
    years: 'XX-XXI вв.',
    color: 'bg-destructive',
    description: 'Мировые войны и современная цивилизация',
    mapImage: 'https://cdn.poehali.dev/projects/67453f57-e8e6-4849-8048-bc424cd2c1cc/files/b589a38d-57a5-4845-a2b5-dc34321c3b9c.jpg'
  }
];

const gradeLevels: GradeLevel[] = [
  { grade: 5, title: '5 класс', periods: ['ancient'], icon: 'Scroll' },
  { grade: 6, title: '6 класс', periods: ['ancient', 'medieval'], icon: 'Castle' },
  { grade: 7, title: '7 класс', periods: ['medieval'], icon: 'Crown' },
  { grade: 8, title: '8 класс', periods: ['modern'], icon: 'Ship' },
  { grade: 9, title: '9 класс', periods: ['modern'], icon: 'Factory' },
  { grade: 10, title: '10 класс', periods: ['contemporary'], icon: 'Plane' },
  { grade: 11, title: '11 класс', periods: ['contemporary'], icon: 'Rocket' }
];

const mapEvents: MapEvent[] = [
  {
    id: '1',
    year: -3100,
    title: 'Объединение Египта',
    description: 'Фараон Менес объединил Верхний и Нижний Египет',
    coordinates: { x: 58, y: 60 },
    period: 'ancient',
    mapImage: 'https://cdn.poehali.dev/projects/67453f57-e8e6-4849-8048-bc424cd2c1cc/files/82684917-2ed9-4f92-8b50-a4086cf1143e.jpg'
  },
  {
    id: '2',
    year: -2500,
    title: 'Строительство пирамид в Гизе',
    description: 'Возведение пирамиды Хеопса - одного из чудес света',
    coordinates: { x: 58, y: 58 },
    period: 'ancient'
  },
  {
    id: '3',
    year: -1750,
    title: 'Законы Хаммурапи',
    description: 'Создание первого письменного свода законов в Вавилоне',
    coordinates: { x: 64, y: 55 },
    period: 'ancient'
  },
  {
    id: '4',
    year: -1200,
    title: 'Троянская война',
    description: 'Легендарная война греков против Трои',
    coordinates: { x: 60, y: 48 },
    period: 'ancient'
  },
  {
    id: '5',
    year: -776,
    title: 'Первые Олимпийские игры',
    description: 'Начало традиции Олимпийских игр в Древней Греции',
    coordinates: { x: 56, y: 47 },
    period: 'ancient'
  },
  {
    id: '6',
    year: -753,
    title: 'Основание Рима',
    description: 'Легендарное основание города Рима братьями Ромулом и Рэмом',
    coordinates: { x: 52, y: 45 },
    period: 'ancient',
    mapImage: 'https://cdn.poehali.dev/projects/67453f57-e8e6-4849-8048-bc424cd2c1cc/files/541768f8-dc7e-44bf-9917-f439ab238f75.jpg'
  },
  {
    id: '7',
    year: -490,
    title: 'Марафонская битва',
    description: 'Решающее сражение греко-персидских войн',
    coordinates: { x: 57, y: 47 },
    period: 'ancient',
    mapImage: 'https://cdn.poehali.dev/projects/67453f57-e8e6-4849-8048-bc424cd2c1cc/files/d7f11e2a-ef91-4ca6-8d6f-d7e541031be9.jpg'
  },
  {
    id: '8',
    year: -334,
    title: 'Походы Александра Македонского',
    description: 'Начало великих завоеваний на Восток',
    coordinates: { x: 60, y: 48 },
    period: 'ancient',
    mapImage: 'https://cdn.poehali.dev/projects/67453f57-e8e6-4849-8048-bc424cd2c1cc/files/154f5000-a46f-493b-9dd3-f893d5a0a76c.jpg'
  },
  {
    id: '9',
    year: -221,
    title: 'Объединение Китая',
    description: 'Император Цинь Шихуанди объединил Китай',
    coordinates: { x: 85, y: 50 },
    period: 'ancient'
  },
  {
    id: '10',
    year: -44,
    title: 'Убийство Юлия Цезаря',
    description: 'Заговор сенаторов против римского диктатора',
    coordinates: { x: 52, y: 45 },
    period: 'ancient'
  },
  {
    id: '11',
    year: 476,
    title: 'Падение Западной Римской империи',
    description: 'Конец античности и начало Средневековья',
    coordinates: { x: 52, y: 45 },
    period: 'medieval'
  },
  {
    id: '12',
    year: 622,
    title: 'Хиджра пророка Мухаммеда',
    description: 'Переселение в Медину - начало исламского летоисчисления',
    coordinates: { x: 66, y: 58 },
    period: 'medieval'
  },
  {
    id: '13',
    year: 800,
    title: 'Коронация Карла Великого',
    description: 'Возрождение империи на Западе',
    coordinates: { x: 48, y: 40 },
    period: 'medieval'
  },
  {
    id: '14',
    year: 988,
    title: 'Крещение Руси',
    description: 'Князь Владимир принял христианство',
    coordinates: { x: 62, y: 38 },
    period: 'medieval'
  },
  {
    id: '15',
    year: 1054,
    title: 'Великий раскол церкви',
    description: 'Разделение христианства на католичество и православие',
    coordinates: { x: 60, y: 48 },
    period: 'medieval'
  },
  {
    id: '16',
    year: 1066,
    title: 'Битва при Гастингсе',
    description: 'Нормандское завоевание Англии',
    coordinates: { x: 42, y: 32 },
    period: 'medieval'
  },
  {
    id: '17',
    year: 1206,
    title: 'Провозглашение Чингисхана',
    description: 'Объединение монгольских племён',
    coordinates: { x: 78, y: 42 },
    period: 'medieval'
  },
  {
    id: '18',
    year: 1215,
    title: 'Великая хартия вольностей',
    description: 'Ограничение власти короля в Англии',
    coordinates: { x: 42, y: 32 },
    period: 'medieval'
  },
  {
    id: '19',
    year: 1337,
    title: 'Начало Столетней войны',
    description: 'Конфликт между Англией и Францией',
    coordinates: { x: 44, y: 38 },
    period: 'medieval'
  },
  {
    id: '20',
    year: 1380,
    title: 'Куликовская битва',
    description: 'Победа Дмитрия Донского над Мамаем',
    coordinates: { x: 68, y: 36 },
    period: 'medieval',
    mapImage: 'https://cdn.poehali.dev/projects/67453f57-e8e6-4849-8048-bc424cd2c1cc/files/8d7f1aca-9e13-47bd-8ea4-403e476cdfdc.jpg'
  },
  {
    id: '21',
    year: 1453,
    title: 'Падение Константинополя',
    description: 'Конец Византийской империи и взятие города турками',
    coordinates: { x: 60, y: 48 },
    period: 'medieval',
    mapImage: 'https://cdn.poehali.dev/projects/67453f57-e8e6-4849-8048-bc424cd2c1cc/files/d041aef7-3dfc-42f3-9719-0bd5885e49e5.jpg'
  },
  {
    id: '22',
    year: 1492,
    title: 'Открытие Америки',
    description: 'Христофор Колумб достиг берегов Нового Света',
    coordinates: { x: 18, y: 55 },
    period: 'modern',
    mapImage: 'https://cdn.poehali.dev/projects/67453f57-e8e6-4849-8048-bc424cd2c1cc/files/0f24bc99-2348-49c7-88e4-90f228acf0b0.jpg'
  },
  {
    id: '23',
    year: 1517,
    title: 'Начало Реформации',
    description: 'Мартин Лютер выступил против католической церкви',
    coordinates: { x: 50, y: 35 },
    period: 'modern'
  },
  {
    id: '24',
    year: 1588,
    title: 'Разгром Непобедимой армады',
    description: 'Поражение испанского флота от Англии',
    coordinates: { x: 40, y: 32 },
    period: 'modern'
  },
  {
    id: '25',
    year: 1618,
    title: 'Начало Тридцатилетней войны',
    description: 'Крупнейший религиозный конфликт в Европе',
    coordinates: { x: 50, y: 38 },
    period: 'modern'
  },
  {
    id: '26',
    year: 1649,
    title: 'Казнь короля Карла I',
    description: 'Английская революция достигла апогея',
    coordinates: { x: 42, y: 32 },
    period: 'modern'
  },
  {
    id: '27',
    year: 1703,
    title: 'Основание Санкт-Петербурга',
    description: 'Пётр I заложил новую столицу России',
    coordinates: { x: 62, y: 28 },
    period: 'modern'
  },
  {
    id: '28',
    year: 1776,
    title: 'Декларация независимости США',
    description: 'Рождение нового государства',
    coordinates: { x: 22, y: 45 },
    period: 'modern'
  },
  {
    id: '29',
    year: 1789,
    title: 'Великая французская революция',
    description: 'Начало эпохи революций в Европе',
    coordinates: { x: 46, y: 38 },
    period: 'modern',
    mapImage: 'https://cdn.poehali.dev/projects/67453f57-e8e6-4849-8048-bc424cd2c1cc/files/a55dce0a-12bf-45fc-b8fb-f5768fd3719f.jpg'
  },
  {
    id: '30',
    year: 1812,
    title: 'Отечественная война',
    description: 'Наполеон вторгся в Россию',
    coordinates: { x: 64, y: 34 },
    period: 'modern',
    mapImage: 'https://cdn.poehali.dev/projects/67453f57-e8e6-4849-8048-bc424cd2c1cc/files/0586ba70-ceb3-4906-88ca-3de84d201e62.jpg'
  },
  {
    id: '31',
    year: 1861,
    title: 'Отмена крепостного права',
    description: 'Александр II освободил крестьян в России',
    coordinates: { x: 64, y: 34 },
    period: 'modern'
  },
  {
    id: '32',
    year: 1914,
    title: 'Начало Первой мировой войны',
    description: 'Крупнейший конфликт начала XX века',
    coordinates: { x: 52, y: 38 },
    period: 'contemporary'
  },
  {
    id: '33',
    year: 1917,
    title: 'Октябрьская революция',
    description: 'Большевики захватили власть в России',
    coordinates: { x: 62, y: 30 },
    period: 'contemporary'
  },
  {
    id: '34',
    year: 1929,
    title: 'Великая депрессия',
    description: 'Мировой экономический кризис',
    coordinates: { x: 22, y: 45 },
    period: 'contemporary'
  },
  {
    id: '35',
    year: 1939,
    title: 'Начало Второй мировой войны',
    description: 'Германия напала на Польшу',
    coordinates: { x: 54, y: 36 },
    period: 'contemporary'
  },
  {
    id: '36',
    year: 1945,
    title: 'Окончание Второй мировой войны',
    description: 'Победа над фашизмом',
    coordinates: { x: 55, y: 35 },
    period: 'contemporary',
    mapImage: 'https://cdn.poehali.dev/projects/67453f57-e8e6-4849-8048-bc424cd2c1cc/files/496308ec-af20-4c7d-9815-6bc4e2744bc4.jpg'
  },
  {
    id: '37',
    year: 1945,
    title: 'Ядерные бомбардировки Японии',
    description: 'Первое применение атомного оружия',
    coordinates: { x: 88, y: 50 },
    period: 'contemporary'
  },
  {
    id: '38',
    year: 1949,
    title: 'Образование КНР',
    description: 'Провозглашение Китайской Народной Республики',
    coordinates: { x: 85, y: 50 },
    period: 'contemporary'
  },
  {
    id: '39',
    year: 1961,
    title: 'Первый полет человека в космос',
    description: 'Юрий Гагарин совершил исторический полет',
    coordinates: { x: 70, y: 32 },
    period: 'contemporary',
    mapImage: 'https://cdn.poehali.dev/projects/67453f57-e8e6-4849-8048-bc424cd2c1cc/files/0b33e866-504f-4352-9f61-c983ed1b2269.jpg'
  },
  {
    id: '40',
    year: 1969,
    title: 'Высадка на Луну',
    description: 'Нил Армстронг - первый человек на Луне',
    coordinates: { x: 22, y: 48 },
    period: 'contemporary'
  },
  {
    id: '41',
    year: 1989,
    title: 'Падение Берлинской стены',
    description: 'Символ окончания холодной войны',
    coordinates: { x: 51, y: 35 },
    period: 'contemporary'
  },
  {
    id: '42',
    year: 1991,
    title: 'Распад СССР',
    description: 'Конец Советского Союза',
    coordinates: { x: 64, y: 32 },
    period: 'contemporary',
    mapImage: 'https://cdn.poehali.dev/projects/67453f57-e8e6-4849-8048-bc424cd2c1cc/files/916d4755-b5fb-4b8b-a2cb-99af0a9edb14.jpg'
  },
  {
    id: '43',
    year: 2001,
    title: 'Теракт 11 сентября',
    description: 'Трагедия в Нью-Йорке, изменившая мир',
    coordinates: { x: 22, y: 46 },
    period: 'contemporary'
  },
  {
    id: '44',
    year: 2008,
    title: 'Мировой финансовый кризис',
    description: 'Крупнейший экономический кризис со времён Великой депрессии',
    coordinates: { x: 22, y: 46 },
    period: 'contemporary'
  }
];

export default function Index() {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');
  const [activeView, setActiveView] = useState<'home' | 'grades' | 'maps' | 'periods'>('home');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedEventForUpload, setSelectedEventForUpload] = useState<string | null>(null);
  const [events, setEvents] = useState<MapEvent[]>(mapEvents);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredEvents = events.filter(event => 
    selectedPeriod === 'all' || event.period === selectedPeriod
  );

  const handleImageUpload = (eventId: string) => {
    setSelectedEventForUpload(eventId);
    setUploadDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, выберите изображение',
        variant: 'destructive'
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      
      setEvents(prevEvents => 
        prevEvents.map(ev => 
          ev.id === selectedEventForUpload 
            ? { ...ev, mapImage: imageUrl }
            : ev
        )
      );

      toast({
        title: 'Успешно',
        description: 'Карта загружена!'
      });

      setUploadDialogOpen(false);
      setSelectedEventForUpload(null);
    };
    
    reader.readAsDataURL(file);
  };

  const getGradePeriods = () => {
    if (!selectedGrade) return [];
    const grade = gradeLevels.find(g => g.grade === selectedGrade);
    return grade ? grade.periods.map(p => historicalPeriods.find(hp => hp.id === p)).filter(Boolean) : [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Icon name="Map" className="text-primary-foreground" size={24} />
              </div>
              <h1 className="text-2xl font-heading font-bold text-foreground">ИстоКарты</h1>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={activeView === 'home' ? 'default' : 'ghost'}
                onClick={() => setActiveView('home')}
                className="gap-2"
              >
                <Icon name="Home" size={18} />
                Главная
              </Button>
              <Button 
                variant={activeView === 'grades' ? 'default' : 'ghost'}
                onClick={() => setActiveView('grades')}
                className="gap-2"
              >
                <Icon name="GraduationCap" size={18} />
                Классы
              </Button>
              <Button 
                variant={activeView === 'maps' ? 'default' : 'ghost'}
                onClick={() => setActiveView('maps')}
                className="gap-2"
              >
                <Icon name="Map" size={18} />
                Карты
              </Button>
              <Button 
                variant={activeView === 'periods' ? 'default' : 'ghost'}
                onClick={() => setActiveView('periods')}
                className="gap-2"
              >
                <Icon name="Clock" size={18} />
                Периоды
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        {activeView === 'home' && (
          <div className="space-y-16 animate-fade-in">
            <section className="text-center space-y-6 py-12">
              <h2 className="text-5xl font-heading font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Исследуй историю через карты
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Интерактивные исторические карты для учеников 5-11 классов. 
                Изучай события, периоды и находи связи между эпохами.
              </p>
              <div className="flex gap-4 justify-center pt-6">
                <Button 
                  size="lg" 
                  onClick={() => setActiveView('maps')}
                  className="gap-2 text-lg px-8"
                >
                  <Icon name="Map" size={20} />
                  Открыть карты
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => setActiveView('grades')}
                  className="gap-2 text-lg px-8"
                >
                  <Icon name="BookOpen" size={20} />
                  Выбрать класс
                </Button>
              </div>
            </section>

            <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {historicalPeriods.map((period, index) => (
                <Card 
                  key={period.id}
                  className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => {
                    setSelectedPeriod(period.id);
                    setActiveView('maps');
                  }}
                >
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${period.color} flex items-center justify-center mb-3`}>
                      <Icon name="Calendar" className="text-white" size={24} />
                    </div>
                    <CardTitle className="font-heading">{period.name}</CardTitle>
                    <CardDescription className="font-semibold">{period.years}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{period.description}</p>
                  </CardContent>
                </Card>
              ))}
            </section>

            <section className="bg-card rounded-2xl p-8 border">
              <h3 className="text-3xl font-heading font-bold mb-8 text-center">Выбери свой класс</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                {gradeLevels.map((grade, index) => (
                  <Card 
                    key={grade.grade}
                    className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => {
                      setSelectedGrade(grade.grade);
                      setActiveView('grades');
                    }}
                  >
                    <CardHeader className="text-center pb-3">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <Icon name={grade.icon as any} className="text-primary" size={28} />
                      </div>
                      <CardTitle className="font-heading text-lg">{grade.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 text-center">
                      <Badge variant="secondary" className="text-xs">
                        {grade.periods.length} период{grade.periods.length > 1 ? 'а' : ''}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeView === 'grades' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-4xl font-heading font-bold mb-4">Выбери класс</h2>
              <p className="text-muted-foreground">Каждый класс изучает определённые исторические периоды</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
              {gradeLevels.map((grade) => (
                <Card 
                  key={grade.grade}
                  className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                    selectedGrade === grade.grade ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedGrade(grade.grade)}
                >
                  <CardHeader className="text-center pb-3">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <Icon name={grade.icon as any} className="text-primary" size={28} />
                    </div>
                    <CardTitle className="font-heading text-lg">{grade.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 text-center">
                    <Badge variant="secondary" className="text-xs">
                      {grade.periods.length} период{grade.periods.length > 1 ? 'а' : ''}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedGrade && (
              <Card className="animate-scale-in">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl">
                    Программа {selectedGrade} класса
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {getGradePeriods().map((period: any) => (
                      <Card key={period.id} className="border-2">
                        <CardHeader>
                          <div className={`w-12 h-12 rounded-lg ${period.color} flex items-center justify-center mb-2`}>
                            <Icon name="Calendar" className="text-white" size={24} />
                          </div>
                          <CardTitle className="font-heading">{period.name}</CardTitle>
                          <CardDescription className="font-semibold">{period.years}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">{period.description}</p>
                          <Button 
                            onClick={() => {
                              setSelectedPeriod(period.id);
                              setActiveView('maps');
                            }}
                            className="w-full gap-2"
                          >
                            <Icon name="Map" size={16} />
                            Открыть карты периода
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeView === 'maps' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-4xl font-heading font-bold mb-4">Интерактивные карты</h2>
              <p className="text-muted-foreground">Изучай исторические события на карте мира</p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedPeriod === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedPeriod('all')}
              >
                Все периоды
              </Button>
              {historicalPeriods.map((period) => (
                <Button
                  key={period.id}
                  variant={selectedPeriod === period.id ? 'default' : 'outline'}
                  onClick={() => setSelectedPeriod(period.id)}
                  className="gap-2"
                >
                  <div className={`w-3 h-3 rounded-full ${period.color}`}></div>
                  {period.name}
                </Button>
              ))}
            </div>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative w-full h-[600px]">
                  {selectedPeriod !== 'all' && historicalPeriods.find(p => p.id === selectedPeriod) && (
                    <img 
                      src={historicalPeriods.find(p => p.id === selectedPeriod)?.mapImage} 
                      alt={historicalPeriods.find(p => p.id === selectedPeriod)?.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  {selectedPeriod === 'all' && (
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
                      <div className="absolute inset-0 opacity-20">
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {filteredEvents.map((event, index) => {
                    const period = historicalPeriods.find(p => p.id === event.period);
                    return (
                      <div
                        key={event.id}
                        className="absolute group cursor-pointer animate-scale-in z-10"
                        style={{
                          left: `${event.coordinates.x}%`,
                          top: `${event.coordinates.y}%`,
                          transform: 'translate(-50%, -50%)',
                          animationDelay: `${index * 100}ms`
                        }}
                      >
                        <div className="relative">
                          <div className={`w-5 h-5 rounded-full ${period?.color} shadow-lg group-hover:scale-150 transition-transform duration-300 border-2 border-white`}>
                            <div className={`absolute inset-0 w-5 h-5 rounded-full ${period?.color} animate-ping opacity-75`}></div>
                          </div>
                        </div>
                        <div className="absolute left-8 top-0 bg-card border shadow-xl rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 max-w-sm">
                          {event.mapImage && (
                            <div className="relative h-32 overflow-hidden">
                              <img 
                                src={event.mapImage} 
                                alt={event.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            </div>
                          )}
                          <div className="p-4 space-y-2">
                            <Badge className={period?.color}>{Math.abs(event.year)} {event.year < 0 ? 'до н.э.' : 'н.э.'}</Badge>
                            <h4 className="font-heading font-bold text-lg">{event.title}</h4>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                            <p className="text-xs font-semibold text-primary">{period?.name}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredEvents.map((event) => {
                const period = historicalPeriods.find(p => p.id === event.period);
                return (
                  <Card key={event.id} className="hover:shadow-lg transition-all duration-300 overflow-hidden group relative">
                    {event.mapImage && (
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={event.mapImage} 
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <Badge className={`absolute top-3 right-3 ${period?.color}`}>
                          {Math.abs(event.year)} {event.year < 0 ? 'до н.э.' : 'н.э.'}
                        </Badge>
                      </div>
                    )}
                    <CardHeader className={event.mapImage ? 'pb-3' : ''}>
                      {!event.mapImage && (
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={period?.color}>
                            {Math.abs(event.year)} {event.year < 0 ? 'до н.э.' : 'н.э.'}
                          </Badge>
                          <Icon name="MapPin" className="text-primary" size={20} />
                        </div>
                      )}
                      <CardTitle className="font-heading text-lg">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">{period?.name}</Badge>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleImageUpload(event.id)}
                          className="gap-1"
                        >
                          <Icon name={event.mapImage ? "RefreshCw" : "Upload"} size={14} />
                          {event.mapImage ? 'Заменить' : 'Загрузить'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {activeView === 'periods' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-4xl font-heading font-bold mb-4">Исторические периоды</h2>
              <p className="text-muted-foreground">Изучай основные эпохи мировой истории</p>
            </div>

            <div className="space-y-6">
              {historicalPeriods.map((period, index) => {
                const periodEvents = mapEvents.filter(e => e.period === period.id);
                return (
                  <Card 
                    key={period.id}
                    className="hover:shadow-lg transition-all duration-300 animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className={`w-16 h-16 rounded-xl ${period.color} flex items-center justify-center shrink-0`}>
                          <Icon name="Calendar" className="text-white" size={32} />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="font-heading text-2xl mb-2">{period.name}</CardTitle>
                          <CardDescription className="text-lg font-semibold">{period.years}</CardDescription>
                          <p className="text-muted-foreground mt-2">{period.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <h4 className="font-heading font-semibold flex items-center gap-2">
                          <Icon name="MapPin" size={18} />
                          Ключевые события ({periodEvents.length})
                        </h4>
                        <div className="space-y-2">
                          {periodEvents.map((event) => (
                            <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                              <Badge variant="outline" className="shrink-0">
                                {Math.abs(event.year)} {event.year < 0 ? 'до н.э.' : 'н.э.'}
                              </Badge>
                              <div>
                                <p className="font-semibold">{event.title}</p>
                                <p className="text-sm text-muted-foreground">{event.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button 
                          onClick={() => {
                            setSelectedPeriod(period.id);
                            setActiveView('maps');
                          }}
                          className="w-full gap-2 mt-4"
                        >
                          <Icon name="Map" size={16} />
                          Показать на карте
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t mt-20 py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <Icon name="Map" size={18} />
            <span className="font-heading font-semibold">ИстоКарты</span> — интерактивное изучение истории
          </p>
        </div>
      </footer>

      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Загрузить историческую карту</DialogTitle>
            <DialogDescription>
              Выберите изображение карты для события. Рекомендуется использовать карты из открытых источников.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="map-upload">Файл изображения</Label>
              <Input 
                id="map-upload" 
                type="file" 
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p className="text-sm font-semibold flex items-center gap-2">
                <Icon name="Info" size={16} />
                Рекомендуемые источники:
              </p>
              <ul className="text-xs text-muted-foreground space-y-1 ml-6">
                <li>• Wikimedia Commons (commons.wikimedia.org)</li>
                <li>• Национальные архивы и библиотеки</li>
                <li>• Образовательные ресурсы с открытой лицензией</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>Отмена</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}