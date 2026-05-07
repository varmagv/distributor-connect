import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b bg-background/80 px-3 backdrop-blur sm:px-5">
      <SidebarTrigger className="-ml-1" />
      <div className="flex-1" />
      <Badge variant="outline" className="hidden border-primary/20 bg-primary/5 text-primary sm:inline-flex">
        Regional RM — Mumbai
      </Badge>
      <Link to="/notifications">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
            3
          </span>
        </Button>
      </Link>
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
        AM
      </div>
    </header>
  );
}
