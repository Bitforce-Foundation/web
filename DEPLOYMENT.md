# Инструкции по деплою

## 🚀 Настройка GitHub Pages

### 1. Создание Personal Access Token

1. Перейдите в GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Нажмите "Generate new token (classic)"
3. Выберите следующие разрешения:
   - `repo` (полный доступ к репозиторию)
   - `workflow` (для GitHub Actions)
4. Скопируйте токен

### 2. Настройка репозитория

1. Перейдите в репозиторий `Bitforce-Foundation/web`
2. Перейдите в Settings → Pages
3. В разделе "Source" выберите "GitHub Actions"

### 3. Настройка GitHub Actions

1. Перейдите в репозиторий → Actions
2. Нажмите "New workflow"
3. Выберите "Deploy to GitHub Pages"
4. Или используйте уже созданный файл `.github/workflows/deploy.yml`

### 4. Настройка переменных окружения

1. Перейдите в репозиторий → Settings → Secrets and variables → Actions
2. Добавьте новый секрет:
   - Name: `GH_TOKEN`
   - Value: ваш Personal Access Token

## 🔧 Ручной деплой

### Через командную строку

```bash
# Установка gh-pages (если не установлен)
npm install --save-dev gh-pages

# Деплой
npm run deploy
```

### Через GitHub CLI

```bash
# Установка GitHub CLI
brew install gh

# Авторизация
gh auth login

# Создание релиза
gh release create v1.0.0 --generate-notes
```

## 📱 Проверка деплоя

После успешного деплоя сайт будет доступен по адресу:
**https://bitforce-foundation.github.io/web**

## 🚨 Решение проблем

### Ошибка аутентификации
```bash
git remote set-url origin https://USERNAME:TOKEN@github.com/Bitforce-Foundation/web.git
```

### Ошибка сборки
1. Проверьте логи в GitHub Actions
2. Убедитесь, что все зависимости установлены
3. Проверьте TypeScript ошибки

### Проблемы с роутингом
Убедитесь, что в `vite.config.ts` установлен правильный `base: '/web/'`

## 📋 Чек-лист деплоя

- [ ] Personal Access Token создан
- [ ] GitHub Pages включен в настройках репозитория
- [ ] GitHub Actions workflow настроен
- [ ] Переменные окружения добавлены
- [ ] Код закоммичен и отправлен в main ветку
- [ ] Сборка прошла успешно
- [ ] Сайт доступен по ссылке

## 🔄 Автоматический деплой

При каждом push в ветку `main`:
1. Автоматически запускается GitHub Actions
2. Выполняется сборка проекта
3. Результат деплоится на GitHub Pages
4. Сайт обновляется автоматически

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи GitHub Actions
2. Убедитесь в правильности настроек
3. Проверьте права доступа к репозиторию
