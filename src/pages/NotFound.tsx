import { useNavigate } from 'react-router';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="bg-white shadow rounded-lg p-10 border border-[#E5E5E3]">
          {/* Large 404 number */}
          <p className="text-8xl font-bold text-[#FF6B35] mb-2">404</p>

          {/* Title */}
          <h1 className="text-2xl font-bold text-[#1A1A1A] mb-3">
            Puslapis nerastas
          </h1>

          {/* Description */}
          <p className="text-[#666666] mb-8">
            Atsiprašome, bet puslapis, kurio ieškote, neegzistuoja arba buvo perkeltas.
          </p>

          {/* Back to home button */}
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 bg-[#FF6B35] hover:bg-[#e55a2a] text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Grįžti į pradžią
          </button>
        </div>
      </div>
    </div>
  );
}
