import { Component } from "@angular/core"
import questions from "../questions.json"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {

  questionIndex = 0
  answeredQuestions = {}
  correctAnswersCount = 0
  finished = false
  questions = questions

  nextQuestion() {
    if (this.questionIndex < this.questions.length - 1) {
      this.questionIndex++
    } else {
      this.finished = true
    }
  }

  previousQuestion() {
    if (this.questionIndex > 0) {
      this.questionIndex--
    }
  }

  answerQuestion(answer: string) {
    const isCorrectAnswer = questions[this.questionIndex].correct === answer
    this.answeredQuestions = { ...this.answeredQuestions, [this.questionIndex]: { answer, correct: isCorrectAnswer } }
    if (isCorrectAnswer) {
      this.correctAnswersCount++
    } else if (this.correctAnswersCount > 0) {
      this.correctAnswersCount--
    }
  }

  formatTitle() {
    const currentQuestion = this.questions[this.questionIndex]
    const titleWords = currentQuestion.title.replace("?", "").split(/\s+/g)
    return (
      titleWords.reduce((acc, word) => {
        if (currentQuestion.outlinedWords.includes(word)) {
          console.log("acc = ", acc)
          return `${acc} <i>${word}</i>`
        } else {
          console.log(word)
          return `${acc} ${word}`
        }
      }, "") + " ?"
    )
  }

  calculatePercent() {
    const percent = (this.correctAnswersCount / this.questions.length) * 100
		return Math.floor(percent) + +(percent % 1).toFixed(2)
  }

  resetQuiz() {
    this.questionIndex = 0
    this.answeredQuestions = {}
    this.correctAnswersCount = 0
    this.finished = false
    this.questions = questions
  }
}
