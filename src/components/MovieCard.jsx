const MovieCard = ({ movie, onClick }) => {
  const { title, poster_path, release_date, original_language, vote_average } = movie;

  return (
    <div
      onClick={() => onClick(movie)}
      className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-md hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
    >
      <img
        src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
        alt={title}
        className="w-full h-auto object-cover"
      />
      <div className="p-3">
        <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
        <div className="flex items-center text-sm text-gray-300 gap-2">
          <div className="flex items-center gap-1">
            <img src="star.svg" alt="star icon" className="w-4 h-4" />
            <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
          </div>
          <span>•</span>
          <p>{original_language.toUpperCase()}</p>
          <span>•</span>
          <p>{release_date ? release_date.split('-')[0] : "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
