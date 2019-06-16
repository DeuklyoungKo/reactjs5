import React, { Component } from 'react';
import RepLogs from './RepLogs';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { getRepLogs, deleteRepLog, createRepLog } from "../api/rep_log_api";

export default class RepLogApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            highlightedRowId: null,
            repLogs: [],
            numberOfHearts: 1,
            isLoaded: false,
            isSavingNewRepLog: false,
            successMessage: '',
            newRepLogValidationErrorMessage: '',
            // itemOptions:  [
            //     { id: 'cat', text: 'Cat' },
            //     { id: 'fat_cat', text: 'Big Fat Cat' },
            //     { id: 'laptop', text: 'My Laptop' },
            //     { id: 'coffee_cup', text: 'Coffee Cup' },
            //     { id: 'invalid_item', text: 'Dark Matter' }
            // ]

            // itemOptions: props.itemOptions
        };

        this.setSuccessMessageTimeoutHandle = 0;

        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleAddRepLog = this.handleAddRepLog.bind(this);
        this.handleHeartChange = this.handleHeartChange.bind(this);
        this.handleDeleteRepLog = this.handleDeleteRepLog.bind(this);

    }

    /**
     *  special function of react.js
     */
    componentDidMount() {
        getRepLogs()
            .then((data) => {
                this.setState({
                    repLogs: data,
                    isLoaded: true
                });
            });
    }

    componetWilUnmount() {
        clearTimeout(this.setSuccessMessageTimeoutHandle);
    }

    handleRowClick(repLogId) {
        this.setState({highlightedRowId: repLogId})
    }

    handleAddRepLog(item, reps) {
        // const repLogs = this.state.repLogs;
        const newRep = {
            reps: reps,
            item: item,
        }

        this.setState({
            isSavingNewRepLog: true
        });

        const newState = {
            isSavingNewRepLog: false,
        }

        createRepLog(newRep)
            .then(repLog => {
                this.setState(prevState => {
                    const newRepLogs = [...prevState.repLogs, repLog];

                    return {
                        ...newState,
                        repLogs: newRepLogs,
                        newRepLogValidationErrorMessage: ''
                    };

                });

                this.setSuccessMessage('Rep Log Saved!');
            })
            .catch(error => {
                // console.log(error.response);
                error.response.json().then(errorsData => {
                    // console.log(errorsData)
                    // console.log(errorsData.errors.item)

                    const errors = errorsData.errors;
                    // console.log(errors);
                    const firstError = errors[Object.keys(errors)[0]];
                    // console.log(firstError);

                    this.setState({
                        ...newState,
                        newRepLogValidationErrorMessage: firstError,
                        // isSavingNewRepLog: false,
                    });
                });
            });
    }


    setSuccessMessage(message) {
        this.setState({
            successMessage: message
        })

        clearTimeout(this.setSuccessMessageTimeoutHandle);

        this.setSuccessMessageTimeoutHandle = setTimeout(() => {
            this.setState({
                successMessage: ''
            });

            this.setSuccessMessageTimeoutHandle = 0;
        }, 3000);
    }

    handleHeartChange(heartCount) {
        this.setState({
            numberOfHearts: heartCount
        });
    }

    handleDeleteRepLog(id) {

        this.setState((prevState) => {
            return {
                repLogs: prevState.repLogs.map(repLog => {
                    if (repLog.id !== id) {
                        // console.log(repLog);
                        return repLog;
                    }

                    // return Object.assign({}, repLog, {isDeleting: true});
                    return {...repLog, isDeleting:true};
                })
            }

        });

        // console.log(this.state.repLogs);


        deleteRepLog(id)
            .then(() => {
                // remove the repo log without mutating state
                // filter returns a new array
                this.setState((prevState) => {
                    return {
                        repLogs: prevState.repLogs.filter(repLog => repLog.id !== id)
                    }
                })

                this.setSuccessMessage('Item was Un-lifted!');
            })
    }



    render() {

        return (
            <RepLogs
                {...this.props}
                {...this.state}
                onRowClick={this.handleRowClick}
                onAddRepLog={this.handleAddRepLog}
                onHeartChange={this.handleHeartChange}
                onDeleteRepLog={this.handleDeleteRepLog}
            />

        )
    }
}

RepLogApp.propTypes = {
    withHeart: PropTypes.bool,
    itemOptions: PropTypes.array
}

RepLogApp.defaultProps = {
    itemOptions: []
}