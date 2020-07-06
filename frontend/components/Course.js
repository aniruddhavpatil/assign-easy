import React, { useState } from 'react';
import { 
    Text,
    Button,
    useRecordActionData,
    useBase,
    useRecordById,
    RecordCardList,
    Box
} from '@airtable/blocks/ui';


const trySeating = async (record, setArr) => {
    const rooms = record.selectLinkedRecordsFromCell('Rooms');
    const students = record.selectLinkedRecordsFromCell('Students');

    await students.loadDataAsync();
    await rooms.loadDataAsync();

    const nStudents = students.records.length;
    let studentIdx = 0;
    let arrangement = [];

    rooms.records.map((room) => {
        let roomDict = {room, students: []};
        while (studentIdx < nStudents && roomDict.students.length < room.getCellValue('Capacity')) {
            roomDict.students.push(students.records[studentIdx++]);
        }
        if(roomDict.students.length > 0) arrangement.push(roomDict);
    })
    setArr(arrangement);
    return arrangement;

}

const Arrangement = ({arrangement}) => {
    return arrangement.map( room =>
            <Box key = {room.room.id} overflow="auto" height="200px" border="thick" backgroundColor="lightGray1">
                <h2>{room.room.name}</h2>
            <RecordCardList records={room.students} />
            </Box>
            )
    }

const Course = () => {
    const [assigned, setAssigned] = useState(false);
    const [arr, setArr] = useState(null);
    const base = useBase();
    const data = useRecordActionData();
    // if(!data) return <Text>Please slect a record to continue</Text>;
    const tableId = 'tblNoIGLVD8wIXWKG';
    const recordId = 'recjXyRPgRX7gKAu8';
    const table = base.getTableById(data ? data.tableId : tableId);
    const record = useRecordById(table, data ? data.recordId : recordId);
    const course = {
        name: record.getCellValue('Name'),
        dateTime: new Date(),
        instructor: "Jeff",
        room: {
            selectedRooms: record.getCellValue('Rooms'),
            capacity: record.getCellValue('Capacity (from Rooms)').reduce((a,b) => a + b, 0)
        }
    }
    const courseDisplay = <div>
        <Text>Course Name: {course.name}</Text>
        <Text>Date and Time: {course.dateTime.toDateString()}</Text>
        <Text>Instructor Name: {course.instructor}</Text>
        <div>
            <Text>Room Details</Text>
            <Text>Allocated Lecture Rooms:
                <ol>
                    {course.room.selectedRooms.map(room => <li key={room.id}>{room.name}</li>)}
                </ol>
                </Text>
            <Text>Total no. of seats: {course.room.capacity}</Text>
        </div>
        <Button
            onClick={() => {
                setAssigned(!assigned);
                trySeating(record, setArr);
            }}
            icon="multicollaborator">Arrange Students</Button>
        {arr? <Arrangement arrangement={arr}/> : null}
        
    </div>;
    return courseDisplay;
    }
export default Course;