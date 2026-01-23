# 🚀 Быстрый старт: Загрузка на GitHub

## Пошаговая инструкция

### 1️⃣ Откройте терминал в папке проекта

```powershell
cd "c:\Users\Андрей\Desktop\project-8bc939a1-58a6-4938-9037-277fb51436b9-main (1)\project-8bc939a1-58a6-4938-9037-277fb51436b9-main"
```

### 2️⃣ Инициализируйте Git (если ещё не сделано)

```bash
git init
```

### 3️⃣ Добавьте все файлы

```bash
git add .
```

### 4️⃣ Создайте первый коммит

```bash
git commit -m "Initial commit: Сайт Центр Притяжения"
```

### 5️⃣ Создайте репозиторий на GitHub

1. Откройте https://github.com и войдите
2. Нажмите **"+"** → **"New repository"**
3. Название: `centr-prityazheniya`
4. Описание: "Сайт компании Центр Притяжения"
5. Выберите **Public** или **Private**
6. **НЕ** ставьте галочки на README, .gitignore, license
7. Нажмите **"Create repository"**

### 6️⃣ Подключите к GitHub

GitHub покажет команды. Выполните (замените `YOUR_USERNAME` на ваш GitHub username):

```bash
git remote add origin https://github.com/YOUR_USERNAME/centr-prityazheniya.git
git branch -M main
git push -u origin main
```

### 7️⃣ Готово! 🎉

Ваш проект теперь на GitHub:
```
https://github.com/YOUR_USERNAME/centr-prityazheniya
```

## 📌 Добавить проект в профиль GitHub

1. Откройте ваш профиль на GitHub
2. Нажмите **"Edit profile"**
3. В разделе **"Pinned repositories"** → **"Customize your pins"**
4. Выберите `centr-prityazheniya`
5. Сохраните

## ⚠️ Важно

Убедитесь, что файл `.env` **НЕ** попал в репозиторий! Он уже в `.gitignore`.

---

**Нужна помощь?** Смотрите подробную инструкцию в [GITHUB_SETUP.md](./GITHUB_SETUP.md)
