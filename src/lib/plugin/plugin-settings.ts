export interface ModuleParam {
  key: string
  label: string
  type: 'boolean' | 'string' | 'number'
  defaultValue: unknown
}

export interface ModuleDefinition {
  module: string
  icon: string
  name: string
  description: string
  params: ModuleParam[]
}

export function getDefaultModules(): ModuleDefinition[] {
  return [
    {
      module: 'seo',
      icon: '🔍',
      name: 'SEO',
      description: 'Search Engine Optimization — автоматическая оптимизация для поисковых систем',
      params: [
        { key: 'autoMeta', label: 'Авто-метатеги', type: 'boolean', defaultValue: true },
        { key: 'autoSitemap', label: 'Авто-sitemap', type: 'boolean', defaultValue: true },
        { key: 'autoSchema', label: 'Авто-schema.org', type: 'boolean', defaultValue: true },
        { key: 'autoOg', label: 'Open Graph теги', type: 'boolean', defaultValue: true },
      ],
    },
    {
      module: 'analytics',
      icon: '📊',
      name: 'Аналитика',
      description: 'Подключение Google Analytics 4 и Яндекс.Метрики',
      params: [
        { key: 'ga4Id', label: 'GA4 ID', type: 'string', defaultValue: '' },
        { key: 'metrikaId', label: 'Метрика ID', type: 'string', defaultValue: '' },
      ],
    },
    {
      module: 'auth',
      icon: '🔐',
      name: 'Авторизация',
      description: 'Система регистрации и аутентификации пользователей',
      params: [
        { key: 'registration', label: 'Регистрация', type: 'boolean', defaultValue: true },
        { key: 'googleProvider', label: 'Google вход', type: 'boolean', defaultValue: false },
        { key: 'githubProvider', label: 'GitHub вход', type: 'boolean', defaultValue: false },
      ],
    },
    {
      module: 'forms',
      icon: '📧',
      name: 'Формы и Почта',
      description: 'Контактные формы, подписка и уведомления',
      params: [
        { key: 'contactForm', label: 'Контактная форма', type: 'boolean', defaultValue: true },
        { key: 'subscribeForm', label: 'Форма подписки', type: 'boolean', defaultValue: true },
        { key: 'telegramNotifications', label: 'Telegram уведомления', type: 'boolean', defaultValue: false },
      ],
    },
    {
      module: 'comments',
      icon: '💬',
      name: 'Комментарии',
      description: 'Система комментариев с модерацией',
      params: [
        { key: 'moderation', label: 'Модерация', type: 'boolean', defaultValue: true },
        { key: 'requireApproval', label: 'Требуется одобрение', type: 'boolean', defaultValue: true },
        { key: 'allowReplies', label: 'Ответы на комментарии', type: 'boolean', defaultValue: true },
      ],
    },
    {
      module: 'i18n',
      icon: '🌍',
      name: 'Мультиязычность',
      description: 'Поддержка нескольких языков интерфейса',
      params: [
        { key: 'defaultLocale', label: 'Язык по умолчанию', type: 'string', defaultValue: 'ru' },
        { key: 'availableLocales', label: 'Доступные языки', type: 'string', defaultValue: 'ru,en' },
      ],
    },
    {
      module: 'pwa',
      icon: '📱',
      name: 'PWA',
      description: 'Progressive Web App — push-уведомления и оффлайн режим',
      params: [
        { key: 'pushNotifications', label: 'Push-уведомления', type: 'boolean', defaultValue: false },
        { key: 'offlineMode', label: 'Оффлайн режим', type: 'boolean', defaultValue: false },
      ],
    },
    {
      module: 'theme',
      icon: '🎨',
      name: 'Тема',
      description: 'Настройки визуального оформления сайта',
      params: [
        { key: 'defaultTheme', label: 'Тема по умолчанию', type: 'string', defaultValue: 'light' },
        { key: 'customColors', label: 'Пользовательские цвета', type: 'boolean', defaultValue: false },
      ],
    },
    {
      module: 'security',
      icon: '🛡️',
      name: 'Безопасность',
      description: 'Защита от атак и несанкционированного доступа',
      params: [
        { key: 'rateLimit', label: 'Лимит запросов', type: 'boolean', defaultValue: true },
        { key: 'csrfProtection', label: 'CSRF защита', type: 'boolean', defaultValue: true },
        { key: 'xssProtection', label: 'XSS защита', type: 'boolean', defaultValue: true },
      ],
    },
    {
      module: 'cache',
      icon: '📦',
      name: 'Кэширование',
      description: 'Настройки кэширования для оптимальной производительности',
      params: [
        { key: 'isrEnabled', label: 'ISR включен', type: 'boolean', defaultValue: true },
        { key: 'revalidateTime', label: 'Время ревалидации (с)', type: 'number', defaultValue: 3600 },
      ],
    },
    {
      module: 'notifications',
      icon: '🔔',
      name: 'Уведомления',
      description: 'Email, внутриприложённые уведомления и дайджесты',
      params: [
        { key: 'emailNotifications', label: 'Email уведомления', type: 'boolean', defaultValue: true },
        { key: 'inAppNotifications', label: 'Внутренние уведомления', type: 'boolean', defaultValue: true },
        { key: 'digestEnabled', label: 'Еженедельный дайджест', type: 'boolean', defaultValue: false },
      ],
    },
    {
      module: 'logging',
      icon: '📝',
      name: 'Логирование',
      description: 'Запись ошибок и аудит действий пользователей',
      params: [
        { key: 'errorLogging', label: 'Логирование ошибок', type: 'boolean', defaultValue: true },
        { key: 'auditLog', label: 'Аудит лог', type: 'boolean', defaultValue: false },
      ],
    },
  ]
}

export function getModuleParams(moduleName: string): ModuleParam[] {
  const modules = getDefaultModules()
  const mod = modules.find(m => m.module === moduleName)
  return mod?.params || []
}
