import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ContactDetail = ({ contacts }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const contactId = Number(id);
    const contact = contacts.find(c => c.id === contactId);

    const [isCalling, setIsCalling] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [callEnded, setCallEnded] = useState(false);
    const [endedSeconds, setEndedSeconds] = useState(0);

    useEffect(() => {
        let timer = null;
        if (isCalling) {
        timer = setInterval(() => {
            setSeconds(s => s + 1);
        }, 1000);
        }
        return () => {
        if (timer) clearInterval(timer);
        };
    }, [isCalling]);

    const handleStartCall = () => {
        setSeconds(0);
        setIsCalling(true);
        setCallEnded(false);
    };

    const handleEndCall = () => {
        setIsCalling(false);
        setCallEnded(true);
        setEndedSeconds(seconds);
    };

    if (!contact) {
        return (
        <div>
            <p>Không tìm thấy liên hệ</p>
            <button onClick={() => navigate(-1)}>Quay lại</button>
        </div>
        );
    }

    return (
        <div>
            <h2>Chi tiết liên hệ</h2>
            <p>Họ tên: {contact.name}</p>
            <p>Số điện thoại: {contact.phone}</p>
            <p>Email: {contact.email}</p>
            <p>Nhóm: {contact.group}</p>
            <p>Yêu thích: {contact.favorite ? 'Có' : 'Không'}</p>

            <div style={{ margin: '15px 0' }}>
                {!isCalling && !callEnded && (
                <button onClick={handleStartCall}>Gọi</button>
                )}
                {isCalling && (
                <>
                    <span>Đang gọi... {seconds} giây</span>
                    <button onClick={handleEndCall} style={{ marginLeft: '10px' }}>Kết thúc</button>
                </>
                )}
                {callEnded && (
                <>
                    <p>Cuộc gọi kết thúc sau {endedSeconds} giây</p>
                    <button onClick={handleStartCall}>Gọi</button>
                </>
                )}
            </div>

            <button onClick={() => navigate(-1)}>Quay lại</button>
        </div>
    );
};

export default ContactDetail;