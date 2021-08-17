import "../styles/styles.scss";

import _ from 'lodash';

class Foo {
    constructor(
        public a: string,
        public b: number
    ) {}

    public concat(): string {
        return this.a + this.b;
    }
}


let foo: Foo = new Foo('1', 2);

console.log(foo.concat());
