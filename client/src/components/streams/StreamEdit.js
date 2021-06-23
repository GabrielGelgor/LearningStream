import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id)
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.stream.id, formValues);
    };
    
    render(){
        if (!this.props.stream) return null;
        return(
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm 
                    initialValues={_.pick(this.props.stream, 'title', 'description')} //Return a subset of the object with listed keys extracted 
                    onSubmit={this.onSubmit} 
                />
            </div>
        );
    }  
}

const mapStateToProps = (state, ownProps) => { //ownProps allows for grabbing props from the above component
    return({
        stream: state.streams[ownProps.match.params.id]
    }); // We use ownProps here to grab our current stream ID according to router's history.
};

export default connect(
    mapStateToProps, 
    { fetchStream, editStream }
)(StreamEdit);