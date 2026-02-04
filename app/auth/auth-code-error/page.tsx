import Link from 'next/link'

export default function AuthCodeError() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-2xl font-serif text-white mb-4">Authentication Error</h1>
        <p className="text-gray-400 mb-6">
          There was an error verifying your email. The link may have expired.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#CAB276] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#b39a5e] transition"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
