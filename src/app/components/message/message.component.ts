import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../shared/services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.less']
})
export class MessageComponent implements OnInit {

  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

}
