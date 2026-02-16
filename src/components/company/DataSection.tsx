import { ReactNode } from "react";

interface DataItemProps {
  label: string;
  value: string | undefined | null;
  multiline?: boolean;
}

export const DataItem = ({ label, value, multiline = false }: DataItemProps) => {
  // Handle semicolon-separated values
  const formatValue = (val: string | undefined | null) => {
    if (!val || val === "NA" || val === "") return <span className="text-muted-foreground/40 text-xs italic">N/A</span>;

    // Ensure val is a string before calling includes
    const stringVal = String(val);

    if (stringVal.includes(";")) {
      const items = stringVal.split(";").map(item => item.trim()).filter(Boolean);
      return (
        <div className="flex flex-wrap gap-1.5">
          {items.map((item, idx) => (
            <span
              key={idx}
              className="inline-block px-2 py-0.5 bg-secondary text-secondary-foreground rounded text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      );
    }

    return <span className={multiline ? "whitespace-pre-wrap" : ""}>{stringVal}</span>;
  };

  return (
    <div className="space-y-1">
      <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{formatValue(value)}</dd>
    </div>
  );
};

interface DataSectionProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  columns?: 1 | 2 | 3;
}

export const DataSection = ({ title, icon, children, columns = 2 }: DataSectionProps) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <section className="relative rounded-2xl bg-white/40 dark:bg-black/20 backdrop-blur-xl border-0 ring-1 ring-black/5 shadow-sm overflow-hidden p-6 animate-fade-in-up transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
      {/* Gradient Border Line - Ultra Light Pastel (Static) */}
      <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-indigo-300/10 via-purple-300/10 to-pink-300/10 -z-10 opacity-100" />

      <div className="flex items-center gap-3 mb-6 border-b border-black/5 pb-4">
        {icon && <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">{icon}</div>}
        <h2 className="text-xl font-bold text-foreground tracking-tight">{title}</h2>
      </div>
      <dl className={`grid ${gridCols[columns]} gap-x-8 gap-y-6`}>
        {children}
      </dl>
    </section>
  );
};
