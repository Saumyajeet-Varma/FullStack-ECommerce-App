import Layout from "../components/Layout/Layout"
import { useAuth } from '../context/AuthProvider'

function Homepage() {

    const [auth] = useAuth()

    return (
        <>
            <Layout title={"Best offers - Ecommerce"}>
                <h1>Homepage</h1>
                <pre>{JSON.stringify(auth, null, 4)}</pre>
            </Layout>
        </>
    )
}

export default Homepage
