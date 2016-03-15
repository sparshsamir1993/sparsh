var React = require("react");

var CompletedView = React.createClass({
	render: funtion(){
		return(
			<div>
            <TextField
                defaultValue={selectedTask.title}
                floatingLabelText="Title"
                id="text"
				disabled={true}
            /><br/>
            <TextField
                defaultValue={selectedTask.Body}
                floatingLabelText="Task details..."
                multiLine={true}
                fullWidth={true}
                rows={4}
                id="body"
                disabled={true}
                /><br/>
            <Button
                label="Close"
                secondary={true}
                style={style}
                onClick={this.props.close}
                icon={<ExitIcon />}
                />
            <Button
                label="Delete"
                style={style}
                icon={<DeleteIcon />}
                onClick={this.props.delete.bind(null, this.props.selected)}
                />
                </div>
		);
	}
});
module.exports = CompletedView;