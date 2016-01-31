///<reference path="../typings/tsd.d.ts"/>
"use strict";

import * as React from "react";
import * as ReactDOM from "react-dom";

interface IAppProps extends React.Props<any> {
  test: String;
}

class App extends React.Component<IAppProps, any> {

  constructor(props: IAppProps) {
    super(props);
    console.log(props.test);
  }

  public render(): JSX.Element {
    return <div>Hello, World!</div>;
  }
}

ReactDOM.render(<App test={"test"}/>, document.getElementById("react-container"));

