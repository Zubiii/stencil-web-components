import { Component, Prop, State, h } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss',
  shadow: true,
  // scoped: true,
})
export class MyComponent {
  @Prop() first: string;
  @Prop() middle: string;
  @Prop() last: string;

  @State() userName: string = '';
  @State() userPhone: string = '';
  @State() userAge: Number = undefined;

  private fieldNames = {
    userName: 'userName',
    userPhone: 'userPhone',
    userAge: 'userAge'
  }

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  private handleEventValue(event: Event, field: string) {
    if (field === this.fieldNames.userName) {
      const input = event.target as HTMLInputElement;
      console.log('event.target.value => ', input.value, field)
      this.userName = input.value;
      return
    }

    if (field === this.fieldNames.userPhone) {
      const input = event.target as HTMLInputElement;
      console.log('event.target.value => ', input.value, field)
      this.userPhone = input.value;
      return
    }

    if (field === this.fieldNames.userAge) {
      const input = event.target as HTMLInputElement;
      console.log('event.target.value => ', input.value, field)
      this.userAge = parseInt(input.value);
      return
    }
  }

  submit() {
    const payload = {
      'userName' : this.userName,
      'userPhone' : this.userPhone,
      'userAge': this.userAge,
    }

    console.log('payload => ', payload)
  }

  render() {
    return (
      <div class="component-container">
        <h1 class="title center">Yo!!!</h1>
        <div class="greeting center">Hello, World! I'm {this.getText()}.</div>
        <div class="center mt-10">
          <div>
            <label>
              Name:
              <input 
                type="text" 
                value={this.userName} 
                placeholder="please enter your name!" 
                onInput={event => this.handleEventValue(event, this.fieldNames.userName)} 
              />
            </label>
          </div>
          <div>
            <label>
              Phone:
              <input 
                type="number" 
                value={this.userPhone} 
                placeholder="+92XXXXXXX" 
                onInput={event => this.handleEventValue(event, this.fieldNames.userPhone)}
              />
            </label>
          </div>
          <div>
            <label>
              Age:
              <input 
                type="number" 
                placeholder="age" 
                onInput={event => this.handleEventValue(event, this.fieldNames.userAge)} 
              />
            </label>
          </div>
          <div>
            <button
              class="mt-10"
              onClick={() => this.submit()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
