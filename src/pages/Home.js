import React from 'react';

const Home = ({ contacts }) => {
    const totalContacts = contacts.length;
    const totalFavorites = contacts.reduce((acc, contact) => {
        return contact.favorite ? acc + 1 : acc;
    }, 0);
    const totalGmail = contacts.filter(contact => contact.email && contact.email.endsWith('@gmail.com')).length;

    return (
        <div>
            <h1>Danh bạ</h1>
            <p>Tổng số liên hệ: {totalContacts}</p>
            <p>Số liên hệ yêu thích: {totalFavorites}</p>
            <p>Số liên hệ dùng Gmail: {totalGmail}</p>
        </div>
    );
};

export default Home;