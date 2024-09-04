import { useEffect, useState } from "react";
import Spinner from "../../Spinner/Spinner";
import { useParams } from 'react-router-dom';

function Activities() {
    const [loading, setLoading] = useState(true);
    const [activities, setActivities] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/posts");
                const result = await response.json();
                setActivities(result);
            } catch (error) {
                console.error("Failed to fetch activities:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchActivities();
    }, [id]);

    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                <div className="overflow-x-auto p-7">
                    <div className="text-center font-serif font-bold text-5xl">
                        <h1>-History-</h1>
                        </div>
                    <table className="w-full bg-white border border-gray-300 shadow-lg rounded-lg mt-6 ">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-3 px-6 border-b border-gray-200 text-left text-lg font-medium">ID</th>
                                <th className="py-3 px-6 border-b border-gray-200 text-left text-lg font-medium">Title</th>
                                <th className="py-3 px-6 border-b border-gray-200 text-left text-lg font-medium">Body</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activities.map(activity => {
                                if(activity.userId === parseInt(id, 10)){
                                    return(
                                <tr key={activity.id} className="hover:bg-gray-100 transition-colors">
                                    <td className="py-4 px-6 border-b border-gray-200 text-lg">{activity.id}</td>
                                    <td className="py-4 px-6 border-b border-gray-200 text-lg">{activity.title}</td>
                                    <td className="py-4 px-6 border-b border-gray-200 text-lg">{activity.body}</td>
                                </tr>
                                    )
                                }
                                else{
                                    return null
                                }
})}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Activities;
