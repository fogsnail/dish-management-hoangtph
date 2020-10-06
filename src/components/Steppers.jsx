import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});
const steps = ["Step 1", "Step 2", "Step 3", "Review"];
class Steppers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealCategory: "",
      numberOfPeople: "",
      restaurant: "",
      activeStep: 0,
      items: [],
    };
  }
  handleBack = () => {
    var activeStep = this.state.activeStep - 1;
    this.setState({
      activeStep: activeStep,
    });
  };
  validator = (activeStep) => {
    if (activeStep === 1) {
      if (!this.state.mealCategory) {
        toast.warning("Please select Meal Category!");
        return 0;
      }
    }
    if (activeStep === 1) {
      if (!this.state.numberOfPeople) {
        toast.warning("Please select Number Of People !");
        return 0;
      }
    }
    if (activeStep === 2) {
      if (this.state.restaurant == "") {
        toast.warning("Please select Restaurant !");
        return 0;
      }
    }
    if (activeStep === 3) {
      var {items} = this.state
      console.log(items)      
      if (items == ""){
        items = []
      }
      console.log(items)      
      var total = 0;
      items.map((value) => {
        total += value.numberOfServings
      })
      console.log(total)
      if (this.state.numberOfPeople > total ) {
        toast.warning("Please add Dish or Servings!");
        return 0
      }
      return 1
    }
    return 1;
  };
  handleNext = () => {
    console.log(this.state)
    var activeStep = this.state.activeStep + 1;
    var result = this.validator(activeStep);
    console.log(result);
    if (result === 1) {
      this.setState({
        activeStep: activeStep,
      });
    }
  };
  handleReset = () => {
    this.setState({
      activeStep: 0,
      mealCategory: "",
      numberOfPeople: "",
      restaurant: "",
      activeStep: 0,
      items: [],
    });
  };
  checkStep = () => {
    var { activeStep } = this.state;
    switch (activeStep) {
      case 0:
        return "Select meal category and number of people";
      case 1:
        return "Select Restaurants";
      case 2:
        return "Select Dish and Servings";
      default:
        return "Over view";
    }
  };

  onUpdateStep1 = (data) => {
    this.setState(
      {
        mealCategory: data.mealCategory,
        numberOfPeople: data.numberOfPeople,
      },
      function () {
        console.log(this.state);
      }
    );
  };

  onUpdateStep2 = (data) => {
    this.setState(
      {
        restaurant: data.restaurant,
      },
      function () {
        console.log(this.state);
      }
    );
  };
  onUpdateStep3 = (data) => {
    console.log(data);
    this.setState(
      {
        items: data,
      },
      function () {
        console.log(this.state);
      }
    );
  };
  render() {
    var { activeStep, mealCategory, restaurant } = this.state;
    return (
      <div className="app">
        <div className="Steppers">
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Button onClick={this.handleReset} color="default">
                  Reset
                </Button>
              </div>
            ) : (
              <div>
                <h1>
                  <Typography
                    align="center"
                    variant="h5"
                    color="primary"

                    //   className={classes.instructions}
                  >
                    {this.checkStep(activeStep)}
                  </Typography>
                </h1>

                <div>
                  <Button disabled={activeStep === 0} onClick={this.handleBack}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                  >
                    {activeStep === steps.length - 1 ? "Submit" : "Next"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <hr />
        <div className="container">
          {activeStep === 0 ? <Step1 onUpdateStep1={this.onUpdateStep1}  listSelected={this.state} /> : ""}
          {activeStep === 1 ? (
            <Step2
              onUpdateStep2={this.onUpdateStep2}
              mealCategory={mealCategory}
              restaurant={restaurant}
              listSelected={this.state}
            />
          ) : (
            ""
          )}
          {activeStep === 2 ? (
            <Step3
              onUpdateStep3={this.onUpdateStep3}
              mealCategory={mealCategory}
              restaurant={restaurant}
              listSelected={this.state}
            />
          ) : (
            ""
          )}
          {activeStep === 3 ? <Step4 listSelected={this.state} /> : ""}
        </div>
      </div>
    );
  }
}

export default Steppers;
