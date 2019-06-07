import React from 'react';
import PropTypes from 'prop-types';
import RepLogList from "./RepLogList";
import RepLogCreator from './RepLogCreator';

const calculateTotalWeightFancier =
        repLogs => repLogs.reduce(
            (total, log) => total + log.totalWeightLifted, 0
        );


export default function RepLogs(props) {
    const {
        withHeart,
        highlightedRowId,
        onRowClick,
        repLogs,
        onAddRepLog
    } = props;

    let heart = '';
    if (withHeart) {
        heart = <span>heart</span>;
    }


    return (
        <div className="col-md-7">
            <h2>Lift History! {heart}</h2>

            <table className="table table-striped">
                <thead>
                <tr>
                    <th>What</th>
                    <th>How many times?</th>
                    <th>Weight</th>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <RepLogList
                    highlightedRowId={highlightedRowId}
                    onRowClick={onRowClick}
                    repLogs={repLogs}
                />
                <tfoot>
                <tr>
                    <td>&nbsp;</td>
                    <th>Total</th>
                    <th>{calculateTotalWeightFancier(repLogs)}</th>
                    <td>&nbsp;</td>
                </tr>
                </tfoot>
            </table>
            <RepLogCreator onAddRepLog={onAddRepLog}/>


        </div>
    );
}



RepLogs.propTypes = {
    withHeart: PropTypes.bool,
    highlightedRowId: PropTypes.any,
    onRowClick: PropTypes.func.isRequired,
    onAddRepLog: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired
};