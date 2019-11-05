import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';


const MeetingList = (props) => {
    const [toggledRow, setToggledRow] = useState(false);
    
    return (!props.items) ? (
        <div></div>
    ) : (
        <Table striped bordered hover className="MeetingList">
            <thead>
                <tr>
                    <th>#</th>
                    <th onClick={() => props.handleSortBy('title-asc')} style={{width:'60%'}}>Tytuł</th>
                    <th onClick={() => props.handleSortBy('startDate-asc')} style={{width:'15%'}}>Start</th>
                    <th onClick={() => props.handleSortBy('endDate-asc')} style={{width:'15%'}}>Koniec</th>
                    <th>Akcja</th>
                </tr>
            </thead>
            <tbody>
            {props.items.map( (item, index) => {
            return (
                <tr key={item.id}>
                    <td>{index+1}</td>
                    <td>
                        {toggledRow === item.id ? (
                            <div>
                                <div className="d-flex justify-content-between">
                                    {item.title}
                                    <Button variant="primary" size="sm ml-2" value={item.id} onClick={() => setToggledRow(false)}>Schowaj opis</Button>
                                </div>
                                <hr />
                                {item.description}
                            </div>
                        ) : (
                            <div className="d-flex justify-content-between">
                                {item.title}
                                <Button variant="primary" size="sm ml-2" value={item.id} onClick={() => setToggledRow(item.id)}>Pokaż Opis</Button>
                            </div>
                        )}
                    </td>
                    <td>{item.startDate.date}, {item.startDate.time}</td>
                    <td>{item.endDate.date}, {item.endDate.time}</td>
                    <td>
                        <Button variant="primary" size="sm" value={item.id} onClick={props.handleDeleteMeeting}>Usuń</Button>
                    </td>
                </tr>
            )
            })}
            </tbody>
        </Table>
    )
}

MeetingList.propTypes = {
    items: PropTypes.array.isRequired,
};

MeetingList.defaultProps = {
    items: [],
};

export {MeetingList};