"use client";

import { ReactNode, useMemo } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n/config";

export function I18nProvider({ children, lang }: { children: ReactNode; lang: string }) {
  const i18nInstance = useMemo(() => {
    const newInstance = i18n.cloneInstance();
    newInstance.changeLanguage(lang);
    return newInstance;
  }, [lang]);

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}
