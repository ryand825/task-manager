import React, { Component } from 'react';

const addButtonStyle = {
    position: 'absolute',
    bottom: '20px',
    right: '20px'
}

class SeeHere extends Component {
    constructor() {
        super()

    }

    render() {
        return (
            <div className="circleBox">
                <div className="circleHint" style={{
                    width: this.state.circleDiameter,
                    height: this.state.circleDiameter,
                    background: `radial-gradient(white,
                     ${this.props.muiTheme.palette.primary1Color} 25%,
                     ${this.props.muiTheme.palette.primary1Color} 100%)`
                }}>
                    <span className='featureText' style={{ fontSize: this.state.fontSize }}>Click the PLUS<br /> button to add <br /> your first task!</span>
                </div>
            </div>
        )
    }
}

export default SeeHere