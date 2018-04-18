var React = require('react');
// load react - note that modules are 'isolated' which means 
// each/every file needs to require a module if it uses that module

//You need this npm package to do createReactClass
var createReactClass = require('create-react-class');

var MessageList = require('./MessageList');
var MessageForm = require('./MessageForm');
var MessageStore = require('./MessageStore');
var ConnectionManager = require('./ConnectionManager');
var ConnectionForm = require('./ConnectionForm');

module.exports = createReactClass({
    getInitialState: function() {
        return {
            messages: MessageStore.getMessages(),
            connected: ConnectionManager.isConnected()
        };
    },

    componentWillMount: function() {
        MessageStore.subscribe(this.updateMessages);
        ConnectionManager.onStatusChange(this.updateConnection);
        ConnectionManager.onMessage(MessageStore.newMessage);
    },

    componentWillUnmount: function() {
        MessageStore.unsubscribe(this.updateMessages);
        ConnectionManager.offStatusChange(this.updateConnection);
        ConnectionManager.offMessage(MessageStore.newMessage);
    },

    updateMessages: function() {
        this.setState({
            messages: MessageStore.getMessages()
        });
    },

    updateConnection: function() {
        this.setState({
            connected: ConnectionManager.isConnected()
        });
    },

    onSend: function(newMessage) {
        ConnectionManager.sendMessage(newMessage);
        MessageStore.newMessage(newMessage);
    },

    render: function() {
        return <div>
            <MessageList messages={this.state.messages} />
            <MessageForm onSend={this.onSend} />
            <ConnectionForm
                connected={this.state.connected}
                onHost={ConnectionManager.host}
                onJoin={ConnectionManager.join}
                />
        </div>;
    }
});
