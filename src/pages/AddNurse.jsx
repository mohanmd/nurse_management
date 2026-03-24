import React, { useEffect, useState } from 'react';
import { Box, Modal } from '@mui/material';
import moment from 'moment';

export default function AddNurse({ isModalOpen, setIsModalOpen, editData, onSave }) {

    const [formData, setFormData] = useState({
        name: '',
        licenseNo: '',
        dob: '',
        age: '',
    });
    const [errors, setErrors] = useState({});

    const formatDate = (date) => {
        return moment(date).format('YYYY-MM-DD');
    };
    useEffect(() => {
        if (editData) {

            const formatted = formatDate(editData.dob);
            console.log(formatted);

            setFormData({
                name: editData.name || '',
                licenseNo: editData.licenseNo || '',
                dob: formatDate(editData.dob) || '',
                age: editData.age || '',
            });
            setIsModalOpen(true);
        }
    }, [editData, setIsModalOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const validate = () => {
        let newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.licenseNo.trim()) {
            newErrors.licenseNo = "License No is required";
        }

        if (!formData.dob) {
            newErrors.dob = "DOB is required";
        }

        if (!formData.age) {
            newErrors.age = "Age is required";
        } else if (formData.age <= 0) {
            newErrors.age = "Enter valid age";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };
    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (!validate()) return;
        console.log('Nurse Data:', formData);
        setIsModalOpen(false);
        setFormData({
            name: '',
            licenseNo: '',
            dob: '',
            age: '',
        });
        onSave(formData, { isEdit: !!editData, id: editData?.id });
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setFormData({
            name: '',
            licenseNo: '',
            dob: '',
            age: '',
        });
        setErrors({});
    }

    return (
        <Modal
            open={isModalOpen}
            onClose={handleClose}
        >
            <Box className='modal_box'>
                <form onSubmit={handleFormSubmit}>

                    <h2 className='modal_title'>
                        {editData ? 'Edit Nurse' : 'Add New Nurse'}
                    </h2>

                    <div className="form_control">
                        <label className='input_label'>Name</label>
                        <input
                            type="text"
                            name='name'
                            placeholder='Enter Name'
                            className='modal_input'
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className="form_error">{errors.name}</p>}
                    </div>

                    <div className="form_control">
                        <label className='input_label'>License No</label>
                        <input
                            type="text"
                            name='licenseNo'
                            placeholder='Enter license'
                            className='modal_input'
                            value={formData.licenseNo}
                            onChange={handleChange}
                        />
                        {errors.licenseNo && <p className="form_error">{errors.licenseNo}</p>}
                    </div>

                    <div className="form_control">
                        <label className='input_label'>Date Of Birth</label>
                        <input
                            type="date"
                            name='dob'
                            className='modal_input'
                            value={formData.dob}
                            onChange={handleChange}
                        />
                        {errors.dob && <p className="form_error">{errors.dob}</p>}
                    </div>

                    <div className="form_control">
                        <label className='input_label'>Age</label>
                        <input
                            type="number"
                            name='age'
                            placeholder='Age'
                            className='modal_input'
                            value={formData.age}
                            onChange={handleChange}
                        />
                        {errors.age && <p className="form_error">{errors.age}</p>}
                    </div>

                    <div className="form_action">
                        <button
                            type="button"
                            className='cancel_button'
                            onClick={handleClose}
                        >
                            Cancel
                        </button>

                        <button className='add_new_btn' type='submit'>
                            {editData ? 'Update Nurse' : 'Add Nurse'}
                        </button>
                    </div>

                </form>
            </Box>
        </Modal>
    );
}