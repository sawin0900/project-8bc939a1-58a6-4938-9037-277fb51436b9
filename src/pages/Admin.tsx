import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  Users, MessageSquare, Newspaper, Plus, Download, Pencil
} from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

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

export default function Admin() {
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState<TabType>('submissions');
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [newsForm, setNewsForm] = useState({ title: '', description: '', content: '', image_url: '' });
  const [showAddNews, setShowAddNews] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (!user) { navigate('/auth'); return; }
      if (!isAdmin) {
        toast({ title: 'Доступ запрещён', description: 'У вас нет прав для просмотра этой страницы', variant: 'destructive' });
        navigate('/'); return;
      }
      fetchData();
    }
  }, [user, isAdmin, authLoading, navigate]);

  const fetchData = async () => {
    setIsLoading(true);
    await Promise.all([fetchSubmissions(), fetchUsers(), fetchNews()]);
    setIsLoading(false);
  };

  const fetchSubmissions = async () => {
    const { data, error } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });
    if (error) { if (import.meta.env.DEV) console.error(error); toast({ title: 'Ошибка', description: 'Не удалось загрузить заявки', variant: 'destructive' }); }
    else setSubmissions(data || []);
  };

  const fetchUsers = async () => {
    const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    if (!error) setUsers(data || []);
  };

  const fetchNews = async () => {
    const { data, error } = await supabase.from('news').select('*').order('created_at', { ascending: false });
    if (!error) setNews(data || []);
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
              <Button onClick={fetchData} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />Обновить
              </Button>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeUp" delay={0.1}>
            <div className="flex gap-2 mb-6">
              <Button variant={activeTab === 'submissions' ? 'default' : 'outline'} onClick={() => setActiveTab('submissions')} className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />Заявки ({submissions.length})
              </Button>
              <Button variant={activeTab === 'users' ? 'default' : 'outline'} onClick={() => setActiveTab('users')} className="flex items-center gap-2">
                <Users className="w-4 h-4" />Пользователи ({users.length})
              </Button>
              <Button variant={activeTab === 'news' ? 'default' : 'outline'} onClick={() => setActiveTab('news')} className="flex items-center gap-2">
                <Newspaper className="w-4 h-4" />Новости ({news.length})
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
