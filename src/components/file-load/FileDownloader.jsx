import './file-loader.scss';

const FileDownloader = ({ title, fileContent }) => {
    const downloadFile = () => {
        const blob = new Blob([fileContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${title}.txt`;
        a.click();

        URL.revokeObjectURL(url);
    };

    return (
        <div className='file-downloader'>
            <h5 className="file-downloader__title">{title}</h5>
            <button
                className={fileContent ? 'file-downloader__download' : 'file-downloader__download file-downloader__download_disabled'}
                onClick={downloadFile}
            >
                Завантажити файл
            </button>
        </div>
    );
};

export default FileDownloader;