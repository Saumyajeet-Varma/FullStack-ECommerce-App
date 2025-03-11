import Layout from "../../components/Layout/Layout"
import UserMenu from "../../components/Layout/UserMenu"

function Profile() {
    return (
        <>
            <Layout title={"User - Profile"}>
                <div className="flex">
                    <UserMenu />
                    <div className="p-5">
                        <h1>Profile</h1>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Profile
