import Sidebar from '../Sidebar/Sidebar'

const Layout: React.FC<{}> = ({ children }) => {
  return (
    <div className="flex flex-row min-h-screen">
      <div>
        <Sidebar />
      </div>
      <main className="w-full mx-auto">{children}</main>
    </div>
  )
}

export default Layout
