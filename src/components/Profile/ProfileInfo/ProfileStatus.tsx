import React from 'react';

type PropsType = {
    status: string
}

class ProfileStatus extends React.Component <PropsType> {
    state = {
        editMode: false
    }

    activateEditMode () {
       this.setState({
           editMode: true
       })
    }

    deactivateEditMode () {
        this.setState({
            editMode: false
        })
    }

    render() {
        return (
            <>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={ this.activateEditMode.bind (this) }>{this.props.status}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input autoFocus={true} onBlur={ this.deactivateEditMode.bind(this) } value={this.props.status}/>
                    </div>
                }
            </>

        )
    };
}

export default ProfileStatus;