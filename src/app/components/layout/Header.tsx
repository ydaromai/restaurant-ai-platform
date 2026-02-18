import React from "react";
import {
  Bell,
  Globe,
  Search,
  Menu,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface HeaderProps {
  onMobileMenuToggle: () => void;
}

export function Header({ onMobileMenuToggle }: HeaderProps) {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 md:px-6 shrink-0">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMobileMenuToggle}
        >
          <Menu className="w-5 h-5" />
        </Button>
        <div>
          <p className="text-sm text-muted-foreground">
            {t("common.goodMorning")}, Avi
          </p>
          <p className="text-xs text-muted-foreground">
            Tel Aviv - Dizengoff &middot; {t("dash.lastUpdated")}: 06:00 AM
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 bg-accent/50 rounded-lg px-3 py-1.5">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("common.search") + "..."}
            className="bg-transparent text-sm outline-none w-40 placeholder:text-muted-foreground"
          />
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <Badge className="absolute -top-1 -end-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
            3
          </Badge>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLang(lang === "en" ? "he" : "en")}
          className="gap-1.5"
        >
          <Globe className="w-4 h-4" />
          <span className="text-xs">{lang === "en" ? "HE" : "EN"}</span>
        </Button>
      </div>
    </header>
  );
}
