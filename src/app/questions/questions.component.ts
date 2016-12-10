import { Component, OnInit } from '@angular/core';
import { QuestionService } from './shared/question.service';
import {Question} from "./shared/question";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  private questions: Question[] = [];

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.questionService.getQuestions()
      .subscribe(data => this.questions = data);
  }

  deleteQuestion(questions) {
    if (confirm("Você tem certeza que quer deletar a questions " + questions.title + "?")) {
      var index = this.questions.indexOf(questions);
      this.questions.splice(index, 1);

      this.questionService.deleteQuestion(questions.id)
        .subscribe(null);
    }
  }

}
