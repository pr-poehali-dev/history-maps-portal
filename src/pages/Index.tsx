import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface HistoricalPeriod {
  id: string;
  name: string;
  years: string;
  color: string;
  description: string;
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
}

const historicalPeriods: HistoricalPeriod[] = [
  {
    id: 'ancient',
    name: 'Древний мир',
    years: 'до V в. н.э.',
    color: 'bg-primary',
    description: 'От первобытности до падения Римской империи'
  },
  {
    id: 'medieval',
    name: 'Средневековье',
    years: 'V-XV вв.',
    color: 'bg-secondary',
    description: 'Эпоха рыцарей, замков и крестовых походов'
  },
  {
    id: 'modern',
    name: 'Новое время',
    years: 'XVI-XIX вв.',
    color: 'bg-accent',
    description: 'Великие географические открытия и промышленная революция'
  },
  {
    id: 'contemporary',
    name: 'Новейшая история',
    years: 'XX-XXI вв.',
    color: 'bg-destructive',
    description: 'Мировые войны и современная цивилизация'
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
    year: -753,
    title: 'Основание Рима',
    description: 'Легендарное основание города Рима братьями Ромулом и Рэмом',
    coordinates: { x: 50, y: 45 },
    period: 'ancient'
  },
  {
    id: '2',
    year: -490,
    title: 'Марафонская битва',
    description: 'Решающее сражение греко-персидских войн',
    coordinates: { x: 65, y: 42 },
    period: 'ancient'
  },
  {
    id: '3',
    year: 1066,
    title: 'Битва при Гастингсе',
    description: 'Нормандское завоевание Англии',
    coordinates: { x: 38, y: 28 },
    period: 'medieval'
  },
  {
    id: '4',
    year: 1453,
    title: 'Падение Константинополя',
    description: 'Конец Византийской империи',
    coordinates: { x: 72, y: 48 },
    period: 'medieval'
  },
  {
    id: '5',
    year: 1492,
    title: 'Открытие Америки',
    description: 'Христофор Колумб достиг берегов Нового Света',
    coordinates: { x: 15, y: 55 },
    period: 'modern'
  },
  {
    id: '6',
    year: 1789,
    title: 'Великая французская революция',
    description: 'Начало эпохи революций в Европе',
    coordinates: { x: 45, y: 35 },
    period: 'modern'
  },
  {
    id: '7',
    year: 1945,
    title: 'Окончание Второй мировой войны',
    description: 'Победа над фашизмом',
    coordinates: { x: 55, y: 30 },
    period: 'contemporary'
  },
  {
    id: '8',
    year: 1961,
    title: 'Первый полет человека в космос',
    description: 'Юрий Гагарин совершил исторический полет',
    coordinates: { x: 80, y: 25 },
    period: 'contemporary'
  }
];

export default function Index() {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');
  const [activeView, setActiveView] = useState<'home' | 'grades' | 'maps' | 'periods'>('home');

  const filteredEvents = mapEvents.filter(event => 
    selectedPeriod === 'all' || event.period === selectedPeriod
  );

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
                <div className="relative w-full h-[600px] bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
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

                  {filteredEvents.map((event, index) => {
                    const period = historicalPeriods.find(p => p.id === event.period);
                    return (
                      <div
                        key={event.id}
                        className="absolute group cursor-pointer animate-scale-in"
                        style={{
                          left: `${event.coordinates.x}%`,
                          top: `${event.coordinates.y}%`,
                          transform: 'translate(-50%, -50%)',
                          animationDelay: `${index * 100}ms`
                        }}
                      >
                        <div className={`w-4 h-4 rounded-full ${period?.color} shadow-lg group-hover:scale-150 transition-transform duration-300`}>
                          <div className={`w-4 h-4 rounded-full ${period?.color} animate-ping opacity-75`}></div>
                        </div>
                        <div className="absolute left-6 top-0 bg-card border shadow-xl rounded-lg p-4 min-w-[280px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                          <div className="space-y-2">
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

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredEvents.map((event) => {
                const period = historicalPeriods.find(p => p.id === event.period);
                return (
                  <Card key={event.id} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={period?.color}>
                          {Math.abs(event.year)} {event.year < 0 ? 'до н.э.' : 'н.э.'}
                        </Badge>
                        <Icon name="MapPin" className="text-primary" size={20} />
                      </div>
                      <CardTitle className="font-heading text-lg">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                      <Badge variant="outline" className="text-xs">{period?.name}</Badge>
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
    </div>
  );
}