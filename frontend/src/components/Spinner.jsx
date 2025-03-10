import Layout from "./Layout/Layout";

export default function Spinner() {
    return (
        <Layout>
            <div className="h-[73.5vh] w-full flex justify-center items-center">
                <div className="flex justify-center items-center h-16">
                    <div className="w-8 h-8 border-4 border-t-transparent border-gray-500 rounded-full animate-spin"></div>
                </div>
            </div>
        </Layout>
    );
}
