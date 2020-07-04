import React, { useState } from 'react';
import { Text, Button, useRecordActionData, useBase, useRecordById} from '@airtable/blocks/ui';
// import { selectRecords } from '@airtable/blocks';

const Course = () => {
    const [assigned, setAssigned] = useState(false);
    const base = useBase();
    const data = useRecordActionData();
    const tableId = 'tblNoIGLVD8wIXWKG';
    const recordId = 'recjXyRPgRX7gKAu8';
    const table = base.getTableById(data ? data.tableId : tableId);
    const record = useRecordById(table, data ? data.recordId : recordId);

    console.log('record', record);
    const course = {
        name: record.getCellValue('Name'),
        dateTime: new Date(),
        instructor: "Jeff",
        room: {
            selectedRoom: "101",
            capacity: 40,
        }
    }
    const check = <Button>Assigned</Button>
        const courseDisplay = <div>
            <Text>Course Name: {course.name}</Text>
            <Text>Date and Time: {course.dateTime.toDateString()}</Text>
            <Text>Instructor Name: {course.instructor}</Text>
            <div>
                <Text>Room Details</Text>
                <Text>Selected Room: {course.selectedRoom}</Text>
                <Text>No. of seats: {toString(course.capacity)}</Text>
            </div>
            <Button
                onClick={() => setAssigned(!assigned)}
                icon="multicollaborator">Assign Rooms</Button>
            {assigned ? check : null}
        </div>;
    return courseDisplay;
    }
export default Course;