import Footer from './footer'

export default function Layout ({ children }) {
  return (
    <div className="min-h-screen">
      <main className="py-6 flex flex-col flex-1 items-center justify-center">{children}</main>
      
      <Footer />
    </div>
  )
}
