import ChapterFlow from "../fx/ChapterFlow";

/**
 * Wrapper for every inner page: the same ink canvas and chapter hand-offs
 * as the home page. Sections inside stay transparent so ChapterFlow can
 * tint the page behind them.
 */
export default function PageShell({ children }: { children: React.ReactNode }) {
    return (
        <main className="relative bg-ink text-paper">
            {children}
            <ChapterFlow />
        </main>
    );
}
