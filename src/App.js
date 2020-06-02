import React, { Component } from "react";
import Form from "./components/Form";
import Trivias from "./components/Trivias";
import { axiosGet } from "./utils/API";
import { URL } from "./utils/Constants";
import { LinearProgress } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    trivias: [],
    categoryId: "",
    difficulty: "",
    questionType: "",
    numberOfQuestions: 3,
    fetchingTrivias: false,
    showingResults: false
  };

  componentDidMount() {
    this.setState({ showingResults: false });
  }

  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ fetchingTrivias: true });
    axiosGet(
      URL.triviasURL +
        `amount=${this.state.numberOfQuestions}&category=${this.state.categoryId}&difficulty=${this.state.difficulty}&type=${this.state.questionType}&encode=base64`,
      response => {
        if (response.status === 200) {
          let transformedTrivias = this.transformTrivias(response);
          this.setState({
            trivias: transformedTrivias,
            fetchingTrivias: false,
            showingResults: false
          });
        }
      }
    );
  };

  // Durstenfeld shuffle, a computer-optimized version of Fisher-Yates Shuffle
  shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  transformTrivias = response => {
    let transformedTrivias = [...response.data.results];
    transformedTrivias.forEach((trivia, idx) => {
      trivia.incorrect_answers.push(trivia.correct_answer);
    });
    transformedTrivias.forEach((trivia, idx) => {
      trivia.answers = this.shuffleArray(trivia.incorrect_answers);
    });
    return transformedTrivias;
  };

  handleAnswers = (ans, ansIndex, quesIndex) => {
    let newTrivias = [...this.state.trivias];
    newTrivias[quesIndex].choosenAnswer = ansIndex;
    this.setState({ trivias: newTrivias });
  };

  handleResults = () => {
    let results = [...this.state.trivias];
    let numberOfCorrectAnswers = 0;
    results.forEach((result, id) => {
      if (
        result.correct_answer === result.incorrect_answers[result.choosenAnswer]
      ) {
        result.correct = true;
        ++numberOfCorrectAnswers;
      } else {
        result.correct = false;
      }
      return numberOfCorrectAnswers;
    });
    results.forEach((result, id) => {
      let correctAnswerIndex = result.answers.indexOf(result.correct_answer);
      result.correctAnswerIndex = correctAnswerIndex;
    });
    this.setState(
      { trivias: results, showingResults: true },
      this.returnToast(numberOfCorrectAnswers)
    );
  };
  returnToast = num => {
    if (num === 0) toast.error(`You have ${num} correct answers.`);
    else if (num > 0 && num < this.state.trivias.length)
      toast.warn(
        `You have ${num} correct ${num === 1 ? `answer.` : `answers.`}`
      );
    else if (num === this.state.trivias.length)
      toast.success(`Congratulations,
      You gave all right answers.`);
  };

  render() {
    return (
      <div className="App">
        <ToastContainer />
        <Form
          categoryId={this.state.categoryId}
          difficulty={this.state.difficulty}
          questionType={this.state.questionType}
          numberOfQuestions={this.state.numberOfQuestions}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
        {this.state.fetchingTrivias === false ? (
          <Trivias
            trivias={this.state.trivias}
            handleAnswers={this.handleAnswers}
            handleResults={this.handleResults}
          />
        ) : (
          <div className="progress">
            <LinearProgress />
          </div>
        )}
      </div>
    );
  }
}

export default App;
