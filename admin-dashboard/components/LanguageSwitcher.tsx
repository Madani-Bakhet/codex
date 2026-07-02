"use client";

import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { useRouter } from "next/navigation";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const router = useRouter();

  const toggleLanguage = () => {
    const nextLang = i18n.language.startsWith("en") ? "ar" : "en";
    i18n.changeLanguage(nextLang).then(() => {
      router.refresh();
    });
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle language"
    >
      <Globe className="w-4 h-4" />
      <span>{i18n.language.startsWith("ar") ? "English" : "العربية"}</span>
    </button>
  );
}
