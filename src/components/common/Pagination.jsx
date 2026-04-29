
export default function Pagination({ page = 1, totalPages = 1, onChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-center gap-3">
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange?.(p)}
          className={`w-10 h-10 rounded-lg text-sm font-medium border transition-colors ${
            p === page
              ? 'bg-primary text-white border-primary'
              : 'bg-surface-alt text-text border-border hover:border-primary/40'
          }`}
        >
          {p}
        </button>
      ))}
      {totalPages > 1 && (
        <button
          type="button"
          onClick={() => onChange?.(Math.min(totalPages, page + 1))}
          className="h-10 px-4 rounded-lg text-sm font-medium border bg-surface-alt text-text border-border hover:border-primary/40 transition-colors"
        >
          Next
        </button>
      )}
    </div>
  )
}

