'use client'

export function useTranslations() {
  const t = (key: string) => {
    // In a real app, this would be connected to a proper i18n system
    return key
  }

  return { t }
}