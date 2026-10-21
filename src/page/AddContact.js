import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GROUPS } from '../data';

const AddContact = ({ contacts, onAdd }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [group, setGroup] = useState('Bạn bè');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim() || !phone.trim() || !email.trim() || !group.trim()) {
            setErrorMsg('Vui lòng nhập đầy đủ thông tin phía dưới form');
            return;
        }

        const phoneRegex = /^0\d{9}$/;
        if (!phoneRegex.test(phone)) {
            setErrorMsg('Số điện thoại phải gồm 10 chữ số và bắt đầu bằng số 0');
            return;
        }

        if (!email.includes('@')) {
            setErrorMsg('Email không hợp lệ');
            return;
        }

        setErrorMsg('');

        const maxId = contacts.reduce((max, c) => (c.id > max ? c.id : max), 0);
        const newId = maxId + 1;
        const newContact = {
            id: newId,
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim(),
            group: group,
            favorite: false
        };

        onAdd(newContact);
        navigate('/contacts', { replace: true });
    };

    return (
        <div>
            <h2>Thêm mới liên hệ</h2>
            {errorMsg && <div className="error-msg">{errorMsg}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label htmlFor="name-input">Họ tên</label>
                <input
                    id="name-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                </div>
                <div className="form-group">
                <label htmlFor="phone-input">Số điện thoại</label>
                <input
                    id="phone-input"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                </div>
                <div className="form-group">
                <label htmlFor="email-input">Email</label>
                <input
                    id="email-input"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div className="form-group">
                <label htmlFor="group-input">Nhóm</label>
                <select
                    id="group-input"
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                >
                    {GROUPS.map((g, index) => (
                    <option key={index} value={g}>{g}</option>
                    ))}
                </select>
                </div>
                <button type="submit">Thêm</button>
            </form>
        </div>
    );
};

AddContact.defaultProps = {};

export default AddContact;