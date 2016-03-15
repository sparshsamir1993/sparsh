var React = require('react');
var xhr = require('superagent');
var AppBar = require('material-ui/lib/app-bar');
var IconButton = require('material-ui/lib/icon-button');
var Icon = require('material-ui/lib/svg-icons/editor/format-list-numbered');
var FlatButton = require('material-ui/lib/flat-button');
var Progress = require('material-ui/lib/linear-progress');
var TodoList = require('./listView.jsx');
var DetailView = require('./detailView.jsx');
var CreateView = require('./createView.jsx');




var MainWindow = React.createClass({
    getInitialState: function() {
        return ({
            tasks: [],
            showList: true,
            showDetail: false,
            taskId: undefined,
            createNew: false,
            showProgress: true
        });
    },
    componentDidMount: function() {
        var that = this;
        xhr
        .get('https://sparsh.herokuapp.com/getTasks')
        .end(function(err, res) {
            that.setState({
                tasks: res.body,
                showProgress: false
            });
        })
    },
    onTaskSelect: function(id) {
        console.log("TASK CLICKED"+id);
        this.setState({
            showList: false,
            showDetail: true,
            taskId: id
        });
    },
    markComplete: function(id, title, body) {
      console.log("MARK COMPLETE");
        console.log(id);
        console.log(title);
        console.log(body);
        xhr
        .post('https://sparsh.herokuapp.com/completeTask')
        .send({id:id, title:title, body:body})
        .end(function(err, res) {
            console.log("COMPLETE REQUEST SEND");
        });
        this.setState({
            showList: true,
            showDetail: false,
            taskId: undefined,
            createNew: false,
            showProgress: true
          });
        var that = this;
        xhr
            .get('https://sparsh.herokuapp.com/getTasks')
            .end(function(err, res) {
                that.setState({
                    tasks: res.body,
                    showProgress: false
                });
            })
    },
    onSave: function(id, title, body) {
        console.log("on save");
        console.log(id);
        console.log(title);
        console.log(body);
        xhr
        .post('https://sparsh.herokuapp.com/updateTask')
        .send({id:id, title:title, body:body})
        .end(function(err, res) {
            console.log("UPDATE REQUEST SEND");
        });
        this.setState({
            showList: true,
            showDetail: false,
            taskId: undefined,
            createNew: false,
            showProgress: true
          });
        var that = this;
        xhr
            .get('https://sparsh.herokuapp.com/getTasks')
            .end(function(err, res) {
                that.setState({
                    tasks: res.body,
                    showProgress: false
                });
            })
    },
    onDelete: function(id) {
        console.log("on delete");
        xhr
            .post('https://sparsh.herokuapp.com/deleteTask')
            .send({id: id})
            .end(function(err, res) {
                console.log("DELETE REQUEST SEND");
            });
        this.setState({
            showList: true,
            showDetail: false,
            taskId: undefined,
            createNew: false,
            showProgress: true
        });
        var that = this;
        xhr
            .get('https://sparsh.herokuapp.com/getTasks')
            .end(function(err, res) {
                that.setState({
                    tasks: res.body,
                    showProgress: false
                });
            })
    },
    onClose: function() {
        this.setState({
            showList: true,
            showDetail: false,
            createNew: false
        });
    },
    createNew: function() {
        console.log("create new");
        this.setState({
            showList: false,
            showDetail: false,
            taskId: undefined,
            createNew: true
        });
    },
    onCreate: function(title, body) {
        console.log("on new");
        console.log(title);
        console.log(body);
        xhr
            .post('https://sparsh.herokuapp.com/newTask')
            .send({user:"1", title:title, Body:body})
            .end(function(err, res) {
                console.log("CREATE REQUEST SEND");
            });
        this.setState({
            showList: true,
            showDetail: false,
            taskId: undefined,
            createNew: false,
            showProgress: true
        });
        var that = this;
        xhr
            .get('https://sparsh.herokuapp.com/getTasks')
            .end(function(err, res) {
                that.setState({
                    tasks: res.body,
                    showProgress: false
                });
            })

    },
    render: function() {
        if(this.state.showList && this.state.showProgress) {
            return (
                <div>
                    <AppBar
                        title={<span>TO-DO List</span>}
                        iconElementLeft={<IconButton><Icon /></IconButton>}
                        iconElementRight={<FlatButton label="New" onClick={this.createNew} />}
                    />
                  <Progress mode="indeterminate" color="yellow"/>
                  <TodoList lists={this.state.tasks} clicked={this.onTaskSelect} />
                </div>
            );
        }
        else if(this.state.showList) {
            return (
                <div>
                    <AppBar
                        title={<span>TO-DO List</span>}
                        iconElementLeft={<IconButton><Icon /></IconButton>}
                        iconElementRight={<FlatButton label="New" onClick={this.createNew} />}
                    />
                  <TodoList lists={this.state.tasks} clicked={this.onTaskSelect} />
                </div>
            );
        }
        else if(this.state.showDetail) {
            return (
                <div>
                    <AppBar
                        title={<span>TO-DO List</span>}
                        iconElementLeft={<IconButton><Icon /></IconButton>}
                        iconElementRight={<FlatButton label="New" onClick={this.createNew}/>}
                    />
                  <DetailView lists={this.state.tasks} selected={this.state.taskId} save={this.onSave} complete={this.markComplete} delete={this.onDelete} close={this.onClose} />
                </div>
            );
        }
        else if(this.state.createNew) {
            return (
                <div>
                    <AppBar
                        title={<span>TO-DO List</span>}
                        iconElementLeft={<IconButton><Icon /></IconButton>}
                    />
                    <CreateView save={this.onCreate} close={this.onClose} />
                </div>
            );
        }
    }
});

module.exports = MainWindow;
