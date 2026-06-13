export default function StarRating({ value = 0, onChange }) {
  return (
    <div className="star-rating" aria-label={`Nota ${value} de 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={star <= value ? 'star active' : 'star'}
          onClick={() => onChange?.(star)}
          aria-label={`${star} estrelas`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
