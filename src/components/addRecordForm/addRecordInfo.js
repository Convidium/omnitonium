import { useEffect, useState } from 'react';
import TagsInput from '../UI/TagsInput.js';
import '../../style/Form/addInfo.scss';

function RecordInfo({ handleDataChange, initialData }) {
    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
        setFormData(initialData); // Sync state when initialData changes
    }, [initialData]);

    const handleChange = (value, key) => {
        const updatedData = { ...formData, [key]: value };
        setFormData(updatedData); // Update local state
        handleDataChange(value, key); // Pass the new value to the parent
    };

    return (
        <div className="content-addition">
            <div className='input-block single-part'>
                <span>Record:</span>
                <input placeholder='Record' className='add-input'
                    value={formData.title}
                    onChange={(e) => handleChange(e.target.value, "title")} />
            </div>
            <div className='input-block single-part'>
                <span>Artist:</span>
                <input placeholder='Artist' className='add-input'
                    value={formData.artist}
                    onChange={(e) => handleChange(e.target.value, "artist")} />
            </div>
            <div className='input-block single-part'>
                <span>Year:</span>
                <input placeholder='Year' className='add-input'
                    value={formData.year}
                    onChange={(e) => handleChange(e.target.value, "year")} />
            </div>
            <div className='input-block single-part'>
                <span>Label:</span>
                <input placeholder='Label' className='add-input'
                    value={formData.label}
                    onChange={(e) => handleChange(e.target.value, "label")} />
            </div>
            <div className='input-block double-part'>
                <span>Genre:</span>
                <TagsInput
                    onTagsChange={handleChange} dataType="genre" initialData={formData.genre} />
            </div>
            <div className='input-block double-part'>
                <span>Mood:</span>
                <TagsInput
                    onTagsChange={handleChange} dataType="mood" initialData={formData.mood} />
            </div>
            <div className='input-block textarea-block double-part'>
                <span>Record info:</span>
                <textarea placeholder="Write anything related to the record, so others can read it, while they're listening to it" className='add-input'
                    value={formData.info}
                    onChange={(e) => handleChange(e.target.value, "info")} />
            </div>
        </div>
    );
}

export default RecordInfo;