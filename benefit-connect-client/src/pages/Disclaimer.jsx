import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Disclaimer = () => {
  const { isAuthenticated } = useContext(AppContext);

  return (
    <div
      className={`${
        isAuthenticated ? "sm:ml-64" : "w-full"
      } flex flex-col items-center justify-center min-h-screen mb-8`}
    >
      <h1 className="text-3xl font-bold mb-2 mt-32">Disclaimer</h1>
      <div className="max-w-2xl text-left rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Copyright</h2>
        <p className="mb-4 text-justify">
          The internet domain name <strong>benefit-connect.org</strong> is the
          property of Prosper USA. American copyright law and international
          treaties protect the textual, graphic, audio, and audiovisual material
          in this site.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          External links and resources
        </h2>
        <p className="text-justify">
          This site is not intended to provide professional advice. Any links to
          third-party websites outside of the Benefits Wayfinder website and any
          external resources (applications, and the like) are for your
          convenience solely. The operation and content of such third-party
          websites and resources are beyond Prosper USA&apos;s control. Prosper
          USA does not endorse in any manner whatsoever or accept any
          responsibility for the content or other material that may be contained
          on such resources and websites, or any products or services advertised
          on or sold through them. Prosper USA will not be liable under any
          circumstances for any damages resulting from use of this website or
          any other third-party website and resources linked to this website.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;
