import React, {useState} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const MeetingSortBy = (props) => {
    const [ddToggleName, setDdToggleName] = useState('Wybierz');
    return (
        <div className="d-inline-block">
            <span>Sortuj po:</span>
            <Dropdown className="d-inline-block ml-2" onSelect={props.handleSortBy}>
                <Dropdown.Toggle>{ddToggleName}</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={(e)=> setDdToggleName(e.target.innerHTML)} eventKey="title-asc">Tytuł A-Z</Dropdown.Item>
                    <Dropdown.Item onClick={(e)=> setDdToggleName(e.target.innerHTML)} eventKey="title-desc">Tytuł Z-A</Dropdown.Item>
                    <Dropdown.Item onClick={(e)=> setDdToggleName(e.target.innerHTML)} eventKey="startDate-asc">Data Startu 0-9</Dropdown.Item>
                    <Dropdown.Item onClick={(e)=> setDdToggleName(e.target.innerHTML)} eventKey="startDate-desc">Data Startu 9-0</Dropdown.Item>
                    <Dropdown.Item onClick={(e)=> setDdToggleName(e.target.innerHTML)} eventKey="endDate-asc">Data Końca 0-9</Dropdown.Item>
                    <Dropdown.Item onClick={(e)=> setDdToggleName(e.target.innerHTML)} eventKey="endDate-desc">Data Końca 9-0</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export {MeetingSortBy};