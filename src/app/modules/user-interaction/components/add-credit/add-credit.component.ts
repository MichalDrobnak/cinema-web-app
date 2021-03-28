import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/modules/shared/services/user.service';

@Component({
  selector: 'app-add-credit',
  templateUrl: './add-credit.component.html',
  styleUrls: ['./add-credit.component.scss'],
})
export class AddCreditComponent implements OnInit {
  creditFormGroup = new FormGroup({
    credit: new FormControl('', Validators.required),
  });

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  addCredit(): void {
    const { credit } = this.creditFormGroup.value;

    if (credit) {
      this.userService.addCredit(credit).subscribe();
    }
  }
}
