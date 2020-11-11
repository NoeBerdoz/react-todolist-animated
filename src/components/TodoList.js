// WAS WORKING HERE https://www.kirupa.com/react/simple_todo_app_react.htm ON var newItem
import React, { Component } from "react";
import TodoItems from "./TodoItems";
import "../css/TodoList.css";
import Button from "@material-ui/core/Button";
import {Grid} from "@material-ui/core";

class TodoList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: []
        };

        // Add targeting
        this.addItem = this.addItem.bind(this);

        // Delete targeting
        this.deleteItem = this.deleteItem.bind(this);
    }

    addItem(e) {
        // Get data from _inputElement
        if (this._inputElement.value !== "") {
            var newItem = {
                text: this._inputElement.value,
                key: Date.now()
            };

            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                };
            });

            // Clear input
            this._inputElement.value = "";

        }

        console.log(this.state.items);



        // Block refresh page on submit
        e.preventDefault();



    }

    deleteItem(key) {
        // Array with all items except the one to delete
        var filteredItems = this.state.items.filter(function (item) {
            return (item.key !== key);
        });

        this.setState({
            // Set the state with the new array filtered
            items: filteredItems
        });
    }

    componentWillMount() {
        let itemList = localStorage.getItem('items')
        if (itemList) {
            this.setState({
                items: JSON.parse(localStorage.getItem('items'))
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        localStorage.setItem('items', JSON.stringify(this.state.items))
    }

    animateButton() {
        const element = document.getElementById('buttonAdd')
        // reset
        element.classList.remove('buttonAnimation');
        // trigger reflow
        void element.offsetWidth;
        //start
        element.classList.add('buttonAnimation')


    }

    render() {
        return (
            <div className="todoListMain">
                <div className="header">
                    <Grid container spacing={1}>
                        <form onSubmit={this.addItem}>
                            <Grid container item xs={12} spacing={1}>
                                <Grid item xs={9}>
                                    {/* Storing Reference in _inputElement */}
                                    <input ref={(a) => this._inputElement = a}
                                           placeholder="Nouvelle tâche">
                                    </input>
                                </Grid>

                                <Grid item xs={3}>
                                    <Button id="buttonAdd" onClick={this.animateButton} type="submit">+</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </div>
                <TodoItems entries={this.state.items}
                           delete={this.deleteItem}/>
            </div>
        )
    }
}

export default TodoList;
