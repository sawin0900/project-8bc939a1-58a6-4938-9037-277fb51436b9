import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Loader2, 
  Mail, 
  Phone, 
  Calendar, 
  User, 
  Settings,
  RefreshCw,
  Trash2,
  Users,
  MessageSquare
} from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  created_at: string;
}

interface UserProfile {
  id: string;
  user_id: string;
  email: string | null;
  full_name: string | null;
  created_at: string;
}

type TabType = 'submissions' | 'users';

export default function Admin() {
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState<TabType>('submissions');
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate('/auth');
        return;
      }
      if (!isAdmin) {
        toast({
          title: 'Доступ запрещён',
          description: 'У вас нет прав для просмотра этой страницы',
          variant: 'destructive',
        });
        navigate('/');
        return;
      }
      fetchData();
    }
  }, [user, isAdmin, authLoading, navigate]);

  const fetchData = async () => {
    setIsLoading(true);
    await Promise.all([fetchSubmissions(), fetchUsers()]);
    setIsLoading(false);
  };

  const fetchSubmissions = async () => {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      if (import.meta.env.DEV) {
        console.error('Error fetching submissions:', error);
      }
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить заявки',
        variant: 'destructive',
      });
    } else {
      setSubmissions(data || []);
    }
  };

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      if (import.meta.env.DEV) {
        console.error('Error fetching users:', error);
      }
    } else {
      setUsers(data || []);
    }
  };

  const updateSubmissionStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('contact_submissions')
      .update({ status })
      .eq('id', id);

    if (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось обновить статус',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Успешно',
        description: 'Статус обновлён',
      });
      fetchSubmissions();
    }
  };

  const deleteSubmission = async (id: string) => {
    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить заявку',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Успешно',
        description: 'Заявка удалена',
      });
      fetchSubmissions();
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-primary/20 text-primary border-primary/30">Новая</Badge>;
      case 'in_progress':
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">В работе</Badge>;
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Завершена</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
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
                <p className="text-muted-foreground mt-1">Управление заявками и пользователями</p>
              </div>
              <Button onClick={fetchData} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Обновить
              </Button>
            </div>
          </AnimatedSection>

          {/* Tabs */}
          <AnimatedSection animation="fadeUp" delay={0.1}>
            <div className="flex gap-2 mb-6">
              <Button
                variant={activeTab === 'submissions' ? 'default' : 'outline'}
                onClick={() => setActiveTab('submissions')}
                className="flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Заявки ({submissions.length})
              </Button>
              <Button
                variant={activeTab === 'users' ? 'default' : 'outline'}
                onClick={() => setActiveTab('users')}
                className="flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Пользователи ({users.length})
              </Button>
            </div>
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection animation="fadeUp" delay={0.2}>
            {activeTab === 'submissions' && (
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                {submissions.length === 0 ? (
                  <div className="p-12 text-center">
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Заявок пока нет</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Дата</TableHead>
                          <TableHead>Имя</TableHead>
                          <TableHead>Контакты</TableHead>
                          <TableHead>Сообщение</TableHead>
                          <TableHead>Статус</TableHead>
                          <TableHead className="text-right">Действия</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {submissions.map((submission) => (
                          <TableRow key={submission.id}>
                            <TableCell className="whitespace-nowrap">
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                {format(new Date(submission.created_at), 'dd MMM yyyy, HH:mm', { locale: ru })}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-muted-foreground" />
                                {submission.name}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm">
                                  <Mail className="w-3 h-3 text-muted-foreground" />
                                  {submission.email}
                                </div>
                                {submission.phone && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <Phone className="w-3 h-3 text-muted-foreground" />
                                    {submission.phone}
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="max-w-xs">
                              <p className="truncate text-sm">{submission.message}</p>
                            </TableCell>
                            <TableCell>
                              <Select
                                value={submission.status}
                                onValueChange={(value) => updateSubmissionStatus(submission.id, value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue>{getStatusBadge(submission.status)}</SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="new">Новая</SelectItem>
                                  <SelectItem value="in_progress">В работе</SelectItem>
                                  <SelectItem value="completed">Завершена</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteSubmission(submission.id)}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </TableCell>
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
                  <div className="p-12 text-center">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Пользователей пока нет</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Дата регистрации</TableHead>
                          <TableHead>Имя</TableHead>
                          <TableHead>Email</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((profile) => (
                          <TableRow key={profile.id}>
                            <TableCell className="whitespace-nowrap">
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                {format(new Date(profile.created_at), 'dd MMM yyyy, HH:mm', { locale: ru })}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-muted-foreground" />
                                {profile.full_name || '—'}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-muted-foreground" />
                                {profile.email || '—'}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}
