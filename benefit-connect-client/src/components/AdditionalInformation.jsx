import minimize from "../assets/minimize.jpg";
import maximize from "../assets/maximize.jpg";
import family from "../assets/family.jpg";

// FBFAF9;
const AdditionalInformation = () => {
  return (
    <>
      <div className="bg-[#FFFCF2] pt-4 pb-20">
        <div className="flex flex-col">
          <h4 className="mt-8 text-2xl font-semibold text-start ml-8">
            Do you want help making the most of your money?
          </h4>
          <p className="mt-8 text-start ml-8">
            How we manage our money is personal. It changes based on what is
            important to us, and how much money we have to manage.
          </p>
          <p className="mt-2 text-start ml-8 pr-6">
            Whatever our approach, we all need to manage what is coming in and
            what is going out. This tool can help you check-in — to see if there
            are new ideas that might help you improve how you manage your money.
          </p>
          <p className="mt-2 text-start ml-8">
            Click on Get started to open the sections you want to explore.
          </p>
        </div>
        <div className="flex justify-around gap-2 m-4 p-2">
          {/* flex-wrap */}
          <div className="flex-1 max-w-sm">
            <div className="h-full border border-gray-200 rounded-lg shadow-lg shadow-slate-400 bg-[#F4F2EF] dark:border-gray-700 hover:bg-[#f9f9f9] transition duration-400 ease-in-out text-justify">
              <img
                className="rounded-t-lg w-full h-auto"
                src={maximize}
                alt=""
              />
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900">
                    Maximize what is around you
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700">
                  If you worry about paying your bills, affording basic needs,
                  and saving money, you are not alone. Our expenses keep
                  increasing and often, the money we earn or receive may feel
                  like it is not enough. Managing your money can be stressful.
                  However, there are ways to make the most of the resources
                  available to you so that you can better manage your finances
                  and not feel as overwhelmed. You can start by tracking what is
                  coming in. In this module, you will see how you can maximize
                  what`&apos;s around you through benefits, community resources,
                  and investing in yourself.
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 max-w-sm">
            <div className="h-full border border-gray-200 rounded-lg shadow-lg shadow-slate-400 bg-[#F4F2EF] dark:border-gray-700 hover:bg-[#f9f9f9] transition duration-400 ease-in-out text-justify">
              <img
                className="rounded-t-lg w-full h-auto"
                src={minimize}
                alt=""
              />
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900">
                    Minimize what is going out
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700">
                  Managing your money involves maximizing what is coming in. It
                  also involves minimizing what is going out. Minimizing what is
                  going out can help you find money to save. This can be done by
                  managing your expenses, debt, and by protecting yourself and
                  your money. All of these details will be covered in this
                  module.
                </p>
                <p className="mb-3 font-normal text-gray-700">
                  Let`&apos;s get started!
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 max-w-sm">
            <div className="h-full border border-gray-200 rounded-lg shadow-lg shadow-slate-400 bg-[#F4F2EF] dark:border-gray-700 hover:bg-[#f9f9f9] transition duration-400 ease-in-out text-justify">
              <img className="rounded-t-lg w-full h-auto" src={family} alt="" />
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900">
                    Additional Resources
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700">
                  Managing your money involves increasing what is coming in and
                  decreasing what is going out. Tracking your income and
                  expenses, filing your taxes, taking advantage of community
                  resources, and managing your debt are a few ways that help you
                  manage your financial situation. We have looked at these
                  concepts in the previous two modules. In this module, you have
                  the option to look into additional resources for these topics.
                </p>
                <p className="mb-3 font-normal text-gray-700">
                  Let&apos;s get started!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdditionalInformation;
