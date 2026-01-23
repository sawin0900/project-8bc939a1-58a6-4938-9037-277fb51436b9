# 📦 Инструкция по загрузке проекта на GitHub

## Шаг 1: Подготовка проекта

Убедитесь, что вы находитесь в папке проекта:
```bash
cd "c:\Users\Андрей\Desktop\project-8bc939a1-58a6-4938-9037-277fb51436b9-main (1)\project-8bc939a1-58a6-4938-9037-277fb51436b9-main"
```

## Шаг 2: Инициализация Git (если ещё не сделано)

```bash
git init
```

## Шаг 3: Добавление всех файлов

```bash
git add .
```

## Шаг 4: Первый коммит

```bash
git commit -m "Initial commit: Сайт Центр Притяжения - судоподъём и водолазные работы"
```

## Шаг 5: Создание репозитория на GitHub

1. Откройте https://github.com
2. Войдите в свой аккаунт
3. Нажмите кнопку **"+"** в правом верхнем углу
4. Выберите **"New repository"**
5. Заполните:
   - **Repository name**: `centr-prityazheniya` (или другое название)
   - **Description**: "Сайт компании Центр Притяжения - судоподъём, водолазные работы, проектная документация"
   - **Visibility**: Public (или Private, если хотите закрытый репозиторий)
   - **НЕ** ставьте галочки на "Add a README file", "Add .gitignore", "Choose a license" (у нас уже есть файлы)
6. Нажмите **"Create repository"**

## Шаг 6: Подключение к GitHub

После создания репозитория GitHub покажет инструкции. Выполните команды:

```bash
# Добавьте удалённый репозиторий (замените YOUR_USERNAME на ваш GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/centr-prityazheniya.git

# Переименуйте ветку в main (если нужно)
git branch -M main

# Загрузите код на GitHub
git push -u origin main
```

## Шаг 7: Проверка

Откройте ваш репозиторий на GitHub:
```
https://github.com/YOUR_USERNAME/centr-prityazheniya
```

## 🔐 Важно: Безопасность

⚠️ **Перед загрузкой проверьте, что файл `.env` НЕ попадает в репозиторий!**

Убедитесь, что в `.gitignore` есть:
```
.env
.env.local
.env.*.local
```

## 📝 Дополнительные команды Git

Если нужно обновить код на GitHub после изменений:

```bash
git add .
git commit -m "Описание изменений"
git push
```

## 🎨 Добавление проекта в профиль GitHub

Чтобы проект отображался в вашем профиле GitHub:

1. Откройте ваш профиль на GitHub
2. Нажмите **"Edit profile"**
3. В разделе **"Pinned repositories"** нажмите **"Customize your pins"**
4. Выберите ваш репозиторий `centr-prityazheniya`
5. Сохраните изменения

## 🌐 Настройка GitHub Pages (опционально)

Если хотите разместить сайт на GitHub Pages:

1. В репозитории перейдите в **Settings**
2. В меню слева выберите **Pages**
3. В разделе **Source** выберите:
   - Branch: `main`
   - Folder: `/docs` или `/root`
4. Нажмите **Save**

После этого сайт будет доступен по адресу:
```
https://YOUR_USERNAME.github.io/centr-prityazheniya
```

---

**Готово!** Ваш проект теперь на GitHub! 🚀
