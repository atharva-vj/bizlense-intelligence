import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Legal", to: "/legal" },
  { label: "Privacy", to: "/privacy" },
];

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-border/30 bg-background/40 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          <div className="text-center md:text-left">
            <span className="text-lg font-bold tracking-tight">
              <span className="text-primary">Biz</span>
              <span className="text-foreground">Lense</span>
            </span>
            <p className="text-xs text-muted-foreground mt-2 max-w-xs">
              Autonomous, multi-agent intelligence systems for high-friction domains.
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="text-center md:text-right">
            <a
              href="mailto:atharva@zenwealth.club"
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              atharva@zenwealth.club
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/20 text-center">
          <p className="text-xs text-muted-foreground font-mono">
            &copy; {new Date().getFullYear()} BizLense. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
