import InformationCard from "./InformationCard";

const Information = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 pt-16 pb-16 bg-[#FFFCF2]">
      <h1 className="text-3xl font-bold mb-6">Important Information</h1>

      <div className="flex gap-8">
        <InformationCard heading="Important information for people who don’t have legal status in Canada or who are temporary residents">
          <p className="mb-4">
            <strong>Important</strong>
          </p>
          <p>
            If you do not have legal status in Canada, or if you are a temporary
            resident, you should seek legal advice before applying to any
            benefits. If you get benefits that you aren’t eligible for, you
            might end up having to pay them back. You can find free legal
            services for people living on low incomes on the Government of
            Canada’s Legal Aid Program website. On it, there are links for
            programs in every province and territory.
          </p>
        </InformationCard>

        <InformationCard heading="Important information about benefits for Indigenous peoples (First Nations, Inuit, Métis, or other)">
          <p className="mb-4">
            <strong>Important</strong>
          </p>
          <p>
            If you are Indigenous, there are many things that affect the
            benefits you can get and the dollar amounts you can receive. These
            include the agreements your band or governing body has with
            provincial, territorial, and federal governments. Before applying to
            any benefits, you should speak with your governing body, if
            applicable.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              If you are First Nations: speak with your administration, band, or
              governing body.
            </li>
            <li>
              If you are Inuit: speak with your governing body or hamlet
              administration office.
            </li>
            <li>
              If you are Métis: speak with your governing body, if applicable.
            </li>
          </ul>
          <p>
            AFOA Canada and Prosper Canada are currently seeking funding to
            develop an online tool that serves the needs of Indigenous people
            living in Canada.
          </p>
        </InformationCard>
      </div>
    </div>
  );
};

export default Information;
