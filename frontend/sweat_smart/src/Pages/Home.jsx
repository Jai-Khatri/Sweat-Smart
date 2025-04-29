import React from "react";
import { Link } from "react-router-dom";
import Gym1 from "../assets/Gym1.jpg";
import Gym2 from "../assets/Gym2.jpg";

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-[#16222a] to-[#3a6073] text-white min-h-screen">
      
      {/* Hero Section */}
      <header className="relative flex flex-col items-center justify-center text-center py-32 px-6">
        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
          Unlock Your <span className="text-[#4ab3b6]">Full Potential</span>
        </h1>
        
        <p className="mt-6 text-lg md:text-xl max-w-3xl text-gray-300">
          Join <span className="font-bold text-white">Sweat Smart Gym</span> and transform your fitness journey 
          with expert coaching, top-notch equipment, and an empowering community.
        </p>
        
        <Link
          to="/user-login"
          className="mt-10 bg-[#4ab3b6] hover:bg-[#35888e] text-white font-semibold text-lg px-10 py-4 rounded-lg transition duration-300 shadow-lg"
        >
          Get Started Today
        </Link>
      </header>

      {/* Image Section - Gym */}
      <div className="w-full h-[600px] relative mt-10">
        <img
          src={Gym1}
          alt="Gym Interior"
          className="w-full h-full object-cover brightness-75"
        />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-40">
          <h2 className="text-4xl font-bold">State-of-the-Art Facility</h2>
          <p className="mt-3 text-lg max-w-xl">
            Train with the latest equipment and enjoy a top-tier fitness environment.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-12">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { title: "Expert Trainers", text: "Our highly certified trainers bring years of industry experience to provide expert guidance and support. Whether you’re looking to lose weight, gain muscle, or enhance endurance, they’ll craft a structured plan tailored to your goals." },
            { title: "Group Classes", text: "Stay motivated with a variety of high-energy group workouts, including HIIT, Zumba, Yoga, Spin, and more. Our classes are designed to boost endurance, burn calories, and improve flexibility." },
            { title: "Modern Equipment", text: "We believe in providing only the best fitness technology. Our gym is equipped with state-of-the-art cardio machines, strength-training rigs, free weights, and functional fitness tools to help you maximize performance." },
            { title: "Personalized Workouts", text: "No more guessing! Our personalized workout plans are designed to fit your fitness level and objectives. Whether you're a beginner or an experienced athlete, our trainers analyze your strengths and weaknesses." },
            { title: "Nutritional Guidance", text: "Achieving your fitness goals isn’t just about working out—it’s about eating right too. Our nutrition experts provide tailored meal plans, supplement advice, and diet tracking to ensure you get the right nutrients." },
            { title: "24/7 Access", text: "We know that life gets busy, so we keep our doors open 24/7. Whether you're an early riser who loves to start the day with a workout or someone who prefers late-night sessions, our round-the-clock access ensures you never miss a day." },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-[#1e2f3d] p-6 rounded-lg shadow-lg text-center transition hover:scale-105"
            >
              <h3 className="text-2xl font-semibold">{feature.title}</h3>
              <p className="mt-3 text-gray-300">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Image Section - Weight Lifting */}
      <div className="w-full h-[700px] relative mt-10">
        <img
          src={Gym2}
          alt="Weight Lifting"
          className="w-full h-full object-cover brightness-75"
        />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-40">
          <h2 className="text-4xl font-bold">Push Beyond Limits</h2>
          <p className="mt-3 text-lg max-w-xl">
            Get stronger, feel better, and break through your fitness barriers.
          </p>
        </div>
      </div>

      {/* Testimonials Section */}
      <section className="py-16 px-6 md:px-12 bg-[#1e2f3d]">
        <h2 className="text-4xl font-bold text-center mb-12">What Our Members Say</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { quote: '"This gym has completely changed my life. The trainers are amazing and so motivating!"', name: "- Alex J." },
            { quote: '"Love the group classes! I’ve never been this fit and healthy before." ', name: "- Sarah M." },
            { quote: '"State-of-the-art equipment and a great atmosphere. Highly recommend!"', name: "- John D." },
            { quote: '"The 24/7 access is a game changer! I can work out anytime, no excuses." ', name: "- Emily R." },
            { quote: '"The personalized training plans really helped me stay on track and see real results!" ', name: "- Mike S." },
            { quote: '"Best investment I’ve made for my health. The staff is super friendly and knowledgeable." ', name: "- Jessica L." },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#3a6073] p-6 rounded-lg shadow-lg text-center transition hover:scale-105"
            >
              <p className="italic">{testimonial.quote}</p>
              <h4 className="mt-4 font-bold">{testimonial.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 text-center bg-[#16222a]">
        <h2 className="text-5xl font-extrabold">
          Start Your Transformation Today!
        </h2>

        <p className="mt-5 text-lg max-w-xl mx-auto text-gray-300">
          Take the first step toward a healthier, stronger you. Join 
          <span className="font-bold text-white"> Sweat Smart Gym</span> and unlock a world of fitness possibilities.
        </p>

        <Link
          to="/user-login"
          className="mt-8 inline-block bg-[#4ab3b6] hover:bg-[#35888e] text-white font-semibold text-lg px-10 py-4 rounded-lg transition duration-300 shadow-lg"
        >
          Join Now
        </Link>
      </section>

    </div>
  );
};

export default Home;
