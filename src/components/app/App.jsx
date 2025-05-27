import { useState } from 'react';

import Service from '../service/Service';
import FileUploader from '../file-load/FileUploader';
import FileDownloader from '../file-load/FileDownloader';
import './app.scss';

const _models = ['RSA', 'Eil Gamahl']

const App = () => {
    const [message, setMessage] = useState('');
    const [encoded, setEncoded] = useState('');
    const [hash, setHash] = useState('');
    const [keys, setKeys] = useState('');
    const [hashCheck, setHashCheck] = useState('');
    const [model, setModel] = useState(_models[0]);
    const { writeEQS, readEQS } = Service();

    // Renders

    const renderModels = () => {
        return _models.map((md, index) => (
            <li className={`main__item model ${md === model ? 'active' : ''}`}
                key={index}
                onClick={() => {
                    setModel(md);
                    setHash('');
                    setHashCheck('');
                    setEncoded('');
                }}
            >
                {md}
            </li>
        ));
    }

    const hashTableToArray = (arr) => {
        let res = [];

        arr.forEach(item => {
            res.push(...Object.entries(item));
        });

        setEncoded(res);
    }

    // Calls

    const writeEQSCall = async () => {
        const res = await writeEQS(message);
        hashTableToArray(res._hashTable);
        setKeys([res.keys.e, res.keys.n]);
    }

    const readEQSCall = async () => {
        const res = await readEQS(message, keys);
        setHashCheck(res);
    }

    return (
        <>
            <main className="main">
                <div className="main__container">
                    <div className="main__start">
                        <FileUploader title={"Текст повідомлення"} setFileText={setMessage} content={message}/>
                        <FileUploader title={"Ключ"} setFileText={setKeys} content={keys}/>
                    </div>
                    <div className="main__mid">
                        <div className="main__block">
                            <h5 className="main__title">
                                Вибір методу хешування
                            </h5>
                            <ul className="main__list">
                                {renderModels()}
                            </ul>
                        </div>
                        <div className="main__block">
                            <h5 className="main__title">
                                Дії
                            </h5>
                            <div className="main__actions">
                                <button 
                                    className="main__button"
                                    onClick={() => writeEQSCall()}    
                                >
                                    Отримати підписане повідомлення та ключ
                                </button>
                                <button 
                                    className="main__button"
                                    onClick={() => readEQSCall()}    
                                >
                                    Перевірка на цілісність
                                </button>
                            </div>
                        </div>
                        <div className="main__block">
                            <h5 className="main__title">
                                Перевірка
                            </h5>
                            <div className="main__conclusion">
                                <span
                                    className={`main__hash ${hashCheck === '' ? 'neutral' : hashCheck ? 'valid' : 'invalid'}`}
                                >
                                    {hashCheck === '' ? 'Очікування перевірки' : hashCheck ? 'Все добре' : 'Файл пошкоджено'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="main__end">
                        <div className="main__downloads">
                            <FileDownloader title={'Вихідне повідомлення'} fileContent={encoded}/>
                            <FileDownloader title={'Ключ'} fileContent={keys}/>
                        </div>
                        <div className="main__stats">
                            <span>Вихідне повідоилення: {Array.isArray(encoded) && encoded.join(',')}</span>
                            <span>Ключ: {Array.isArray(keys) && keys.join(',')}</span>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default App;
