
export default function PostTitle({ children }) {
  return (
    <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tighter leading-tight md:leading-none mb-3 text-left text-gray-800 hover:text-indigo-700">
      {children}
    </h1>
  )
}
