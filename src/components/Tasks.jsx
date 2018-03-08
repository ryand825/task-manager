import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { app } from '../base'

class Tasks extends Component {
    constructor() {
        super()

    }

    render() {
        return (
            <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
                <h3>Task</h3>
            </div>
        )
    }
}

export default Tasks