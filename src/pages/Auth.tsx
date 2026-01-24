import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Anchor, Loader2, Mail, Lock, User } from 'lucide-react';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().trim().email({ message: 'Введите корректный email' }),
  password: z.string().min(6, { message: 'Пароль должен быть не менее 6 символов' }),
});

const signupSchema = z.object({
  fullName: z.string().trim().min(2, { message: 'Имя должно быть не менее 2 символов' }),
  email: z.string().trim().email({ message: 'Введите корректный email' }),
  password: z.string().min(6, { message: 'Пароль должен быть не менее 6 символов' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Пароли не совпадают',
  path: ['confirmPassword'],
});

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { toast } = useToast();
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const validateForm = () => {
    try {
      if (isLogin) {
        loginSchema.parse({ email: formData.email, password: formData.password });
      } else {
        signupSchema.parse(formData);
      }
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            newErrors[error.path[0] as string] = error.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        
        if (error) {
          let errorMessage = 'Ошибка входа';
          if (error.message.includes('Invalid login credentials')) {
            errorMessage = 'Неверный email или пароль';
          }
          toast({
            title: 'Ошибка',
            description: errorMessage,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Успешный вход',
            description: 'Добро пожаловать!',
          });
          navigate('/');
        }
      } else {
        const { error } = await signUp(formData.email, formData.password, formData.fullName);
        
        if (error) {
          let errorMessage = 'Ошибка регистрации';
          if (error.message.includes('already registered')) {
            errorMessage = 'Пользователь с таким email уже существует';
          }
          toast({
            title: 'Ошибка',
            description: errorMessage,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Регистрация успешна',
            description: 'Вы успешно зарегистрировались!',
          });
          navigate('/');
        }
      }
    } catch (err) {
      toast({
        title: 'Ошибка',
        description: 'Произошла непредвиденная ошибка',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-background to-muted/30">
        <div className="container-custom max-w-md">
          <div className="bg-card rounded-2xl border border-border p-8 shadow-elegant">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Anchor className="w-8 h-8 text-primary" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center mb-2">
              {isLogin ? 'Вход в систему' : 'Регистрация'}
            </h1>
            <p className="text-muted-foreground text-center mb-6">
              {isLogin ? 'Войдите для доступа к личному кабинету' : 'Создайте аккаунт для доступа к системе'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                    Полное имя
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Иван Иванов"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="pl-10 bg-muted border-border"
                    />
                  </div>
                  {errors.fullName && <p className="text-destructive text-sm mt-1">{errors.fullName}</p>}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 bg-muted border-border"
                  />
                </div>
                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Пароль
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 bg-muted border-border"
                  />
                </div>
                {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                    Подтвердите пароль
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="pl-10 bg-muted border-border"
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-destructive text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              )}

              <Button type="submit" disabled={isLoading} className="w-full btn-glow">
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isLogin ? 'Вход...' : 'Регистрация...'}
                  </>
                ) : (
                  isLogin ? 'Войти' : 'Зарегистрироваться'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setErrors({});
                    setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
                  }}
                  className="text-primary hover:underline font-medium"
                >
                  {isLogin ? 'Зарегистрироваться' : 'Войти'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
