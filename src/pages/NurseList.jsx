import React, { useEffect, useState } from 'react'
import AddNurse from './AddNurse';
import axios from 'axios';
import moment from 'moment';
const API_BASE_URL = 'http://localhost:5000/api';

export default function NurseList() {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [nurses, setNurses] = React.useState([]);
    const [editData, setEditData] = React.useState(null);
    const [asc, setAsc] = useState(true);

    const handleOpenModal = () => {
        setEditData(null);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setEditData(null);
        setIsModalOpen(false);
    }

    useEffect(() => {
        getNurses();
    }, []);

    const sortBy = (field) => {
        const sorted = [...nurses].sort((a, b) => {
            if (typeof a[field] === "string") {
                return asc
                    ? a[field].localeCompare(b[field])
                    : b[field].localeCompare(a[field]);
            } else {
                return asc ? a[field] - b[field] : b[field] - a[field];
            }
        });

        setNurses(sorted);
        setAsc(!asc);
    };

    const getNurses = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/nurses`);
            const data = response.data;
            setNurses(data);
        } catch (error) {
            console.error('Error fetching nurses:', error);
        }
    }

    const addNurse = async (nurseData, { isEdit, id }) => {

        try {
            const method = isEdit ? axios.put : axios.post;
            const url = isEdit
                ? `${API_BASE_URL}/nurses/update/${id}`
                : `${API_BASE_URL}/nurses/save`;
            const response = await method(url, nurseData);
            if (response.status === 200) {
                alert('Nurse added successfully');
                getNurses();
            }
        } catch (error) {
            console.error('Error adding nurse:', error);
        }
    }
    const handleDelete = async (nurse) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/nurses/delete/${nurse.id}`); 
            if (response.status === 200) {
                alert('Nurse deleted successfully');
                getNurses();
            }   
        } catch (error) {
            console.error('Error deleting nurse:', error);
        }
    }


    const formatDate = (date) => {
        return moment(date).format('DD-MM-YYYY');
    };
    return (
        <div className="page_container">
            <div className="page_header">
                <h2 className='page_title'>Nurse List</h2>
                <button className='add_new_btn' onClick={handleOpenModal}><i className="fa-solid fa-plus"></i> Add Nurse</button>
            </div>
            <div className='table_container'>
                <table className='table_view'>
                    <thead>
                        <tr>
                            <th onClick={() => sortBy('id')}>ID</th>
                            <th onClick={() => sortBy('name')}>Name</th>
                            <th onClick={() => sortBy('licenseNo')}>License No</th>
                            <th onClick={() => sortBy('dob')}>DOB</th>
                            <th onClick={() => sortBy('age')}>Age</th>
                            <th className=''>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nurses.map(nurse => (
                            <tr key={nurse.id}>
                                <td>{nurse.id}</td>
                                <td>{nurse.name}</td>
                                <td>{nurse.licenseNo}</td>
                                <td>{formatDate(nurse.dob)}</td>
                                <td>{nurse.age}</td>
                                <td >
                                    <button className='action_btn edit_btn' onClick={() => setEditData(nurse)}><i className="fa-solid fa-pencil"></i></button>
                                    <button className='action_btn delete_btn' onClick={()=>handleDelete(nurse)}><i className="fa-regular fa-trash-can"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <AddNurse
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                handleClose={handleCloseModal} editData={editData} onSave={addNurse} />

        </div>
    )
}
