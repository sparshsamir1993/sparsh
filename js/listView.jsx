var React = require('react');
var FlatButton = require('material-ui/lib/flat-button');
var List = require('material-ui/lib/lists/list');
var ListItem = require('material-ui/lib/lists/list-item');
var Divider = require('material-ui/lib/divider');
var CheckBox = require('material-ui/lib/checkbox');
var DoneIcon = require('material-ui/lib/svg-icons/action/done');

var ListView = React.createClass({
    render: function() {
        var data = this.props.lists;
        var list = [];
        var doneList = [];
        var that = this;
        var style = {
          backgroundColor: '#e6ffe6'
        };
        var dividerStyle = {
          marginTop: '0px',
          marginLeft: '0px'
        };
        data.forEach(function(task, id) {
            if(task.completed) {
              doneList.push(
                <div key={id}>
                    <ListItem
                        primaryText={task.title}
                        secondaryText={task.Body}
                        secondaryTextLines={2}
                        style={style}
						onClick={that.props.clicked.bind(null, task._id)}
                    />
                  <Divider style={dividerStyle} inset={true} />
                </div>
              );
            } else {
              list.push(
                  <div key={id}>
                      <ListItem
                          primaryText={task.title}
                          secondaryText={task.Body}
                          secondaryTextLines={2}
                          onClick={that.props.clicked.bind(null, task._id)}
                      />
                      <Divider />
                  </div>
              );
            }
        });
        return (
          <List>
            {list}
            {doneList}
          </List>
        );
    }
});

module.exports = ListView;
