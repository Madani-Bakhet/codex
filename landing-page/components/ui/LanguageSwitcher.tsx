"use client";

import { useTranslation } from "react-i18next";
import { Button } from "./Button";
import { useEffect, useState } from "react";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch
  
  const currentLanguage = i18n.language || "en";
  const isArabic = currentLanguage.startsWith("ar");

  const toggleLanguage = () => {
    const newLang = isArabic ? "en" : "ar";
    // Set cookie explicitly for SSR to pick it up on reload
    document.cookie = `i18next=${newLang}; path=/; max-age=31536000`;
    
    i18n.changeLanguage(newLang).then(() => {
      // Reload the window so that the server-side layout.tsx applies the correct RTL direction
      window.location.reload();
    });
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={toggleLanguage}
      className="font-medium text-sm px-3"
    >
      {isArabic ? "EN" : "عربي"}
    </Button>
  );
};
