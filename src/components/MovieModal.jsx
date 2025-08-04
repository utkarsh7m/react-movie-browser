const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4">
      <div className="bg-gray-900 text-white rounded-2xl shadow-lg w-full max-w-3xl relative overflow-hidden">
        <button
          className="absolute top-2 right-2 text-3xl text-white hover:text-red-400"
          onClick={onClose}
        >
          ×
        </button>

        <img
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
              : "/no-movie.png"
          }
          alt={movie.title}
          className="w-full h-64 object-cover rounded-t-2xl"
        />

        <div className="p-6">
          <h2 className="text-2xl font-bold">{movie.title}</h2>
          <p className="mt-4 text-gray-300">{movie.overview}</p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-6">
            <span className="bg-gray-800 px-3 py-1 rounded-full">
              Language: {movie.original_language}
            </span>
            <span className="bg-gray-800 px-3 py-1 rounded-full">
              Rating: {movie.vote_average ?? "N/A"}
            </span>
            <span className="bg-gray-800 px-3 py-1 rounded-full">
              Year: {movie.release_date?.split("-")[0] ?? "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
