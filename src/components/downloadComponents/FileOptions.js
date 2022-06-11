import {useState} from "react";
import axios from "axios";

import RequestStatusChangeForm from "./RequestStatusChangeForm";

export default function FileOptions(props) {
    const [requestFormExpanded, setRequestFormExpanded] = useState(false);

    const handleFileDownload = () => { // get file from WebAPI using axios and pass it to the browser to download via objectURL
        axios({
            method: "get",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/api/files/downloadFileViaId/" + props.fileId,
            responseType: "blob"
        }).then((downloadedFileResponse) => {
            let downloadFile = document.createElement("a");
            downloadFile.href = window.URL.createObjectURL(downloadedFileResponse.data);
            downloadFile.download = decodeURIComponent(escape(props.fileData.fileName));
            document.body.appendChild(downloadFile);
            downloadFile.click();
            setTimeout(() => {
                window.URL.revokeObjectURL(downloadFile);
            }, 1000);
        })
    }
    const handleRequestFormExpansion = () => {
        requestFormExpanded ? setRequestFormExpanded(false): setRequestFormExpanded(true);
    }

    if(!props.fileData.isBlocked) {
        return <div>
            <h1>Datei-Optionen</h1>
            <button onClick={handleFileDownload}>Herunterladen</button>
            <hr/>
            <p>Du meinst, diese Datei verletzt das Urheberrecht? Beantrage hier die Blockierung: </p>
            <button onClick={handleRequestFormExpansion}>Blockierung beantragen</button>
            <RequestStatusChangeForm isExpanded = {requestFormExpanded} fileData = {props.fileData} fileId={props.fileId} blockFile = {true}/>
        </div>
    } else {
        return <div>
            <h1>Datei-Optionen</h1>
            <p>Die Datei ist leider gesperrt, weil sie als urheberrechtsverletzend eingestuft wurde.</p>
            <hr/>
            <p>Du meinst, dies ist ein Fehler und die Datei sollte freigegeben werden? Beantrage hier die Entsperrung: </p>
            <button onClick={handleRequestFormExpansion}>Entsperrung beantragen</button>
            <RequestStatusChangeForm isExpanded = {requestFormExpanded} fileData = {props.fileData} fileId={props.fileId} blockFile = {false}/>
        </div>
    }

}