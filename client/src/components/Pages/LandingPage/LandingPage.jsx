import React from "react";
import "./LandingPage.scss";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header>
        <h1>Track All Your Tasks During Your Busy Times</h1>
      </header>
      <main>
        <div className="left">
          <h2>Description : </h2>
          <ul>
            <li>
              <i className="far fa-check-circle"></i>Add A Task
            </li>
            <li>
              <i className="far fa-check-circle"></i>Remove A task
            </li>
            <li>
              <i className="far fa-check-circle"></i>Update a Task's Details
            </li>
            <li>
              <i className="far fa-check-circle"></i>Cross Out a task once
              completed
            </li>
            <li>
              <i className="far fa-check-circle"></i>Be able to modify the date
              and time of any task
            </li>
          </ul>
        </div>
        <div className="left">
          <h2>User Account</h2>
          <ul>
            <li>
              <i className="far fa-check-circle" /> Edit Your Account Details
              Any Time
            </li>
            <li>
              <i className="far fa-check-circle" /> View Your Account Details
            </li>
            <li>
              <i className="far fa-check-circle" /> Updated Password Once Logged
              in
            </li>
            <li>
              <i className="far fa-check-circle" /> Completely Delete Account if
              desired
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
