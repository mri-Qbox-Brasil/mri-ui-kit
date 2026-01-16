import { useState, useRef, useEffect } from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fecha ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const items = [
    { value: "light", icon: Sun, label: "Claro" },
    { value: "dark", icon: Moon, label: "Escuro" },
    { value: "system", icon: Laptop, label: "Sistema" },
  ];

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex items-center gap-1 p-1 border border-input rounded-md bg-background/50 backdrop-blur-sm transition-all duration-300 ease-in-out overflow-hidden shadow-sm",
        expanded ? "w-[114px] bg-background" : "w-[42px] cursor-pointer hover:bg-accent/50"
      )}
      onClick={() => {
        if (!expanded) setExpanded(true);
      }}
      title={expanded ? "Selecione um tema" : "Alterar tema"}
    >
      {items.map((item) => {
        const isActive = theme === item.value;
        return (
          <Button
            key={item.value}
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 rounded-md transition-all duration-300 shrink-0",
              isActive
                ? "bg-primary/10 text-primary hover:bg-primary/20"
                : "text-muted-foreground hover:text-foreground"
            )}
            style={{ order: isActive ? -1 : 0 }}
            onClick={(e) => {
              e.stopPropagation();
              if (!expanded) {
                setExpanded(true);
              } else {
                setTheme(item.value);
                setExpanded(false);
              }
            }}
            title={item.label}
          >
            <item.icon className="h-4 w-4" />
          </Button>
        );
      })}
    </div>
  );
};
