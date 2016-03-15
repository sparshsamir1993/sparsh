var React = require('react');
var TextField = require('material-ui/lib/text-field');
var Button = require('material-ui/lib/raised-button');
var SaveIcon = require('material-ui/lib/svg-icons/content/save');
var TickIcon = require('material-ui/lib/svg-icons/action/done');
var DeleteIcon = require('material-ui/lib/svg-icons/content/clear');
var ExitIcon = require('material-ui/lib/svg-icons/action/exit-to-app');

var DetailView = React.createClass({
    getInitialState: function() {
        return ({
            title: '',
            body: '',
            disable: true
        });
    },
    edit: function() {
        this.setState({
            title: document.getElementById('text').value,
            body: document.getElementById('body').value,
            disable: false
        });
    },
    render: function() {
        var tasks = this.props.lists;
        var style = {
            margin: 12,
        };
        var doneStyle = {
          backgroundColor: '#4CAF50',
          margin: 12
        };
        var id = this.props.selected;
        var selectedTask;
        tasks.forEach(function(task) {
            if(task._id == id) {
                selectedTask = task;
            }
    });
	if(selectedTask.completed) {
		return (
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
	else{
        return (
            <div>
            <TextField
                defaultValue={selectedTask.title}
                floatingLabelText="Title"
                id="text"
                onChange={this.edit}
            /><br/>
            <TextField
                defaultValue={selectedTask.Body}
                floatingLabelText="Task details..."
                multiLine={true}
                fullWidth={true}
                rows={4}
                id="body"
                onChange={this.edit}
                /><br/>
            <Button
                label="Save"
                primary={true}
                style={style}
                icon={<SaveIcon />}
                onClick={this.props.save.bind(null, this.props.selected, this.state.title, this.state.body)}
                disabled={this.state.disable}
                />
              <Button
                label="Mark Completed"
                primary={true}
                icon={<TickIcon />}
                onClick={this.props.complete.bind(null, this.props.selected, selectedTask.title, selectedTask.Body)}
                />
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
    }}
});

module.exports = DetailView;
