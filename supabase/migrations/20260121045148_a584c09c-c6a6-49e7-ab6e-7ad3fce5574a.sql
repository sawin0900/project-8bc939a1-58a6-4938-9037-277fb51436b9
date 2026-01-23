-- Удаляем слишком разрешительную политику для вставки заявок
DROP POLICY IF EXISTS "Anyone can insert submissions" ON public.contact_submissions;

-- Создаём более безопасную политику для вставки (разрешаем всем, но с проверкой)
CREATE POLICY "Anyone can insert submissions with rate limit"
ON public.contact_submissions
FOR INSERT
TO public
WITH CHECK (
  -- Ограничение: не более 1 заявки в минуту с одного email
  NOT EXISTS (
    SELECT 1 FROM public.contact_submissions cs
    WHERE cs.email = email
    AND cs.created_at > now() - interval '1 minute'
  )
);

-- Обновляем политики профилей чтобы блокировать анонимный доступ
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

-- Новые политики с явной проверкой аутентификации
CREATE POLICY "Authenticated users can view own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Политика для админов просматривать все профили
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Обновляем политики для contact_submissions
DROP POLICY IF EXISTS "Admins can view all submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can update submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can delete submissions" ON public.contact_submissions;

-- Новые политики только для аутентифицированных админов
CREATE POLICY "Authenticated admins can view submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Authenticated admins can update submissions"
ON public.contact_submissions
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Authenticated admins can delete submissions"
ON public.contact_submissions
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Обновляем политики user_roles
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;

-- Новые политики только для аутентифицированных
CREATE POLICY "Authenticated users can view own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Authenticated admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));