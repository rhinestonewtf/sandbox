import { Header } from './Header'
import { Sidebar } from './Sidebar'

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex bg-background">
      <Sidebar />
      <div className="container pb-40">
        <Header />
        {children}
      </div>
    </div>
  )
}
