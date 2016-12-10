import { Component, OnInit } from '@angular/core';
// Importa nosso service para conseguirmos falar com a API
import { QuestionService } from '../shared/question.service';
// Importa nosso Model
import {Question} from "../shared/question";
// Importa o Router para podermos conseguir pegar o parâmetro id
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {

  // Cria uma váriavel string para falarmos se é uma edição ou criação de Question
  title: string;
  // Pega nosso Model e coloca na varáivel question
  question: Question = new Question();

  constructor(
    //Declara nossas dependencias
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  // Esse método rola no quando a página é carregada para preencher
  // a question caso seja edição
  ngOnInit() {
    var id = this.route.params.subscribe(params => {
      var id = params['id'];

      this.title = id ? 'Edit Faq Question' : 'Create Faq Question';

      if (!id)
        return;

      this.questionService.getQuestion(id)
        .subscribe(
          question => this.question = question,
          response => {});
    });
  }

  // Nós chamamos esse método no form quando estamos prontos para criar
  // uma questão ou editar
  save() {
    var result;

    if (this.question.id){
      result = this.questionService.updateQuestion(this.question);
    } else {
      result = this.questionService.addQuestion(this.question);
    }

    result.subscribe(data => this.router.navigate(['/']));
  }

}
