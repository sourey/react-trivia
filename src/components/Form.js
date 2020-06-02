import React, { Component } from "react";
import { URL } from "../utils/Constants";
import { axiosGet } from "../utils/API";
import { Button, LinearProgress, Chip } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

class Form extends Component {
  state = {
    fetchingCategories: false,
    categories: []
  };

  componentDidMount() {
    this.getCategories();
  }

  getCategories = () => {
    this.setState({ fetchingCategories: true });
    axiosGet(URL.categoryURL, response => {
      console.log(response.data);
      this.setState({
        categories: response.data.trivia_categories,
        fetchingCategories: false
      });
    });
  };

  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Paper className="form-container">
            <div className="margin-top">
              <label className="form-label">Categories:</label>
              {"  "}
              {this.state.fetchingCategories === false ? (
                <>
                  <select
                    name="categoryId"
                    value={this.props.categoryId}
                    onChange={e => this.props.handleChange(e)}
                  >
                    <option value=""> Any Category</option>

                    {this.state.categories ? (
                      this.state.categories.map((category, idx) => (
                        <option value={category.id} key={idx}>
                          {category.name}
                        </option>
                      ))
                    ) : (
                      <span>loading ...</span>
                    )}
                  </select>
                </>
              ) : (
                <div className="category-progress">
                  <LinearProgress />
                </div>
              )}
            </div>
            <div className="margin-top">
              <label>Difficulty: </label>
              <select
                name="difficulty"
                value={this.props.difficulty}
                onChange={e => this.props.handleChange(e)}
              >
                <option value="">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="margin-top">
              <label>Question type: </label>
              <select
                name="questionType"
                value={this.props.questionType}
                onChange={e => this.props.handleChange(e)}
              >
                <option value="">Any question type</option>
                <option value="multiple">Multiple Choice</option>
                <option value="boolean">True/False</option>
              </select>
            </div>
            <div className="margin-top">
              <label>Number Of Questions: </label>
              <input
                type="number"
                name="numberOfQuestions"
                onChange={this.props.handleChange}
                value={this.props.numberOfQuestions}
                max={50}
                min={1}
              />
            </div>
            <div className="margin-top">
              <Button
                className="answer-buttons"
                onClick={this.props.handleSubmit}
              >
                Get questions
              </Button>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    );
  }
}

export default Form;
