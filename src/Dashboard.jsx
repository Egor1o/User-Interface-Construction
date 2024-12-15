import React from "react";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import CostChart from './components/CostChart'

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4">
      <section
        id="intro"
        className="flex flex-col max-w-4xl gap-4 p-6 mx-auto mt-8 rounded-lg shadow-lg bg-gray-50"
      >
        <h1 className="mb-6 text-3xl font-bold text-center text-blue-600">
          Welcome to mLearning for Estimating Electricity Usage!
        </h1>
        <p className="text-lg leading-relaxed text-gray-700">
          Understanding and managing your electricity consumption has never been
          easier! With our intuitive educational platform, you can explore and
          evaluate the power requirements of your everyday household appliances.
          Whether you're curious about your refrigerator's energy efficiency or
          wondering how much electricity your TV uses, our tool helps you make
          informed decisions and save on energy costs.
        </p>

        <p className="text-lg leading-relaxed text-gray-700">
          Start by exploring individual appliance pages, such as{" "}
          <a href="/tv" className="text-blue-500 hover:underline">
            TV
          </a>
          ,{" "}
          <a href="/refrigerator" className="text-blue-500 hover:underline">
            Refrigerator
          </a>
          ,{" "}
          <a href="/drying-cabinet" className="text-blue-500 hover:underline">
            Drying Cabinet
          </a>
          ,{" "}
          <a href="/sauna" className="text-blue-500 hover:underline">
            Sauna
          </a>
          , and{" "}
          <a href="/dishwasher" className="text-blue-500 hover:underline">
            Dishwasher
          </a>
          . You can specify the details of your devices and instantly see their
          monthly electricity consumption.
        </p>

        <p className="text-lg leading-relaxed text-gray-700">
          Once you've entered your device details, head over back here to the{" "}
          <a href="#dashboard" className="text-blue-500 hover:underline">
            Dashboard
          </a>{" "}
          to view combined consumption data from all your appliances. This
          comprehensive overview helps you track your energy usage and make
          smarter decisions to save electricity and money.
        </p>

        <p className="text-lg leading-relaxed text-gray-700">
          We encourage you to explore, experiment, and see how small changes in
          your household can lead to big savings on both your energy bill and
          the planet's health. Start learning today!
        </p>

        <p className="text-lg leading-relaxed text-gray-700">
          Curious to learn more about how you can optimize your energy usage?
          Check out these valuable resources for further research:
        </p>

        <ul className="pl-6 text-gray-700 list-disc">
          <li>
            <a
              href="https://www.energy.gov/energysaver/energy-saver"
              target="_blank"
              className="text-blue-500 hover:underline"
              rel="noreferrer"
            >
              U.S. Department of Energy: Energy Saver
            </a>
          </li>
          <li>
            <a
              href="https://www.energystar.gov/"
              target="_blank"
              className="text-blue-500 hover:underline"
              rel="noreferrer"
            >
              Energy Star: Save Energy, Save Money
            </a>
          </li>
        </ul>
      </section>

      <div className="flex flex-row flex-wrap gap-4">
        <BarChart />
        <CostChart />
        <PieChart />
      </div>
    </div>
  );
};

export default Dashboard;
