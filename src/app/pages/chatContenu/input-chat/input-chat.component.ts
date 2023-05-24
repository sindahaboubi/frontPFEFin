import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Reponse } from 'src/app/model/reponse';
import { ChatBotService } from 'src/app/service/chat-bot.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-input-chat',
  templateUrl: './input-chat.component.html',
  styleUrls: ['./input-chat.component.scss']
})
export class InputChatComponent implements OnInit {
 
  questionForm:FormGroup;
  constructor(
    private toastr: ToastrService,
    private fb:FormBuilder,
    private chatService:ChatBotService
  ){}

  ngOnInit(): void {
    if(localStorage.getItem("membre")){
      const membre = JSON.parse(localStorage.getItem("membre"))
      this.questionForm = this.fb.group({
        text:["",[Validators.required,this.questionValidateur()]],
        membreId:membre.id
      })
    }
  }

  questionValidateur(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const scrumTeacher = [
      "product owner",
      "scrum master",
      "sprint backlog",
      "equipe de developpement",
      "scrum guide",
      "product backlog",
      "productbacklog",
      "sprintbacklog",
      "sprint",
      "timebox",
      "burn-up chart",
      "burn-down chart",
      "daily meet",
      "sprint planning",
      "sprint retrospective",
      "sprint review",
      "cahier de charge",
      "agile",
      "scrum",
      "projet scrum",
      "test scrum",
      "agilité",  
    ]
      const value = control.value;
      if (value && !scrumTeacher.some(element => value.includes(element))) {
        return { 'question': true };
      }
      return null;
    };
  }
  
  reponse:Reponse = new Reponse();
  @Output() reponseSent = new EventEmitter<Reponse>();
  envoyerQuestion(){
    if(this.questionForm.valid){
      this.chatService.poserQuestion(this.questionForm.value).subscribe(
        data => {
          const reponse = data
          if (/\<[^\>]+\>/.test(data.text)) {
            reponse.useHtml = false;
          }else{
          reponse.useHtml = true;
          reponse.text = reponse.text.replace(/\n/g, '<br>');
          }
          this.reponse = reponse;
          this.reponseSent.emit(this.reponse);
          this.reponse = {};
        },
        errors=>{
          this.toastr.error(`vous avez déjà envoyer une question paraille`);
        }
      )
    }else{
      console.log("error");
    }
  }

}
