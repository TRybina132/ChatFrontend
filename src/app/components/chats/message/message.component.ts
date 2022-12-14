import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../../api/models/Message";
import {Chat} from "../../../api/models/Chat";
import {MatDialog} from "@angular/material/dialog";
import {MessageDeleteDialogComponent} from "../message-delete-dialog/message-delete-dialog.component";
import {AuthHttpService} from "../../../api/services/auth-http.service";
import {MessageEditDialogComponent} from "../message-edit-dialog/message-edit-dialog.component";
import {MessageHttpService} from "../../../api/services/message-http.service";
import {MessageReplyDialogComponent} from "../message-reply-dialog/message-reply-dialog.component";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() message?: Message;
  @Input() chat? : Chat;

  constructor(
    private matDialog : MatDialog,
    public authService : AuthHttpService,
    public messageService : MessageHttpService) { }

  ngOnInit(): void {
  }

  onDelete(){
    const dialog = this.matDialog.open(MessageDeleteDialogComponent,{
      data: this.message
    });

    dialog.afterClosed().subscribe((result : boolean) =>{
      if(result){
        const index : number = this.chat?.messages?.findIndex(message => this.message?.id == message.id) ?? -1;
        if(index >= 0)
          this.chat?.messages?.splice(index,1);
      }
    });
  }

  onEdit(){
    const dialog = this.matDialog.open(MessageEditDialogComponent, {
      data : this.message
    });
  }

  onReply(){

  }

  onPrivateReply(){
    const dialog = this.matDialog.open(MessageReplyDialogComponent,{
      data: this.message
    });
  }

}
