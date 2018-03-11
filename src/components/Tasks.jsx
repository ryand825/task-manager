import React, { Component } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
// import FeatureDiscovery from './materialize/FeatureDiscovery';
import muiThemeable from 'material-ui/styles/muiThemeable';

const addButtonStyle = {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    margin: '0'
}

class Tasks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            circleDiameter: '50px',
            fontSize: '0'
        }
    }

    setCircleHintStyle = () => {
        return ({
            width: this.state.circleDiameter,
            height: this.state.circleDiameter
        })
    }

    toggleCircle = () => {
        if (this.state.circleDiameter === '50px') {
            this.setState({ circleDiameter: '450px', fontSize: '1em' });
            this.props.muiTheme.changeTheme();
        } else {
            this.setState({ circleDiameter: '50px', fontSize: '0' });
        }
    }

    render() {
        return (
            <div>

                <FloatingActionButton onClick={this.toggleCircle} style={addButtonStyle}>
                    <ContentAdd />
                </FloatingActionButton>

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
            </div>
        )
    }
}

export default muiThemeable()(Tasks);