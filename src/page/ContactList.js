import React, { useState } from 'react';
import FilterBar from '../components/FilterBar';
import ContactTable from '../components/ContactTable';

const ContactList = ({ contacts, onDelete, onToggleFavorite }) => {
    const [query, setQuery] = useState('');
    const [group, setGroup] = useState('Tất cả');

    const handleQueryShift = (e) => {
        setQuery(e.target.value);
    };
    const handleGroupChange = (e) => {
        setGroup(e.target.value);
    };

    const filteredContacts = contacts.filter(contact => {
        const matchQuery = 
            contact.name.toLowerCase().includes(query.toLowerCase()) || 
            contact.phone.toLowerCase().includes(query.toLowerCase());
        const matchGroup = group === 'Tất cả' || contact.group === group;
        return matchQuery && matchGroup;
    });

    return (
        <div>
            <FilterBar
                query={query}
                onQueryChange={handleQueryShift}
                group={group}
                onGroupChange={handleGroupChange}
            />
            <p>Tìm thấy {filteredContacts.length} liên hệ</p>
            <ContactTable
                contacts={filteredContacts}
                onDelete={onDelete}
                onToggleFavorite={onToggleFavorite}
            />
        </div>
    );
};

export default ContactList;