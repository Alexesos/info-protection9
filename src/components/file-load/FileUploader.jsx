import { useState, useEffect } from 'react';
import './file-loader.scss';

const FileUploader = ({ title, setFileText, content }) => {
    const [fileContent, setFileContent] = useState('');
    const [isShow, setIsShow] = useState(true);

    useEffect(() => {
        setFileContent(content);
    }, [content]);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const text = reader.result;
            if (isValid(text)) {
                setFileContent(text);
                setFileText(text);
            }
        };
        reader.readAsText(file);
    };

    const handleTextChange = (e) => {
        const updatedText = e.target.value;
        if (isValid(updatedText)) {
            setFileContent(updatedText);
            setFileText(updatedText);
        }
    };

    const isValid = (text) => {
        const valid = /^[0-9,]*$/.test(text);

        if (title === 'Ключ' || title === 'Підпис') {
            if (!valid) {
                alert('Невірний формат ключа');
                return false;
            } else {
                setFileContent(text);
                setFileText(text.split(','));
                return false;
            }
        }

        return true;
    }

    return (
        <div className='file-uploader'>
            <h5 className="file-uploader__title">{title}</h5>
            <input
                type="file"
                accept=".txt"
                onChange={handleFileChange}
                className="file-uploader__input"
            />
            <div
                className="file-uploader__show"
                onClick={() => setIsShow(prev => !prev)}
            >
                {isShow ? 'Приховати' : 'Показати'}
            </div>
            {isShow && (
                <div className="file-uploader__editor">
                    <textarea
                        value={fileContent}
                        onChange={handleTextChange}
                        className="file-uploader__textarea"
                        rows={15}
                    />
                </div>
            )}
        </div>
    );
};

export default FileUploader;