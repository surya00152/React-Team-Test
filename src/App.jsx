import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        const { component } = this.props;
        return(
            <div>
                {component}
            </div>
        );
    }
}

export default App;
