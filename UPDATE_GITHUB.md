# 🔄 Как обновить проект на GitHub

## 📋 Быстрая инструкция

Если репозиторий уже существует на GitHub, выполните следующие команды:

### 1️⃣ Откройте терминал в папке проекта

```powershell
# Перейдите в папку проекта
cd "путь\к\вашему\проекту\project-8bc939a1-58a6-4938-9037-277fb51436b9-main"
```

### 2️⃣ Проверьте статус Git

```bash
git status
```

### 3️⃣ Добавьте все изменения

```bash
git add .
```

### 4️⃣ Создайте коммит с описанием изменений

```bash
git commit -m "Обновление: добавлены тема, карты, breadcrumbs и улучшения безопасности"
```

Или более подробно:
```bash
git commit -m "feat: добавлены тёмная/светлая тема, Яндекс.Карты, Breadcrumbs на все страницы, улучшена безопасность"
```

### 5️⃣ Загрузите изменения на GitHub

```bash
git push
```

Если это первый раз или нужно указать ветку:
```bash
git push origin main
```

или

```bash
git push origin master
```

## 🔍 Если возникли проблемы

### Проблема: "fatal: not a git repository"

**Решение**: Инициализируйте git:
```bash
git init
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

### Проблема: "remote origin already exists"

**Решение**: Проверьте текущий remote:
```bash
git remote -v
```

Если нужно изменить URL:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

### Проблема: "Updates were rejected"

**Решение**: Сначала получите изменения с GitHub:
```bash
git pull origin main
# или
git pull origin master
```

Затем снова попробуйте:
```bash
git push
```

Если есть конфликты, разрешите их и выполните:
```bash
git add .
git commit -m "Разрешение конфликтов"
git push
```

## 📝 Рекомендуемые сообщения коммитов

Используйте понятные сообщения:

```bash
# Новые функции
git commit -m "feat: добавлена тёмная/светлая тема"

# Исправления
git commit -m "fix: исправлена ошибка в форме контактов"

# Обновления
git commit -m "update: обновлён README и документация"

# Безопасность
git commit -m "security: улучшена защита от XSS"

# Стили
git commit -m "style: обновлён дизайн карточек"
```

## 🚀 Полный процесс обновления

```bash
# 1. Проверить статус
git status

# 2. Добавить все изменения
git add .

# 3. Создать коммит
git commit -m "Обновление проекта: новые функции и улучшения"

# 4. Загрузить на GitHub
git push origin main
```

## 💡 Полезные команды Git

```bash
# Посмотреть историю коммитов
git log

# Посмотреть изменения
git diff

# Отменить изменения в файле (до git add)
git checkout -- filename

# Отменить git add (но сохранить изменения)
git reset HEAD filename

# Посмотреть удалённые репозитории
git remote -v
```

## 📌 Важно

⚠️ **Перед push убедитесь, что:**
- Файл `.env` не попадает в репозиторий (он в `.gitignore`)
- Нет секретных ключей в коде
- Все работает локально (`npm run build` проходит успешно)

---

**Готово!** Ваш проект обновлён на GitHub! 🎉
