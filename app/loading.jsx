export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-green-500 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-green-500 text-xl">Loading</span>
        </div>
      </div>
    </div>
  )
}
