import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Loader2, ArrowLeft, Users, Eye, Clock, Monitor, Globe, TrendingUp,
  Download, RefreshCw, Wifi,
} from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { format, subDays, startOfDay, isToday, isYesterday } from 'date-fns';
import { ru } from 'date-fns/locale';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from 'recharts';

interface PageVisit {
  id: string;
  session_id: string;
  visitor_id: string;
  page_path: string;
  referrer: string | null;
  user_agent: string | null;
  ip_address: string | null;
  device_type: string | null;
  browser: string | null;
  os: string | null;
  screen_width: number | null;
  screen_height: number | null;
  duration_seconds: number | null;
  created_at: string;
}

const CHART_COLORS = [
  'hsl(var(--primary))',
  'hsl(210, 70%, 55%)',
  'hsl(150, 60%, 45%)',
  'hsl(35, 80%, 55%)',
  'hsl(0, 65%, 55%)',
  'hsl(270, 60%, 55%)',
  'hsl(180, 50%, 45%)',
  'hsl(60, 70%, 50%)',
];

export default function AdminAnalytics() {
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [visits, setVisits] = useState<PageVisit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    if (!authLoading) {
      if (!user) { navigate('/auth'); return; }
      if (!isAdmin) { navigate('/'); return; }
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) fetchVisits();
  }, [isAdmin, dateRange, dateFrom, dateTo]);

  const fetchVisits = async () => {
    setIsLoading(true);
    let query = supabase
      .from('page_visits')
      .select('*')
      .order('created_at', { ascending: false });

    if (dateFrom && dateTo) {
      query = query.gte('created_at', dateFrom).lte('created_at', dateTo + 'T23:59:59');
    } else if (dateRange !== 'all') {
      const days = parseInt(dateRange);
      const since = subDays(new Date(), days).toISOString();
      query = query.gte('created_at', since);
    }

    query = query.limit(1000);

    const { data, error } = await query;
    if (error) {
      toast({ title: 'Ошибка загрузки', variant: 'destructive' });
    } else {
      setVisits(data || []);
    }
    setIsLoading(false);
  };

  // Computed stats
  const stats = useMemo(() => {
    const now = new Date();
    const todayStart = startOfDay(now);
    const yesterdayStart = startOfDay(subDays(now, 1));
    const week = subDays(now, 7);
    const month = subDays(now, 30);

    const uniqueVisitors = (arr: PageVisit[]) => new Set(arr.map(v => v.visitor_id)).size;
    const allData = visits;
    const todayData = allData.filter(v => new Date(v.created_at) >= todayStart);
    const yesterdayData = allData.filter(v => {
      const d = new Date(v.created_at);
      return d >= yesterdayStart && d < todayStart;
    });
    const weekData = allData.filter(v => new Date(v.created_at) >= week);
    const monthData = allData.filter(v => new Date(v.created_at) >= month);

    // Online: visitors active in last 5 minutes
    const fiveMinAgo = new Date(now.getTime() - 5 * 60 * 1000);
    const onlineVisits = allData.filter(v => new Date(v.created_at) >= fiveMinAgo);
    const onlineCount = new Set(onlineVisits.map(v => v.visitor_id)).size;

    return {
      total: uniqueVisitors(allData),
      today: uniqueVisitors(todayData),
      yesterday: uniqueVisitors(yesterdayData),
      week: uniqueVisitors(weekData),
      month: uniqueVisitors(monthData),
      totalViews: allData.length,
      online: onlineCount,
      onlinePages: [...new Set(onlineVisits.map(v => v.page_path))],
    };
  }, [visits]);

  // Chart: daily visits
  const dailyChart = useMemo(() => {
    const map: Record<string, Set<string>> = {};
    visits.forEach(v => {
      const day = format(new Date(v.created_at), 'yyyy-MM-dd');
      if (!map[day]) map[day] = new Set();
      map[day].add(v.visitor_id);
    });
    return Object.entries(map)
      .map(([date, set]) => ({ date: format(new Date(date), 'dd.MM', { locale: ru }), visitors: set.size }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [visits]);

  // Top pages
  const topPages = useMemo(() => {
    const map: Record<string, { views: number; totalDuration: number }> = {};
    visits.forEach(v => {
      if (!map[v.page_path]) map[v.page_path] = { views: 0, totalDuration: 0 };
      map[v.page_path].views++;
      map[v.page_path].totalDuration += v.duration_seconds || 0;
    });
    return Object.entries(map)
      .map(([path, d]) => ({ path, ...d, avgDuration: Math.round(d.totalDuration / d.views) }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 15);
  }, [visits]);

  // Devices
  const devices = useMemo(() => {
    const map: Record<string, number> = {};
    visits.forEach(v => { const d = v.device_type || 'unknown'; map[d] = (map[d] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [visits]);

  // Browsers
  const browsers = useMemo(() => {
    const map: Record<string, number> = {};
    visits.forEach(v => { const b = v.browser || 'unknown'; map[b] = (map[b] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [visits]);

  // OS
  const osList = useMemo(() => {
    const map: Record<string, number> = {};
    visits.forEach(v => { const o = v.os || 'unknown'; map[o] = (map[o] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [visits]);

  // Referrers
  const referrers = useMemo(() => {
    const map: Record<string, number> = {};
    visits.forEach(v => {
      let source = 'Прямой заход';
      if (v.referrer) {
        try {
          const host = new URL(v.referrer).hostname;
          if (host.includes('google')) source = 'Google';
          else if (host.includes('yandex')) source = 'Яндекс';
          else if (host.includes('t.me') || host.includes('telegram')) source = 'Telegram';
          else if (host.includes('vk.com')) source = 'VK';
          else source = host;
        } catch { source = v.referrer.slice(0, 50); }
      }
      map[source] = (map[source] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [visits]);

  // Export CSV
  const exportCSV = () => {
    const headers = ['Дата', 'Страница', 'IP', 'Устройство', 'Браузер', 'ОС', 'Источник', 'Время на стр. (сек)'];
    const rows = visits.map(v => [
      format(new Date(v.created_at), 'dd.MM.yyyy HH:mm'),
      v.page_path,
      v.ip_address || '',
      v.device_type || '',
      v.browser || '',
      v.os || '',
      v.referrer || 'Прямой',
      String(v.duration_seconds || 0),
    ]);
    const bom = '\uFEFF';
    const csv = bom + [headers, ...rows].map(r => r.map(c => `"${c}"`).join(';')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (authLoading || isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  const formatDuration = (s: number) => {
    if (s < 60) return `${s} сек`;
    return `${Math.floor(s / 60)} мин ${s % 60} сек`;
  };

  return (
    <Layout>
      <section className="pt-32 pb-20 min-h-screen">
        <div className="container-custom">
          <AnimatedSection animation="fadeUp">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={() => navigate('/admin')}>
                  <ArrowLeft className="w-4 h-4 mr-2" />Назад
                </Button>
                <div>
                  <h1 className="text-3xl font-bold flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-primary" />
                    Статистика и аналитика
                  </h1>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={fetchVisits} variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />Обновить
                </Button>
                <Button onClick={exportCSV} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />Экспорт CSV
                </Button>
              </div>
            </div>
          </AnimatedSection>

          {/* Filters */}
          <AnimatedSection animation="fadeUp" delay={0.05}>
            <div className="flex flex-wrap gap-3 mb-6 items-end">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Период</label>
                <Select value={dateRange} onValueChange={v => { setDateRange(v); setDateFrom(''); setDateTo(''); }}>
                  <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Сегодня</SelectItem>
                    <SelectItem value="2">Вчера</SelectItem>
                    <SelectItem value="7">7 дней</SelectItem>
                    <SelectItem value="30">30 дней</SelectItem>
                    <SelectItem value="90">90 дней</SelectItem>
                    <SelectItem value="all">Всё время</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">От</label>
                <Input type="date" value={dateFrom} onChange={e => { setDateFrom(e.target.value); setDateRange('custom'); }} className="w-40" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">До</label>
                <Input type="date" value={dateTo} onChange={e => { setDateTo(e.target.value); setDateRange('custom'); }} className="w-40" />
              </div>
            </div>
          </AnimatedSection>

          {/* Summary Cards */}
          <AnimatedSection animation="fadeUp" delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
              {[
                { label: 'Онлайн', value: stats.online, icon: Wifi, accent: true },
                { label: 'Сегодня', value: stats.today, icon: Users },
                { label: 'Вчера', value: stats.yesterday, icon: Users },
                { label: '7 дней', value: stats.week, icon: Users },
                { label: '30 дней', value: stats.month, icon: Users },
                { label: 'Всего', value: stats.total, icon: Users },
                { label: 'Просмотров', value: stats.totalViews, icon: Eye },
              ].map((s, i) => (
                <Card key={i} className={`p-4 text-center ${s.accent ? 'border-primary bg-primary/5' : ''}`}>
                  <s.icon className={`w-5 h-5 mx-auto mb-1 ${s.accent ? 'text-primary' : 'text-muted-foreground'}`} />
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </Card>
              ))}
            </div>
          </AnimatedSection>

          {/* Online now */}
          {stats.online > 0 && (
            <AnimatedSection animation="fadeUp" delay={0.12}>
              <Card className="p-4 mb-8 border-primary/30">
                <h3 className="text-sm font-semibold flex items-center gap-2 mb-2">
                  <Wifi className="w-4 h-4 text-primary animate-pulse" />
                  Сейчас на сайте ({stats.online})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {stats.onlinePages.map((p, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{p}</span>
                  ))}
                </div>
              </Card>
            </AnimatedSection>
          )}

          {/* Daily Chart */}
          <AnimatedSection animation="fadeUp" delay={0.15}>
            <Card className="p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Посещаемость по дням
              </h3>
              {dailyChart.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dailyChart}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" fontSize={12} stroke="hsl(var(--muted-foreground))" />
                    <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                    <Line type="monotone" dataKey="visitors" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} name="Посетители" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-muted-foreground text-center py-8">Нет данных</p>
              )}
            </Card>
          </AnimatedSection>

          {/* Charts Row */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Devices */}
            <AnimatedSection animation="fadeUp" delay={0.2}>
              <Card className="p-6">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-primary" />Устройства
                </h3>
                {devices.length > 0 ? (
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={devices} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} fontSize={11}>
                        {devices.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : <p className="text-muted-foreground text-center py-4">—</p>}
              </Card>
            </AnimatedSection>

            {/* Browsers */}
            <AnimatedSection animation="fadeUp" delay={0.25}>
              <Card className="p-6">
                <h3 className="text-sm font-semibold mb-4">Браузеры</h3>
                <div className="space-y-2">
                  {browsers.slice(0, 6).map((b, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span>{b.name}</span>
                      <span className="text-muted-foreground">{b.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </AnimatedSection>

            {/* OS */}
            <AnimatedSection animation="fadeUp" delay={0.3}>
              <Card className="p-6">
                <h3 className="text-sm font-semibold mb-4">Операционные системы</h3>
                <div className="space-y-2">
                  {osList.slice(0, 6).map((o, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span>{o.name}</span>
                      <span className="text-muted-foreground">{o.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </AnimatedSection>
          </div>

          {/* Referrers + Top Pages */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <AnimatedSection animation="fadeUp" delay={0.35}>
              <Card className="p-6">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" />Источники переходов
                </h3>
                {referrers.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={referrers.slice(0, 8)} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" fontSize={12} stroke="hsl(var(--muted-foreground))" />
                      <YAxis dataKey="name" type="category" width={120} fontSize={11} stroke="hsl(var(--muted-foreground))" />
                      <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                      <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="Визиты" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : <p className="text-muted-foreground text-center py-4">—</p>}
              </Card>
            </AnimatedSection>

            <AnimatedSection animation="fadeUp" delay={0.4}>
              <Card className="p-6">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-primary" />Популярные страницы
                </h3>
                <div className="space-y-2 max-h-[250px] overflow-y-auto">
                  {topPages.map((p, i) => (
                    <div key={i} className="flex items-center justify-between text-sm gap-2">
                      <span className="truncate flex-1 font-mono text-xs">{p.path}</span>
                      <span className="text-muted-foreground whitespace-nowrap">{p.views} · {formatDuration(p.avgDuration)}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </AnimatedSection>
          </div>

          {/* Recent Visits Table */}
          <AnimatedSection animation="fadeUp" delay={0.45}>
            <Card className="overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  Последние посещения
                </h3>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Дата</TableHead>
                      <TableHead>Страница</TableHead>
                      <TableHead>IP</TableHead>
                      <TableHead>Устройство</TableHead>
                      <TableHead>Браузер</TableHead>
                      <TableHead>ОС</TableHead>
                      <TableHead>Источник</TableHead>
                      <TableHead>Время</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visits.slice(0, 50).map(v => (
                      <TableRow key={v.id}>
                        <TableCell className="whitespace-nowrap text-xs">
                          {format(new Date(v.created_at), 'dd.MM.yy HH:mm', { locale: ru })}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate text-xs font-mono">{v.page_path}</TableCell>
                        <TableCell className="text-xs">{v.ip_address || '—'}</TableCell>
                        <TableCell className="text-xs capitalize">{v.device_type || '—'}</TableCell>
                        <TableCell className="text-xs">{v.browser || '—'}</TableCell>
                        <TableCell className="text-xs">{v.os || '—'}</TableCell>
                        <TableCell className="text-xs max-w-[150px] truncate">
                          {v.referrer ? (() => { try { return new URL(v.referrer).hostname; } catch { return v.referrer.slice(0, 30); } })() : 'Прямой'}
                        </TableCell>
                        <TableCell className="text-xs whitespace-nowrap">{formatDuration(v.duration_seconds || 0)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}
