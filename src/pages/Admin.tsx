import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Loader2, Mail, Phone, Calendar, User, Settings, RefreshCw, Trash2, 
  Users, MessageSquare, Newspaper, Plus, Download, Pencil, ExternalLink, Globe, BarChart3
} from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { SEOHead } from '@/components/seo';

interface ContactSubmission {
  id: string; name: string; email: string; phone: string | null;
  message: string; status: string; created_at: string;
}

interface UserProfile {
  id: string; user_id: string; email: string | null;
  full_name: string | null; created_at: string;
}

interface NewsItem {
  id: string; title: string; slug: string; description: string | null;
  content: string; image_url: string | null; source_url: string | null;
  published: boolean; created_at: string;
}

type TabType = 'submissions' | 'users' | 'news';
const MESSENGER_SETTINGS_STORAGE_KEY = 'admin_messenger_settings_v1';

const AdminAnalyticsButton = () => {
  const navigate = useNavigate();
  return (
    <Button variant="outline" size="sm" onClick={() => navigate('/admin/analytics')} className="flex items-center gap-2">
      <BarChart3 className="w-4 h-4" />Статистика
    </Button>
  );
};

export default function Admin() {
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const siteBaseUrl = window.location.origin;
  
  const [activeTab, setActiveTab] = useState<TabType>('submissions');
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [newsForm, setNewsForm] = useState({ title: '', description: '', content: '', image_url: '' });
  const [showAddNews, setShowAddNews] = useState(false);
  const [counts, setCounts] = useState({ submissions: 0, users: 0, news: 0 });
  const [lastUpdatedAt, setLastUpdatedAt] = useState<string | null>(null);
  const [dataWarnings, setDataWarnings] = useState<string[]>([]);
  const [messengerLinks, setMessengerLinks] = useState({
    max: '',
    whatsapp: '',
    viber: '',
  });

  useEffect(() => {
    const raw = localStorage.getItem(MESSENGER_SETTINGS_STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as typeof messengerLinks;
      setMessengerLinks(parsed);
    } catch {
      // ignore broken local storage payload
    }
  }, []);

  useEffect(() => {
    if (!authLoading) {
      if (!user) { navigate('/auth'); return; }
      if (!isAdmin) {
        toast({ title: 'Доступ запрещён', description: 'У вас нет прав для просмотра этой страницы', variant: 'destructive' });
        navigate('/'); return;
      }
      fetchCounts();
      fetchData('submissions');
    }
  }, [user, isAdmin, authLoading, navigate, toast]);

  useEffect(() => {
    if (!isAdmin) return;

    if (activeTab === 'users' && users.length === 0) {
      fetchUsers();
      return;
    }

    if (activeTab === 'news' && news.length === 0) {
      fetchNews();
    }
  }, [activeTab, isAdmin, users.length, news.length]);

  const fetchData = async (tab: TabType = activeTab) => {
    setIsLoading(true);
    setDataWarnings([]);
    if (tab === 'submissions') {
      await fetchSubmissions();
    } else if (tab === 'users') {
      await fetchUsers();
    } else {
      await fetchNews();
    }
    await fetchCounts();
    setLastUpdatedAt(new Date().toISOString());
    setIsLoading(false);
  };

  const fetchCounts = async () => {
    const warnings: string[] = [];

    const [submissionsResult, usersResult, newsResult] = await Promise.all([
      supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('news').select('*', { count: 'exact', head: true }),
    ]);

    if (submissionsResult.error) warnings.push('Не удалось получить количество заявок.');
    if (usersResult.error) warnings.push('Не удалось получить количество пользователей.');
    if (newsResult.error) warnings.push('Не удалось получить количество новостей.');

    setCounts({
      submissions: submissionsResult.count ?? 0,
      users: usersResult.count ?? 0,
      news: newsResult.count ?? 0,
    });
    setDataWarnings(warnings);
  };

  const fetchSubmissions = async () => {
    const { data, error } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });
    if (error) { if (import.meta.env.DEV) console.error(error); toast({ title: 'Ошибка', description: 'Не удалось загрузить заявки', variant: 'destructive' }); }
    else setSubmissions(data || []);
  };

  const fetchUsers = async () => {
    const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    if (error) {
      toast({ title: 'Ошибка', description: 'Не удалось загрузить пользователей', variant: 'destructive' });
      return;
    }
    setUsers(data || []);
  };

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);
    if (error) {
      toast({ title: 'Ошибка', description: 'Не удалось загрузить новости', variant: 'destructive' });
      return;
    }
    setNews((data as NewsItem[]) || []);
  };

  const updateSubmissionStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('contact_submissions').update({ status }).eq('id', id);
    if (error) toast({ title: 'Ошибка', variant: 'destructive' });
    else { toast({ title: 'Статус обновлён' }); fetchSubmissions(); }
  };

  const deleteSubmission = async (id: string) => {
    const { error } = await supabase.from('contact_submissions').delete().eq('id', id);
    if (error) toast({ title: 'Ошибка', variant: 'destructive' });
    else { toast({ title: 'Заявка удалена' }); fetchSubmissions(); }
  };

  const importNews = async () => {
    setImporting(true);
    try {
      const { data, error } = await supabase.functions.invoke('import-news');
      if (error) throw error;
      toast({ title: 'Импорт завершён', description: `Импортировано: ${data?.imported || 0}, Пропущено: ${data?.skipped || 0}` });
      fetchNews();
    } catch (err) {
      toast({ title: 'Ошибка импорта', description: String(err), variant: 'destructive' });
    }
    setImporting(false);
  };

  const deleteNews = async (id: string) => {
    const { error } = await supabase.from('news').delete().eq('id', id);
    if (error) toast({ title: 'Ошибка', variant: 'destructive' });
    else { toast({ title: 'Новость удалена' }); fetchNews(); }
  };

  const toggleNewsPublished = async (id: string, published: boolean) => {
    const { error } = await supabase.from('news').update({ published: !published }).eq('id', id);
    if (!error) fetchNews();
  };

  const saveNews = async () => {
    if (editingNews) {
      const { error } = await supabase.from('news').update({
        title: newsForm.title, description: newsForm.description,
        content: newsForm.content, image_url: newsForm.image_url || null,
      }).eq('id', editingNews.id);
      if (!error) { toast({ title: 'Сохранено' }); setEditingNews(null); fetchNews(); }
    }
  };

  const addNews = async () => {
    const slug = newsForm.title.toLowerCase().replace(/[^a-zа-яё0-9]+/gi, '-').slice(0, 80) + '-' + Date.now().toString(36);
    const { error } = await supabase.from('news').insert({
      title: newsForm.title, slug, description: newsForm.description,
      content: newsForm.content, image_url: newsForm.image_url || null, published: true,
    });
    if (!error) { toast({ title: 'Новость добавлена' }); setShowAddNews(false); setNewsForm({ title: '', description: '', content: '', image_url: '' }); fetchNews(); }
    else toast({ title: 'Ошибка', description: error.message, variant: 'destructive' });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new': return <Badge className="bg-primary/20 text-primary border-primary/30">Новая</Badge>;
      case 'in_progress': return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">В работе</Badge>;
      case 'completed': return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Завершена</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const saveMessengerLinks = () => {
    localStorage.setItem(MESSENGER_SETTINGS_STORAGE_KEY, JSON.stringify(messengerLinks));
    toast({ title: 'Сохранено', description: 'Ссылки мессенджеров обновлены.' });
  };

  if (authLoading || isLoading) {
    return (<Layout><div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div></Layout>);
  }

  const newsFormDialog = (
    <div className="space-y-4">
      <Input placeholder="Заголовок" value={newsForm.title} onChange={e => setNewsForm(f => ({ ...f, title: e.target.value }))} />
      <Input placeholder="URL изображения" value={newsForm.image_url} onChange={e => setNewsForm(f => ({ ...f, image_url: e.target.value }))} />
      <Textarea placeholder="Краткое описание" value={newsForm.description} onChange={e => setNewsForm(f => ({ ...f, description: e.target.value }))} rows={3} />
      <Textarea placeholder="Полный текст (HTML)" value={newsForm.content} onChange={e => setNewsForm(f => ({ ...f, content: e.target.value }))} rows={8} />
    </div>
  );

  return (
    <Layout>
      <SEOHead
        title="Панель администратора | Центр Притяжения"
        description="Служебная страница администрирования заявок и новостей."
        canonical="/admin"
        noindex
      />
      <section className="pt-32 pb-20 min-h-screen">
        <div className="container-custom">
          <AnimatedSection animation="fadeUp">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <Settings className="w-8 h-8 text-primary" />
                  Панель администратора
                </h1>
                <p className="text-muted-foreground mt-1">Управление заявками, пользователями и новостями</p>
              </div>
              <Button onClick={() => fetchData()} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />Обновить
              </Button>
              <AdminAnalyticsButton />
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeUp" delay={0.05}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />Заявки
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">{counts.submissions}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                    <Users className="w-4 h-4" />Пользователи
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">{counts.users}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                    <Newspaper className="w-4 h-4" />Новости
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">{counts.news}</p>
                </CardContent>
              </Card>
            </div>
            {(lastUpdatedAt || dataWarnings.length > 0) && (
              <div className="mb-6 text-sm text-muted-foreground">
                {lastUpdatedAt && <p>Последнее обновление: {format(new Date(lastUpdatedAt), 'dd.MM.yyyy HH:mm')}</p>}
                {dataWarnings.length > 0 && (
                  <ul className="list-disc pl-5 mt-1 text-amber-500">
                    {dataWarnings.map((warning) => <li key={warning}>{warning}</li>)}
                  </ul>
                )}
              </div>
            )}
          </AnimatedSection>

          <AnimatedSection animation="fadeUp" delay={0.1}>
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Связь в мессенджерах</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Укажите ссылки для кнопок связи (Max, WhatsApp, Viber). Можно вставлять `https://`, `wa.me`, `viber://` и т.п.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input
                    placeholder="Max (ссылка)"
                    value={messengerLinks.max}
                    onChange={(e) => setMessengerLinks((prev) => ({ ...prev, max: e.target.value }))}
                  />
                  <Input
                    placeholder="WhatsApp (ссылка)"
                    value={messengerLinks.whatsapp}
                    onChange={(e) => setMessengerLinks((prev) => ({ ...prev, whatsapp: e.target.value }))}
                  />
                  <Input
                    placeholder="Viber (ссылка)"
                    value={messengerLinks.viber}
                    onChange={(e) => setMessengerLinks((prev) => ({ ...prev, viber: e.target.value }))}
                  />
                </div>
                <Button size="sm" onClick={saveMessengerLinks}>Сохранить мессенджеры</Button>
              </CardContent>
            </Card>

            <div className="flex gap-2 mb-6 flex-wrap">
              <Button variant={activeTab === 'submissions' ? 'default' : 'outline'} onClick={() => setActiveTab('submissions')} className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />Заявки ({counts.submissions})
              </Button>
              <Button variant={activeTab === 'users' ? 'default' : 'outline'} onClick={() => setActiveTab('users')} className="flex items-center gap-2">
                <Users className="w-4 h-4" />Пользователи ({counts.users})
              </Button>
              <Button variant={activeTab === 'news' ? 'default' : 'outline'} onClick={() => setActiveTab('news')} className="flex items-center gap-2">
                <Newspaper className="w-4 h-4" />Новости ({counts.news})
              </Button>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeUp" delay={0.2}>
            {activeTab === 'submissions' && (
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                {submissions.length === 0 ? (
                  <div className="p-12 text-center"><MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" /><p className="text-muted-foreground">Заявок пока нет</p></div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader><TableRow>
                        <TableHead>Дата</TableHead><TableHead>Имя</TableHead><TableHead>Контакты</TableHead>
                        <TableHead>Сообщение</TableHead><TableHead>Статус</TableHead><TableHead className="text-right">Действия</TableHead>
                      </TableRow></TableHeader>
                      <TableBody>
                        {submissions.map(s => (
                          <TableRow key={s.id}>
                            <TableCell className="whitespace-nowrap"><div className="flex items-center gap-2 text-sm"><Calendar className="w-4 h-4 text-muted-foreground" />{format(new Date(s.created_at), 'dd MMM yyyy, HH:mm', { locale: ru })}</div></TableCell>
                            <TableCell><div className="flex items-center gap-2"><User className="w-4 h-4 text-muted-foreground" />{s.name}</div></TableCell>
                            <TableCell><div className="space-y-1"><div className="flex items-center gap-2 text-sm"><Mail className="w-3 h-3 text-muted-foreground" />{s.email}</div>{s.phone && <div className="flex items-center gap-2 text-sm"><Phone className="w-3 h-3 text-muted-foreground" />{s.phone}</div>}</div></TableCell>
                            <TableCell className="max-w-xs"><p className="truncate text-sm">{s.message}</p></TableCell>
                            <TableCell>
                              <Select value={s.status} onValueChange={v => updateSubmissionStatus(s.id, v)}>
                                <SelectTrigger className="w-32"><SelectValue>{getStatusBadge(s.status)}</SelectValue></SelectTrigger>
                                <SelectContent><SelectItem value="new">Новая</SelectItem><SelectItem value="in_progress">В работе</SelectItem><SelectItem value="completed">Завершена</SelectItem></SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell className="text-right"><Button variant="ghost" size="sm" onClick={() => deleteSubmission(s.id)} className="text-destructive hover:text-destructive hover:bg-destructive/10"><Trash2 className="w-4 h-4" /></Button></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'users' && (
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                {users.length === 0 ? (
                  <div className="p-12 text-center"><Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" /><p className="text-muted-foreground">Пользователей пока нет</p></div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader><TableRow><TableHead>Дата регистрации</TableHead><TableHead>Имя</TableHead><TableHead>Email</TableHead></TableRow></TableHeader>
                      <TableBody>
                        {users.map(p => (
                          <TableRow key={p.id}>
                            <TableCell className="whitespace-nowrap"><div className="flex items-center gap-2 text-sm"><Calendar className="w-4 h-4 text-muted-foreground" />{format(new Date(p.created_at), 'dd MMM yyyy, HH:mm', { locale: ru })}</div></TableCell>
                            <TableCell><div className="flex items-center gap-2"><User className="w-4 h-4 text-muted-foreground" />{p.full_name || '—'}</div></TableCell>
                            <TableCell><div className="flex items-center gap-2"><Mail className="w-4 h-4 text-muted-foreground" />{p.email || '—'}</div></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'news' && (
              <div>
                {/* SEO Links */}
                <div className="bg-card rounded-xl border border-border p-4 mb-4">
                  <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
                    <Globe className="w-4 h-4 text-primary" />
                    SEO и индексация
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={`${siteBaseUrl}/sitemap.xml`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3 mr-2" />Sitemap.xml
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={`${siteBaseUrl}/turbo-sitemap.xml`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3 mr-2" />Турбо-страницы (RSS)
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2 mb-4">
                  <Button onClick={importNews} disabled={importing} variant="outline">
                    {importing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                    {importing ? 'Импортирую...' : 'Импорт из PortNews'}
                  </Button>
                  <Dialog open={showAddNews} onOpenChange={setShowAddNews}>
                    <DialogTrigger asChild>
                      <Button onClick={() => setNewsForm({ title: '', description: '', content: '', image_url: '' })}>
                        <Plus className="w-4 h-4 mr-2" />Добавить вручную
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader><DialogTitle>Добавить новость</DialogTitle></DialogHeader>
                      {newsFormDialog}
                      <Button onClick={addNews} disabled={!newsForm.title || !newsForm.content}>Добавить</Button>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  {news.length === 0 ? (
                    <div className="p-12 text-center"><Newspaper className="w-12 h-12 text-muted-foreground mx-auto mb-4" /><p className="text-muted-foreground">Новостей пока нет. Нажмите «Импорт из PortNews» для загрузки.</p></div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader><TableRow>
                          <TableHead>Дата</TableHead><TableHead>Заголовок</TableHead><TableHead>Статус</TableHead><TableHead className="text-right">Действия</TableHead>
                        </TableRow></TableHeader>
                        <TableBody>
                          {news.map(n => (
                            <TableRow key={n.id}>
                              <TableCell className="whitespace-nowrap text-sm">{format(new Date(n.created_at), 'dd.MM.yyyy HH:mm', { locale: ru })}</TableCell>
                              <TableCell className="max-w-sm"><p className="truncate font-medium">{n.title}</p>{n.source_url && <span className="text-xs text-muted-foreground">Источник: PortNews</span>}</TableCell>
                              <TableCell>
                                <Badge className={n.published ? "bg-green-500/20 text-green-500" : "bg-muted text-muted-foreground"} onClick={() => toggleNewsPublished(n.id, n.published)} style={{ cursor: 'pointer' }}>
                                  {n.published ? 'Опубликована' : 'Скрыта'}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right flex gap-1 justify-end">
                                <Dialog open={editingNews?.id === n.id} onOpenChange={open => { if (!open) setEditingNews(null); }}>
                                  <DialogTrigger asChild>
                                    <Button variant="ghost" size="sm" onClick={() => { setEditingNews(n); setNewsForm({ title: n.title, description: n.description || '', content: n.content, image_url: n.image_url || '' }); }}>
                                      <Pencil className="w-4 h-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl">
                                    <DialogHeader><DialogTitle>Редактировать новость</DialogTitle></DialogHeader>
                                    {newsFormDialog}
                                    <Button onClick={saveNews}>Сохранить</Button>
                                  </DialogContent>
                                </Dialog>
                                <Button variant="ghost" size="sm" onClick={() => deleteNews(n.id)} className="text-destructive hover:text-destructive hover:bg-destructive/10"><Trash2 className="w-4 h-4" /></Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}
