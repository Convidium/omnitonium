import { useState } from "react";
import { ReactComponent as CloseSVG } from '../../svg/close.svg';

function TagsInput({ onTagsChange }) {
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([]);

    const handleChange = (e) => {
        const { value } = e.target;
        setTag(value);
    }

    const handleKeyChange = (e) => {
        const { key } = e;
        const newtag = tag.trim();


        if ((key == ',' || key == "Enter" || key == "Tab") && newtag.length && !tags.includes(newtag)) {
            e.preventDefault();
            const newTags = [...tags, newtag];
            
            setTags(newTags);
            onTagsChange(newTags);
            setTag('');
        } else if ((key == "Backspace") && !newtag.length && tags.length) {
            e.preventDefault();
            const tagsCopy = [...tags];
            const lastTag = tagsCopy.pop();

            setTags(tagsCopy);
            onTagsChange(tagsCopy);
            setTag(lastTag);
        }
    }

    const removeTag = (index) => {
        const newTags = tags.filter((tag, i) => i != index);
        setTags(newTags);
        onTagsChange(newTags);
    }



    return (
        <div className="tags-input-wrapper add-input">
            {tags.map((tag, index) => (
                <div key={index} className="tag-item">
                    {tag}
                    <span className="title-tag" onClick={() => removeTag(index)}><CloseSVG /></span>
                </div>
            ))}
            <input
                value={tag}
                placeholder='Divide tags with "," or "Enter" or "Tab"'
                className="tag-input"
                onChange={handleChange}
                onKeyDown={handleKeyChange} />
        </div>
    )
}

export default TagsInput;