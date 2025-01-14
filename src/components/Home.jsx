import { UserButton } from "@clerk/clerk-react";
import { useState } from "react";
import { toast } from "sonner";
import { AI_PROMPT } from "@/service/Prompt";
import { chatSession } from "@/service/Aimodel";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Navbar from "./Navbar";
import image from "./images/photo-1606326608606-aa0b62935f2b.avif";
import { useUser } from '@clerk/clerk-react';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "@/service/firebase";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const {user}=useUser();
  const navigatee= useNavigate(); 
  
  console.log(user.id);
  console.log(user.firstName);
  const email = user.emailAddresses[0]?.emailAddress;


  const [loading,setLoading]=useState(false);
  const [formData, setFormData] = useState({
    qns: "10",
    level: "",
    topic: "",
    category: "education",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const generateQuiz=async()=>{
    const FINAL_PROMPT=AI_PROMPT
    .replace('{qns}',formData.qns)
    .replace('{lel}',formData.level)
    .replace('{topic}',formData.topic)
    .replace('{category}',formData.category)

    console.log(FINAL_PROMPT);
    


    try{
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      //console.log(result.response.text());
      saveData(result.response.text());
      setLoading(false);
    }
    catch(e){
      console.log("Error occured :",e );
    }
  }

  const saveData=async(quizData)=>{
    const docId = Date.now().toString();
    await setDoc(doc(db, "quizinfo", docId), {
      userid:user.id,
      username:user.firstName,
      selectedOptions:formData,
      aiOutput:JSON.parse(quizData),
      QuizId:docId,
      emailaddress:email
    });
    
    navigatee('/viewquiz/'+docId);

  }


  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    if (!formData.topic || !formData.qns || !formData.level || !formData.category) {
      toast("Fill all the details !");
    }
    else{
      setLoading(true);
      generateQuiz();
    }
  };

  return (
    <div className="bg-pink-100  min-h-screen ">
      <div>
        <Navbar />
      </div>
      <div className="flex flex-col items-center text-center px-5 ">
        <h1 className="font-bold text-4xl text-blue-950 mb-4">
          Welcome to the Ultimate Quiz Challenge!
        </h1>
        <p className="text-lg text-black">
          Test your knowledge across various topics and challenge yourself to
          achieve the highest score. 😁 Whether you are here to learn, have fun,
          or compete with friends, this quiz is designed to keep you on your
          toes. Are you ready to prove your smarts? Let the game begin!
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-10 mt-10 px-5 ">
        <form
          className="flex flex-col gap-5 bg-white p-8 shadow-lg rounded-lg w-96"
          onSubmit={handlesubmit}
        >
          <label className="text-black font-medium text-lg">
            Enter the topic:
            <input
              placeholder="Type here"
              onChange={handleChange}
              name="topic"
              className="bg-gray-100 rounded-lg border border-gray-300 p-3 mt-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-950"
              required
            />
          </label>
          <label className="text-black font-medium text-lg">
            Choose how many questions:
            <select
              onChange={handleChange}
              name="qns"
              required
              className="bg-gray-100 border border-gray-300 p-3 rounded-lg mt-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-950"
            >
              <option value="" disabled>
                Select no. of questions
              </option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </label>
          <div className="p-5 bg-gray-100 rounded-lg shadow-md w-full max-w-lg">
            <h1 className="text-lg font-bold text-black mb-3">
              Choose Difficulty:
            </h1>
            <div className="flex flex-wrap gap-5">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="level"
                  value="Easy"
                  id="Easy"
                  className="w-5 h-5 accent-blue-950"
                  onChange={handleChange}
                />
                <label htmlFor="easy" className="text-black font-medium">
                  Easy
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="level"
                  value="Medium"
                  id="Medium"
                  onChange={handleChange}
                  className="w-5 h-5 accent-blue-950"
                />
                <label htmlFor="medium" className="text-black font-medium">
                  Medium
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="level"
                  value="Hard"
                  id="Hard"
                  onChange={handleChange}
                  className="w-5 h-5 accent-blue-950"
                />
                <label htmlFor="hard" className="text-black font-medium">
                  Hard
                </label>
              </div>
            </div>
            
          </div>
          <label className="text-black font-medium text-lg">
            Choose category:
            <select
              onChange={handleChange}
              name="category"
              required
              className="bg-gray-100 border border-gray-300 p-3 rounded-lg mt-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-950"
            >
              <option value="" disabled>
                choose any 1 
              </option>
              <option value="Education">Education</option>
              <option value="Sports">Sports</option>
              <option value="Entertainment">Entertainment</option>
              <option value="In General">others</option>
            </select>
          </label>

          <button
            type="submit"
            className="bg-blue-950 text-white font-semibold p-3 rounded-lg active:scale-95 transition-transform hover:bg-blue-900"
          >
            {loading ?(<AiOutlineLoading3Quarters className="animate-spin ml-32 h-5 w-5 "/>):("Submit")}
          </button> 
        </form>

        <div className="w-full max-w-md">
          <img
            src={image}
            alt="Quiz Illustration"
            className="w-full h-[300px] rounded-tl-[100px] rounded-br-[100px] object-cover shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
