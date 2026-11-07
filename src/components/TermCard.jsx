import { useStudy } from '../lib/studyContext';
import { Link, Illustration, LevelBadge, StarIcon, CheckIcon } from './common';

export default function TermCard({ term }) {
  const { learned, bookmarks } = useStudy();
  const isLearned = learned.includes(term.id);
  const isBookmarked = bookmarks.includes(term.id);
  return (
    <Link
      to={`/t/${term.id}`}
      className="group flex gap-3 rounded-2xl border border-line bg-card p-3 transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md focus-visible:outline-2 focus-visible:outline-accent"
    >
      <div className="pointer-events-none w-28 shrink-0 self-center overflow-hidden rounded-xl bg-soft p-1 sm:w-32" aria-hidden="true">
        <Illustration id={term.id} />
      </div>
      <div className="min-w-0 flex-1 py-0.5">
        <div className="flex items-start gap-1.5">
          <h3 className="flex-1 text-[15px] font-extrabold leading-snug text-ink group-hover:text-accent">{term.term}</h3>
          {isBookmarked && <StarIcon filled className="mt-0.5 h-4 w-4 shrink-0" />}
          {isLearned && (
            <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-aqua text-white" title="이해했어요">
              <CheckIcon className="h-3 w-3" />
            </span>
          )}
        </div>
        <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-ink-2">{term.summary}</p>
        <div className="mt-1.5">
          <LevelBadge level={term.level} />
        </div>
      </div>
    </Link>
  );
}
