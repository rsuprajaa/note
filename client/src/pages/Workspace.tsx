import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/UserContext'

const Workspace = () => {
  const { state } = useAuth()
  return (
    <Layout>
      <h1 className="text-4xl font-medium">Hello {state.user?.name}</h1>
    </Layout>
  )
}

export default Workspace
