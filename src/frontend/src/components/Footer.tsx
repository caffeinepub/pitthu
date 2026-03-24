import { cn } from "@/lib/utils";

export default function Footer({ className }: { className?: string }) {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;
  return (
    <footer className={cn("border-t border-border bg-card py-6", className)}>
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        © {year}. Built with ❤️ using{" "}
        <a
          href={utm}
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-foreground"
        >
          caffeine.ai
        </a>
      </div>
    </footer>
  );
}
