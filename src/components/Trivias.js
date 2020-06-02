import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

class Trivias extends Component {
  state = {
    disabled: true
  };
  checkAnswers = () => {
    debugger;
    let numberOfAnswers = 0;
    this.props.trivias.map((trivia, id) => {
      if (trivia.hasOwnProperty("choosenAnswer"))
        numberOfAnswers = numberOfAnswers + 1;
    });
    if (numberOfAnswers === this.props.trivias.length)
      this.setState({ disabled: false });
  };

  render() {
    return (
      <div className="trivias">
        <>
          {this.props.trivias.map((trivia, idx) => (
            <Grid container spacing={3}>
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
                <Paper key={idx} className="question-container">
                  <span className="index">{idx + 1}.</span>
                  {window.atob(trivia.question)}
                  <br />
                  {trivia.answers.map((ans, ansIdx) => (
                    <Button
                      color="primary"
                      className={
                        trivia.choosenAnswer === ansIdx
                          ? "answer-buttons selected-answer"
                          : trivia.correctAnswerIndex === ansIdx
                          ? "correct-answer answer-buttons"
                          : "answer-buttons"
                      }
                      onClick={e => {
                        this.props.handleAnswers(e, ansIdx, idx);
                        this.checkAnswers();
                      }}
                    >
                      {window.atob(ans)}
                    </Button>
                  ))}
                </Paper>
              </Grid>
              <Grid item xs={2}>
                {trivia.correct !== undefined ? (
                  <>
                    {trivia.correct ? (
                      <CheckCircleIcon
                        fontSize="large"
                        style={{
                          color: "green",
                          marginTop: "50px",
                          marginRight: "155px"
                        }}
                      />
                    ) : (
                      <CancelIcon
                        fontSize="large"
                        style={{
                          color: "red",
                          marginTop: "50px",
                          marginRight: "155px"
                        }}
                      />
                    )}
                  </>
                ) : null}
              </Grid>
            </Grid>
          ))}
        </>
        {this.props.trivias.length > 0 ? (
          <Button
            className="result-button"
            onClick={this.props.handleResults}
            disabled={this.state.disabled}
          >
            Show Result
          </Button>
        ) : null}
      </div>
    );
  }
}

export default Trivias;
