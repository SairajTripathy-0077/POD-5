interface LocationButtonProps {
  loading: boolean;
  onGetLocation: () => void;
  showButton: boolean;
}

export default function LocationButton({ loading, onGetLocation, showButton }: LocationButtonProps) {
  if (!showButton) return null;

  return (
    <div className='text-center mt-8'>
      <button
        onClick={onGetLocation}
        disabled={loading}
        className='
          px-6 py-3 rounded-xl font-semibold
          bg-white/10 dark:bg-white/5 backdrop-blur-md
          border border-white/20 dark:border-white/10
          hover:scale-[1.03] hover:shadow-lg
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-300 cursor-pointer
        '
      >
        {loading ? 'Getting Location...' : '📍 Get Current Location Weather'}
      </button>
    </div>
  );
}
