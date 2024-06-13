import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css'

function SearchBar() {
    const [formData, setFormData] = useState({ queryInput: "" });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((data) => ({
            ...data,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/results?query=${encodeURIComponent(formData.queryInput)}`);
        setFormData({ queryInput: "" });
    };

    return (
        <div className="SearchBar">
            <form className="SearchBar-form" onSubmit={handleSubmit}>
                <label hidden htmlFor="queryInput">Query:</label>
                <input
                    className='SearchBar-input'
                    type="text" placeholder="Search..."
                    id="queryInput"
                    name="queryInput"
                    value={formData.queryInput}
                    onChange={handleChange} />
                <button hidden className="ColorForm-button">Submit</button>
            </form>
        </div>
    )
}

export default SearchBar;