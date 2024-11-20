import { useContext } from "react";
import usa from "../assets/usa.png";
import { AppContext } from "../context/AppContext";

function About() {
  const { isAuthenticated } = useContext(AppContext);

  return (
    <div
      className={`${
        isAuthenticated ? "sm:ml-64" : "w-full"
      } min-h-screen bg-gray-100 p-8 pt-40`}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About</h1>
        <p className="text-gray-600 mb-8">
          For many people, searching for government benefits can feel like
          wading through a huge ocean of information. With so many benefits
          programs out there, it can be hard for people to know where to start
          and what benefits they could get.
        </p>
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          The Benefit Connect
        </h2>
        <p className="text-gray-600 mb-8">
          The Benefit Connect is a simple, easy-to-use, plain language tool that
          helps people on low and modest incomes find and track benefits they
          could get. The information and resources provided are from federal,
          provincial, and territorial governments, updated on an ongoing basis
          as new information becomes available.
        </p>
        <p className="text-gray-600 mb-8">
          Individuals can use the tool on their own or with the support of an
          agency staff person.
        </p>
      </div>

      <div className="max-w-3xl mx-auto text-center mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Development and Support
        </h2>
        <p className="text-gray-600">
          The Benefit Connect was developed by Prosper USA and sponsored by Bank
          of America.
        </p>
      </div>

      <div className="max-w-3xl mx-auto text-center mt-12">
        <h3 className="text-lg font-medium text-gray-600">Supported by</h3>
        <img
          className="w-48 rounded-full mt-4 mx-auto"
          src={usa}
          alt="Supported by USA"
        />
      </div>
    </div>
  );
}

export default About;
