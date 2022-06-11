import { useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";

import FileOptions from "../components/downloadComponents/FileOptions"

export default function Download() {
    const [fileFound, setFileFound] = useState(false);
    const [gettingFileData, setGettingFileData] = useState(false);
    const [retrievedFileData, setRetrievedFileData] = useState({});
    const [isInternalError, setIsInternalError] = useState(false);

    const params = useParams();

    useEffect(() => {
        getDownloadFileData();
    }, []);

    const getDownloadFileData = async () => {
        setGettingFileData(true);
        let fileDataResponse = await  axios({
            method: "get",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/api/files/fileMetaData/" + params.fileId,
        }).then((response) => {
            return response;
        }).catch((error) => {
            return error.response;
        });
        setGettingFileData(false);

        // Auswertung der HTTP-Response
        if(fileDataResponse.status === 200) {
            setFileFound(true);
            setIsInternalError(false);
            setRetrievedFileData(fileDataResponse.data);
        } else if(fileDataResponse.status === 404) {
            setFileFound(false);
            setIsInternalError(false);
        } else {
            setFileFound(false);
            setIsInternalError(true);
        }
    }

    const humanReadableSize = (byteSize) => {
        if(byteSize < 1024) {
            return byteSize.toString() + " B";
        } else if (byteSize >= 1024 && byteSize < 1048576) {
            return (Math.round((byteSize / 1024) * 100) / 100).toString() + " kiB";
        } else {
            return (Math.round((byteSize / 1048576) * 100) / 100).toString() + " MiB";
        }
    }

    if(gettingFileData) {
        return(
            <div>
                <p>Lade Datei-Informationen...</p>
            </div>
        );
    }

    if(fileFound) { // wenn Datei mit angegebener fileId gefunden wurde
        return(<div>
            <h1>Download: {decodeURIComponent(escape(retrievedFileData.fileName))}</h1>
            <div>
                <h2>Datei-Informationen</h2>
                <table>
                    <tbody>
                    <tr>
                        <td>Dateiname: </td>
                        <td>{decodeURIComponent(escape(retrievedFileData.fileName))}</td>
                    </tr>
                    <tr>
                        <td>Dateigröße: </td>
                        <td>{humanReadableSize(retrievedFileData.fileSize)}</td>
                    </tr>
                    <tr>
                        <td>Hochgeladen am: </td>
                        <td>{(new Date(retrievedFileData.uploadDate)).toLocaleDateString() + " um " + (new Date(retrievedFileData.uploadDate)).toLocaleTimeString()}</td>
                    </tr>
                    <tr>
                        <td>Zuletzt heruntergeladen: </td>
                        <td>{(new Date(retrievedFileData.lastUsedDate)).toLocaleDateString() + " um " + (new Date(retrievedFileData.lastUsedDate)).toLocaleTimeString()}</td>
                    </tr>
                    <tr>
                        <td>SHA256-Hash: </td>
                        <td>{retrievedFileData.sha256Hash}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <FileOptions fileData={retrievedFileData} fileId={params.fileId}/>
        </div>);
    } else if(!fileFound && !isInternalError) { // wenn Datei nur nicht gefunden
        return(<div>
            <p>File not found.</p>
        </div>);
    } else { // wenn ein anderweitiger Fehler auftrat
        return(<div></div>);
    }
}