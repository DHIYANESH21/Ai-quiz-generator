import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { db } from "@/service/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";


const Viewquiz = () => {
  const { docId } = useParams();
  const [quizData, setquizdata] = useState(null);
  const [userAnswers, setuserAnswers] = useState([]);
  const [marks, setMarks] = useState(0);
  const [showMarks, setShowMarks] = useState(false);
  const [TotQns, setTotQns] = useState(0);
  const [name, setname] = useState("");
  const section1 = useRef(null);
  const navigate =useNavigate();

  useEffect(() => {
    if (docId) {
      generate();
    }
  }, [docId]);

  useEffect(() => {
    if (showMarks) {
      scrollSec(section1);
    }
  }, [showMarks]);
  

  const generate = async () => {
    try {
      const docRef = doc(db, "quizinfo", docId);
      const docSnap = await getDoc(docRef);
      setquizdata(docSnap.data());

      if (docSnap.exists()) {
        const name = quizData.username;
        setname(name);
        console.log("Document Data:", docSnap.data());
      } else {
        console.log("Document does not exist!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  const handleAnsChange = (index, answer, idx) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = idx + 1;
    setuserAnswers(updatedAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let marks = 0;
    let totqns = 0;
    quizData.aiOutput.forEach((q, index) => {
      totqns++;
      const ans = q.answer;
      const finalanswer = ans.charCodeAt(0);
      if (userAnswers[index] + 96 === finalanswer) {
        marks++;
      }
    });
    setMarks(marks);
    setShowMarks(true);
    setTotQns(totqns);
    storemarks(quizData,marks,TotQns);
    // scrollSec(section1);
  };


    

  const scrollSec = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error('Ref is not properly attached.');
    }
  };

  const storemarks = async(quizData,marks,TotQns)=>{
    const newdocId = docId+"-mark";
    await setDoc(doc(db,'quizinfo',newdocId),{
      markserned:marks,
      TotQns:quizData.selectedOptions.qns,
      userinfo:quizData.emailaddress,
      selectedOptions:quizData.selectedOptions
    })
  }

  const tryanother =()=>{
    navigate('/home')
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
      <Navbar />
      <div className="container mx-auto p-4">
        {quizData ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center mb-4">
              Hello<span className="text-pink-500"> {quizData?.username}</span>,
              Here are the AI-generated questions on the topic{" "}
              <span className="text-pink-500">
                {quizData?.selectedOptions?.topic}
              </span>{" "}
              for you. Try to answer all the questions... Have fun learning 😁
            </h1>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-8 mt-8">
          {quizData ? (
            quizData.aiOutput.map((q, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-4">
                  {index + 1}. {q.question}
                </h2>
                <div className="space-y-4">
                  {q.options.map((option, idx) => (
                    <label
                      key={idx}
                      className="flex items-center group cursor-pointer relative"
                    >
                      <div className="w-full">
                        <div
                          className={`
                          border-2 rounded-xl p-4
                          transition-all duration-200 ease-in-out
                          ${
                            userAnswers[index] === idx + 1
                              ? "border-blue-950 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                          }
                        `}
                        >
                          <div className="flex items-center space-x-4">
                            <div
                              className={`
                              w-6 h-6 rounded-full border-2 flex items-center justify-center
                              transition-all duration-200
                              ${
                                userAnswers[index] === idx + 1
                                  ? "border-blue-950 bg-blue-950"
                                  : "border-gray-300 group-hover:border-blue-300"
                              }
                            `}
                            >
                              {userAnswers[index] === idx + 1 && (
                                <div className="w-2 h-2 bg-white rounded-full" />
                              )}
                            </div>
                            <input
                              type="radio"
                              value={option}
                              name={`question-${index}`}
                              onChange={() =>
                                handleAnsChange(index, option, idx)
                              }
                              className="hidden"
                            />
                            <span className="text-lg font-medium text-gray-700 group-hover:text-gray-900">
                              {option}
                            </span>
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-950 border-t-transparent"></div>
              <p className="mt-4 text-lg text-gray-600">Loading quiz...</p>
            </div>
          )}

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="px-8 py-4 bg-blue-950 text-white text-lg font-semibold rounded-xl shadow-md 
                hover:bg-blue-800 active:bg-blue-900 transform transition-all duration-300 
                hover:scale-105 active:scale-100"
            >
              Submit Quiz
            </button>
          </div>
        </form>

        {showMarks && (
          <div className="mt-8 bg-white p-6 rounded-xl shadow-lg text-center" ref={section1}>
            <h2 className="text-2xl font-bold text-blue-950">
              You scored <span className="text-pink-500">{marks} </span> out of {TotQns} questions!
              <br></br>
              Wanna generate another ??
              <br></br>
              <button
              className="px-5 py-3 mt-3 bg-blue-950 text-white text-lg font-semibold rounded-xl shadow-md 
                hover:bg-blue-800 active:bg-blue-900 transform transition-all duration-300 
                hover:scale-105 active:scale-100"
                onClick={tryanother}
            >
             try another 
            </button>
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Viewquiz;
