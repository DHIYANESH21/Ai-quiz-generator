import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/service/firebase';
import { useUser } from '@clerk/clerk-react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const History = () => {
  const { user, isLoaded } = useUser();
  const { userid } = useParams();
  const [HistoryData, setHistoryData] = useState([]);
  const [email, setEmailAdd] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      const email = user.emailAddresses[0]?.emailAddress;
      setEmailAdd(email);
      getHistory(email);
    }
  }, [isLoaded, user, userid]);

  const getHistory = async (email) => {
    setIsLoading(true);
    const q = query(collection(db, 'quizinfo'), where('userinfo', '==', email));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setHistoryData(data);
    setIsLoading(false);
  };

  const clearHistory = async () => {
    if (email) {
      try {
        setIsLoading(true);
        const q = query(collection(db, 'quizinfo'), where('userinfo', '==', email));
        const querySnapshot = await getDocs(q);

        // Delete each document
        const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
        await Promise.all(deletePromises);

        // Update the UI
        setHistoryData([]);
        setIsLoading(false);
        alert('History cleared successfully!');
      } catch (error) {
        console.error('Error clearing history:', error);
        setIsLoading(false);
        alert('Failed to clear history. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Quiz History</h1>
          {HistoryData.length > 0 && (
            <button
              onClick={clearHistory}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
              disabled={isLoading}
            >
              {isLoading ? 'Clearing...' : 'Clear History'}
            </button>
          )}
        </div>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-screen">
            <AiOutlineLoading3Quarters className="animate-spin h-10 w-10 text-blue-500" />
            <h1 className="mt-4 text-2xl font-semibold text-gray-700">Loading...</h1>
          </div>
        ) : HistoryData.length > 0 ? (
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 border border-gray-300 text-left">Category</th>
                  <th className="p-3 border border-gray-300 text-left">Level</th>
                  <th className="p-3 border border-gray-300 text-left">Topic</th>
                  <th className="p-3 border border-gray-300 text-left">Marks</th>
                </tr>
              </thead>
              <tbody>
                {HistoryData.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="p-3 border border-gray-300">{item.selectedOptions.category}</td>
                    <td className="p-3 border border-gray-300">{item.selectedOptions.level}</td>
                    <td className="p-3 border border-gray-300">{item.selectedOptions.topic}</td>
                    <td className="p-3 border border-gray-300">
                      {item.markserned} out of {item.selectedOptions.qns}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-10">No history found.</p>
        )}
      </div>
    </div>
  );
};

export default History;
