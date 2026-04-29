import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export type AdPosition = 'top' | 'sidebar' | 'bottom';
export type AdType = 'image' | 'html';

export interface AdBanner {
  id: string;
  title: string;
  ad_type: AdType;
  image_url: string | null;
  link_url: string | null;
  html_code: string | null;
  position: AdPosition;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean;
  priority: number;
  impressions: number;
  clicks: number;
  max_impressions: number | null;
  created_at: string;
}

interface AdForm {
  title: string;
  ad_type: AdType;
  image_url: string;
  link_url: string;
  html_code: string;
  position: AdPosition;
  start_date: string;
  end_date: string;
  is_active: boolean;
  priority: number;
  max_impressions: string;
}

const initialForm: AdForm = {
  title: '',
  ad_type: 'image',
  image_url: '',
  link_url: '',
  html_code: '',
  position: 'top',
  start_date: '',
  end_date: '',
  is_active: true,
  priority: 0,
  max_impressions: '',
};

const isValidHttpUrl = (value: string) => {
  if (!value) return true;
  try {
    const u = new URL(value);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
};

export function AdsManager() {
  const { toast } = useToast();
  const [items, setItems] = useState<AdBanner[]>([]);
  const [form, setForm] = useState<AdForm>(initialForm);
  const [editing, setEditing] = useState<AdBanner | null>(null);
  const [open, setOpen] = useState(false);

  const load = async () => {
    const { data, error } = await supabase.from('ad_banners').select('*').order('priority', { ascending: false }).order('created_at', { ascending: false });
    if (error) {
      toast({ title: 'Ошибка', description: 'Не удалось загрузить баннеры', variant: 'destructive' });
      return;
    }
    setItems((data || []) as AdBanner[]);
  };

  useEffect(() => {
    void load();
  }, []);

  const reset = () => {
    setForm(initialForm);
    setEditing(null);
  };

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const save = async () => {
    if (!form.title.trim()) return toast({ title: 'Ошибка', description: 'Укажите название', variant: 'destructive' });
    if (form.ad_type === 'image' && !form.image_url.trim()) return toast({ title: 'Ошибка', description: 'Нужен URL изображения', variant: 'destructive' });
    if (form.ad_type === 'html' && !form.html_code.trim()) return toast({ title: 'Ошибка', description: 'Добавьте HTML код', variant: 'destructive' });
    if (!isValidHttpUrl(form.link_url.trim())) return toast({ title: 'Ошибка', description: 'Ссылка должна начинаться с http/https', variant: 'destructive' });
    if (form.start_date && form.end_date && form.start_date > form.end_date) {
      return toast({ title: 'Ошибка', description: 'Дата окончания должна быть не раньше даты начала', variant: 'destructive' });
    }

    const payload = {
      title: form.title.trim(),
      ad_type: form.ad_type,
      image_url: form.image_url.trim() || null,
      link_url: form.link_url.trim() || null,
      html_code: form.html_code.trim() || null,
      position: form.position,
      start_date: form.start_date || null,
      end_date: form.end_date || null,
      is_active: form.is_active,
      priority: Number(form.priority) || 0,
      max_impressions: form.max_impressions ? Number(form.max_impressions) : null,
    };

    const query = editing
      ? supabase.from('ad_banners').update(payload).eq('id', editing.id)
      : supabase.from('ad_banners').insert(payload);

    const { error } = await query;
    if (error) return toast({ title: 'Ошибка', description: error.message, variant: 'destructive' });
    toast({ title: editing ? 'Баннер обновлён' : 'Баннер добавлен' });
    setOpen(false);
    reset();
    await load();
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from('ad_banners').delete().eq('id', id);
    if (error) return toast({ title: 'Ошибка', description: error.message, variant: 'destructive' });
    await load();
  };

  const openEdit = (item: AdBanner) => {
    setEditing(item);
    setForm({
      title: item.title,
      ad_type: item.ad_type,
      image_url: item.image_url || '',
      link_url: item.link_url || '',
      html_code: item.html_code || '',
      position: item.position,
      start_date: item.start_date || '',
      end_date: item.end_date || '',
      is_active: item.is_active,
      priority: item.priority,
      max_impressions: item.max_impressions?.toString() || '',
    });
    setOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Реклама / Баннеры</h3>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" />Добавить рекламу</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader><DialogTitle>{editing ? 'Редактировать рекламу' : 'Новая реклама'}</DialogTitle></DialogHeader>
            <Card>
              <CardContent className="space-y-3 pt-6">
                <Input placeholder="Название" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
                <Select value={form.ad_type} onValueChange={(v: AdType) => setForm((f) => ({ ...f, ad_type: v }))}>
                  <SelectTrigger><SelectValue placeholder="Тип" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Изображение</SelectItem>
                    <SelectItem value="html">HTML-код</SelectItem>
                  </SelectContent>
                </Select>
                {form.ad_type === 'image' ? (
                  <Input placeholder="URL изображения" value={form.image_url} onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))} />
                ) : (
                  <Textarea placeholder="HTML (AdSense, РСЯ и т.д.)" value={form.html_code} onChange={(e) => setForm((f) => ({ ...f, html_code: e.target.value }))} rows={5} />
                )}
                <Input placeholder="Ссылка перехода (https://...)" value={form.link_url} onChange={(e) => setForm((f) => ({ ...f, link_url: e.target.value }))} />
                <Select value={form.position} onValueChange={(v: AdPosition) => setForm((f) => ({ ...f, position: v }))}>
                  <SelectTrigger><SelectValue placeholder="Позиция" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="top">Верх</SelectItem>
                    <SelectItem value="sidebar">Сбоку</SelectItem>
                    <SelectItem value="bottom">Снизу</SelectItem>
                  </SelectContent>
                </Select>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input type="date" value={form.start_date} max={form.end_date || undefined} onChange={(e) => setForm((f) => ({ ...f, start_date: e.target.value }))} />
                  <Input type="date" value={form.end_date} min={form.start_date || today} onChange={(e) => setForm((f) => ({ ...f, end_date: e.target.value }))} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input type="number" placeholder="Приоритет" value={form.priority} onChange={(e) => setForm((f) => ({ ...f, priority: Number(e.target.value) }))} />
                  <Input type="number" placeholder="Лимит показов (опц.)" value={form.max_impressions} onChange={(e) => setForm((f) => ({ ...f, max_impressions: e.target.value }))} />
                </div>
                <div className="flex items-center gap-3">
                  <Switch checked={form.is_active} onCheckedChange={(v) => setForm((f) => ({ ...f, is_active: v }))} />
                  <span className="text-sm">Активно</span>
                </div>
                <Button onClick={save}>Сохранить</Button>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader><TableRow>
            <TableHead>Название</TableHead><TableHead>Позиция</TableHead><TableHead>Период</TableHead><TableHead>Статус</TableHead><TableHead>Показы/Клики</TableHead><TableHead className="text-right">Действия</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.ad_type === 'image' ? 'Баннер' : 'HTML'}</div>
                </TableCell>
                <TableCell>{item.position}</TableCell>
                <TableCell className="text-sm">{item.start_date || 'сразу'} — {item.end_date || 'бессрочно'}</TableCell>
                <TableCell>
                  <Badge className={item.is_active ? 'bg-green-500/20 text-green-500' : 'bg-muted text-muted-foreground'}>
                    {item.is_active ? 'Активно' : 'Выключено'}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{item.impressions} / {item.clicks}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(item)}><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => remove(item.id)} className="text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {items.length === 0 && (
              <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">Рекламных объявлений пока нет</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
