var React = require('react');
var TextField = require('material-ui/lib/text-field');
var Button = require('material-ui/lib/raised-button');
var SaveIcon = require('material-ui/lib/svg-icons/content/save');
var ExitIcon = require('material-ui/lib/svg-icons/action/exit-to-app');

var CreateView = React.createClass({
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
        var style = {
            margin: 12,
        };
        var id = this.props.selected;
        return (
            <div>
                <TextField
                    floatingLabelText="Title"
                    id="text"
                    onChange={this.edit}
                /><br/>
                <TextField
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
                    onClick={this.props.save.bind(null, this.state.title, this.state.body)}
                    icon={<SaveIcon />}
                    disabled={this.state.disable}
                />
                <Button
                    label="Close"
                    secondary={true}
                    style={style}
                    icon={<ExitIcon />}
                    onClick={this.props.close}
                />
            </div>
        );
    }
});

module.exports = CreateView;
