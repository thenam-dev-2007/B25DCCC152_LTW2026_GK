import React from 'react';
import { GROUPS } from '../data';

const FilterBar = ({ query, onQueryChange, group, onGroupChange }) => {
    return (
        <div className="filter-container">
            <div className="filter-item">
                <label htmlFor="search-input">Tìm kiếm</label>
                <input
                    id="search-input"
                    type="text"
                    value={query}
                    onChange={onQueryChange}
                    placeholder="Tìm theo tên hoặc số điện thoại..."
                />
            </div>
            <div className="filter-item">
                <label htmlFor="group-select">Nhóm</label>
                <select
                    id="group-select"
                    value={group}
                    onChange={onGroupChange}
                >
                    <option value="Tất cả">Tất cả</option>
                    {GROUPS.map((g, index) => (
                        <option key={index} value={g}>{g}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default FilterBar;