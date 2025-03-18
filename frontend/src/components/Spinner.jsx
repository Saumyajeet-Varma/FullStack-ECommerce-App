export default function Spinner() {

    return (
        <div className="max-h-[73.5vh] h-full w-full flex flex-col justify-center items-center">
            <div className="flex justify-center items-center h-16">
                <div className="w-8 h-8 border-4 border-t-transparent border-gray-500 rounded-full animate-spin"></div>
            </div>
        </div>
    );
}
