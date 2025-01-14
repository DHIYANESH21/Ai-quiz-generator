import React, { useState } from "react";
import Navbar from "./Navbar";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import image from "./images/Screenshot_8-1-2025_215510_localhost.jpeg";
import image2 from "./images/Screenshot_8-1-2025_215538_localhost.jpeg";
import { useEffect } from "react";
import { BrainCircuit, History, CheckCircle2 } from 'lucide-react';

const Index = () => {
    const navigate = useNavigate();
    const { user, isLoaded, isSignedIn } = useUser();
    const [his,sethis]=useState(false);
    const [userid,setuserid] = useState();

    const handleLogin = () => {
        if (!isSignedIn && isLoaded) {
            console.log(isLoaded, isLoaded);
            navigate("/signin");
        } else if (isSignedIn) {
            navigate('/home');
        }
    }

      useEffect(() => {
        if (isLoaded && user) {
          setuserid(user.id);
        }
      }, [isLoaded, user, userid]);

    const handleChart=(index)=>{
      if ((index)==0){
        navigate('/home')
      }
      else if (index==1){
        navigate('/home')
      }
      else{
        if(!his){
          navigate('/history/'+userid);
          sethis(true);
        }
        else{
          navigate('/home');
          sethis(false);
        }
      }
    }

    const features = [
        {
            icon: <BrainCircuit className="w-6 h-6 text-pink-500" />,
            title: "AI Quiz Generation",
            description: "Get instant, personalized quizzes to test your knowledge"
        },
        {
            icon: <CheckCircle2 className="w-6 h-6 text-pink-500" />,
            title: "Take Quizzes",
            description: "Challenge yourself with interactive questions and get immediate feedback"
        },
        {
            icon: <History className="w-6 h-6 text-pink-500" />,
            title: "Track History",
            description: "Review your past quizzes and monitor your progress over time"
        }
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            
            {/* Hero Section */}
            <div className="bg-gradient-to-b from-sky-50 to-white">
                <div className="max-w-6xl mx-auto px-4 pt-20 pb-32">
                    <div className="flex flex-col justify-center items-center gap-6 text-center">
                        <h1 className="text-sky-950 text-5xl md:text-6xl font-bold max-w-3xl">
                            AI-Powered <span className="text-pink-500">Quiz Generator</span>
                        </h1>
                        <h2 className="font-semibold text-xl text-gray-600 max-w-2xl">
                            Generate custom quizzes instantly, test your knowledge, and track your progress all in one place.
                        </h2>
                        <Button 
                            onClick={handleLogin}
                            className="mt-4 text-lg px-8 py-6 bg-blue-950 hover:bg-pink-600"
                        >
                            Start Your Quiz Journey
                        </Button>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-12">
                        {features.map((feature, index) => (
                            <div key={index} className="flex flex-col items-center text-center p-6 rounded-xl hover:shadow-xl transition-shadow bg-pink-100" onClick={()=>{handleChart(index)}}>
                                <div className="bg-pink-50 p-4 rounded-full mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-sky-950 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Screenshot Section */}
            <div className="bg-gray-50 py-24">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-sky-950 mb-4">Simple and Effective Quiz Platform</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Generate quizzes, test your knowledge, and track your progress with our intuitive interface.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="group">
                            <div className="relative rounded-xl overflow-hidden shadow-2xl transition-all hover:-translate-y-2">
                                <img 
                                    src={image2} 
                                    alt="Quiz Generation Interface" 
                                    className="w-full h-auto object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <h3 className="text-xl font-bold">Quiz Generation</h3>
                                        <p className="text-sm">Create custom quizzes instantly with AI</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="group">
                            <div className="relative rounded-xl overflow-hidden shadow-2xl transition-all hover:-translate-y-2">
                                <img 
                                    src={image} 
                                    alt="Quiz History View" 
                                    className="w-full h-auto object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <h3 className="text-xl font-bold">Attractive UI</h3>
                                        <p className="text-sm">Answer your quiz and get the marks for it ! </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-sky-950 text-white py-12 mt-auto">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-4">EasyQuizzy</h3>
                        <p className="text-sky-200 max-w-md mx-auto mb-6">
                            Generate quizzes, test your knowledge, and track your progress with our AI-powered platform.
                        </p>
                        <p className="text-sky-200 text-sm">
                            &copy; 2025 EasyQuizzy. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Index;