import { Component, Prop, State, Watch, h } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss',
  shadow: true,
})
export class MyComponent {
  @Prop() first: string;
  @Prop() middle: string;
  @Prop() last: string;

  @State() userName: string = '';
  @State() userPhone: string = '';
  @State() userAge: number = undefined;

  // Validation for Form
  @State() isFormValidate: boolean = false;

  // Steps
  @State() isFormSubmit: boolean = false;

  private fieldNames = {
    userName: 'userName',
    userPhone: 'userPhone',
    userAge: 'userAge',
  };

  // Validation for Form
  @Watch('userName')
  @Watch('userPhone')
  @Watch('userAge')
  watchMultiple() {
    if (this.userName.length > 3 && this.userPhone.length > 10 && this.userAge >= 18) this.isFormValidate = true;
    else this.isFormValidate = false;
  }

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  private handleEventValue(event: Event, field: string) {
    if (field === this.fieldNames.userName) {
      const input = event.target as HTMLInputElement;
      this.userName = input.value;
      return;
    }

    if (field === this.fieldNames.userPhone) {
      const input = event.target as HTMLInputElement;
      this.userPhone = input.value;
      return;
    }

    if (field === this.fieldNames.userAge) {
      const input = event.target as HTMLInputElement;
      this.userAge = parseInt(input.value);
      return;
    }
  }

  submit() {
    const payload = {
      userName: this.userName,
      userPhone: this.userPhone,
      userAge: this.userAge,
    };

    console.log('payload => ', payload);
    this.isFormSubmit = true;
  }

  render() {
    return (
      <div class={this.isFormSubmit? 'component-container bg-[#f0abfc]' : 'component-container'}>
        {this.isFormSubmit ? (
          <div>
            <h1 class="title center">Yo!!!</h1>
            <div class="greeting center">
              Hello, {this.userName}! I'm {this.getText()}.
            </div>
          </div>
        ) : (
          <div class="center">
            <h1>Please enter your Details</h1>
            <div class="mt-10">
              <div>
                <label>
                  Name:
                  <input type="text" value={this.userName} placeholder="please enter your name!" onInput={event => this.handleEventValue(event, this.fieldNames.userName)} />
                </label>
              </div>
              {this.userName.length > 0 && this.userName.length < 3 && <span class="inputDescription">Please Enter at least 3 characters.</span>}
            </div>
            <div class="mt-2">
              <div>
                <label>
                  Phone:
                  <input type="number" value={this.userPhone} placeholder="+92XXXXXXX" onInput={event => this.handleEventValue(event, this.fieldNames.userPhone)} />
                </label>
              </div>
              {this.userPhone.length > 0 && this.userPhone.length < 10 && <span class="inputDescription">Please Enter at least 11 characters.</span>}
            </div>
            <div class="mt-2">
              <div>
                <label>
                  Age:
                  <input type="number" placeholder="age" onInput={event => this.handleEventValue(event, this.fieldNames.userAge)} />
                </label>
              </div>
              {this.userAge !== undefined && this.userAge < 18 && <span class="inputDescription">Age must be 18</span>}
            </div>
            <div>
              <button class="mt-5" onClick={() => this.submit()} disabled={!this.isFormValidate}>
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
